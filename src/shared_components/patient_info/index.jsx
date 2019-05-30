/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-indent */
// LIBRARY
import React from "react";
import { Row, Col } from 'antd';

// IMAGES
import { PatientImgPlaceholder } from 'images';

// CSS
import './patient_info.css';

class PatientInfo extends React.Component {
  render() {
		// const { patientInfo } = this.props; 
    return (
	    <div>
		    {/* Patient Image Placeholder */}
		  	<div className="patient-img">
			    <img src={PatientImgPlaceholder} className="image-placeholder" alt="patient" />
      	</div>

				{/* Personal Information */}
				<div className="info-container">
					<span className="main-title">Personal Information</span>
					<Row>
						<div className="info-item">
							<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }} className="info-title">
											BIRTHDATE
							</Col>
							<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }}>
											test
							</Col>
						</div>
						<div className="info-item">
							<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }} className="info-title">
											AGE
							</Col>
							<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }}>
											20
							</Col>
						</div>
						<div className="info-item">
							<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }} className="info-title">
											GENDER
							</Col>
							<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }}>
											male
							</Col>
						</div>
					</Row>
  </div>
		{/* Other Information */}
		<div className="info-container">
					<span className="main-title">Other Information</span>
					<Row>
						<div className="info-item">
							<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }} className="info-title">
								CASE NO.
							</Col>
							<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }}>
								123456
							</Col>
						</div>
						<div className="info-item">
							<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }} className="info-title">
								PHYSICIAN ID
							</Col>
							<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }}>
								123456789
							</Col>
						</div>
						<div className="info-item">
							<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }} className="info-title">
								WARD
							</Col>
							<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }}>
								--
							</Col>
						</div>
						<div className="info-item">
							<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }} className="info-title">
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
								This is sample comment
							</Col>
						</div>
					</Row>
  </div>
     </div>
    );
  }
}    

export default PatientInfo;