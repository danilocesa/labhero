// LIBRARY
import React from 'react';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';

// CUSTOM MODULES     
import PhleboPatientInfo from './info';
import PatientName from './name';
import SpecimenList from './specimen';

class PhleboPatientResult extends React.Component {
  render() {
  return (
	<Row>
		<Col 
			xs={24} 
			sm={6} 
			md={6} 
			lg={5} 
			xl={5}
		>
			<PhleboPatientInfo patientInfo={this.props.patientInfo} />
		</Col>
		<Col 
			xs={24} 
			sm={18} 
			md={18} 
			lg={19} 
			xl={19} 
			style={{ padding: 25 }}
		>
			<PatientName patientInfo={this.props.patientInfo} />
			<SpecimenList patientInfo={this.props.patientInfo} />
		</Col>
	</Row>
    );
  }
}

PhleboPatientResult.propTypes = {
	patientInfo: PropTypes.object
};

PhleboPatientResult.defaultProps = {
	patientInfo() { return null; }
}


export default PhleboPatientResult;