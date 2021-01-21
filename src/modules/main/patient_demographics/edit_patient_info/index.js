/* eslint-disable no-restricted-syntax */
/* eslint-disable func-names */
/* eslint-disable array-callback-return */
// @ts-nocheck
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Form, Input, DatePicker, Row, Col, Radio, Button, message } from 'antd';

// CUSTOM MODULES
import HttpCodeMessage from 'shared_components/message_http_status';
import ProvinceList from 'shared_components/lh_province';
import CityList from 'shared_components/lh_city';
import TownList from 'shared_components/lh_town';
import HouseAddress from 'shared_components/lh_address';
import { RegexInput, NumberInput } from 'shared_components/pattern_input';
import updatePatientAPI from 'services/shared/patient';
import {
	successMessages, 
	formLabels, 
	genderOptions, 
	drawerCancelButton, 
	drawerSubmitButton,
	selectDefaultOptions, 
	fieldRules, 
	errorMessages
} from '../settings';

// CSS
import './editprofile.css'; 

// OTHER FILES
// eslint-disable-next-line camelcase
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const dateFormat = 'MM/DD/YYYY';

class EditProfile extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			patientAddress: {},
			isLoading: false
		};
		this.formRef = React.createRef();
	}

	searchAddress = (input,treenode) => {
		const searchText = treenode.props.title.search(input.toUpperCase())
		if(searchText < 0){
			return false; 
		}
		return true;
	}

	onProvinceChange = () => {
		this.formRef.current.setFieldsValue({
			city: null,
			town: null,
			address: null 
		});
	}

	onCityChange = () => {
		this.formRef.current.setFieldsValue({
			town: null,
			address: null 
		});
	}

	onChangePatientInfo = (event) => {
		this.setState({[event.target.name]: event.target.value})
	} 
	
	onSubmit = () => {
		const fields = this.formRef.current.getFieldsValue();
		fields.dateOfBirth = moment(fields.dateOfBirth).format('MM-DD-YYYY');

		this.submitUpdatePatient(fields);
	}

	submitUpdatePatient = async (fields) => {
		const loggedUserData = JSON.parse(sessionStorage.getItem('LOGGEDIN_USER_DATA'));
		const payload = {
			patientID: this.props.patientInfo.patientID,
			userID: loggedUserData.userID,
			lastName: fields.lastName.toString().toUpperCase(),
			givenName: fields.givenName.toString().toUpperCase(),
			middleName: fields.middleName.toString().toUpperCase(),
			sex: fields.sex.toString().toUpperCase(),
			dateOfBirth: fields.dateOfBirth,
			addressCode: fields.town,
			address: fields.address,
			emailAdd: fields.emailAdd,
			contactNumber : fields.contactNumber
		};

		this.setState({ isLoading: true });
		const response = await updatePatientAPI(payload);
		this.setState({ isLoading: false });

		if(response.status === 200){
			message.success(successMessages.update);
			window.location.reload();
		} else {
			HttpCodeMessage({status:500});
		}
	}

	houseUnitfieldRules = (provinceCode) => {
		if(provinceCode){
			return [{ required: true, message: errorMessages.requiredField }];
		}
		return [{ required: false, message: errorMessages.requiredField }];
	}

	render() {
		const { patientInfo } = this.props;
		const { patientAddress, isLoading } = this.state;
		const { dateOfBirth: dob, sex } = patientInfo;
		const { provinceCode, cityMunicipalityCode, houseAddress } = patientAddress;

		return(
			<div>
				<Form 
					ref={this.formRef}
					onFinish={this.onSubmit}
					initialValues={{
						...patientInfo,
						dateOfBirth: dob ? moment(dob, 'MM-DD-YYYY') : null,
						provinces: patientInfo.provinceCode,
						city: patientInfo.cityMunicipalityCode, 
						town: patientInfo.townCode,
						address: patientInfo.address
					}}
					className="patient-demo-fillup-form" 
					layout="vertical"
				>
					<Row gutter={8}>
						{/** Lastname */}
						<Col xs={24} sm={12} md={12} lg={12}>
							<Form.Item 
								name="lastName" 
								label={formLabels.lastName}
								rules={fieldRules.lastname}
							>
								<RegexInput
									regex={/[A-Za-z0-9-. ]/}  
									maxLength={50}
								/>
								{/* {getFieldDecorator('lastname', {
									initialValue: lastName,
									rules: fieldRules.lastname ,
								})(
									<RegexInput
										regex={/[A-Za-z0-9-. ]/}  
										maxLength={50}
									/>
								)} */}
							</Form.Item>
						</Col>
						{/** Firstname */}
						<Col xs={24} sm={12} md={12} lg={12}>
							<Form.Item 
								name="givenName"
								label={formLabels.firstName}
								rules={fieldRules.firstname}
							>
								<RegexInput 
									regex={/[A-Za-z0-9-. ]/}  
									onChange={this.onChangePatientInfo} 
									maxLength={50}
								/>
								{/* {getFieldDecorator('firstname', {
									initialValue: givenName,
									rules: fieldRules.firstname,
								})(
									<RegexInput 
										regex={/[A-Za-z0-9-. ]/}  
										onChange={this.onChangePatientInfo} 
										maxLength={50}
									/>
								)} */}
							</Form.Item>
						</Col>
						{/** Middlename */}
						<Col xs={24} sm={12} md={12} lg={12}>
							<Form.Item 
								name="middleName"
								label={formLabels.middleName}
								rules={fieldRules.middlename}
							>
								{/* {getFieldDecorator('middlename', {
									initialValue: middleName,
									rules: fieldRules.middlename,
								})(
									<RegexInput 
										regex={/[A-Za-z0-9-. ]/}   
										onChange={this.onChangePatientInfo} 
										maxLength={15}
									/>
								)} */}
								<RegexInput 
									regex={/[A-Za-z0-9-. ]/}   
									onChange={this.onChangePatientInfo} 
									maxLength={15}
								/>
							</Form.Item>
						</Col>
						{/** Suffix */}
						<Col xs={24} sm={12} md={12} lg={12}>
							<Form.Item 
								name="suffix"
								label={formLabels.suffix}
								rules={fieldRules.suffix}
							>
								<Input 
									onChange={this.onChangePatientInfo} 
									maxLength={5}
								/>
								{/* {getFieldDecorator('suffix', {
									initialValue: suffix,
									rules: fieldRules.suffix,
								})(
									<Input 
										onChange={this.onChangePatientInfo} 
										maxLength={5}
									/>
								)} */}
							</Form.Item>
						</Col>
						{/** Gender */}
						<Col xs={24} sm={12} md={12} lg={12}>
							<Form.Item 
								name="sex"
								className="gutter-box"
								label={formLabels.gender} 
								rules={fieldRules.gender}
							>
								<RadioGroup buttonStyle="solid" style={{ width:'100%', textAlign:'center' }} disabled>
									<RadioButton 
										style={{ width:'50%' }} 
										value={genderOptions.male} 
										checked={sex === genderOptions.male}
									>
										{genderOptions.male}
									</RadioButton>
									<RadioButton 
										style={{ width:'50%' }} 
										value={genderOptions.female} 
										checked={sex === genderOptions.female}
									>
										{genderOptions.female}
									</RadioButton>
								</RadioGroup>
								{/* {getFieldDecorator('gender', {
									initialValue: this.props.patientInfo.sex,
									rules: fieldRules.gender,
								})(
									<RadioGroup buttonStyle="solid" style={{ width:'100%', textAlign:'center' }} disabled>
										<RadioButton 
											style={{ width:'50%' }} 
											value={genderOptions.male} 
											checked={sex === genderOptions.male}
										>
											{genderOptions.male}
										</RadioButton>
										<RadioButton 
											style={{ width:'50%' }} 
											value={genderOptions.female} 
											checked={sex === genderOptions.female}
										>
											{genderOptions.female}
										</RadioButton>
									</RadioGroup>
								)} */}
							</Form.Item>
						</Col>
						{/** Date of birth */}
						<Col xs={24} sm={12} md={12} lg={12}>
							<Row gutter={8}>
								<Col xs={24} sm={12} md={12} lg={12}>
									<Form.Item 
										name="dateOfBirth" 
										label={formLabels.dateOfBirth}
										rules={fieldRules.dateOfBirth}
									>
										<DatePicker 
											format={dateFormat}
											style={{ width: '100%' }}
											onChange={this.onDateChange}
											disabled
										/>
										{/* {getFieldDecorator('dateOfBirth', { 
											initialValue: dateOfBirth ? moment(dateOfBirth, 'MM-DD-YYYY') : null,
											rules: fieldRules.dateOfBirth
										})(
											<DatePicker 
												format={dateFormat}
												style={{ width: '100%' }}
												onChange={this.onDateChange}
												disabled
											/>
										)} */}
									</Form.Item>
								</Col>
							</Row>
						</Col>
						{/** Province */}
						<Col xs={24} sm={12} md={12} lg={12}>
							<ProvinceList 
								form={this.formRef}
								placeholder={selectDefaultOptions}
								selectedProvince={provinceCode}
								onChange={this.onProvinceChange}
							/>
						</Col>
						{/** City */}
						<Col xs={24} sm={12} md={12} lg={12}>
							<Form.Item shouldUpdate>
								{(form) => {
									return (
										<CityList 
											form={form}
											placeholder={selectDefaultOptions}
											provinceValue={form.getFieldValue('provinces')}
											selectedCity={cityMunicipalityCode}
											onChange={this.onCityChange}
										/>
									);
								}}
							</Form.Item>
						</Col>
						{/** Barangay */}
						<Col xs={24} sm={12} md={12} lg={12}>
							<Form.Item shouldUpdate>
								{(form) => {
									return (
										<TownList 
											placeholder={selectDefaultOptions}
											cityValue={form.getFieldValue('city')}
										/>
									);
								}}
							</Form.Item>
						</Col>
						{/** Unit No. */}
						<Col xs={24} sm={12} md={12} lg={12}>
							<Form.Item shouldUpdate>
								{(form) => {
									return (
										<HouseAddress 
											form={form}
											townValue={form.getFieldValue('town')}
											fieldLabel={formLabels.unitNo.label}
											fieldName={formLabels.unitNo.fieldName}
											selectedValue={houseAddress}
										/>
									)
								}}
							</Form.Item>
							{/* <HouseAddress 
								form={form}
								townValue={selectedTownCode || townCode}
								fieldLabel={formLabels.unitNo.label}
								fieldName={formLabels.unitNo.fieldName}
								selectedValue={houseAddress}
							/> */}
						</Col>
						{/** Contact No. */}
						<Col xs={24} sm={12} md={12} lg={12}>
							<Form.Item 
								name="contactNumber"
								label={formLabels.contactNumber}
								rules={fieldRules.contactNumber}
							>
								<NumberInput 
									addonBefore="+ 63" 
									maxLength={10} 
								/>
								{/* {getFieldDecorator('contactNumber', { 
									initialValue: contactNumber,
									rules: fieldRules.contactNumber
								 })(
									<NumberInput 
										addonBefore="+ 63" 
										maxLength={10} 
									/>
								)} */}
							</Form.Item>
						</Col>	
						{/** Email address */}
						<Col xs={24} sm={12} md={12} lg={12}>
							<Form.Item 
								name="emailAdd" 
								label={formLabels.emailAddress}

							>
								<Input maxLength={100} />
								{/* {getFieldDecorator('emailAdd', {
									initialValue: emailAdd,
									rules: fieldRules.emailAddress ,
								})(
									<Input maxLength={100} />
								)} */}
							</Form.Item>
						</Col>	
					</Row>
					<section className="drawerFooter">
						<Button 
							shape="round" 
							style={{ marginRight: 10, width: 120 }} 
							onClick={this.props.onCancel}
						>
							{drawerCancelButton}
						</Button>
						<Button 
							shape="round" 
							type="primary" 
							htmlType="submit" 
							loading={isLoading}
							style={{ margin: 10, width: 120 }}
						>
							{drawerSubmitButton}
						</Button>
					</section>
				</Form>
			
			</div>
		);
	}
}

EditProfile.propTypes = {
	patientInfo: PropTypes.object,
	onCancel: PropTypes.func
};

EditProfile.defaultProps = {
	patientInfo() { return null; },
	onCancel() { return null }
}

export default withRouter(EditProfile);