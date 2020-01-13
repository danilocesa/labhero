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
        <PatientInfo />
     </div>
    );
  }
}
  
export default Information;