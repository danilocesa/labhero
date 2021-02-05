/* eslint-disable eqeqeq */
/* eslint-disable react/jsx-closing-tag-location */
// LIBRARY
import React from 'react';
import { Row, Col, Card } from 'antd';
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
		const { data } = this.props;

		return (
	    <Card size="small" style={{ backgroundColor: '#E2E2E2', padding: 10, height: 300 }}>
				<span className="main-title">Personal Information</span>
				<Row  style={{ marginTop: 20 }}>
					<Col {...colLayout} className="info-title">
						DONOR ID
					</Col>
					<Col {...colLayout} className="info-item-text">
						{data.donor_id}
					</Col>
				</Row>
				<Row>
					<Col {...colLayout} className="info-title">
						BLOOD TYPE
					</Col>
					<Col {...colLayout} className="info-item-text">
						{data.blood_type_name}
					</Col>
				</Row>
				<Row>
					<Col {...colLayout} className="info-title">
						ADDRESS
					</Col>
					<Col {...colLayout} className="info-item-text">
						
					</Col>
				</Row>
				<Row>
					<Col {...colLayout} className="info-title">
						BIRTHDATE
					</Col>
					<Col {...colLayout} className="info-item-text">
						{data.birth_date}
					</Col>
				</Row>
				<Row>
					<Col {...colLayout} className="info-title">
						GENDER
					</Col>
					<Col {...colLayout} className="info-item-text">
						{data.gender}
					</Col>
				</Row>
     	</Card>
    );
  }
}    

PatientInfo.propTypes = {
	data: PropTypes.object.isRequired
};


export default PatientInfo;