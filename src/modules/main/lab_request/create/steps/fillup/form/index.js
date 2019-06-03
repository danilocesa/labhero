import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';
import { Form, Input, Row, Col, Typography, DatePicker, Radio, Divider, Select } from 'antd';

// CUSTOM MODULES
import hospitalLocationAPI from 'services/hospitalLocation';
import hospitalPhysiciansAPI from 'services/hospitalPhysicians';
import { CLR_TESTS } from '../../constants';
import FIELD_RULES from './constant';

import FormButtons from './form_buttons';

// CSS
import './form.css';

// CONSTANTS
const { Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

class FillupForm extends React.Component { 
	state = {
		hospitalLocationList : [],
		hospitalPhysicianList : []
	}

<<<<<<< HEAD
const computeAge = (date) => {
	// const formattedDate = moment(date, 'MM-DD-YYYY');
	const years = Math.floor(moment().diff(date, 'years', true));
	const age = years > 0 ? years : '-----';

	return age;
}

class BaseForm extends React.Component { 	
	componentDidMount() {
		const { location, updatePersonalInfo } = this.props;
=======
	componentWillMount() {
		const { location, updateState } = this.props;
>>>>>>> c3f05084b33c286391e7218d25895d8d68c3bfef
		const sessionFields = sessionStorage.getItem(CLR_TESTS);

		if(location.state) {
			// eslint-disable-next-line react/prop-types
			const { setFieldsValue } = this.props.form;
			const { dateOfBirth } = location.state.record;
			const formattedDOB = moment(dateOfBirth, 'MM-DD-YYYY');
			const age = computeAge(formattedDOB);
			
			// updatePersonalInfo({ ...location.state.record, age });

			console.log({...location.state.record});
			setFieldsValue({ 
				// ...location.state.record, 
				// age,
				address: null,
				addressID: 0,
				contactNumber: null,
				dateCreated: null,
				emailAdd: null,
				givenName: "Dante",
				hospitalID: null,
				lastName: "Gulapa",
				middleName: "J",
				// nameSuffix: "",
				// patientID: "1904160002",
				// sex: "MALE",
				dateOfBirth: formattedDOB
			});
		}

		else if(sessionFields) {
			// eslint-disable-next-line react/prop-types
			// const { setFieldsValue } = this.props.form;
			// updatePersonalInfo({ ...JSON.parse(sessionFields) });
			// setFieldsValue({ ...JSON.parse(sessionFields) });
		}

	}

	async componentDidMount() {
		const hospitalLocAPI = await hospitalLocationAPI;
		const hospitalPhyAPI = await hospitalPhysiciansAPI;
		
		this.setState({ 
			hospitalLocationList : hospitalLocAPI.data,
			hospitalPhysicianList : hospitalPhyAPI.data
		})
		console.log( this.state.hospitalLocationList);
	}

	onInputChange = (event) => {
		const { updatePersonalInfo } = this.props;

		updatePersonalInfo({
			[event.target.name]: event.target.value
		});
	}



	handleSubmit = (event) => {
		event.preventDefault();

		const { goToNextPage } = this.props;
		// eslint-disable-next-line react/prop-types
		const { getFieldsValue, validateFields } = this.props.form;

		validateFields((err) => {
			if (!err) {
				goToNextPage(getFieldsValue());
			}
		});
	}

	render() {
<<<<<<< HEAD
		// eslint-disable-next-line react/prop-types
		const { getFieldDecorator } = this.props.form;
		const { sex } = this.props.personalInfo;
=======
		const { fields } = this.props;
		const { 
			hospitalID, 
			patientID,
			givenName, 
			nameSuffix,
			lastName, 
			middleName, 
			dateOfBirth, 
			age, 
			sex, 
			contactNo,
			emailAddress,
			address,
			visit,
			chargeSlip,
			officialReceipt,
			bed,
			comment
		} = fields;

		const dob = dateOfBirth ? moment(dateOfBirth, 'MM-DD-YYYY') : null;
>>>>>>> c3f05084b33c286391e7218d25895d8d68c3bfef

		const LocationList = (
			this.state.hospitalLocationList.map((item) => (
					<Option value={item.locationID} key={item.locationID}>{item.name}</Option>
			))
		);

		const PhysicianList = (
			this.state.hospitalPhysicianList.map((item) => (
					<Option value={item.physicianID} key={item.physicianID}>{`${item.givenName} ${item.lastName}`}</Option>
			))
		);

		return (
			<div style={{ marginTop: 50 }}>
				<Form className="fillup-form" onSubmit={this.handleSubmit}>
					
					<Row gutter={12}>
						<Col sm={12} md={11}>
							<div className="left-form">
								<div style={{ padding: '10px 0px' }}>
									<Text strong>PERSONAL INFORMATION</Text>
								</div>
<<<<<<< HEAD
								<Form.Item 
									label="CASE NO." 
									hasFeedback 
								>
									{getFieldDecorator('caseNumber', { rules: FIELD_RULES.caseNumber })(
										<Input placeholder="case no" />
									)}
=======
								<Form.Item label="HOSPITAL ID">
									<Input 
										name="hospitalID" 
										onChange={this.onInputChange} 
										value={hospitalID}
									/>
								</Form.Item>
								<Form.Item label="PATIENT ID">
									<Input 
										name="patientID" 
										disabled
										onChange={this.onInputChange} 
										value={patientID}
									/>
>>>>>>> c3f05084b33c286391e7218d25895d8d68c3bfef
								</Form.Item>
								<Form.Item label="FIRST NAME">
									{getFieldDecorator('givenName', { rules: FIELD_RULES.givenName })(
										<Input />
									)}
								</Form.Item>
								<Form.Item label="MIDDLE NAME">
									{getFieldDecorator('middleName', { rules: FIELD_RULES.middleName })(
										<Input />
									)}
								</Form.Item>
								<Row gutter={12}>
									<Col span={18}>
										<Form.Item label="LAST NAME">
											{getFieldDecorator('lastName', { rules: FIELD_RULES.lastName })(
												<Input />
											)}
										</Form.Item>
									</Col>
									<Col span={6}>
										<Form.Item label="SUFFIX">
											{getFieldDecorator('nameSuffix', { rules: FIELD_RULES.suffix })(
												<Input />
											)}
										</Form.Item>
									</Col>
								</Row>
								<Row gutter={12}>
									<Col span={18}>
										<Form.Item label="DATE OF BIRTH">
											{getFieldDecorator('dateOfBirth', { 
												rules: FIELD_RULES.caseNumber
											})(
												<DatePicker 
													format="MM-DD-YYYY"
													style={{ width: '100%' }}
												/>
											)}
										</Form.Item>
									</Col>
									<Col span={6}>
										<Form.Item label="AGE">
											{getFieldDecorator('age', { 
												rules: FIELD_RULES.age
											})(
												<Input disabled style={{ textAlign: 'center' }} />
											)}
										</Form.Item>
									</Col>
								</Row>
<<<<<<< HEAD
								<Form.Item label="PATIENT'S GENDER">
									{getFieldDecorator('sex', { 
										rules: FIELD_RULES.gender,
										initialValue: sex 
									})(
										<Radio.Group 
											buttonStyle="solid"
											onChange={this.onInputChange} 
=======
								<Row>
									<Form.Item label="PATIENT'S GENDER">
										<Radio.Group 
											defaultValue={sex} 
											buttonStyle="solid"
											name="sex" 
											onChange={this.onInputChange} 
											value={sex}
>>>>>>> c3f05084b33c286391e7218d25895d8d68c3bfef
										>
											<Radio.Button value="MALE">MALE</Radio.Button>
											<Radio.Button value="FEMALE">FEMALE</Radio.Button>
										</Radio.Group>
<<<<<<< HEAD
									)}
								</Form.Item>
							</div>
						</Col>
						<Col md={2} style={{ textAlign: 'center' }}>
							<Divider className="divider" type="vertical" style={{ height: 420 }} />
=======
									</Form.Item>
								</Row>
								<Row>
									<Form.Item label="CONTACT NO.">
										<Input 
											name="contactNo" 
											onChange={this.onInputChange} 
											value={contactNo}
										/>
									</Form.Item>
								</Row>
								<Row>
									<Form.Item label="EMAIL ADDRESS">
										<Input 
											name="emailAddress" 
											onChange={this.onInputChange} 
											value={emailAddress}
										/>
									</Form.Item>
								</Row>
								<Row>
									<Form.Item label="ADDRESS">
										<Input 
											name="address" 
											onChange={this.onInputChange} 
											value={address}
										/>
									</Form.Item>
								</Row>
							</div>
						</Col>
						<Col md={{ span: 2 }} style={{ textAlign: 'center' }}>
							<Divider className="divider" type="vertical" style={{ height: 620 }} />
>>>>>>> c3f05084b33c286391e7218d25895d8d68c3bfef
						</Col>
						<Col sm={12} md={11}>
							<div className="right-form">
								<div style={{ padding: '10px 0px' }}>
									<Text strong>OTHER INFORMATION</Text>
								</div>
<<<<<<< HEAD
								<Form.Item label="WARD">
									{getFieldDecorator('ward', { rules: FIELD_RULES.ward })(
										<Input />
									)}
								</Form.Item>
								<Form.Item label="PHYSICIAN ID">
									{getFieldDecorator('physicianId', { rules: FIELD_RULES.physicianId })(
										<Input />
									)}
								</Form.Item>
								<Form.Item label="CLASS">
									{getFieldDecorator('classType', { rules: FIELD_RULES.class })(
										<Input />
									)}
=======
								<Form.Item label="LOCATION">
									<Select placeholder="Select a location" allowClear>
										{LocationList}
									</Select>
								</Form.Item>
								<Form.Item label="PHYSICIAN ID">
									<Select placeholder="Select a physician" allowClear>
										{PhysicianList}
									</Select>
								</Form.Item>
								<Form.Item label="VISIT">
									<Input 
										name="visit" 
										onChange={this.onInputChange} 
										value={visit}
									/>
								</Form.Item>
								<Form.Item label="CHARGE SLIP">
									<Input 
										name="chargeSlip" 
										onChange={this.onInputChange} 
										value={chargeSlip}
									/>
								</Form.Item>
								<Form.Item label="OFFICIAL RECEIPT">
									<Input 
										name="officialReceipt" 
										onChange={this.onInputChange} 
										value={officialReceipt}
									/>
								</Form.Item>
								<Form.Item label="BED">
									<Input 
										name="bed" 
										onChange={this.onInputChange} 
										value={bed}
									/>
>>>>>>> c3f05084b33c286391e7218d25895d8d68c3bfef
								</Form.Item>
								<Form.Item label="COMMENT">
									{getFieldDecorator('comment', { rules: FIELD_RULES.comment })(
										<TextArea rows={3} />
									)}
								</Form.Item>
<<<<<<< HEAD
								<Row>
									<Col span={8}>
										<Form.Item label="AMOUNT">
											{getFieldDecorator('amount', { rules: FIELD_RULES.amount })(
												<Input size="large" style={{ textAlign: 'center' }} />
											)}
										</Form.Item>
									</Col> 
								</Row>
=======
>>>>>>> c3f05084b33c286391e7218d25895d8d68c3bfef
							</div>
						</Col>
					</Row>
					<Row>
						<FormButtons />
					</Row>
				</Form>
			</div>
		);
	}
}

<<<<<<< HEAD
BaseForm.propTypes = {
	updatePersonalInfo: PropTypes.func.isRequired,
	goToNextPage: PropTypes.func.isRequired,
=======
FillupForm.propTypes = {
	fields: PropTypes.shape({
		// hospitalID: PropTypes.string.isRequired, 
		// patientID: PropTypes.string.isRequired,
		givenName: PropTypes.string.isRequired, 
		lastName: PropTypes.string.isRequired, 
		nameSuffix: PropTypes.string.isRequired,
		middleName: PropTypes.string.isRequired, 
		dateOfBirth: PropTypes.any.isRequired,
		age: PropTypes.any.isRequired,
		sex: PropTypes.string.isRequired, 
		// contactNo: PropTypes.string.isRequired,
		// emailAddress: PropTypes.string.isRequired,
		// address: PropTypes.string.isRequired,
		// location: PropTypes.string.isRequired, 
		physicianId: PropTypes.string.isRequired, 
		// visit: PropTypes.string.isRequired,
		// chargeSlip: PropTypes.string.isRequired,
		// officialReceipt: PropTypes.string.isRequired,
		// bed: PropTypes.string.isRequired,
		comment: PropTypes.string.isRequired, 
	}).isRequired,
	updateState: PropTypes.func.isRequired,
>>>>>>> c3f05084b33c286391e7218d25895d8d68c3bfef
	location: ReactRouterPropTypes.location.isRequired
};

const FillupForm = Form.create()(withRouter(BaseForm));

// {
// 	name: 'FillupForm',
// 	// update state in parent component when field's value has changed
// 	onFieldsChange(props, changedFields) {
// 			// @ts-ignore
// 			const dobField = changedFields.dateOfBirth;
		
// 			if(dobField) {
// 				const age = computeAge(dobField.value);
// 				props.updatePersonalInfo({ 
// 					// dobField.value is a Moment object from datepicker component
// 					dateOfBirth: dobField.value.format('MM-DD-YYYY'),
// 					age 
// 				});
// 			}
// 			else {
// 				props.onFieldChange(changedFields);
// 				props.handleFormChange(changedFields);
// 			}
// 	},
// 	// bind value from parent component to form fields
// 	mapPropsToFields(props) {
// 		return {
// 			caseNumber: Form.createFormField({ ...props.caseNumber }),
// 			givenName: Form.createFormField({ ...props.givenName }),
// 			lastName: Form.createFormField({ ...props.lastName }),
// 			nameSuffix: Form.createFormField({ ...props.nameSuffix }),
// 			middleName: Form.createFormField({ ...props.middleName }),
// 			dateOfBirth: Form.createFormField({ 
// 				value: props.dateOfBirth ? moment(props.dateOfBirth.value, 'MM-DD-YYYY') : null
// 			}),
// 			age: Form.createFormField({ ...props.age }),
// 			sex: Form.createFormField({ ...props.sex }),
		
// 			ward: Form.createFormField({ ...props.ward }),
// 			physicianId: Form.createFormField({ ...props.physicianId }),
// 			classType: Form.createFormField({ ...props.classType }),
// 			comment: Form.createFormField({ ...props.comment }),
// 			amount: Form.createFormField({ ...props.amount })
// 		}
// 	}
// }

export default FillupForm;
