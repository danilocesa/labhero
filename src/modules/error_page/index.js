// LIBRARY
import React from 'react';
import PropTypes from 'prop-types'
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';

// IMAGES
import { ErrorIcon } from '../../images' ;

// CSS
import './error.css';

function ErrorPage(props) {

  const style = {
    paddingTop: 200
  };

  return (
    // @ts-ignore
    <div type="flex" justify="center" style={style}>
      <div>
        <Row>
          <Col style={{ textAlign: 'center' }}> 
            <img 
              className="icon" 
              src={ErrorIcon} 
              alt="logo" 
            />
          </Col>
        </Row>
        <p className="error-msg">
          THE PAGE REQUESTED COULD NOT FOUND
        </p>
        <Col span={24}>

          { props.displayRedirect && (
            <Link to="/" className="home-btn">Go back to homepage</Link>
          )}
        </Col>
      </div>
    </div>
  )
}

ErrorPage.propTypes = {
  displayRedirect: PropTypes.bool
};

ErrorPage.defaultProps = {
  displayRedirect: true
};

export default ErrorPage