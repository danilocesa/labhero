/* eslint-disable eqeqeq */
/* eslint-disable react/jsx-closing-tag-location */
// LIBRARY
import React from 'react';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';
// CUSTOM MODULES
import { fetchRequestSpecimenToProcess } from 'services/phlebo/specimenTracking';
// import { PatientImgPlaceholder } from 'images';

import './patient_info.css';

const colLayout = {
	xxl: { span: 12 },
	xl: { span: 12 },
	lg: { span: 12 },
	sm: { span: 24 },
	md: { span: 12 },
	xs: { span: 12 }
};


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
		const patientInfoValue = await fetchRequestSpecimenToProcess(patientInfo.requestID);
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


	computeAge = (date) => {
		const years = Math.floor(moment().diff(date, 'years', true));
		const age = years > 0 ? years : '---';
	
		return age;
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
					<Col {...colLayout} className="info-title">
						BIRTHDATE
					</Col>
					<Col {...colLayout} className="info-item-text">
						{this.props.patientInfo.dateOfBirth}
					</Col>
				</Row>
				<Row>
					<Col {...colLayout} className="info-title">
						AGE
					</Col>
					<Col {...colLayout} className="info-item-text">
						{this.computeAge(this.props.patientInfo.dateOfBirth)}
					</Col>
				</Row>
				<Row>
					<Col {...colLayout} className="info-title">
						GENDER
					</Col>
					<Col {...colLayout} className="info-item-text">
						{this.props.patientInfo.sex}
					</Col>
				</Row>
			</div>

			{/* Other Information */}
			<div className="info-container">
				<span className="main-title">Other Information</span>
				<Row>
					<Col {...colLayout} className="info-title">
						HOSPITAL ID
					</Col>
					<Col {...colLayout} className="info-item-text">
						{this.state.hospitalID}
					</Col>
				</Row>
				<Row>
					<Col {...colLayout} className="info-title">
						PHYSICIAN
					</Col>
					<Col {...colLayout} className="info-item-text">
						{this.state.physician}
					</Col>
				</Row>
				<Row>
					<Col {...colLayout} className="info-title">
						LOCATION
					</Col>
					<Col {...colLayout} className="info-item-text">
						{this.state.location}
					</Col>
				</Row>
				<Row>
					<Col {...colLayout} className="info-title">
						BED
					</Col>
					<Col {...colLayout} className="info-item-text">
						{this.state.bed}
					</Col>
				</Row>
				<Row>
					<Col {...colLayout} className="info-title">
						VISIT
					</Col>
					<Col {...colLayout} className="info-item-text">
						{this.state.visit}
					</Col>
				</Row>
				<Row>
					<Col {...colLayout} className="info-title">
						CHARGE SLIP
					</Col>
					<Col {...colLayout} className="info-item-text">
						{this.state.chargeSlip}
					</Col>
				</Row>
				<Row>
					<Col {...colLayout} className="info-title">
						RECEIPT
					</Col>
					<Col {...colLayout} className="info-item-text">
						{this.state.receipt}
					</Col>
				</Row>
				<Row>
					<Col lg={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} className="info-title">
						COMMENT
					</Col>
					<Col lg={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }}>
						{this.state.comment}
					</Col>
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