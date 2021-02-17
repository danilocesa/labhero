import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import moment from 'moment';
import { Form, Input, Row, Col, Typography, DatePicker, Radio, Divider, Select, Button } from 'antd';
import { NumberInput } from 'shared_components/pattern_input';
import PageTitle from 'shared_components/page_title';
import ProvinceList from 'shared_components/phase2_province';
import CityList from 'shared_components/phase2_city';
import TownList from 'shared_components/phase2_town';
import HouseAddress from 'shared_components/lh_address';
import { createBloodRecipient } from 'services/blood_bank/blood_recipient';
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
		console.log(formValues);
		console.log(this.productTableRef.current.getSelectedProducts())
		// await createBloodRecipient(formValues);
	}

	render(){

		return(
			<div>
				<PageTitle pageTitle="BLOOD REQUEST" />
				<div 
					style={{ marginTop: 50 }}
					className="blood-request-create-form"
				>
					<Form 
						ref={this.formRef} 
						layout="vertical"
						onFinish={this.onSubmit}
					>
						<Row justify="center" >
							<Col span={7}>
								<div>
									<div style={{ padding: '10px 0px' }}>
										<Text strong>PERSONAL INFORMATION</Text>
									</div>
									<Form.Item 
										name="firstname"
										label="FIRST NAME"
										rules={FIELD_RULES.firstName}
									>
										<Input />
									</Form.Item>
									<Form.Item 
										name="middlename"
										label="MIDDLE NAME"
										rules={FIELD_RULES.middleName}
									>
										<Input />
									</Form.Item>
									<Row gutter={12}>
										<Col span={18}>
											<Form.Item 
												name="lastname"
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
												name="dateOfBirth"
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
													name="patientAge"
													label="AGE"
												>
													<Input disabled style={{ textAlign: 'center' }} />
												</Form.Item>
											</Col>
									</Row> 
									<Form.Item 
										label="CONTACT NUMBER"
										rules={FIELD_RULES.contactNumber}
									>
										<NumberInput 
											maxLength={10} 
											addonBefore="+ 63"  
										/>
									</Form.Item>
									<Row>
										<Col span={18}>
											<Form.Item 
												name="gender"
												label="PATIENT'S GENDER"
												rules={FIELD_RULES.gender}
											>
												<Radio.Group buttonStyle="solid">
													<Radio.Button value="MALE" style={{ width: 130, textAlign: 'center' }}>
														MALE
													</Radio.Button>
													<Radio.Button value="FEMALE" style={{ width: 130, textAlign: 'center' }}>
														FEMALE
													</Radio.Button>
												</Radio.Group>
											</Form.Item>
										</Col>
										<Col span={6}>
											<Form.Item label="BLOOD GROUP">
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
								</div>
							</Col>
							<Col span={1} style={{ textAlign: 'center' }}>
								<Divider className="divider" type="vertical" style={{ height: 450 }} />
							</Col>
							<Col span={7}>
								<div style={{ marginTop: 42 }}>
									<Row gutter={12}>
										<Col span={12}>
											<ProvinceList 
												form={this.formRef}
												placeholder="PLEASE SELECT"
												onChange={this.onProvinceChange}
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
														/>
													);
												}}
											</Form.Item>
										</Col>
									</Row>
									
									<Form.Item shouldUpdate>
										{(form) => { 
											return (
												<TownList 
													placeholder="PLEASE SELECT"
													cityValue={form.getFieldValue('city')}
													fieldName="barangay"
												/>
											);
										}}
									</Form.Item>
									<Form.Item shouldUpdate>
										{(form) => {
											return (
												<HouseAddress 
													form={form}
													townValue={form.getFieldValue('town')}
													fieldLabel="HOUSE NO./UNIT/FLOOR NO.,BLDG NAME"
													fieldName="house"
												/>
											)
										}}
									</Form.Item>		
									<Form.Item label="HOSPITAL">
										<Input />
									</Form.Item>
									<Form.Item label="PHYSICIAN">
										<Input />
									</Form.Item>
									<Form.Item label="PURPOSE">
										<TextArea rows={3} />
									</Form.Item>
								</div>
							</Col>
							<Col span={1} style={{ textAlign: 'center' }}>
								<Divider className="divider" type="vertical" style={{ height: 450 }} />
							</Col>
							<Col span={7}>
								<div style={{ padding: '10px 0px' }}>
									<Text strong>PRODUCT REQUEST</Text>
								</div>
								<Form.Item label="DATE NEEDED">
									<DatePicker style={{ width: '100%' }} />
								</Form.Item>
								<div style={{ marginTop: 15 }}>
									<ProductTable 
										ref={this.productTableRef}
										form={this.formRef} 
									/>
								</div>
								<div style={{ marginTop: 10, textAlign: 'right' }}>
									{/* <Col sm={{ span: 12 }} md={{ span: 4, offset: 20 }}> */}
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
									{/* </Col>  */}
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