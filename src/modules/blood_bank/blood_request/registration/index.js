import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import moment from 'moment';
import { Form, Input, Row, Col, Typography, DatePicker, Radio, Divider, Select, Button } from 'antd';
import { NumberInput } from 'shared_components/pattern_input';

import ProvinceList from 'shared_components/province_list';
import CityList from 'shared_components/city_list';
import TownList from 'shared_components/town_list';
import HouseAddress from 'shared_components/address';
import { formLabels, selectDefaultOptions, FIELD_RULES } from './constant';
import ProductTable from './product_table/';

import './form.css';

// CONSTANTS
const { Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;


class FillupRecipient extends React.Component{
	constructor(props){
		super(props);

		this.formRef = React.createRef();
		this.state = {
			patientAddress: {} 
		};
	}

	onProvinceChange = () => {
		this.setState({ 
			patientAddress: { 
				cityMunicipalityCode: null,
				townCode: null,
				houseAddress: null 
			} 
		});
	}

	onCityChange = () => {
		this.setState((state) => ({ 
			patientAddress: { 
				...state.patientAddress, 
				cityMunicipalityCode: null,
				townCode: null,
				houseAddress: null 
			} 
		}));
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

	onSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
			}
		});
	}

	render(){
		const { form } = this.props;
		const { patientAddress } = this.state;
		const { provinceCode, cityMunicipalityCode, townCode, houseAddress } = patientAddress;

		return(
			<div 
				style={{ marginTop: 50 }}
				className="blood-request-create-form"
			>
				<Form 
					ref={this.formRef} 
					labelCol={{ span: 24 }}
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
								<Form.Item 
									name="gender"
									label="PATIENT'S GENDER"
									rules={FIELD_RULES.gender}
								>
									<Radio.Group buttonStyle="solid">
										<Radio.Button value="MALE" style={{ width: 120, textAlign: 'center' }}>
											MALE
										</Radio.Button>
										<Radio.Button value="FEMALE" style={{ width: 120, textAlign: 'center' }}>
											FEMALE
										</Radio.Button>
									</Radio.Group>
								</Form.Item>
								<Form.Item label="BLOOD GROUP">
									<Select placeholder="Select your blood group" allowClear>
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
							</div>
						</Col>
						<Col span={1} style={{ textAlign: 'center' }}>
							<Divider className="divider" type="vertical" style={{ height: 450 }} />
						</Col>
						<Col span={7}>
							<div style={{ marginTop: 42 }}>
								<div>
									<ProvinceList
										required
										form={form}
										placeholder={selectDefaultOptions} 
										selectedProvince={provinceCode}
										onChange={this.onProvinceChange}
									/>
								</div>
								<div>
									<CityList 
										required
										form={form}
										placeholder={selectDefaultOptions} 
										selectedCity={cityMunicipalityCode}
										onChange={this.onCityChange}
									/>
								</div>
								<div>
									<TownList 
										required
										form={form}
										placeholder={selectDefaultOptions} 
										selectedTown={townCode}
									/>
								</div>
								<div>			
									<HouseAddress
										required 
										form={form}
										fieldLabel="HOUSE NO./UNIT/FLOOR NO.,BLDG NAME,"
										fieldName={formLabels.unitNo.fieldName}
										selectedValue={houseAddress}
									/>
								</div>		
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
								<ProductTable form={this.formRef} />
							</div>
						</Col>
					</Row>
					<Row style={{ marginTop: 10 }}>
						<Col sm={{ span: 12 }} md={{ span: 4, offset: 20 }}>
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
						</Col> 
					</Row>
				</Form>
			</div>
		);
	}   
}


export default withRouter(FillupRecipient);