import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import moment from 'moment';
import { Form, Input, Row, Col, Typography, DatePicker, Radio, Divider, Select, Button, message } from 'antd';
import { NumberInput } from 'shared_components/pattern_input';
import PageTitle from 'shared_components/page_title';
import ProvinceList from 'shared_components/phase2_province';
import CityList from 'shared_components/phase2_city';
import TownList from 'shared_components/phase2_town';
import { createBloodRecipient } from 'services/blood_bank/blood_recipient';
import { getHospitalList } from 'services/blood_bank/hospital';
import { LOGGEDIN_USER_DATA } from 'global_config/constant-global';
import { FIELD_RULES } from './constant';
import ProductTable from './product_table';

import './form.css';

// CONSTANTS
const { Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;


class FillupRecipient extends React.Component {
	constructor(props){
		super(props);

		this.formRef = React.createRef();
		this.productTableRef = React.createRef();
		this.state = { 
			hospitalList: []
		};
	}

	async componentDidMount() {
		const hospitalList = await getHospitalList();

		console.log('did moutn')

		this.setState({ hospitalList }); 
	}

	onProvinceChange = () => {
		this.formRef.current.setFieldsValue({
			city: null,
			barangay: null,
			house: null,
		});
	}

	onCityChange = () => {
		this.formRef.current.setFieldsValue({
			barangay: null,
			house: null,
		});
	}

	computeAge = (date) => {
		const years = Math.floor(moment().diff(date, 'years', true));
		const age = years > 0 ? years : '---';

		return age;
	}

	onDateChange = (date) => {
		const { setFieldsValue } = this.formRef.current;
		const patientAge = this.computeAge(date);

		setFieldsValue({ patientAge });
	}

	onSubmit = async (formValues) => {
		const { getSelectedProducts } = this.productTableRef.current;
		const loggedinUser = JSON.parse(sessionStorage.getItem(LOGGEDIN_USER_DATA));
		const selectedProducts = getSelectedProducts().map(product => ({ 
			...product, 
			created_by: loggedinUser.userID,
			recipient_id: 1 // Temporary id
		}));
		
		
		if(selectedProducts.length === 0) {
			message.warn('Please add alteast one product');
			
			return;
		}
		
		const payload = {
			...formValues,
			birth_date: moment(formValues.birth_date).format('YYYY-MM-DD'),
			requested_date: moment(formValues.requested_date).format('YYYY-MM-DD'),
			blood_product_requests: selectedProducts,
			blood_type: 1,
			blood_unit: 1,
			created_by: loggedinUser.userID,
		};
		const response = await createBloodRecipient(payload);

		console.log(response);
	}

	render(){
		const { hospitalList } = this.state;

		const HopitalList = hospitalList.map(item => (
			<Option key={item.hospital_id} value={item.hospital_id}>
				{item.hospital_name}
			</Option>
		));

		return(
			<div>
				<PageTitle pageTitle="BLOOD REQUEST" />
				<div 
					style={{ marginTop: 30 }}
					className="blood-request-create-form"
				>
					<Row justify="center">
						<Col span={7}>
							<Text strong>PERSONAL INFORMATION</Text>
						</Col>
						<Col span={1}></Col>
						<Col span={7}></Col>
						<Col span={1}></Col>
						<Col span={7}>
							<Text strong>PRODUCT REQUEST</Text>
						</Col>
					</Row>
					<Form 
						ref={this.formRef} 
						layout="vertical"
						onFinish={this.onSubmit}
						style={{ marginTop: 10 }}
					>
						<Row justify="center">
							<Col span={7}>
								<div>
									<Form.Item 
										name="first_name"
										label="FIRST NAME"
										rules={FIELD_RULES.firstName}
									>
										<Input />
									</Form.Item>
									<Form.Item 
										name="middle_name"
										label="MIDDLE NAME"
										rules={FIELD_RULES.middleName}
									>
										<Input />
									</Form.Item>
									<Row gutter={12}>
										<Col span={18}>
											<Form.Item 
												name="last_name"
												label="LAST NAME"
												rules={FIELD_RULES.lastName}
											>
													<Input />
											</Form.Item>
											</Col>
											<Col span={6}>
											<Form.Item 
												name="suffix"
												label="SUFFIX"
												rules={FIELD_RULES.suffix}
											>
												<Input maxLength={1} />
											</Form.Item>
										</Col>
									</Row>
									<Row gutter={12}>
										<Col span={18}>
											<Form.Item 
												name="birth_date"
												label="DATE OF BIRTH"
												rules={FIELD_RULES.dateOfBirth}
											>
												<DatePicker 
													format="MM-DD-YYYY"
													style={{ width: '100%' }}
													onChange={this.onDateChange}
												/>
											</Form.Item>
											</Col>
											<Col span={6}>
												<Form.Item 
													name="age"
													label="AGE"
												>
													<Input disabled style={{ textAlign: 'center' }} />
												</Form.Item>
											</Col>
									</Row> 
									<Form.Item 
										label="CONTACT NUMBER"
										name="mobile_no"
										rules={FIELD_RULES.contactNumber}
									>
										<NumberInput 
											maxLength={10} 
											addonBefore="+ 63"  
										/>
									</Form.Item>
									<Row gutter={12}>
										<Col span={12}>
											<Form.Item 
												name="gender"
												label="PATIENT'S GENDER"
												rules={FIELD_RULES.gender}
											>
												<Radio.Group buttonStyle="solid" style={{ width: '100%' }}>
													<Radio.Button value="MALE" style={{ width: '50%', textAlign: 'center' }}>
														MALE
													</Radio.Button>
													<Radio.Button value="FEMALE" style={{ width: '50%', textAlign: 'center' }}>
														FEMALE
													</Radio.Button>
												</Radio.Group>
											</Form.Item>
										</Col>
										<Col span={12}>
											<Form.Item 
												name="blood_type"
												label="BLOOD GROUP" 
												rules={FIELD_RULES.bloodGroup}
											>
												<Select allowClear>
													<Option value="A+">A+</Option>
													<Option value="O+">O+</Option>
													<Option value="B+">B+</Option>
													<Option value="AB+">AB+</Option>
													<Option value="A-">A-</Option>
													<Option value="O-">O-</Option>
													<Option value="B-">B-</Option>
													<Option value="AB-">AB-</Option>
												</Select>
											</Form.Item>
										</Col>
									</Row>
									<Row gutter={12}>
										<Col span={12}>
											<ProvinceList 
												form={this.formRef}
												placeholder="PLEASE SELECT"
												onChange={this.onProvinceChange}
												rules={FIELD_RULES.province}
											/>
										</Col>
										<Col span={12}>
											<Form.Item shouldUpdate>
												{(form) => {
													return (
														<CityList 
															placeholder="PLEASE SELECT"
															provinceValue={form.getFieldValue('provinces')}
															onChange={this.onCityChange}
															rules={FIELD_RULES.city}
														/>
													);
												}}
											</Form.Item>
										</Col>
									</Row>
								</div>
							</Col>
							<Col span={1} style={{ textAlign: 'center' }}>
								<Divider className="divider" type="vertical" style={{ height: 550 }} />
							</Col>
							<Col span={7}>
								<div>
									<Form.Item shouldUpdate>
										{(form) => { 
											return (
												<TownList 
													placeholder="PLEASE SELECT"
													cityValue={form.getFieldValue('city')}
													fieldName="barangay"
													rules={FIELD_RULES.barangay}
												/>
											);
										}}
									</Form.Item>
									<Form.Item 
										name="address_line_1"
										label="HOUSE NO./UNIT/FLOOR NO. BLDG. NAME" 
										rules={FIELD_RULES.address}
									>
										<Input />
									</Form.Item>		
									<Form.Item 
										name="hospital" 
										label="HOSPITAL"
										rules={FIELD_RULES.hospital}
									>
										<Select allowClear>
											{HopitalList}
										</Select>
									</Form.Item>
									<Form.Item 
										label="PHYSICIAN" 
										name="physician"
										rules={FIELD_RULES.physician}
									>
										<Input />
									</Form.Item>
									<Form.Item 
										label="LICENSE NO." 
										name="license"
										rules={FIELD_RULES.license}
									>
										<Input />
									</Form.Item>
									<Form.Item label="PURPOSE" name="purpose">
										<TextArea rows={3} />
									</Form.Item>
								</div>
							</Col>
							<Col span={1} style={{ textAlign: 'center' }}>
								<Divider className="divider" type="vertical" style={{ height: 550 }} />
							</Col>
							<Col span={7}>
								<Form.Item 
									label="DATE NEEDED" 
									name="requested_date"
									rules={FIELD_RULES.dateNeeded}
								>
									<DatePicker 
										style={{ width: '100%' }} 
										disabledDate={(current) => current < moment().startOf('day')}
									/>
								</Form.Item>
								<div style={{ marginTop: 15 }}>
									<ProductTable 
										ref={this.productTableRef}
										form={this.formRef} 
									/>
								</div>
								<div style={{ marginTop: 10, textAlign: 'right' }}>
									<Link to="/">
										<Text><u>BACK</u></Text>
									</Link>
									<Button
										className="nav-btn-round"
										htmlType="submit"
										type="primary"
										loading={false}
										style={{ marginLeft: 20 }}
									>
										SUBMIT
									</Button>
								</div>
							</Col>
						</Row>
						
					</Form>
				</div>
			</div>
		);
	}   
}

export default withRouter(FillupRecipient);