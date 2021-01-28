/* eslint-disable eqeqeq */
/* eslint-disable react/jsx-closing-tag-location */
// LIBRARY
import React from 'react';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';


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

  render() {
		const {data} = this.props;

		return (
	    <div className="patient-info-shared">
			{/* Personal Information */}
			<div className="info-container">
				<span className="main-title">Personal Information</span>
				<Row>
					<Col {...colLayout} className="info-title">
						BIRTHDATE
					</Col>
					<Col {...colLayout} className="info-item-text">
					{data.record.birth_date}
					</Col>
				</Row>
				<Row>
					<Col {...colLayout} className="info-title">
						AGE
					</Col>
					<Col {...colLayout} className="info-item-text">
						{data.record.age}
					</Col>
				</Row>
				<Row>
					<Col {...colLayout} className="info-title">
						GENDER
					</Col>
					<Col {...colLayout} className="info-item-text">
						{data.record.gender}
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
	data: PropTypes.object.isRequired
};


export default PatientInfo;