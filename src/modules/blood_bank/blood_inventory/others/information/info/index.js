import React from "react"
import PropTypes from 'prop-types';
import PatientInfo from './patient_info';

class Info extends React.Component {
  

  render() {
    const {data} = this.props
    return (
      <div className='verticalinfo'>
        <PatientInfo data={data} />
      </div>
    )
  }
}

Info.propTypes = {
	data: PropTypes.object.isRequired
};



export default Info;
