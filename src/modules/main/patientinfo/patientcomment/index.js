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
<<<<<<< HEAD
		<TextArea />
=======
		<TextArea rows={3} />
>>>>>>> c3f05084b33c286391e7218d25895d8d68c3bfef
	</div>
    );
  }
}

export default PatientComment;