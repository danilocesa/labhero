/* eslint-disable no-restricted-syntax */
/* eslint-disable func-names */
/* eslint-disable array-callback-return */
// @ts-nocheck
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Form, Input, DatePicker, Row, Col, Radio, Button, message, TreeSelect } from 'antd';

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
		let a = 0; 
		for (const [keyProvince, valueprovince] of Object.entries(addressData)) {
			addressArr.push({"title":keyProvince, "value":`${keyProvince}L1-L1-${a}`, "key":`${keyProvince}L1-L1-${a+1*Math.floor(Math.random() * 9999999)}`});
			addressArr[a].children = this.getMunicipality(valueprovince.municipality_list);
			a +=1;
		}
		this.setState({
			addressArr
		})
	}

	getMunicipality = (array) => {
		const municipalityArr = [];
		let a = 0;
		for (const [keyMunicipality] of Object.entries(array)) {
			municipalityArr.push(
				{
				"title": keyMunicipality,
				"value": `${keyMunicipality}L2-L2-${a+1*Math.floor(Math.random() * 9999999)}`,
				"key": `${keyMunicipality}L2-L2-${a+1*Math.floor(Math.random() * 9999999)}`
				}
			)
			a +=1;
		}
		return municipalityArr;
	}

	getBarangay = (array) => {
    
		const barangayArr = [];
		let a = 0;
		array.map(function(key){
			barangayArr.push(
				{
				"title": key,
				"value": `${key}L3-L3-${a}`,
				"key": `${key}L3-L3-${a}`
				}
			)
			a +=1;
		});
		return barangayArr;
    
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
	
	onSubmit = async (e) => {
		e.preventDefault();
		// eslint-disable-next-line react/prop-types
		const { getFieldsValue, validateFieldsAndScroll } = this.props.form;
		validateFieldsAndScroll((err) => {
			
			if (!err) {
				const fields = getFieldsValue();
        console.log("TCL: EditProfile -> onSubmit -> fields", fields)
				fields.dateOfBirth = moment(fields.dateOfBirth).format('MM-DD-YYYY');
			}
		});

		try{
			console.log("TCL: EditProfile -> updatePatient -> getFieldsValue", getFieldsValue);
			const updatePatient = await axiosCall({
				method: 'PUT',
				url: `Patient/${this.props.patientInfo.patientID}`,
				data: {
					"userID": 5,
					"lastName": "tets",
					"givenName": "test",
					"middleName": "test",
					"sex": "m",
					"dateOfBirth": "01/01/1990"
				}
			});
      console.log("TCL: EditProfile -> onSubmit -> update_patient", updatePatient)
		}
		catch(error){
			Message.error();
		}
		message.success('Changes successfully saved!');
	}

	onClickDatePicker = () => {
		console.log(this.props.patientInfo.dateOfBirth);
	}
 
	render() {
		// eslint-disable-next-line react/prop-types
		const { getFieldDecorator } = this.props.form;
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
								<RadioGroup buttonStyle="solid" style={{ width:'100%', textAlign:'center' }}>
									<RadioButton style={{ width:'50%' }} value="m" checked={this.props.patientInfo.sex === "MALE"}>MALE</RadioButton>
									<RadioButton style={{ width:'50%' }} value="f" checked={this.props.patientInfo.sex === "FEMALE"}>FEMALE</RadioButton>
								</RadioGroup>
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
										<TreeSelect
											showSearch
											treeData={this.state.addressArr}
											filterTreeNode={this.searchAddress}
											style={{ width: 300 }}
											dropdownStyle={{ maxHeight: 500 }}
											placeholder="Please select"
											allowClear
										/>
									)}
								</div>
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