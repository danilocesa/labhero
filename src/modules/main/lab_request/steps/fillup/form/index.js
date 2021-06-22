/* eslint-disable react/prop-types */
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';
import { Form, Input, Row, Col, Typography, DatePicker, Radio, Divider, Select } from 'antd';

// CUSTOM MODULES
import hospitalLocationAPI from 'services/lab_request/hospitalLocation';
import hospitalPhysiciansAPI from 'services/lab_request/hospitalPhysicians';
import ProvinceList from 'shared_components/lh_province';
import CityList from 'shared_components/lh_city';
import TownList from 'shared_components/lh_town';
import HouseAddress from 'shared_components/lh_address';
import { AlphaNumInput, NumberInput, RegexInput } from 'shared_components/pattern_input';
import { LR_PERSONAL_INFO, LR_OTHER_INFO } from 'modules/main/lab_request/steps/constants';
import { FIELD_RULES, selectDefaultOptions, formLabels } from './constant';

import FormButtons from './form_buttons';

// CSS
import './form.css';

// CONSTANTS
const { Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

class BaseForm extends React.Component { 	
	constructor(props) {
		super(props);

		this.state = {
			hospitalLocationList: [],
			hospitalPhysicianList: [],
			isDisabledPersoFields: false,
			address: {}
		};
		this.formRef = React.createRef();
	}

	componentDidMount() {
		this.populateLocation();
		this.populatePhysician();
		this.populateFields();
	}

	populateFields = () => {
		const { location } = this.props;
		const sessPersoInfo = sessionStorage.getItem(LR_PERSONAL_INFO);
		const sessOtherInfo = sessionStorage.getItem(LR_OTHER_INFO);

		// If user came from step 1 
		if(location.state) {
			const { 
				dateOfBirth, 
				patientID, 
				provinceCode, 
				cityMunicipalityCode, 
				townCode, 
				address, 
				requestHeader 
			} = location.state.record;
			const formattedDOB = moment(dateOfBirth, 'MM-DD-YYYY');
			const patientAge = this.computeAge(formattedDOB);
			
			this.setState({
				address: {
					provinceCode,
					cityMunicipalityCode,
					townCode,
					houseAddress: address
				},
				isDisabledPersoFields: patientID !== null
			});

			// Set fields value of personal informmations
			this.formRef.current.setFieldsValue({
				...location.state.record, 
				patientAge,
				dateOfBirth: formattedDOB,
				provinces: provinceCode,
				city: cityMunicipalityCode,
				town: townCode,
				address
			});

			// Set Other Information fields value if records came from edit search module
			if(requestHeader) {
				const { locationID, physicianID, visit, chargeSlip, officialReceipt, bed, comment } = requestHeader;

				this.formRef.current.setFieldsValue({
					locationID,
					physicianID: physicianID ? physicianID : null,
					visit,
					chargeSlip,
					officialReceipt,
					bed,
					comment
				});
			}
		}
		
		// Else if user has pressed back button
		// OR
		// User is in edit module
		else if(sessPersoInfo && sessOtherInfo) {
			// eslint-disable-next-line react/prop-types
			const { setFieldsValue } = this.formRef.current;
			const personalInfo = JSON.parse(sessPersoInfo); 
			const otherInfo = JSON.parse(sessOtherInfo); 
			const { provinces, city, town, address, ...restPersoInfo } = personalInfo;

			this.setState({ 
				isDisabledPersoFields: personalInfo.patientID !== null,
				address: { 
					provinceCode: provinces, 
					cityMunicipalityCode: city, 
					townCode: town, 
					houseAddress: address 
				}
			}, () => {
				setFieldsValue({ 
					...restPersoInfo, 
					...otherInfo,
					physicianID: otherInfo.physicianID ? otherInfo.physicianID : null,
					dateOfBirth: moment(personalInfo.dateOfBirth, 'MM-DD-YYYY'),
					provinces,
					city,
					town,
					address
				});
			});
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
		const { setFieldsValue } = this.formRef.current;
		const patientAge = this.computeAge(date);

		setFieldsValue({ patientAge });
	}

	disabledDate = (current) => {
		// Prevent select days after today and today
		return current && current > moment().endOf('day');
	}

	onSubmit = () => {
		const { hospitalPhysicianList, hospitalLocationList } = this.state; 
		const { handleSubmit } = this.props;
		// eslint-disable-next-line react/prop-types
		const { getFieldsValue } = this.formRef.current;
	
		const fields = getFieldsValue();
    console.log("🚀 ~ file: index.js ~ line 181 ~ BaseForm ~ fields", fields)
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
		

		// Uppercase all fields
		Object.keys(fields).forEach(key => {
			const fieldValue = fields[key];
			fields[key] = (typeof fieldValue === 'string') ? fieldValue.toUpperCase() : fieldValue;
		});

		handleSubmit(fields);
	}

	onProvinceChange = () => {
		this.formRef.current.setFieldsValue({
			city: null,
			town: null,
			houseAddress: null 
		});
	}

	onCityChange = () => {
		this.formRef.current.setFieldsValue({
			town: null,
			houseAddress: null 
		});
	}

	render() {
		const { 
			isDisabledPersoFields, 
			hospitalPhysicianList, 
			hospitalLocationList,
			address 
		} = this.state;
		
		const { isLoading } = this.props;
		
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
				<Form 
					ref={this.formRef}
					className="clr-fillup-form" 
					layout="vertical"
					onFinish={this.onSubmit} 
				>
					<Row gutter={12}>
						<Col sm={7} md={7}>
							<div className="left-form">
								<div style={{ padding: '10px 0px' }}>
									<Text strong>PERSONAL INFORMATION</Text>
								</div>
								<Row gutter={12}>
									<Col span={12}>
										<Form.Item 
											name="hospitalID" 
											label={formLabels.hospitalID}
											rules={FIELD_RULES.hospitalID}
										>
											<AlphaNumInput 
												disabled={isDisabledPersoFields} 
												maxLength={50} 
											/>
										</Form.Item>
									</Col>
									<Col span={12}>
										<Form.Item 
											name="patientID"
											label={formLabels.patientID} 
										>
											<Input disabled />
										</Form.Item>
									</Col>
								</Row>
								<Form.Item 
									name="emailAdd"
									label={formLabels.email} 
									rules={FIELD_RULES.emailAdd}
								>
									<Input 
										disabled={isDisabledPersoFields} 
										maxLength={100} 
									/>
								</Form.Item>
								<Form.Item 
									name="givenName"
									label={formLabels.firstName} 
									rules={FIELD_RULES.givenName}
								>
									<RegexInput 
										regex={/[A-Za-z0-9-. ]/}  
										disabled={isDisabledPersoFields} 
										maxLength={50} 
									/>
								</Form.Item>
								<Form.Item 
									name="middleName" 
									label={formLabels.middleName}
									rules={FIELD_RULES.middleName}
								>
									<RegexInput 
										regex={/[A-Za-z0-9-. ]/}  
										disabled={isDisabledPersoFields} 
										maxLength={15} 
									/>
								</Form.Item>
								<Row gutter={12}>
									<Col span={18}>
										<Form.Item 
											name="lastName"
											label={formLabels.lastName} 
											rules={FIELD_RULES.lastName}
										>
											<RegexInput 
												regex={/[A-Za-z0-9-. ]/}  
												disabled={isDisabledPersoFields} 
												maxLength={50} 
											/>
										</Form.Item>
									</Col>
									<Col span={6}>
										<Form.Item 
											name="nameSuffix"
											label={formLabels.suffix} 
											rules={FIELD_RULES.suffix}
										>
											<RegexInput 
												name="nameSuffix"
												regex={/[A-z0-9 -]/} 
												disabled={isDisabledPersoFields} 
												maxLength={5} 
											/>
										</Form.Item>
									</Col>
								</Row>
								<Row gutter={12}>
									<Col span={18}>
										<Form.Item 
											name="dateOfBirth" 
											label={formLabels.dateOfBirth} 
											rules={FIELD_RULES.dateOfBirth}
										>
											<DatePicker 
												format="MM-DD-YYYY"
												disabledDate={this.disabledDate}
												style={{ width: '100%' }}
												onChange={this.onDateChange}
												disabled={isDisabledPersoFields}
											/>
										</Form.Item>
									</Col>
									<Col span={6}>
										<Form.Item 
											name="patientAge" 
											label={formLabels.age}
											rules={FIELD_RULES.age}
										>
											<Input 
												disabled 
												style={{ textAlign: 'center' }} 
											/>
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
									<Col span={24}>
										<ProvinceList 
											form={this.formRef}
											// form={form}
											placeholder={selectDefaultOptions}
											selectedProvince={address.provinceCode}
											disabled={isDisabledPersoFields}
											onChange={this.onProvinceChange}
										/>
									</Col>
								</Row>
								<Row>
									<Col span={24}>
										<Form.Item shouldUpdate>
											{(form) => {
												return (
													<CityList 
														form={form}
														placeholder={selectDefaultOptions}
														provinceValue={form.getFieldValue('provinces')}
														selectedCity={address.cityMunicipalityCode}
														disabled={isDisabledPersoFields}
														onChange={this.onCityChange}
													/>
												);
											}}
										</Form.Item>
									</Col>
								</Row>
								<Row>
									<Col span={24}>
										<Form.Item shouldUpdate>
											{(form) => {
												return (
													<TownList 
														placeholder={selectDefaultOptions}
														cityValue={form.getFieldValue('city')}
														disabled={isDisabledPersoFields}
													/>
												);
											}}
										</Form.Item>
									</Col>
								</Row>						
								<Row>
									<Col span={24}>
										<Form.Item shouldUpdate>
											{(form) => {
												return (
													<HouseAddress 
														form={form}
														townValue={form.getFieldValue('town')}
														fieldLabel={formLabels.unitNo.label}
														fieldName={formLabels.unitNo.fieldName}
														selectedValue={address.houseAddress}
														disabled={isDisabledPersoFields}
													/>
												)
											}}
										</Form.Item>
									</Col>
								</Row>
								<Form.Item 
									name="contactNumber"
									label={formLabels.contactNumber}
									rules={FIELD_RULES.contactNumber}
								>
									<NumberInput 
										addonBefore="+ 63" 
										maxLength={10} 
										disabled={isDisabledPersoFields}
									/>
								</Form.Item>
								<Form.Item 
									name="sex"
									label={formLabels.patientGender}
									rules={FIELD_RULES.gender}
								>
									<Radio.Group 
										buttonStyle="solid" 
										disabled={isDisabledPersoFields}
									>
										<Radio.Button value="MALE" className="gender-radio-btn">
											MALE
										</Radio.Button>
										<Radio.Button value="FEMALE" className="gender-radio-btn">
											FEMALE
										</Radio.Button>
									</Radio.Group>
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
								<Form.Item 
									name="locationID"
									label={formLabels.location}
									rules={FIELD_RULES.location}
								>
									<Select 
										placeholder="Select a location" 
										allowClear
									>
										{LocationList}
									</Select>
								</Form.Item>
								<Form.Item 
									name="physicianID" 
									label={formLabels.physicianID}
									rules={FIELD_RULES.physicianId}
								>
									<Select 
										placeholder="Select a physician" 
										allowClear
									>
										{PhysicianList}
									</Select>
								</Form.Item>
								<Form.Item 
									name="visit" 
									label={formLabels.visit}
									rules={FIELD_RULES.visit}
								>
									<Input maxLength={100} />
								</Form.Item>
								<Form.Item 
									name="chargeSlip" 
									label={formLabels.chargeSlip}
									rules={FIELD_RULES.chargeSlip}
								>
									<Input maxLength={100} />
								</Form.Item>
								<Form.Item 
									name="officialReceipt" 
									label={formLabels.officialReceipt}
									rules={FIELD_RULES.officialReceipt}
								>
									<Input maxLength={100} />
								</Form.Item>
								<Form.Item 
									name="bed" 
									label={formLabels.bed}
									rules={FIELD_RULES.bed}
								>
									<Input maxLength={100} />
								</Form.Item>
								<Form.Item 
									name="comment"
									label={formLabels.comment}
									rules={FIELD_RULES.comment}
								>
									<TextArea rows={3} maxLength={254} />
								</Form.Item>
							</div>
						</Col>
					</Row>
					<FormButtons isLoading={isLoading} />
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


export default withRouter(BaseForm);