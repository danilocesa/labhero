import React from 'react';
import { Row, Col, Typography , Menu } from 'antd'

import ForExtraction from './for_extraction_tab';
import ForScreening from 'modules/blood_bank/screening/details/for_screening_tab'
import PatientInfo from 'shared_components/patient_info_panel'

const { Title,Text } = Typography;
const { SubMenu } = Menu;



class ExtractionInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      DataFromHeader:[],
      isStatus:true,
     };
    this.formRef = React.createRef();
  }


  changeScreening = () => {
    this.setState({isStatus:false})
  };

  changeExtraction = () => {
    this.setState({isStatus:true})
  };

	render() {
    const { state: donorDetail } = this.props.location;
    const { isStatus } = this.state
    const { last_name, first_name, donor_id, health_info_id } = donorDetail;

    return(
      <div>
        <Row>
          <Col md={7} xxl={5}>
            <PatientInfo data={donorDetail} />
            <Menu style={{ width: 256 }} mode="vertical">           
              <SubMenu title="SCREENING">
                <Menu.Item 
                  key="1" 
                  onClick={this.changeScreening}
                >
                  Screening Option
                </Menu.Item>
              </SubMenu>
              <SubMenu title="EXTRACTION">
                <Menu.Item 
                  key="2" 
                  onClick={this.changeExtraction}
                >
                  Extraction Option
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Col>
          <Col md={16} xxl={10} style={{marginLeft:20}}>
            <div>
              <Title level={4}>
                {`${last_name}, ${first_name}`.toUpperCase()}
              </Title>
              <Text>
                DONOR ID : 
                {`${donor_id}`.toUpperCase()}
                {`${health_info_id}`.toUpperCase()}
              </Text>
            </div>
            <div style={{marginTop:20}}>
              {(isStatus) ? <ForExtraction donorDetail={donorDetail} /> : <ForScreening donorDetail={donorDetail}/>}
            </div>
          </Col>
        </Row>
        
      </div>
		)
	}	
}

export default ExtractionInformation;	