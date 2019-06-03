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
	<div className="patient-comment">
		<p>COMMENT</p>
		<TextArea />
	</div>
    );
  }
}

export default PatientComment;
