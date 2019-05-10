import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';
import { Form, Input, Row, Col, Typography, DatePicker, Radio, Divider } from 'antd';

import './form.css';

const { Text } = Typography;
const { TextArea } = Input;

class FillupForm extends React.Component {  
	componentWillMount() {
		const { location, updateState } = this.props;
		const sessionFields = sessionStorage.getItem('create_lab_request_fields');

		if(location.state) {
			const age = this.computeAge(location.state.record.birthday);

			updateState({ ...location.state.record, age });
		}

		else if(sessionFields) {
			updateState({ ...JSON.parse(sessionFields) });
		}

	}

	onInputChange = (event) => {
		const { updateState } = this.props;
		
		updateState({
			[event.target.name]: event.target.value
		});
	}

	onDateChange = (date) => {
		const { updateState } = this.props;
		const age = this.computeAge(date);

		updateState({ birthday: date, age });
	}

	computeAge = (date) => {
		const formattedDate = moment(date, 'MM-DD-YYYY');
		const years = Math.floor(moment().diff(formattedDate, 'years', true));
		const age = years > 0 ? years : '-----';

		return age;
	}

	render() {
		const { fields } = this.props;
		const { 
			caseNumber, 
			firstname, 
			lastname, 
			middlename, 
			birthday, 
			age, 
			gender, 
			ward, 
			physicianId, 
			classType, 
			comment, 
			amount 
		} = fields;

		const dob = birthday ? moment(birthday, 'MM-DD-YYYY') : null;

		return (
			<div style={{ marginTop: 50 }}>
				<Form className="fillup-form">
					<Row gutter={12}>
						<Col sm={12} md={11}>
							<div className="left-form">
								<div style={{ padding: '10px 0px' }}>
									<Text strong>PERSONAL INFORMATION</Text>
								</div>
								<Form.Item label="CASE NO.">
									<Input 
										name="caseNumber" 
										onChange={this.onInputChange} 
										value={caseNumber}
									/>
								</Form.Item>
								<Form.Item label="LAST NAME">
									<Input 
										name="lastname" 
										onChange={this.onInputChange} 
										value={lastname}
									/>
								</Form.Item>
								<Form.Item label="FIRST NAME">
									<Input 
										name="firstname" 
										onChange={this.onInputChange} 
										value={firstname}
									/>
								</Form.Item>
								<Form.Item label="MIDDLE NAME">
									<Input 
										name="middlename" 
										onChange={this.onInputChange} 
										value={middlename}
									/>
								</Form.Item>
								<Row gutter={12}>
									<Col span={18}>
										<Form.Item label="DATE OF BIRTH">
											<DatePicker 
												name="birthday" 
												value={dob}
												onChange={this.onDateChange} 
												format="MM-DD-YYYY"
												style={{ width: '100%' }}
											/>
										</Form.Item>
									</Col>
									<Col span={6}>
										<Form.Item label="AGE">
											<Input
												name="age" 
												value={age} 
												disabled
												style={{ textAlign: 'center' }}
											/>
										</Form.Item>
									</Col>
								</Row>
								<Form.Item label="PATIENT'S GENDER">
									<Radio.Group 
										defaultValue={gender} 
										buttonStyle="solid"
										name="gender" 
										onChange={this.onInputChange} 
										value={gender}
									>
										<Radio.Button value="MALE">MALE</Radio.Button>
										<Radio.Button value="FEMALE">FEMALE</Radio.Button>
									</Radio.Group>
								</Form.Item>
							</div>
						</Col>
						<Col md={{ span: 2 }} style={{ textAlign: 'center' }}>
							<Divider className="divider" type="vertical" style={{ height: 420 }} />
						</Col>
						<Col sm={{ span: 12 }} md={{ span: 11 }}>
							<div className="right-form">
								<div style={{ padding: '10px 0px' }}>
									<Text strong>OTHER INFORMATION</Text>
								</div>
								<Form.Item label="WARD">
									<Input 
										name="ward"
										onChange={this.onInputChange} 
										value={ward}
									/>
								</Form.Item>
								<Form.Item label="PHYSICIAN ID">
									<Input 
										name="physicianId" 
										onChange={this.onInputChange} 
										value={physicianId}
									/>
								</Form.Item>
								<Form.Item label="CLASS">
									<Input 
										name="classType" 
										onChange={this.onInputChange} 
										value={classType}
									/>
								</Form.Item>
								<Form.Item label="COMMENT">
									<TextArea 
										rows={3} 
										name="comment" 
										onChange={this.onInputChange} 
										value={comment}
									/>
								</Form.Item>
								<Row>
									<Col span={8}>
										<Form.Item label="AMOUNT">
											<Input 
												size="large" 
												name="amount" 
												onChange={this.onInputChange} 
												value={amount} 
												style={{ textAlign: 'center' }}
											/>
										</Form.Item>
									</Col> 
								</Row>
							</div>
						</Col>
					</Row>
				</Form>
			</div>
		);
	}
}

FillupForm.propTypes = {
	fields: PropTypes.shape({
		caseNumber: PropTypes.string.isRequired, 
		firstname: PropTypes.string.isRequired, 
		lastname: PropTypes.string.isRequired, 
		middlename: PropTypes.string.isRequired, 
		birthday: PropTypes.string.isRequired,
		age: PropTypes.any.isRequired,
		gender: PropTypes.string.isRequired, 
		ward: PropTypes.string.isRequired, 
		physicianId: PropTypes.string.isRequired, 
		classType: PropTypes.string.isRequired, 
		comment: PropTypes.string.isRequired, 
		amount: PropTypes.string.isRequired, 
	}).isRequired,
	updateState: PropTypes.func.isRequired,
	location: ReactRouterPropTypes.location.isRequired
};


export default withRouter(FillupForm);
