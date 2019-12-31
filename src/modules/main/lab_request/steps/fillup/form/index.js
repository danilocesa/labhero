import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';
import { Form, Input, Row, Col, Typography, DatePicker, Radio, Divider, Select } from 'antd';

// CUSTOM MODULES
import hospitalLocationAPI from 'services/lab_request/hospitalLocation';
import hospitalPhysiciansAPI from 'services/lab_request/hospitalPhysicians';
import ProvinceList from 'shared_components/province_list';
import CityList from 'shared_components/city_list';
import TownList from 'shared_components/town_list';
import HouseAddress from 'shared_components/address';
import { CLR_PERSONAL_INFO, CLR_OTHER_INFO } from '../../constants';
import { FIELD_RULES, selectDefaultOptions, formLabels } from './constant';

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
		hospitalPhysicianList: [],
		isDisabledPersoFields: false,
		initialPersoValue: {}
	};

	componentDidMount() {
		this.populateLocation();
		this.populatePhysician();
		this.populatePersonalInfo();
		// setTimeout(() => this.populatePersonalInfo(), 3000);
	}

	populatePersonalInfo = () => {
		const { location } = this.props;
		const sessPersoInfo = sessionStorage.getItem(CLR_PERSONAL_INFO);
		const sessOtherInfo = sessionStorage.getItem(CLR_OTHER_INFO);

		// If user came from step 1 
		if(location.state) {
			const { dateOfBirth, patientID } = location.state.record;
			const formattedDOB = moment(dateOfBirth, 'MM-DD-YYYY');
			const patientAge = this.computeAge(formattedDOB);

			this.setState({
				initialPersoValue: { 
					...location.state.record, 
					patientAge,
					dateOfBirth: formattedDOB
				},
				isDisabledPersoFields: patientID !== null
			});

		}
		
		// Else if user has pressed back button
		else if(sessPersoInfo && sessOtherInfo) {
			// eslint-disable-next-line react/prop-types
			const { setFieldsValue } = this.props.form;
			const personalInfo = JSON.parse(sessPersoInfo); 
			const otherInfo = JSON.parse(sessOtherInfo); 

			personalInfo.dateOfBirth = moment(personalInfo.dateOfBirth, 'MM-DD-YYYY');
			setFieldsValue({ ...personalInfo, ...otherInfo });
			this.setState({ isDisabledPersoFields: personalInfo.patientID !== null });
		}
	}

	populateLocation = async () => {
		const hospitalLocAPI = await hospitalLocationAPI();
		
		this.setState({ 
			hospitalLocationList : hospitalLocAPI
		});
	}

	populatePhysician = async () => {
		const hospitalPhyAPI = await hospitalPhysiciansAPI();

		this.setState({ 
			hospitalPhysicianList : hospitalPhyAPI
		});
	}

	computeAge = (date) => {
		const years = Math.floor(moment().diff(date, 'years', true));
		const age = years > 0 ? years : '---';
	
		return age;
	}

	onDateChange = (date) => {
		// eslint-disable-next-line react/prop-types
		const { setFieldsValue } = this.props.form;
		const patientAge = this.computeAge(date);

		setFieldsValue({ patientAge });
	}

	onSubmit = (event) => {
		event.preventDefault();

		const { hospitalPhysicianList, hospitalLocationList } = this.state; 
		const { handleSubmit } = this.props;
		// eslint-disable-next-line react/prop-types
		const { getFieldsValue, validateFieldsAndScroll } = this.props.form;

		validateFieldsAndScroll((err) => {
			if (!err) {
				const fields = getFieldsValue();

				const physician = hospitalPhysicianList.find(item => item.physicianID === fields.physicianID);
				const location = hospitalLocationList.find(item => item.locationID === fields.locationID);

				fields.dateOfBirth = moment(fields.dateOfBirth).format('MM-DD-YYYY');
				fields.locationName = location.name;

				if(physician) {
					fields.physicianName = `${physician.namePrefix} `;
					fields.physicianName +=	`${physician.givenName} `; 
					fields.physicianName +=	`${physician.middleName}. `;
					fields.physicianName +=	`${physician.lastName}`;
				}
				
				handleSubmit(fields);
			}
		});
	}

	render() {
		const { isDisabledPersoFields, initialPersoValue, hospitalPhysicianList, hospitalLocationList } = this.state;
		const { isLoading, form } = this.props;
		// eslint-disable-next-line react/prop-types
		const { getFieldDecorator, getFieldsValue } = this.props.form;

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

		const dummyVal = '';

		return (
			<div style={{ marginTop: 50 }}>
				<Form className="clr-fillup-form" onSubmit={this.onSubmit}>
					<Row gutter={12}>
						<Col sm={7} md={7}>
							<div className="left-form">
								<div style={{ padding: '10px 0px' }}>
									<Text strong>PERSONAL INFORMATION</Text>
								</div>
								<Row gutter={12}>
									<Col span={12}>
										<Form.Item label={formLabels.hospitalID}>
											{getFieldDecorator('hospitalID', { 
												rules: FIELD_RULES.hospitalID,
												initialValue: initialPersoValue.hospitalID
											})(
												<Input disabled={isDisabledPersoFields} />
											)}
										</Form.Item>
									</Col>
									<Col span={12}>
										<Form.Item label={formLabels.patientID}>
											{getFieldDecorator('patientID', {
												initialValue: initialPersoValue.patientID
											})(
												<Input disabled />
											)}
										</Form.Item>
									</Col>
								</Row>
								<Form.Item label={formLabels.email}>
									{getFieldDecorator('emailAdd', { 
										rules: FIELD_RULES.emailAdd,
										initialValue: initialPersoValue.emailAdd
									})(
										<Input disabled={isDisabledPersoFields} />
									)}
								</Form.Item>
								<Form.Item label={formLabels.firstName}>
									{getFieldDecorator('givenName', { 
										rules: FIELD_RULES.givenName, 
										initialValue: initialPersoValue.givenName
									})(
										<Input disabled={isDisabledPersoFields} />
									)}
								</Form.Item>
								<Form.Item label={formLabels.middleName}>
									{getFieldDecorator('middleName', { 
										rules: FIELD_RULES.middleName,
										initialValue: initialPersoValue.middleName
									})(
										<Input disabled={isDisabledPersoFields} />
									)}
								</Form.Item>
								<Row gutter={12}>
									<Col span={18}>
										<Form.Item label={formLabels.lastName}>
											{getFieldDecorator('lastName', { 
												rules: FIELD_RULES.lastName,
												initialValue: initialPersoValue.lastName 
											})(
												<Input disabled={isDisabledPersoFields} />
											)}
										</Form.Item>
									</Col>
									<Col span={6}>
										<Form.Item label={formLabels.suffix}>
											{getFieldDecorator('nameSuffix', { 
												rules: FIELD_RULES.suffix, 
												initialValue: initialPersoValue.suffix
											})(
												<Input maxLength={1} disabled={isDisabledPersoFields} />
											)}
										</Form.Item>
									</Col>
								</Row>
								<Row gutter={12}>
									<Col span={18}>
										<Form.Item label={formLabels.dateOfBirth}>
											{getFieldDecorator('dateOfBirth', { 
												rules: FIELD_RULES.dateOfBirth,
												initialValue: initialPersoValue.dateOfBirth
											})(
												<DatePicker 
													format="MM-DD-YYYY"
													style={{ width: '100%' }}
													onChange={this.onDateChange}
													disabled={isDisabledPersoFields}
												/>
											)}
										</Form.Item>
									</Col>
									<Col span={6}>
										<Form.Item label={formLabels.age}>
											{getFieldDecorator('patientAge', { 
												rules: FIELD_RULES.age,
												initialValue: initialPersoValue.patientAge
											})(
												<Input disabled style={{ textAlign: 'center' }} />
											)}
										</Form.Item>
									</Col>
								</Row>
								
							</div>
						</Col>
						<Col md={1} style={{ textAlign: 'center' }}>
							<Divider className="divider" type="vertical" style={{ height: 650 }} />
						</Col>
						<Col sm={7} md={7}>
							<div className="center-form">
								<div style={{ padding: '10px 0px' }}>
									<Text strong>LOCATION AND GENDER</Text>
								</div>
								<Row>
									<Col>
										<ProvinceList 
											form={form}
											selectDefaultOptions={selectDefaultOptions}
											selectedProvince={dummyVal}
										/>
									</Col>
								</Row>
								<Row>
									<Col>
										<CityList 
											form={form}
											selectDefaultOptions={selectDefaultOptions}
											selectedCity={dummyVal}
											provinceValue={getFieldsValue().provinces}
										/>
									</Col>
								</Row>
								<Row>
									<Col>
										<TownList 
											form={form}
											selectDefaultOptions={selectDefaultOptions}
											selectedTown={dummyVal}
											cityValue={getFieldsValue().city}
										/>
									</Col>
								</Row>						
								<Row>
									<Col>
										<HouseAddress 
											form={form}
											townValue={getFieldsValue().town}
											fieldLabel={formLabels.unitFloorBldg}
											selectedValue={initialPersoValue.address}
										/>
									</Col>
								</Row>
								<Form.Item label={formLabels.contactNumber}>
									{getFieldDecorator('contactNumber', { 
										rules: FIELD_RULES.contactNumber,
										initialValue: initialPersoValue.contactNumber
									})(
										<Input 
											addonBefore="+ 63" 
											maxLength={10} 
											disabled={isDisabledPersoFields}
										/>
									)}
								</Form.Item>
								<Form.Item label={formLabels.patientGender}>
									{getFieldDecorator('sex', { 
										rules: FIELD_RULES.gender, 
										initialValue: initialPersoValue.sex
									})(
										<Radio.Group buttonStyle="solid" disabled={isDisabledPersoFields}>
											<Radio.Button value="MALE">MALE</Radio.Button>
											<Radio.Button value="FEMALE">FEMALE</Radio.Button>
										</Radio.Group>
									)}
								</Form.Item>
							</div>
						</Col>
						<Col md={1} style={{ textAlign: 'center' }}>
							<Divider className="divider" type="vertical" style={{ height: 650 }} />
						</Col>
						<Col sm={7} md={7}>
							<div className="right-form">
								<div style={{ padding: '10px 0px' }}>
									<Text strong>OTHER INFORMATION</Text>
								</div>
								<Form.Item label={formLabels.location}>
									{getFieldDecorator('locationID', { rules: FIELD_RULES.location })(
										<Select placeholder="Select a location" allowClear>
											{LocationList}
										</Select>
									)}
								</Form.Item>
								<Form.Item label={formLabels.physicianID}>
									{getFieldDecorator('physicianID', { rules: FIELD_RULES.physicianId })(
										<Select 
											placeholder="Select a physician" 
											allowClear
										>
											{PhysicianList}
										</Select>
									)}
								</Form.Item>
								<Form.Item label={formLabels.visit}>
									{getFieldDecorator('visit', { rules: FIELD_RULES.visit })(
										<Input />
									)}
								</Form.Item>
								<Form.Item label={formLabels.chargeSlip}>
									{getFieldDecorator('chargeSlip', { rules: FIELD_RULES.chargeSlip })(
										<Input />
									)}
								</Form.Item>
								<Form.Item label={formLabels.officialReceipt}>
									{getFieldDecorator('officialReceipt', { rules: FIELD_RULES.officialReceipt })(
										<Input />
									)}
								</Form.Item>
								<Form.Item label={formLabels.bed}>
									{getFieldDecorator('bed', { rules: FIELD_RULES.bed })(
										<Input />
									)}
								</Form.Item>
								<Form.Item label={formLabels.comment}>
									{getFieldDecorator('comment', { rules: FIELD_RULES.comment })(
										<TextArea rows={3} />
									)}
								</Form.Item>
							</div>
						</Col>
					</Row>
					<Row>
						<FormButtons isLoading={isLoading} />
					</Row>
				</Form>
			</div>
		);
	}
}

BaseForm.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	location: ReactRouterPropTypes.location.isRequired,
	isLoading: PropTypes.bool.isRequired
};

const FillupForm = Form.create()(withRouter(BaseForm));

export default FillupForm;
