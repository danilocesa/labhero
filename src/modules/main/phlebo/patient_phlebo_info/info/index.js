// LIBRARY
import React from 'react';
import PropTypes from 'prop-types';

// CUSTOM MODULES
import PatientInfo from 'shared_components/patient_info';

class PhleboPatientInfo extends React.Component {
render() {
  return(
	<div className='verticalinfo'>
		<PatientInfo patientInfo={this.props.patientInfo} />
	</div>
    );
  }
}

PhleboPatientInfo.propTypes = {
	patientInfo: PropTypes.object
};

PhleboPatientInfo.defaultProps = {
	patientInfo() { return null; }
}

export default PhleboPatientInfo;