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

class BaseForm extends React.Component { 	
	state = {
		hospitalLocationList: [],
		hospitalPhysicianList: []
	};
	
	componentDidMount() {
		this.populatePersonalInfo();
		this.populateLocation();
		this.populatePhysician();
	}

	populatePersonalInfo = () => {
		const { location } = this.props;
		const sessionFields = sessionStorage.getItem(CLR_TESTS);

		if(location.state) {
			// eslint-disable-next-line react/prop-types
			const { setFieldsValue } = this.props.form;
			const { dateOfBirth } = location.state.record;
			const formattedDOB = moment(dateOfBirth, 'MM-DD-YYYY');
			const age = this.computeAge(formattedDOB);

			setFieldsValue({ 
				...location.state.record, 
				age,
				dateOfBirth: formattedDOB
			});
		}

		else if(sessionFields) {
			// eslint-disable-next-line react/prop-types
			const { setFieldsValue } = this.props.form;
			const sessFields = JSON.parse(sessionFields); 
			sessFields.dateOfBirth = moment(sessFields.dateOfBirth, 'MM-DD-YYYY');
			setFieldsValue(sessFields);
		}
	}

	populateLocation = async () => {
		const hospitalLocAPI = await hospitalLocationAPI;
		
		this.setState({ 
			hospitalLocationList : hospitalLocAPI.data
		})
	}

	populatePhysician = async () => {
		const hospitalPhyAPI = await hospitalPhysiciansAPI;

		this.setState({ 
			hospitalPhysicianList : hospitalPhyAPI.data
		})
	}

	computeAge = (date) => {
		const years = Math.floor(moment().diff(date, 'years', true));
		const age = years > 0 ? years : '-----';
	
		return age;
	}

	onDateChange = (date) => {
		// eslint-disable-next-line react/prop-types
		const { setFieldsValue } = this.props.form;
		const age = this.computeAge(date);

		setFieldsValue({ age });
	}

	onSubmit = (event) => {
		event.preventDefault();

		const { handleSubmit } = this.props;
		// eslint-disable-next-line react/prop-types
		const { getFieldsValue, validateFields } = this.props.form;

		validateFields((err) => {
			if (!err) {
				const fields = getFieldsValue();
				handleSubmit(fields);
			}
		});
	}

	render() {
		// eslint-disable-next-line react/prop-types
		const { getFieldDecorator } = this.props.form;
		const { hospitalPhysicianList, hospitalLocationList } = this.state;

		const LocationList = hospitalLocationList.map((item) => (
			<Option value={item.locationID} key={item.locationID}>
				{item.name}
			</Option>
		));

		const PhysicianList = hospitalPhysicianList.map((item) => (
			<Option value={item.physicianID} key={item.physicianID}>
				{`${item.givenName} ${item.lastName}`}
			</Option>
		));

		return (
			<div style={{ marginTop: 50 }}>
				<Form className="fillup-form" onSubmit={this.onSubmit}>
					<Row gutter={12}>
						<Col sm={12} md={11}>
							<div className="left-form">
								<div style={{ padding: '10px 0px' }}>
									<Text strong>PERSONAL INFORMATION</Text>
								</div>
								<Row gutter={12}>
									<Col span={12}>
										<Form.Item label="HOSPITAL ID">
											{getFieldDecorator('hospitalID', { rules: FIELD_RULES.hospitalID })(
												<Input />
											)}
										</Form.Item>
									</Col>
									<Col span={12}>
										<Form.Item label="PATIENT ID">
											{getFieldDecorator('patientID', { rules: FIELD_RULES.givenName })(
												<Input disabled />
											)}
										</Form.Item>
									</Col>
								</Row>
								<Form.Item label="EMAIL">
									{getFieldDecorator('emailAdd', { rules: FIELD_RULES.email })(
										<Input />
									)}
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
													onChange={this.onDateChange}
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
								<Form.Item label="ADDRESS">
									{getFieldDecorator('address', { rules: FIELD_RULES.address })(
										<Input />
									)}
								</Form.Item>
								<Form.Item label="CONTACT NUMBER">
									{getFieldDecorator('contactNo', { rules: FIELD_RULES.contactNo })(
										<Input />
									)}
								</Form.Item>
								<Form.Item label="PATIENT'S GENDER">
									{getFieldDecorator('sex', { rules: FIELD_RULES.gender })(
										<Radio.Group buttonStyle="solid">
											<Radio.Button value="MALE">MALE</Radio.Button>
											<Radio.Button value="FEMALE">FEMALE</Radio.Button>
										</Radio.Group>
									)}
								</Form.Item>
							</div>
						</Col>
						<Col md={2} style={{ textAlign: 'center' }}>
							<Divider className="divider" type="vertical" style={{ height: 420 }} />
						</Col>
						<Col sm={12} md={11}>
							<div className="right-form">
								<div style={{ padding: '10px 0px' }}>
									<Text strong>OTHER INFORMATION</Text>
								</div>
								<Form.Item label="LOCATION">
									{getFieldDecorator('location', { rules: FIELD_RULES.location })(
										<Select placeholder="Select a location" allowClear>
											{LocationList}
										</Select>
									)}
								</Form.Item>
								<Form.Item label="PHYSICIAN ID">
									{getFieldDecorator('phisycianId', { rules: FIELD_RULES.phisycianId })(
										<Select placeholder="Select a physician" allowClear>
											{PhysicianList}
										</Select>
									)}
								</Form.Item>
								<Form.Item label="VISIT">
									{getFieldDecorator('visit', { rules: FIELD_RULES.age })(
										<Input />
									)}
								</Form.Item>
								<Form.Item label="CHARGE SLIP">
									{getFieldDecorator('chargeSlip', { rules: FIELD_RULES.chargeSlip })(
										<Input />
									)}
								</Form.Item>
								<Form.Item label="OFFICIAL RECEIPT">
									{getFieldDecorator('officialReceipt', { rules: FIELD_RULES.officialReceipt })(
										<Input />
									)}
								</Form.Item>
								<Form.Item label="BED">
									{getFieldDecorator('bed', { rules: FIELD_RULES.bed })(
										<Input />
									)}
								</Form.Item>
								<Form.Item label="COMMENT">
									{getFieldDecorator('comment', { rules: FIELD_RULES.comment })(
										<TextArea rows={3} />
									)}
								</Form.Item>
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

BaseForm.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	location: ReactRouterPropTypes.location.isRequired
};

const FillupForm = Form.create()(withRouter(BaseForm));


export default FillupForm;
