// LIBRARY
import React from 'react';
import PropTypes from 'prop-types';

// CUSTOM MODULES
import PatientInfo from 'shared_components/patient_info';

class PleboPatientInfo extends React.Component {
render() {
  return(
	<div className='verticalinfo'>
		<PatientInfo patientInfo={this.props.patientInfo} />
	</div>
    );
  }
}

PleboPatientInfo.propTypes = {
	patientInfo: PropTypes.object
};

PleboPatientInfo.defaultProps = {
	patientInfo() { return null; }
}

export default PleboPatientInfo;