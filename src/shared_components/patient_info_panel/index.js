/* eslint-disable eqeqeq */
/* eslint-disable react/jsx-closing-tag-location */
// LIBRARY
import React from 'react';
import { Row, Col, Card } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';




class PatientInfo extends React.Component {
	computeAge = (date) => {
		const years = Math.floor(moment().diff(date, 'years', true));
		
		const age = years > 0 ? years : '---';
	
		return age;
	}

  render() {
		const { data } = this.props;

		return (
	    <Card size="small" style={{ backgroundColor: '#E2E2E2', padding: 10, minHeight: 300 }}>
				<span className="main-title">Personal Information</span>
				<Row  style={{ marginTop: 20 }}>
					<Col span={10} className="info-title">
						DONOR ID
					</Col>
					<Col span={14} className="info-item-text">
						{data.donor_id}
					</Col>
				</Row>
				<Row>
					<Col span={10} className="info-title">
						BLOOD TYPE
					</Col>
					<Col span={14} className="info-item-text">
						{data.blood_type}
					</Col>
				</Row>
				<Row>
					<Col span={10} className="info-title">
						ADDRESS
					</Col>
					<Col span={14} className="info-item-text">
						{data.province_name} {data.city_name} {data.barangay_name} {data.address_line_1} {data.address_line_2}
					</Col>
				</Row>
				<Row>
					<Col span={10} className="info-title">
						BIRTHDATE
					</Col>
					<Col span={14} className="info-item-text">
						{data.birth_date}
					</Col>
				</Row>
				<Row>
					<Col span={10} className="info-title">
						AGE
					</Col>
					<Col span={14} className="info-item-text">
						{this.computeAge(data.birth_date)}
					</Col>
				</Row>
				<Row>
					<Col span={10} className="info-title">
						GENDER
					</Col>
					<Col span={14} className="info-item-text">
						{data.gender}
					</Col>
				</Row>
				<Row>
					<Col span={10} className="info-title">
						BODY WEIGHT
					</Col>
					<Col span={14} className="info-item-text">
						{data.body_weight} kg
					</Col>
				</Row>
				<Row>
					<Col span={10} className="info-title">
						BLOOD PRESSURE
					</Col>
					<Col span={14} className="info-item-text">
						{data.blood_pressure}
					</Col>
				</Row>
				<Row>
					<Col span={10} className="info-title">
						PULSE RATE
					</Col>
					<Col span={14} className="info-item-text">
						{data.pulse_rate} / min
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