import React from 'react';
import { Row, Col } from 'antd';

import PatientSideInfo from './info';

import './layout.css'



class PatientPleboResult extends React.Component {
    render() {
      return (
          <Row>
            <Col xs={24} sm={7} md={7} lg={5} xl={5}>
              <PatientSideInfo />
            </Col>
            <Col xs={24} sm={17} md={17} lg={19} xl={19}>
              
            </Col>
          </Row>
      );
    }
}

export default PatientPleboResult;