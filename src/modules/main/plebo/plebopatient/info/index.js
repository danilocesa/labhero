// LIBRARY
import React from 'react';

// CUSTOM MODULES
import PatientInfo from '../../../../../shared_components/patient_info';

class PleboPatientInfo extends React.Component {
  render() {
    return(
	    <div className='verticalinfo'>
		    <PatientInfo />
     	</div>
    );
  }
}

export default PleboPatientInfo;