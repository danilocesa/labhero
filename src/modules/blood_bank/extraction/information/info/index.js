import React from "react"
import PropTypes from 'prop-types';
import PatientInfo from './patient_info';

class Info extends React.Component {

  render() {
    return (
      <div className='verticalinfo'>
        <PatientInfo patientInfo={this.props.patientInfo} />
      </div>
    )
  }
}

Info.propTypes = {
	patientInfo: PropTypes.object
};

Info.defaultProps = {
	patientInfo() { return null; }
}


export default Info;
