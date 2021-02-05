import React from 'react';
import { Row, Col, Typography, Table, Tabs  } from 'antd';
// import{ fetchHeaderData }from 'services/blood_bank/extraction';

// import ForScreening from './for_screening_tab';
import ForExtraction from './for_extraction_tab';
import PatientInfo from './patient_info_panel'

const { Title } = Typography;
const { TabPane } = Tabs;


// const columns = [
//   {
//     title: 'DATE CREATED',
//     dataIndex: '',
//   },
//   {
//     title: 'BAG ID',
//     dataIndex: 'blood_bag',
//   },
//   {
//     title: 'STATUS',
//     dataIndex: 'status'
//   },
//   {
//     title: 'SCREENING FLAG',
//     dataIndex: 'screening_flag' 
//   },
// ];



class ExtractionInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      DataFromHeader:[]
     };
    this.formRef = React.createRef();
  }

  async componentDidMount() {
    // const ID = this.props.location.state.donor_id
    // const response = await fetchHeaderData(ID);
  
    // const data = response.map(item => {
    //   const { status_screened, status_extracted } = item;
    //   const bothSelected = status_screened && status_extracted;
  
    //   const str1 = status_screened ? 'SCREENED' : '';
    //   const str2 = bothSelected ? 'SCREENED,EXTRACTED ' : '';
    //   const str3 = status_extracted ? 'EXTRACTED' : ''
    //   const status = str1 + str2 + str3;
  
    //   return { ...item, status };
    // })
    // this.setState({
    //   DataFromHeader: data
    // })
  }

  NextStep = () => {
    window.location.assign('/bloodbank/extraction/screening');
  };

	render() {
    const { state: donorDetail } = this.props.location;
    const { last_name, first_name } = donorDetail;
    // const { DataFromHeader } = this.state;


    return(
      <div>
        <Row>
          <Col span={5}>
            <PatientInfo data={donorDetail} />
          </Col>
          <Col span={18} style={{marginLeft:20}}>
            <div>
              <Title level={4}>{`${last_name}, ${first_name}`.toUpperCase()}</Title>
            </div>
            {/* <Table
              dataSource={DataFromHeader}
              style={{ textTransform: "uppercase" }}
              columns={columns}
              pagination={false} 
            />  */}
            <div>
              <Tabs defaultActiveKey="1">
                {/* <TabPane tab="FOR SCREENING" key="1">
                  <ForScreening  />
                </TabPane> */}
                <TabPane tab="FOR EXTRACTION" key="2">
                  <ForExtraction donorDetail={donorDetail} />
                </TabPane>
              </Tabs>
            </div>
          </Col>
        </Row>
        
      </div>
		)
	}	
}

export default ExtractionInformation;	