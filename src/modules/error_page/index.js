import React from 'react';
import { Row, Col, Typography } from 'antd';

import { ErrorIcon } from '../../images' ;
import './error.css';

import { Link } from 'react-router-dom';

const { Text } = Typography;

function ErrorPage() {

  var style = {
    paddingTop: 200
  };

    return (
      <div type="flex" justify="center" style={style}>
        <div>
          <Row>
            <Col style={{ textAlign: 'center' }}> 
              <img className="icon" 
                   src={ErrorIcon} 
                   alt="logo" />
            </Col>
          </Row>
          <p className="error-msg">
            THE PAGE REQUESTED COULD NOT FOUND
          </p>
          <Col span={24}>
            <Link to="/" className="home-btn" >Go back to homepage</Link>
          </Col>
        </div>
      </div>
    )
}

export default ErrorPage