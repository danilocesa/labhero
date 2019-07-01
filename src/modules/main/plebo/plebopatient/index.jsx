// LIBRARY
import React from 'react';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';

// CUSTOM MODULES
import PleboPatientInfo from './info';
import PatientName from './name';
import SpecimenList from './specimen';

class PleboPatientResult extends React.Component {
  render() {
  return (
	<Row>
		<Col 
			xs={24} 
			sm={7} 
			md={7} 
			lg={6} 
			xl={6}
		>
			<PleboPatientInfo patientInfo={this.props.patientInfo} />
		</Col>
		<Col 
			xs={24} 
			sm={17} 
			md={17} 
			lg={18} 
			xl={18} 
			style={{ padding: 25 }}
		>
			<PatientName patientInfo={this.props.patientInfo} />
			<SpecimenList patientInfo={this.props.patientInfo} />
		</Col>
	</Row>
    );
  }
}

PleboPatientResult.propTypes = {
	patientInfo: PropTypes.object
};

PleboPatientResult.defaultProps = {
	patientInfo() { return null; }
}


export default PleboPatientResult;