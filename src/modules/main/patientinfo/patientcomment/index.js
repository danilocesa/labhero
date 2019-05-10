import React from 'react';
import { Input } from 'antd';

import './patientcomment.css';

const { TextArea } = Input;

class PatientComment extends React.Component {
  render() {
    return (
      <div className="patient-comment">
        <p>COMMENT</p>
        <TextArea colspan={2} />
      </div>
    );
  }
}

export default PatientComment;
