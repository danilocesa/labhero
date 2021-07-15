import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import hospitalLocationAPI from 'services/lab_request/hospitalLocation';
import hospitalPhysiciansAPI from 'services/lab_request/hospitalPhysicians';
import { fetchExamsByReqId } from 'services/lab_request/labRequest';
import PageTitle from 'shared_components/page_title';
import SummarySection from './section';
import SummaryTable from './table';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';

function SummaryPage() {
  const location = useLocation();
  const history = useHistory();
  const [exams, setExams] = useState([]);
  const [personalInfo, setPersonalInfo] = useState({
    givenName: '',
    nameSuffix: '',
    lastName: '',
    middleName: '',
    dateOfBirth: '',
    sex: '',
  });
  const [otherInfo, setOtherInfo] = useState({
    bed: '',
    chargeSlip: '',
    comment: '',
    locationID: '',
    locationName: '',
    officialReceipt: '',
    patientAge: '',
    patientID: '',
    physicianID: '',
    physicianName: '',
    visit: '',
    requestID: null
  });
  

  useEffect(() => {
    // @ts-ignore
    const sessOtherInfo = location.state.otherInfo;
    // @ts-ignore
    const sessPersoInfo = location.state.persoInfo;

    async function setInitialValues() {
      const [hospitalLocations, physicians] = await Promise.all([hospitalLocationAPI(), hospitalPhysiciansAPI()]);

      const location = hospitalLocations.find(loc => loc.locationID === sessOtherInfo.locationID);
      const physician = physicians.find(phys => phys.physicianID === sessOtherInfo.physicianID); 	
      
      setPersonalInfo(sessPersoInfo);
      setOtherInfo({ 
        ...sessOtherInfo, 
        locationName: location ? location.name : '',
        physicianName: physician 
          ? `${physician.namePrefix} ${physician.givenName} ${physician.lastName}`
          : '' 
      });
    };
		
    setInitialValues();

  }, [location.state]);


  useEffect(() => {
    async function getExams() {
      const exams = await fetchExamsByReqId(otherInfo.requestID);
      const newExams = [];

      exams.forEach(a => {
        a.contents.forEach(b => {
          newExams.push({
            key: newExams.length,
            exam: b.examRequestName,
            panel: b.panelName,
            section: a.sectionName,
            specimen: a.specimenName
          });
        });
      })

      setExams(newExams);
    }
    
    if(otherInfo.requestID) {
      getExams();
    }
  }, [otherInfo.requestID]);



  return (
    <div>
      <PageTitle pageTitle="REQUEST SUMMARY" />
      <SummarySection 
        personalInfo={personalInfo}
        otherInfo={otherInfo}
      />
      <SummaryTable exams={exams} />
      <Button 
						className="nav-btn-round" 
						type="primary" 
						style={{ marginRight: 170,marginTop: 10, position: 'absolute', right: '0' }}
						onClick={() => history.push('/request/view/search')}
					>
						BACK
					</Button>
    </div>
  );
}

export default SummaryPage;