import React, { Component } from 'react'
import PatientInfo from 'shared_components/patient_info_panel'
import { Row, Col, Typography, Table, Tabs, Button, Menu   } from 'antd'

import ForScreening from './for_screening_tab';
import ForExtraction from 'modules/blood_bank/extraction/details/for_extraction_tab'

const { Title,Text } = Typography;
const { SubMenu } = Menu;

export default class ScreeningInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isStatus:true,
     };
  }

  changeScreening = () => {
    this.setState({isStatus:true})
  };

  changeExtraction = () => {
    this.setState({isStatus:false})
  };

  render() {
    const { isStatus } =this.state
    const { state: donorDetail } = this.props.location;
    const { last_name, first_name, donor_id, health_info_id } = donorDetail;
    return (
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
              {(isStatus) ? <ForScreening donorDetail={donorDetail}/> :  <ForExtraction donorDetail={donorDetail} />}
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}
