// LIBRARY
import React from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';

// IMAGES
import { ErrorIcon } from '../../images' ;

// CSS
import './error.css';

function ErrorPage() {
<<<<<<< HEAD
	const style = {
		display: 'flex',
		justify: 'center',
		paddingTop: 200
	};

	return (
		<div style={style}>
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
					<Link to="/" className="home-btn">Go back to homepage</Link>
				</Col>
			</div>
		</div>
	)
=======

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
          <Link to="/" className="home-btn">Go back to homepage</Link>
        </Col>
      </div>
    </div>
  )
>>>>>>> c3f05084b33c286391e7218d25895d8d68c3bfef
}

export default ErrorPage