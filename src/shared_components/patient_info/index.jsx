/* eslint-disable eqeqeq */
/* eslint-disable react/jsx-closing-tag-location */
// LIBRARY
import React from "react";
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';

// CUSTOM MODULES
import patientPhleboSpecimensAPI from "services/phlebo/specimenTracking/requestid";
import computeAge from "shared_components/age_computation";

// CSS
import './patient_info.css';

// IMAGES
import { PatientImgPlaceholder } from '../../images';

class PatientInfo extends React.Component {

	state = {
		hospitalID: '-',
		physician: '',
		bed: '-',
		visit: '-',
		chargeSlip: '-',
		receipt: '-',
		comment: '-',
		location: '-'
	};


	async componentDidMount(){
		const { patientInfo } = this.props
		const patientInfoValue = await patientPhleboSpecimensAPI(patientInfo.requestID);
		const { 
			hospitalRequestID, 
			physician, 
			bed, 
			visit, 
			chargeSlip, 
			officialReceipt, 
			comment, 
			location  
		} = patientInfoValue;
		


		this.setState({
			hospitalID: 	hospitalRequestID || '-',
			physician: 		physician
										? `${physician.namePrefix} ${physician.givenName} ${physician.lastName}`.toUpperCase() 
										: '-',
			bed: 					bed || '-',
			visit: 				visit || '-',
			chargeSlip: 	chargeSlip || '-',
			receipt:      officialReceipt || '-',
			comment:      comment || '-',
			location: 		location !== undefined ? location.name.toString().toUpperCase() : '-'
		});
	}

  render() {
    return (
	    <div className="patient-info-shared">
		    {/* Patient Image Placeholder */}
		  	{/* <div className="patient-img">
			    <img src={PatientImgPlaceholder} className="image-placeholder" alt="patient" />
      		</div> */}

			{/* Personal Information */}
			<div className="info-container">
				<span className="main-title">Personal Information</span>
				<Row>
					<div className="info-item">
						<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }} className="info-title">
							BIRTHDATE
						</Col>
						<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }} className="info-item-text">
							{this.props.patientInfo.dateOfBirth}
						</Col>
					</div>
				</Row>
				<Row>
					<div className="info-item">
						<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }} className="info-title">
							AGE
						</Col>
						<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }} className="info-item-text">
							{computeAge(this.props.patientInfo.dateOfBirth)}
						</Col>
					</div>
				</Row>
				<Row>
					<div className="info-item">
						<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }} className="info-title">
							GENDER
						</Col>
						<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }} className="info-item-text">
							{this.props.patientInfo.sex}
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
							HOSPITAL ID
						</Col>
						<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }} className="info-item-text">
							{this.state.hospitalID}
						</Col>
					</div>
				</Row>
				<Row>
					<div className="info-item">
						<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }} className="info-title">
							PHYSICIAN
						</Col>
						<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }} className="info-item-text">
							{this.state.physician}
						</Col>
					</div>
				</Row>
				<Row>
					<div className="info-item">
						<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }} className="info-title">
							LOCATION
						</Col>
						<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }} className="info-item-text">
							{this.state.location}
						</Col>
					</div>
				</Row>
				<Row>
					<div className="info-item">
						<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }} className="info-title">
							BED
						</Col>
						<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }} className="info-item-text">
							{this.state.bed}
						</Col>
					</div>
				</Row>
				<Row>
					<div className="info-item">
						<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }} className="info-title">
							VISIT
						</Col>
						<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }} className="info-item-text">
							{this.state.visit}
						</Col>
					</div>
				</Row>
				<Row>
					<div className="info-item">
						<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }} className="info-title">
							CHARGE SLIP
						</Col>
						<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }} className="info-item-text">
							{this.state.chargeSlip}
						</Col>
					</div>
				</Row>
				<Row>
					<div className="info-item">
						<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }} className="info-title">
							RECEIPT
						</Col>
						<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }} className="info-item-text">
							{this.state.receipt}
						</Col>
					</div>
				</Row>
				<Row>
					<div className="info-item">
						<Col lg={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} className="info-title">
							COMMENT
						</Col>
						<Col lg={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }}>
							{this.state.comment}
						</Col>
					</div>
				</Row>
  			</div>
     	</div>
    );
  }
}    

PatientInfo.propTypes = {
	patientInfo: PropTypes.object
};

PatientInfo.defaultProps = {
	patientInfo: {}
}

export default PatientInfo;