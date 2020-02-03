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
import ProvinceList from 'shared_components/province_list';
import CityList from 'shared_components/city_list';
import TownList from 'shared_components/town_list';
import HouseAddress from 'shared_components/address';
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

	constructor(props){
		super(props);
		this.state = {
			prevProvince: this.props.patientInfo.provinceCode,
			cityMunicipalityCode: '',
			defaultMunicipalityCode: '',
		};
	}

	searchAddress = (input,treenode) => {
		const searchText = treenode.props.title.search(input.toUpperCase())
		if(searchText < 0){
			return false; 
		}
		return true;
	}

	onChangePatientInfo = (event) => {
		this.setState({[event.target.name]: event.target.value})
	} 
	
	onSubmit = (e) => {
		e.preventDefault();
		// eslint-disable-next-line react/prop-types
		const { getFieldsValue, validateFieldsAndScroll } = this.props.form;
		validateFieldsAndScroll((err) => {
			if (!err) {
				const fields = getFieldsValue();
				fields.dateOfBirth = moment(fields.dateOfBirth).format('MM-DD-YYYY');
				try{
					this.submitUpdatePatient(fields);
				}
				catch(error){
					HttpCodeMessage({status: 500});
				}
			}
		});
	}

	submitUpdatePatient = async (fields) => {
		const loggedUserData = JSON.parse(sessionStorage.getItem('LOGGEDIN_USER_DATA'));
		const payload = {
			"patientID": this.props.patientInfo.patientID,
			"userID": loggedUserData.userID,
			"lastName": fields.lastname.toUpperCase(),
			"givenName": fields.firstname.toUpperCase(),
			"middleName": fields.middlename.toUpperCase(),
			"sex": fields.gender.toUpperCase(),
			"dateOfBirth": fields.dateOfBirth,
			"addressCode": fields.town,
			"address": fields.address,
			"emailAdd": fields.emailAdd,
			"contactNumber" : fields.contactNumber
		};
		const response = await updatePatientAPI(payload);

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
		// eslint-disable-next-line react/prop-types
		const { getFieldDecorator, getFieldsValue } = this.props.form;
		return(
			<div>
				<Form className="fillup-form" onSubmit={this.onSubmit}>
					<Row gutter={8}>
						{/** Lastname */}
						<Col xs={24} sm={12} md={12} lg={12}>
							<Form.Item label={formLabels.lastName}>
							{getFieldDecorator('lastname', {
								initialValue: this.props.patientInfo.lastName,
								rules: fieldRules.lastname ,
							})(
								<RegexInput
									regex={/[A-z0-9 -]/}  
									maxLength={100}
								/>
							)}
							</Form.Item>
						</Col>
						{/** Firstname */}
						<Col xs={24} sm={12} md={12} lg={12}>
							<Form.Item label={formLabels.firstName}>
								{getFieldDecorator('firstname', {
									initialValue: this.props.patientInfo.givenName,
									rules: fieldRules.firstname,
								})(
									<RegexInput 
										regex={/[A-z0-9 -]/}  
										onChange={this.onChangePatientInfo} 
										maxLength={100}
									/>
								)}
							</Form.Item>
						</Col>
						{/** Middlename */}
						<Col xs={24} sm={12} md={12} lg={12}>
							<Form.Item label={formLabels.middleName}>
								{getFieldDecorator('middlename', {
									initialValue: this.props.patientInfo.middleName,
									rules: fieldRules.middlename,
								})(
									<Input 
										onChange={this.onChangePatientInfo} 
										maxLength={100}
									/>
								)}
							</Form.Item>
						</Col>
						{/** Suffix */}
						<Col xs={24} sm={12} md={12} lg={12}>
							<Form.Item label={formLabels.suffix}>
								{getFieldDecorator('suffix', {
									initialValue: this.props.patientInfo.suffix,
									rules: fieldRules.suffix,
								})(
									<Input 
										onChange={this.onChangePatientInfo} 
										maxLength={50}
									/>
								)}
							</Form.Item>
						</Col>
						{/** Gender */}
						<Col xs={24} sm={12} md={12} lg={12}>
							<Form.Item label={formLabels.gender} className="gutter-box">
								{getFieldDecorator('gender', {
									initialValue: this.props.patientInfo.sex,
									rules: fieldRules.gender,
								})(
									<RadioGroup buttonStyle="solid" style={{ width:'100%', textAlign:'center' }} disabled>
										<RadioButton 
											style={{ width:'50%' }} 
											value={genderOptions.male} 
											checked={this.props.patientInfo.sex === genderOptions.male}
										>
											{genderOptions.male}
										</RadioButton>
										<RadioButton 
											style={{ width:'50%' }} 
											value={genderOptions.female} 
											checked={this.props.patientInfo.sex === genderOptions.female}
										>
											{genderOptions.female}
										</RadioButton>
									</RadioGroup>
								)}
							</Form.Item>
						</Col>
						{/** Date of birth */}
						<Col xs={24} sm={12} md={12} lg={12}>
							<Row gutter={8}>
								<Col xs={24} sm={12} md={12} lg={12}>
									<Form.Item label={formLabels.dateOfBirth}>
										<div className="customDatePickerWidth">
											{getFieldDecorator('dateOfBirth', { 
												initialValue: this.props.patientInfo.dateOfBirth ? moment(this.props.patientInfo.dateOfBirth, 'MM-DD-YYYY') : null,
												rules: fieldRules.dateOfBirth
											})(
												<DatePicker 
													format={dateFormat}
													style={{ width: '100%' }}
													onChange={this.onDateChange}
													disabled
												/>
											)}
										</div>
									</Form.Item>
								</Col>
							</Row>
						</Col>
						{/** Province */}
						<Col xs={24} sm={12} md={12} lg={12}>
							<ProvinceList
								form={this.props.form}
								selectDefaultOptions={selectDefaultOptions} 
								selectedProvince={this.props.patientInfo.provinceCode}
							/>
						</Col>
						{/** City */}
						<Col xs={24} sm={12} md={12} lg={12}>
							<CityList 
								form={this.props.form}
								selectDefaultOptions={selectDefaultOptions} 
								provinceValue={getFieldsValue().provinces || this.props.patientInfo.provinceCode}
								selectedCity={this.props.patientInfo.cityMunicipalityCode}
							/>
						</Col>
						{/** Barangay */}
						<Col xs={24} sm={12} md={12} lg={12}>
							<TownList 
								form={this.props.form}
								selectDefaultOptions={selectDefaultOptions} 
								cityValue={getFieldsValue().city || this.props.patientInfo.cityMunicipalityCode}
								selectedTown={this.props.patientInfo.townCode}
							/>
						</Col>
						{/** Unit No. */}
						<Col xs={24} sm={12} md={12} lg={12}>
							<HouseAddress 
								form={this.props.form}
								townValue={getFieldsValue().town || this.props.patientInfo.townCode}
								fieldLabel={formLabels.unitNo.label}
								fieldName={formLabels.unitNo.fieldName}
								selectedValue={this.props.patientInfo.address}
							/>
						</Col>
						{/** Contact No. */}
						<Col xs={24} sm={12} md={12} lg={12}>
							<Form.Item label={formLabels.contactNumber}>
								{getFieldDecorator('contactNumber', { 
									initialValue: this.props.patientInfo.contactNumber,
									rules: fieldRules.contactNumber
								 })(
									<NumberInput 
										addonBefore="+ 63" 
										maxLength={45} 
									/>
								)}
							</Form.Item>
						</Col>	
						{/** Email address */}
						<Col xs={24} sm={12} md={12} lg={12}>
							<Form.Item label={formLabels.emailAddress}>
							{getFieldDecorator('emailAdd', {
								initialValue: this.props.patientInfo.emailAdd,
								rules: fieldRules.emailAddress ,
							})(
								<Input />
							)}
							</Form.Item>
						</Col>	
					</Row>
					<section className="drawerFooter">
						<Button shape="round" style={{ marginRight: 10 }} onClick={this.props.onCancel}>
							{drawerCancelButton}
						</Button>
						<Button shape="round" type="primary" htmlType="submit" style={{ margin: 10 }}>
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
	form: PropTypes.object,
	provinceCode: PropTypes.string,
	onCancel: PropTypes.func
};

EditProfile.defaultProps = {
	patientInfo() { return null; },
	form() { return null; },
	provinceCode: null,
	onCancel() { return null }
}

const UpdatePatientForm = Form.create()(withRouter(EditProfile));

export default UpdatePatientForm;