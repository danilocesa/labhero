import React from 'react';
import { Input } from 'antd';

import './patientcomment.css'

const { TextArea } = Input;

class PatientComment extends React.Component {
    render() {
        return(
          <div className="patientcomment">
            <p>COMMENT</p>
            <TextArea rows={3} />
          </div>
        );
    }
}

export default PatientComment;