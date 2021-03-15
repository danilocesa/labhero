/* eslint-disable eqeqeq */
/* eslint-disable react/jsx-closing-tag-location */
// LIBRARY
import React from 'react';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';

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
	computeAge = (date) => {
		const years = Math.floor(moment().diff(date, 'years', true));
		const age = years > 0 ? years : '---';
	
		return age;
  }

  render() {
    return (
	    <div className="patient-info-shared">
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
							{this.props.patientOtherInfo.hospitalID}
						</Col>
					</Row>
					<Row>
						<Col {...colLayout} className="info-title">
							PHYSICIAN
						</Col>
						<Col {...colLayout} className="info-item-text">
							{this.props.patientOtherInfo.physician}
						</Col>
					</Row>
					<Row>
						<Col {...colLayout} className="info-title">
							LOCATION
						</Col>
						<Col {...colLayout} className="info-item-text">
							{this.props.patientOtherInfo.location}
						</Col>
					</Row>
					<Row>
						<Col {...colLayout} className="info-title">
							BED
						</Col>
						<Col {...colLayout} className="info-item-text">
							{this.props.patientOtherInfo.bed}
						</Col>
					</Row>
					<Row>
						<Col {...colLayout} className="info-title">
							VISIT
						</Col>
						<Col {...colLayout} className="info-item-text">
							{this.props.patientOtherInfo.visit}
						</Col>
					</Row>
					<Row>
						<Col {...colLayout} className="info-title">
							CHARGE SLIP
						</Col>
						<Col {...colLayout} className="info-item-text">
							{this.props.patientOtherInfo.chargeSlip}
						</Col>
					</Row>
					<Row>
						<Col {...colLayout} className="info-title">
							RECEIPT
						</Col>
						<Col {...colLayout} className="info-item-text">
							{this.props.patientOtherInfo.receipt}
						</Col>
					</Row>
					<Row>
						<Col lg={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} className="info-title">
							COMMENT
						</Col>
						<Col lg={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }}>
							{this.props.patientOtherInfo.comment}
						</Col>
					</Row>
  			</div>
     	</div>
    );
  }
}    

PatientInfo.propTypes = {
	patientInfo: PropTypes.object,
	patientOtherInfo: PropTypes.shape({
		hospitalID: PropTypes.string,
		physician: PropTypes.string,	
		bed: PropTypes.string, 					
		visit: PropTypes.string,				
		chargeSlip: PropTypes.string,	
		receipt: PropTypes.string,     
		comment: PropTypes.string,     
		location: PropTypes.string
	})
};

PatientInfo.defaultProps = {
	patientInfo: {},
	patientOtherInfo: {
		hospitalID: '-',
		physician: '-',
		bed: '-',					
		visit: '-',				
		chargeSlip: '-',	
		receipt: '-',    
		comment: '-',  
		location: '-',
	}
}

export default PatientInfo;