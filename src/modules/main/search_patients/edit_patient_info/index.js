// @ts-nocheck
import React from 'react';
import { Form, Input, DatePicker, Row, Col, Radio, Button, message, TreeSelect } from 'antd';

import axiosCall from 'services/axiosCall';
import Message from 'shared_components/message';
import './editprofile.css'; 

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

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
		const address = await this.fetchAddress;
		console.log(address);

		const addressList=address.map((item.province_list) => console.log(addressItem));
		return (
			
		)
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
			console.log(response);
			patientAddress = data || [];
		}
		catch(error) {
			Message.error();
		}
		return patientAddress;
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
		const onClose  = this.props;


		return(
			<div>
				<Form>
					<Row gutter={8}>
						
						<Col xs={24} sm={24} md={24} lg={24}>
							<Form.Item label="Case No.">
								<Input name="casenum" value={this.state.casenum} onChange={this.onChangePatientInfo} />
							</Form.Item>
						</Col>

						<Col xs={24} sm={12} md={12} lg={12}>
							<Form.Item label="Last Name">
								<Input name="lastname" value={this.state.lastname} onChange={this.onChangePatientInfo} />
							</Form.Item>
						</Col>

						<Col xs={24} sm={12} md={12} lg={12}>
							<Form.Item label="First Name">
								<Input name="firstname" value={this.state.firstname} onChange={this.onChangePatientInfo} />
							</Form.Item>
						</Col>

						<Col xs={24} sm={12} md={12} lg={12}>
							<Form.Item label="Middle Name">
								<Input name="middlename" value={this.state.middlename} onChange={this.onChangePatientInfo} />
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
											<DatePicker />
										</div>
									</Form.Item>
								</Col>
								<Col xs={24} sm={12} md={12} lg={12}>
									<Form.Item label="Age">
										<Input value="22" disabled />
									</Form.Item>
								</Col>
							</Row>
						</Col>

						<Col xs={24} sm={24} md={24} lg={24}>
							<Form.Item label="ADDRESS" className="gutter-box">
								<div className="treeselect-address">
									<TreeSelect
										showSearch
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
					<Button onClick={onClose} style={{ marginRight: 8 }}>
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