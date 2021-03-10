import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import hospitalLocationAPI from 'services/lab_request/hospitalLocation';
import hospitalPhysiciansAPI from 'services/lab_request/hospitalPhysicians';
import { LR_PERSONAL_INFO, LR_OTHER_INFO } from 'modules/main/lab_request/steps/constants';
import { fetchExamsByReqId } from 'services/lab_request/labRequest';
import PageTitle from 'shared_components/page_title';
import SummarySection from './section';
import SummaryTable from './table';

function SummaryPage() {
  const location = useLocation();
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
    const sessOtherInfo = location.state.otherInfo;
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

    console.log('useEeffect has run')
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

      console.log('getExams has run')
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
    </div>
  );
}

export default SummaryPage;