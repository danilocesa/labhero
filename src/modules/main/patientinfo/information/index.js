/* eslint-disable react/jsx-indent */
// LIBRARY
import React from 'react';
// import { Row, Col } from 'antd';

// CUSTOM MODULES
import PatientInfo from 'shared_components/patient_info';

// CSS
import './information.css';

class Information extends React.Component {
  render() {
    return (
	    <div className="verticalinfo">
		    {/* <div className="patient-number">
			    <Row>
				    <Col span={24} className="differential-title">
					    <p>DIFFERENTIAL COUNT TOTAL</p>
				    </Col>
				    <Col span={24} className="differential-content">
					    <p>100</p>
				    </Col>
			    </Row>
		    </div> */}
        <PatientInfo />
     </div>
    );
  }
}
  
export default Information;