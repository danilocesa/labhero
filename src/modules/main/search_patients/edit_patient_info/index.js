/* eslint-disable no-restricted-syntax */
/* eslint-disable func-names */
/* eslint-disable array-callback-return */
// @ts-nocheck
import React from 'react';
import moment from 'moment';
import { Form, Input, DatePicker, Row, Col, Radio, Button, message, TreeSelect } from 'antd';

// CUSTOM MODULES
import axiosCall from 'services/axiosCall';
import Message from 'shared_components/message';
import computeAge from 'shared_components/age_computation';

// CSS
import './editprofile.css'; 

// OTHER FILES
// eslint-disable-next-line camelcase
import province_list from 'assets/address.json';


const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

const dateFormat = 'YYYY/MM/DD';

// const axios = require('axios');

const treeData = [
	{
	  title: 'Node1',
	  value: '0-0',
	  key: '0-0',
	  children: [
		{
		  title: 'Child Node1',
		  value: '0-0-1',
		  key: '0-0-1',
		},
		{
		  title: 'Child Node2',
		  value: '0-0-2',
		  key: '0-0-2',
		},
	  ],
	},
	{
	  title: 'Node2',
	  value: '0-1',
	  key: '0-1',
	},
  ];

class EditProfile extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			casenum: '',
			lastname: '',
			firstname: '',
			middlename: '',
		}
	}

	async componentDidMount() {
		console.log("TCL: addressData", province_list);
		const address = await this.fetchAddress();
    console.log("TCL: EditProfile -> componentDidMount -> address", address)
		const regions = [];
		const province = [];
        
		// for (const keyAddress of Object.keys(address)) {s
		// 	console.log(address.province_list);
		// 	for (const keyProvince of Object.keys(address.province_list)) {
		// 		province[keyProvince] = { "title": address.province_list[keyProvince].key, value: '0-0',key: '0-0'} 
		// 	}
		// 	regions[keyAddress] = { "title": address[keyAddress].region_name, value: '0-0',key: '0-0'} 
		// }
		
		// console.log("TCL: EditProfile -> componentDidMount -> regions", regions)
		// console.log("TCL: EditProfile -> componentDidMount -> province", province)
	}

	fetchAddress = async () => {
		let patientAddress = [];

		try {
			const response = await axiosCall ({
                
				method: 'GET',
				// eslint-disable-next-line max-len
				url: 'https://raw.githubusercontent.com/flores-jacob/philippine-regions-provinces-cities-municipalities-barangays/master/philippine_provinces_cities_municipalities_and_barangays_2019.json'
			});
			const { data } = await response;
            console.log("TCL: EditProfile -> fetchAddress -> data", data)
			patientAddress = data || [];
		}
		catch(error) {
			Message.error();
		}
		return patientAddress;
	}

	addressData = () => {
			
	}

	onChangePatientInfo = (event) => {
		this.setState({[event.target.name]: event.target.value})
	}

	onSubmit = () => {
		message.success('Changes successfully saved!');
	}

	onChangeTreeSelect = async () => {
		let address = [];
		address = await this.fetchAddress(); 
		return address;
	  };
 
	render() {

		// const onClose  = this.props;

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
											<DatePicker defaultValue={moment(this.props.patientInfo.dateOfBirth, dateFormat)} format={dateFormat}/>
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
										// showSearch
										treeData={treeData}
										style={{ width: 300 }}
										dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
										placeholder="Please select"
										allowClear
										treeDefaultExpandAll
										onChange={this.onChangeTreeSelect}
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

export default EditProfile;