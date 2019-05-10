import React from 'react';
import { Row, Col } from 'antd';

import PleboPatientInfo from './info';
import PatientName from './name';
import SpecimenList from './specimen';
import ActionButton from  './actions';


class PleboPatientResult extends React.Component {
  render() {
    return (
	    <Row>
		    <Col xs={24} sm={7} md={7} lg={5} xl={5}>
			    <PleboPatientInfo />
        </Col>
          <Col xs={24} sm={17} md={17} lg={19} xl={19} style={{ padding: 25 }}>
            <PatientName />
            <SpecimenList />
            <ActionButton />
          </Col>
        </Row>
    );
  }
}
export default PleboPatientResult;