/* eslint-disable no-restricted-syntax */
/* eslint-disable func-names */
/* eslint-disable array-callback-return */
// @ts-nocheck
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Form, Input, DatePicker, Row, Col, Radio, Button, message, Cascader } from 'antd';

// CUSTOM MODULES
import addressData from 'assets/address.json';
import Message from 'shared_components/message';
import axiosCall from 'services/axiosCall';
import computeAge from 'shared_components/age_computation';
import FIELD_RULES from './constant';

// CSS
import './editprofile.css'; 

// OTHER FILES
// eslint-disable-next-line camelcase
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const dateFormat = 'MM/DD/YYYY';

class EditProfile extends React.Component {
	state = {
		"addressArr" : []
	}

	componentDidMount(){
		const addressArr = [];
		const municipalityArr = [];
		const barangayArr = [];
		let a = 0; 
		let b = 0;
		let c = 0;
		console.log(addressData);
		// Object.entries(addressData).forEach((addressTxt)=>{
    // console.log("TCL: EditProfile -> componentDidMount -> addressTxt", addressTxt)
		// 	addressArr.push({
		// 		"label":addressTxt[0], 
		// 		"value":`${addressTxt[0]}L1-L1-${a}`, 
		// 		"key":`${addressTxt[0]}L1-L1-${a+1*Math.floor(Math.random() * 9999999)}`
		// 	});
		// 	// Get all municipality
		// 	Object.entries(addressTxt[1].municipality_list).forEach((municipality)=>{
		// 		municipalityArr.push({
		// 			"label": municipality[0],
		// 			"value": `${municipality[0]}L2-L2-${b+1*Math.floor(Math.random() * 9999999)}`,
		// 			"key": `${municipality[0]}L2-L2-${b+1*Math.floor(Math.random() * 9999999)}`
		// 		})
		// 		b +=1;
		// 	});
		// 	addressArr[a].children = municipalityArr;
		// 	// console.log(addressArr[a].children);
		// 	// Get all barangay
		// 	// Object.entries(addressArr[a].children).forEach((barangay)=>{
		// 		// console.log(addressArr[a].children);
		// 		// barangayArr.push({
		// 		// 	"label": barangay[1].label,
		// 		// 	"value": `${barangay[1].key}L3-L3-${c+1*Math.floor(Math.random() * 9999999)}`,
		// 		// 	"key": `${barangay[1].key}L3-L3-${c+1*Math.floor(Math.random() * 9999999)}`
		// 		// })
		// 		// c +=1
		// 	// });
		// 	// addressArr[a].children = barangayArr
			// a +=1;
		// });


		
		// console.log(addressArr);
		// for (const [keyProvince, valueprovince] of Object.entries(addressData)) {
		// 	addressArr.push({"label":keyProvince, "value":`${keyProvince}L1-L1-${a}`, "key":`${keyProvince}L1-L1-${a+1*Math.floor(Math.random() * 9999999)}`});
		// 	addressArr[a].children = this.getMunicipality(valueprovince.municipality_list);
		// 	for(const [, valueMunicipality] of Object.entries(valueprovince.municipality_list)){
		// 		for( const [, value] of  Object.entries(valueMunicipality) ){
		// 			// value.children = this.getBarangay(valueMunicipality.barangay_list)
		// 		}
		// 	}
		// 	a +=1;
		// }
		this.setState({
			addressArr
		})
	}

	// getMunicipality = (array) => {
    
	// 	const municipalityArr = [];
	// 	let a = 0;
	// 	for (const [keyMunicipality] of Object.entries(array)) {
	// 		municipalityArr.push(
	// 			{
	// 			"label": keyMunicipality,
	// 			"value": `${keyMunicipality}L2-L2-${a+1*Math.floor(Math.random() * 9999999)}`,
	// 			"key": `${keyMunicipality}L2-L2-${a+1*Math.floor(Math.random() * 9999999)}`
	// 			}
	// 		)
	// 		a +=1;
	// 	}
	// 	return municipalityArr;
	// }

	// getBarangay = (array) => {
	// 	const barangayArr = [];
	// 	let a = 0;
	// 	for (const [valueBarangay] of Object.entries(array)) {
	// 		console.log(valueBarangay);
	// 		barangayArr.push(
	// 			{
	// 			"label": valueBarangay,
	// 			"value": `${valueBarangay}L3-L3-${a+1*Math.floor(Math.random() * 9999999)}`,
	// 			"key": `${valueBarangay}L3-L3-${a+1*Math.floor(Math.random() * 9999999)}`
	// 			}
	// 		)
	// 		a +=1;
	// 	}
	// 	return barangayArr;
	// }

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
		const response = await axiosCall({
			method: 'PUT',
			url: `Patient/${this.props.patientInfo.patientID}`,
			headers: {
				'authorization': `Bearer ${loggedUserData.token}`
			},
			data: {
				"userID": loggedUserData.userID,
				"lastName": fields.lastname,
				"givenName": fields.firstname,
				"middleName": fields.middlename,
				"sex": fields.gender,
				"dateOfBirth": fields.dateOfBirth,
				"address": fields.address +  fields.homeAddress
			}
		});
		if(response.status === 200){
			message.success('Changes successfully saved!');
			window.location.reload();
		} else {
			Message.error();
		}
	}

	onClickDatePicker = () => {
		console.log(this.props.patientInfo.dateOfBirth);
	}

	render() {
		// eslint-disable-next-line react/prop-types
		const { getFieldDecorator } = this.props.form;
		function filter(inputValue, path) {
			return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
		}
		return(
			<div>
				<Form className="fillup-form" onSubmit={this.onSubmit}>
					<Row gutter={8}>
						<Col xs={24} sm={12} md={12} lg={12}>
							<Form.Item label="Last Name">
							{getFieldDecorator('lastname', {
								initialValue: this.props.patientInfo.lastName,
								rules: FIELD_RULES.lastname ,
							})(
								<Input />
							)}
							</Form.Item>
						</Col>

						<Col xs={24} sm={12} md={12} lg={12}>
							<Form.Item label="First Name">
								{getFieldDecorator('firstname', {
									initialValue: this.props.patientInfo.givenName,
									rules: FIELD_RULES.firstname,
								})(
									<Input onChange={this.onChangePatientInfo} />
								)}
							</Form.Item>
						</Col>

						<Col xs={24} sm={12} md={12} lg={12}>
							<Form.Item label="Middle Name">
								{getFieldDecorator('middlename', {
									initialValue: this.props.patientInfo.middleName,
									rules: FIELD_RULES.middlename,
								})(
									<Input onChange={this.onChangePatientInfo} />
								)}
							</Form.Item>
						</Col>

						<Col xs={24} sm={12} md={12} lg={12}>
							<Form.Item label="GENDER" className="gutter-box">
								{getFieldDecorator('gender', {
									initialValue: this.props.patientInfo.sex,
									rules: FIELD_RULES.gender,
								})(
									<RadioGroup buttonStyle="solid" style={{ width:'100%', textAlign:'center' }}>
										<RadioButton style={{ width:'50%' }} value="MALE" checked={this.props.patientInfo.sex === "MALE"}>MALE</RadioButton>
										<RadioButton style={{ width:'50%' }} value="FEMALE" checked={this.props.patientInfo.sex === "FEMALE"}>FEMALE</RadioButton>
									</RadioGroup>
								)}
							</Form.Item>
						</Col>

						<Col xs={24} sm={24} md={24} lg={24}>
							<Row gutter={8}>
								<Col xs={24} sm={12} md={12} lg={12}>
									<Form.Item label="Date of Birth">
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
								<Col xs={24} sm={12} md={12} lg={12}>
									<Form.Item label="Age">
										<Input value={computeAge(this.props.patientInfo.dateOfBirth)} disabled />
									</Form.Item>
								</Col>
							</Row>
						</Col>

						<Col xs={24} sm={24} md={24} lg={24}>
							<Form.Item label="ADDRESS" className="gutter-box">
								<div className="treeselect-address">
									{getFieldDecorator('address', { 
										rules: FIELD_RULES.address
									})(
										<Cascader 
											options={this.state.addressArr}
											style={{ width: '100%' }}
											dropdownstyle={{ maxHeight: 500 }}
											placeholder="Please select"
											allowclear
											showSearch={{filter}}
										/>
									)}
								</div>
							</Form.Item>
						</Col>

						<Col xs={24} sm={12} md={24} lg={24}>
							<Form.Item label="House No./Unit/Floor No., Bldg Name, Blk or Lot No.">
							{getFieldDecorator('homeAddress', {
								// initialValue: this.props.patientInfo.lastName,
								rules: FIELD_RULES.homeAddress ,
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
							Cancel
						</Button>
						<Button type="primary" htmlType="submit">
							Submit
						</Button>
					</div>
				</Form>
			
			</div>
		);
	}
}

EditProfile.propTypes = {
	patientInfo: PropTypes.object
};

EditProfile.defaultProps = {
	patientInfo() { return null; }
}

const UpdatePatientForm = Form.create()(withRouter(EditProfile));

export default UpdatePatientForm;