/* eslint-disable no-restricted-syntax */
/* eslint-disable func-names */
/* eslint-disable array-callback-return */
// @ts-nocheck
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Form, Input, DatePicker, Row, Col, Radio, Button, message, TreeSelect } from 'antd';

// CUSTOM MODULES
import computeAge from 'shared_components/age_computation';

// CSS
import './editprofile.css'; 

// OTHER FILES
// eslint-disable-next-line camelcase
import addressData from 'assets/address.json';

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
			addressArr.push({"title":keyProvince, "value":`${keyProvince}L1-L1-${a}`, "key":`${keyProvince}L1-L1-${a}`});
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
				"value": `${keyMunicipality}L2-L2-${a}`,
				"key": `${keyMunicipality}L2-L2-${a}`
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

	onSubmit = () => {
		message.success('Changes successfully saved!');
	}

	onClickDatePicker = () => {
		console.log(this.props.patientInfo.dateOfBirth);
	}
 
	render() {
		return(
			<div>
				<Form>
					<Row gutter={8}>
						<Col xs={24} sm={12} md={12} lg={12}>
							<Form.Item label="Last Name">
								<Input name="lastname" value={this.props.patientInfo.lastName} onChange={this.onChangePatientInfo} />
							</Form.Item>
						</Col>

						<Col xs={24} sm={12} md={12} lg={12}>
							<Form.Item label="First Name">
								<Input name="firstname" value={this.props.patientInfo.givenName} onChange={this.onChangePatientInfo} />
							</Form.Item>
						</Col>

						<Col xs={24} sm={12} md={12} lg={12}>
							<Form.Item label="Middle Name">
								<Input name="middlename" value={this.props.patientInfo.middleName} onChange={this.onChangePatientInfo} />
							</Form.Item>
						</Col>

						<Col xs={24} sm={12} md={12} lg={12}>
							<Form.Item label="GENDER" className="gutter-box">
								<RadioGroup buttonStyle="solid" style={{ width:'100%', textAlign:'center' }}>
									<RadioButton style={{ width:'50%' }} value="a">MALE</RadioButton>
									<RadioButton style={{ width:'50%' }} value="b">FEMALE</RadioButton>
								</RadioGroup>
							</Form.Item>
						</Col>

						<Col xs={24} sm={24} md={24} lg={24}>
							<Row gutter={8}>
								<Col xs={24} sm={12} md={12} lg={12}>
									<Form.Item label="Date of Birth">
										<div className="customDatePickerWidth">
											<DatePicker defaultValue={moment(this.props.patientInfo.dateOfBirth)} onChange={this.onClickDatePicker} format={dateFormat} />
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
									<TreeSelect
										showSearch
										treeData={this.state.addressArr}
										filterTreeNode={this.searchAddress}
										style={{ width: 300 }}
										dropdownStyle={{ maxHeight: 500 }}
										placeholder="Please select"
										allowClear
									/>
								</div>
							</Form.Item>
						</Col>
						
					</Row>
				</Form>
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
					<Button type="primary" onClick={this.onSubmit}>
              Submit
					</Button>
				</div>
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

export default EditProfile;