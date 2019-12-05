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
import Message from 'shared_components/message';
import updatePatientAPI from 'services/search_patient/updatePatient';
import ProvinceList from 'shared_components/province_list';
import CityList from 'shared_components/city_list';
import TownList from 'shared_components/town_list';
import FIELD_RULES from './constant';
import {successMessages, formLabels, genderOptions, drawerCancelButton, drawerSubmitButton,selectDefaultOptions} from '../settings';


// CSS
import './editprofile.css'; 

// OTHER FILES
// eslint-disable-next-line camelcase
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const dateFormat = 'MM/DD/YYYY';

class EditProfile extends React.Component {
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
					Message.error();
				}
			}
		});

	
	}

	submitUpdatePatient = async (fields) => {
		const loggedUserData = JSON.parse(sessionStorage.getItem('LOGGEDIN_USER_DATA'));
		const payload = {
			"patientID": this.props.patientInfo.patientID,
			"userID": loggedUserData.userID,
			"lastName": fields.lastname,
			"givenName": fields.firstname,
			"middleName": fields.middlename,
			"sex": fields.gender,
			"dateOfBirth": fields.dateOfBirth,
			"addressCode": fields.town,
			"address": fields.unitNo
		};
		const response = await updatePatientAPI(payload);

		if(response.status === 200){
			message.success(successMessages.update);
			window.location.reload();
		} else {
			Message.error();
		}
	}

	render() {
		// eslint-disable-next-line react/prop-types
		const { getFieldDecorator, getFieldsValue } = this.props.form;
    console.log("TCL: EditProfile -> render -> getFieldsValue", getFieldsValue())
		return(
			<div>
				<Form className="fillup-form" onSubmit={this.onSubmit}>
					<Row gutter={8}>
						{/** Lastname */}
						<Col xs={24} sm={12} md={12} lg={12}>
							<Form.Item label={formLabels.lastName}>
							{getFieldDecorator('lastname', {
								initialValue: this.props.patientInfo.lastName,
								rules: FIELD_RULES.lastname ,
							})(
								<Input />
							)}
							</Form.Item>
						</Col>
						{/** Firstname */}
						<Col xs={24} sm={12} md={12} lg={12}>
							<Form.Item label={formLabels.firstName}>
								{getFieldDecorator('firstname', {
									initialValue: this.props.patientInfo.givenName,
									rules: FIELD_RULES.firstname,
								})(
									<Input onChange={this.onChangePatientInfo} />
								)}
							</Form.Item>
						</Col>
						{/** Middlename */}
						<Col xs={24} sm={12} md={12} lg={12}>
							<Form.Item label={formLabels.middleName}>
								{getFieldDecorator('middlename', {
									initialValue: this.props.patientInfo.middleName,
									rules: FIELD_RULES.middlename,
								})(
									<Input onChange={this.onChangePatientInfo} />
								)}
							</Form.Item>
						</Col>
						{/** Suffix */}
						<Col xs={24} sm={12} md={12} lg={12}>
							<Form.Item label={formLabels.suffix}>
								{getFieldDecorator('suffix', {
									initialValue: this.props.patientInfo.suffix,
									rules: FIELD_RULES.suffix,
								})(
									<Input onChange={this.onChangePatientInfo} />
								)}
							</Form.Item>
						</Col>
						{/** Gender */}
						<Col xs={24} sm={12} md={12} lg={12}>
							<Form.Item label={formLabels.gender} className="gutter-box">
								{getFieldDecorator('gender', {
									initialValue: this.props.patientInfo.sex,
									rules: FIELD_RULES.gender,
								})(
									<RadioGroup buttonStyle="solid" style={{ width:'100%', textAlign:'center' }}>
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
												rules: FIELD_RULES.dateOfBirth
											})(
												<DatePicker 
													format={dateFormat}
													style={{ width: '100%' }}
													onChange={this.onDateChange}
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
								provinceValue={getFieldsValue().provinces}
								selectedcity={this.props.patientInfo.cityMunicipalityCode}
							/>
						</Col>
						{/** Barangay */}
						<Col xs={24} sm={12} md={12} lg={12}>
							<TownList 
								form={this.props.form}
								selectDefaultOptions={selectDefaultOptions} 
								cityValue={getFieldsValue().city}
							/>
						</Col>
						{/** Unit No. */}
						<Col xs={24} sm={12} md={12} lg={12}>
							<Form.Item label={formLabels.unitNo}>
							{getFieldDecorator('unitNo', {
								rules: FIELD_RULES.unitNo ,
								initialValue: this.props.patientInfo.address
							})(
								<Input />
							)}
							</Form.Item>
						</Col>
						{/** Contact No. */}
						<Col xs={24} sm={12} md={12} lg={12}>
							<Form.Item label={formLabels.contactNumber}>
								{getFieldDecorator('contactNumber', { rules: FIELD_RULES.contactNumber })(
									<Input addonBefore="+ 63" maxLength={10} />
								)}
							</Form.Item>
						</Col>	
						{/** Email address */}
						<Col xs={24} sm={12} md={12} lg={12}>
							<Form.Item label={formLabels.emailAddress}>
							{getFieldDecorator('emailAddress', {
								rules: FIELD_RULES.emailAddress ,
							})(
								<Input />
							)}
							</Form.Item>
						</Col>	
					</Row>
					<div
					style={{
						position: 'absolute',
						left: 0,
						bottom: 0,
						width: '100%',
						borderTop: '1px solid #e9e9e9',
						padding: '10px 16px',
						background: '#fff',
						textAlign: 'right',
					}}
						>
						<Button style={{ marginRight: 8 }}>
							{drawerCancelButton}
						</Button>
						<Button type="primary" htmlType="submit">
							{drawerSubmitButton}
						</Button>
					</div>
				</Form>
			
			</div>
		);
	}
}

EditProfile.propTypes = {
	patientInfo: PropTypes.object,
	form: PropTypes.object,
	provinceCode: PropTypes.string
};

EditProfile.defaultProps = {
	patientInfo() { return null; },
	form() { return null; },
	provinceCode: null
}

const UpdatePatientForm = Form.create()(withRouter(EditProfile));

export default UpdatePatientForm;