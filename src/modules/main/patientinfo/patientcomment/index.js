// LIBRARY
import React from 'react';
import { Input } from 'antd';

// CSS
import './patientcomment.css';

// CONSTANTS
const { TextArea } = Input;

class PatientComment extends React.Component {
  render() {
    return (
	    <div className="patientcomment">
		    <p>REMARKS</p>
		    <TextArea rows={3} />
	    </div>
    );
  }
}

export default PatientComment;
