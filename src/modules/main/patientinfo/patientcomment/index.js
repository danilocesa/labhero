import React from 'react';
import { Input, Row, Col } from 'antd';

import './patientcomment.css';
import { CommentIcon } from '../../../../images';

const { TextArea } = Input;

class PatientComment extends React.Component {
  render() {
    return (
      <div className="patient-comment">
        <p>COMMENT</p>
        <TextArea colspan={2} />
        {/* <Row>
          <Col span={1} className="comment-icon">
            <img src={CommentIcon} alt="Comment Icon" />
          </Col>
          <Col span={23} className="comment-container">
            <TextArea colspan={2} className="comment-input" placeholder="Enter comment" />
          </Col>
        </Row> */}
      </div>
    );
  }
}

export default PatientComment;
