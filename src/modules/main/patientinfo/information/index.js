import React from 'react';
import { Row, Col } from 'antd';
// import 'antd/dist/antd.css';

import { PatientImgPlaceholder } from '../../../../images';

import './information.css';

class Information extends React.Component {
  render() {
    return (
	<div className="verticalinfo">
		<div className="patient-number">
			<Row>
				<Col span={24} className="differential-title">
					<p>DIFFERENTIAL COUNT TOTAL</p>
    </Col>
            <Col span={24} className="differential-content">
              <p>100</p>
            </Col>
          </Row>
        </div>

        {/* Patient Image Placeholder */}
        <div className="patient-img">
          <img src={PatientImgPlaceholder} className="image-placeholder" alt="patient" />
        </div>

        {/* Personal Information */}
        <div className="info-container">
          <span className="main-title">Personal Information</span>
          <Row>
            <div className="info-item">
              <Col
                lg={{ span: 12 }}
                sm={{ span: 24 }}
                md={{ span: 12 }}
                xs={{ span: 12 }}
                className="info-title"
              >
                BIRTHDATE
              </Col>
              <Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }}>
                05/01/1998
              </Col>
            </div>

            <div className="info-item">
              <Col
                lg={{ span: 12 }}
                sm={{ span: 24 }}
                md={{ span: 12 }}
                xs={{ span: 12 }}
                className="info-title"
              >
                AGE
              </Col>
              <Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }}>
                20
              </Col>
            </div>

            <div className="info-item">
              <Col
                lg={{ span: 12 }}
                sm={{ span: 24 }}
                md={{ span: 12 }}
                xs={{ span: 12 }}
                className="info-title"
              >
                GENDER
              </Col>
              <Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }}>
                MALE
              </Col>
            </div>
          </Row>
        </div>

        {/* Other Information */}
        <div className="info-container">
          <span className="main-title">Other Information</span>
          <Row>
            <div className="info-item">
              <Col
                lg={{ span: 12 }}
                sm={{ span: 24 }}
                md={{ span: 12 }}
                xs={{ span: 12 }}
                className="info-title"
              >
                CASE NO.
              </Col>
              <Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }}>
                123456
              </Col>
            </div>

            <div className="info-item">
              <Col
                lg={{ span: 12 }}
                sm={{ span: 24 }}
                md={{ span: 12 }}
                xs={{ span: 12 }}
                className="info-title"
              >
                PHYSICIAN ID
              </Col>
              <Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }}>
                123456789
              </Col>
            </div>

            <div className="info-item">
              <Col
                lg={{ span: 12 }}
                sm={{ span: 24 }}
                md={{ span: 12 }}
                xs={{ span: 12 }}
                className="info-title"
              >
                WARD
              </Col>
              <Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }}>
                --
              </Col>
            </div>

            <div className="info-item">
              <Col
                lg={{ span: 12 }}
                sm={{ span: 24 }}
                md={{ span: 12 }}
                xs={{ span: 12 }}
                className="info-title"
              >
                CLASS
              </Col>
              <Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }}>
                --
              </Col>
            </div>
            <br />
            <div className="info-item">
              <Col lg={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} className="info-title">
                COMMENT
              </Col>
              <Col lg={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }}>
                On windows you will need to download and install git-flow. After installing git-flow
                you can use it in your project by executing git flow init.
              </Col>
            </div>
          </Row>
        </div>
      </div>
    );
  }
}

export default Information;
