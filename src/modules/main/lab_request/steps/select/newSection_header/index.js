import { Radio, Tooltip, Spin } from 'antd';
import fetchSection from 'services/shared/section';
import React , {  useState ,useEffect }from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { fetchPanelList } from 'services/request_lab/panelList'
import { fetchPerSpecimens } from 'services/shared/examRequest';
import SelectContentNew from '../newSection_content'

const dynamicWidthStyle = (itemCount = 1) => ({
	width: `calc(100%/${itemCount})`
});



function NewSectionHeader(props) {
  const [ Specimens , setSpecimens ] = useState([])
  const [ SelectedSection , setSelectedSection ] = useState([])
  const [ Panels , setPanels ] = useState([])
  const [ Exams , setExams ] = useState([])
  
  //ALL Selected Item
  const [ Sections , setSections ] = useState([])

  //Other
  const [ isLoading , setisLoading ] = useState(false)

    // FIRST RUN IN SECTION HEADER
    useEffect(() => {
      fetchData(); 
    },[]) 

    // GET THE LIST DATA IN API
    async function fetchData() {
      const { populatePanelRefNew, populatePanelsNew } = props
      const sections = await fetchSection();
      const PanelListAPI = await fetchPanelList();
      setSections(sections)
      populatePanelRefNew(PanelListAPI.filter(rawPanel => rawPanel.active === 1))
      populatePanelsNew();
    }

    const onChangeSpecimen = (event) => {
      const { populateExams, updateSelectedSpecimen } = props;
      updateSelectedSpecimen({ 
				specimenID:event.target['data-specimenid'] ,
				specimenName: event.target['data-specimenname'] 
			});
      Specimens.some((item, index) => {
				if(item.specimen.specimenID === event.target['data-specimenid']) {
					const { exams } = Specimens[index];

					populateExams(exams);

					return true;
				}

				return false;
			});
		}

    //PASS THE selectedSectionID INTO API THEN CHECK IF THERE WERE AVAILABLE SPECIMEN
    const populateSpecimen = async(selectedSectionID) => {
      setisLoading(true) 
      const specimens = await fetchPerSpecimens(selectedSectionID);
      setSpecimens(specimens)
      setisLoading(false) 
    }

    // CHECK IF THE VALUE OF RADIO BUTTON IS 'panel' ELSE SHOW SPECIMEN
    const onChangeSection = async (event) => {
      const { populatePanelsNew, clearExams, updateSelectedSection } = props

      updateSelectedSection({
				sectionID: event.target['data-sectionid'],
				sectionName: event.target['data-sectionname'],
				sectionCode: event.target.value 
			});

      clearExams();
			if(event.target.value === 'panel') {
        setSpecimens([])
				populatePanelsNew();
			} else {
			  populateSpecimen(event.target['data-sectionid']);
      }
    }
    
    const Loading = () => {
      const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
      
      return (
        <div style={{ textAlign: 'center' }}>
          <Spin indicator={antIcon} />
        </div>
      );
    };

    const SectionList = Sections.map(item => ( 
      <Tooltip 
        title={item.sectionName}
        key={item.sectionCode}
      >
        <Radio.Button 
          value={item.sectionCode}
          data-sectionname={item.sectionName}
          data-sectionid={item.sectionID}
          style={dynamicWidthStyle(Sections.length + 1)}
        > 
          {item.sectionCode} 
        </Radio.Button> 
      </Tooltip>
    ));

    //ADD DATA IN FIRST OF 'Sections' ARRAY
    SectionList.unshift(( 
      <Radio.Button value="panel" key="panel" style={{ width: `calc(100%/${SectionList.length + 1})` }}>
        PANEL  
      </Radio.Button>
    ));

    const SpecimenList = Specimens.map(item => ( 
      <Radio.Button 
        value={item.specimen.specimenID}
        key={item.specimen.specimenID} 
        data-specimenid={item.specimen.specimenID} 
        data-specimenname={item.specimen.specimenName}
        style={dynamicWidthStyle(Specimens.length)}
      > 
        {item.specimen.specimenName} 
      </Radio.Button>
    ));

    return( 
      <>
        <div className="section-group">
          <Radio.Group 
            className="section-list"
            defaultValue="panel"
            buttonStyle="solid"
            onChange={onChangeSection}
          > 
            {SectionList}
          </Radio.Group> 

          {
            !isLoading && (
              <Radio.Group 
                className="specimen-list"
                buttonStyle="solid"
                onChange={onChangeSpecimen} 
              > 
                {SpecimenList}
              </Radio.Group> 
            )
          }
            { isLoading && <Loading /> }
        </div>
      </>
    )
}

export default NewSectionHeader;