import React from 'react';
import { Row, Col } from 'antd';
// import 'antd/dist/antd.css';

import Information from './information';
import TableResults from './tableresults';
import Name from './patientname';
import Actions from './actions';
import PatientComment from './patientcomment';

import './layout.css'



class PatientInfo extends React.Component {
    render() {
      return (
          <Row>
            <Col xs={24} sm={7} md={7} lg={5} xl={5}>
              <Information />
            </Col>
            <Col xs={24} sm={17} md={17} lg={19} xl={19} className="patient-info-content">
              <Name />
              <TableResults />  
              <PatientComment />
              <Actions /> 
            </Col>
          </Row>
      );
    }
}

export default PatientInfo;