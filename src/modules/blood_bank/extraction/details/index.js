import React from 'react';
import { 
  Row, 
  Col, 
  Typography
} from 'antd'

import ForExtraction from './for_extraction_tab';
import PatientInfo from './extraction_panel'

const { Title,Text } = Typography;

class ExtractionInformation extends React.Component {

	render() {
    const { state: donorDetail } = this.props.location;
    const donorDetailsData = donorDetail.donorDetail
    const { last_name, first_name, donor_id, health_info_id } = donorDetail.donorDetail;

    return(
      <div>
        <Row>
          <Col md={7} xxl={5}>
            <PatientInfo data={donorDetailsData} />
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
               <ForExtraction donorDetail={donorDetail} />
            </div>
          </Col>
        </Row>
      </div>
		)
	}	
}

export default ExtractionInformation;	