/* eslint-disable react/prop-types */
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';
import { Form, Input, Row, Col, Typography, DatePicker, Radio, Divider, Select } from 'antd';

// CUSTOM MODULES
import hospitalLocationAPI from 'services/lab_request/hospitalLocation';
import hospitalPhysiciansAPI from 'services/lab_request/hospitalPhysicians';
import ProvinceList from 'shared_components/province_list';
import CityList from 'shared_components/city_list';
import TownList from 'shared_components/town_list';
import HouseAddress from 'shared_components/address';
import { AlphaNumInput, NumberInput, RegexInput } from 'shared_components/pattern_input';
import { FIELD_RULES, selectDefaultOptions, formLabels } from './constant';

import FormButtons from './form_buttons';

// CSS
import './form.css';

// CONSTANTS
const { Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

class BaseForm extends React.Component { 	
	state = {
		hospitalLocationList: [],
		hospitalPhysicianList: [],
		isDisabledPersoFields: false,
		initialPersoValue: {},
		address: {}
	};

	componentDidMount() {
		this.populateLocation();
		this.populatePhysician();
	}

	populateLocation = async () => {
		const hospitalLocAPI = await hospitalLocationAPI();
		
		this.setState({ 
			hospitalLocationList : hospitalLocAPI
		});
	}

	populatePhysician = async () => {
		const hospitalPhyAPI = await hospitalPhysiciansAPI();

		this.setState({ 
			hospitalPhysicianList : hospitalPhyAPI
		});
	}

	computeAge = (date) => {
		const years = Math.floor(moment().diff(date, 'years', true));
		const age = years > 0 ? years : '---';
	
		return age;
	}

	onDateChange = (date) => {
		// eslint-disable-next-line react/prop-types
		const { setFieldsValue } = this.props.form;
		const patientAge = this.computeAge(date);

		setFieldsValue({ patientAge });
	}

	disabledDate = (current) => {
		// Prevent select days after today and today
		return current && current > moment().endOf('day');
	}

	onSubmit = (event) => {
		event.preventDefault();

		const { hospitalPhysicianList, hospitalLocationList } = this.state; 
		const { handleSubmit } = this.props;
		// eslint-disable-next-line react/prop-types
		const { getFieldsValue, validateFieldsAndScroll } = this.props.form;

		validateFieldsAndScroll((err) => {
			if (!err) {
				const fields = getFieldsValue();
				const physician = hospitalPhysicianList.find(item => item.physicianID === fields.physicianID);
				const location = hospitalLocationList.find(item => item.locationID === fields.locationID);

				fields.dateOfBirth = moment(fields.dateOfBirth).format('MM-DD-YYYY');
				fields.locationName = location.name;

				if(physician) {
					fields.physicianName = `${physician.namePrefix} `;
					fields.physicianName +=	`${physician.givenName} `; 
					fields.physicianName +=	`${physician.middleName}. `;
					fields.physicianName +=	`${physician.lastName}`;
				}
				
				// Uppercase all fields
				Object.keys(fields).forEach(key => {
					const fieldValue = fields[key];
					fields[key] = (typeof fieldValue === 'string') ? fieldValue.toUpperCase() : fieldValue;
				});

				handleSubmit(fields);
			}
		});
	}

	onProvinceChange = () => {
		this.setState((state) => ({ 
			address: { 
				...state.address, 
				cityMunicipalityCode: null,
				townCode: null,
				houseAddress: null 
			} 
		}));
	}

	onCityChange = () => {
		this.setState((state) => ({ 
			address: { 
				...state.address, 
				townCode: null,
				houseAddress: null 
			} 
		}));
	}

	render() {
		const { 
			isDisabledPersoFields, 
			initialPersoValue, 
			hospitalPhysicianList, 
			hospitalLocationList,
			address 
		} = this.state;
		
		const { isLoading, form } = this.props;
		const { getFieldDecorator, getFieldsValue } = form;
		const { 
			provinces: selectedProvinceCode, 
			city: selectedCityCode, 
			town: selectedTownCode
		} = getFieldsValue();
		
		const LocationList = hospitalLocationList.map((item) => (
			<Option value={item.locationID} key={item.locationID}>
				{item.name}
			</Option>
		));

		const PhysicianList = hospitalPhysicianList.map((item) => (
			<Option value={item.physicianID} key={item.physicianID}>
				{`${item.givenName} ${item.lastName}`}
			</Option>
		));

		return (
			<div style={{ marginTop: 50 }}>
				<Form className="clr-fillup-form" onSubmit={this.onSubmit}>
					<Row gutter={12}>
						<Col sm={7} md={7}>
							<div className="left-form">
								<div style={{ padding: '10px 0px' }}>
									<Text strong>PERSONAL INFORMATION</Text>
								</div>
								<Form.Item label={formLabels.firstName}>
									{getFieldDecorator('givenName', { 
										rules: FIELD_RULES.givenName, 
										initialValue: initialPersoValue.givenName
									})(
										<RegexInput 
											regex={/[A-Za-z0-9-. ]/}  
											disabled={isDisabledPersoFields} 
											maxLength={50} 
										/>
									)}
								</Form.Item>
								<Form.Item label={formLabels.middleName}>
									{getFieldDecorator('middleName', { 
										rules: FIELD_RULES.middleName,
										initialValue: initialPersoValue.middleName
									})(
										<RegexInput 
											regex={/[A-Za-z0-9-. ]/}  
											disabled={isDisabledPersoFields} 
											maxLength={15} 
										/>
									)}
								</Form.Item>
								<Row gutter={12}>
									<Col span={18}>
										<Form.Item label={formLabels.lastName}>
											{getFieldDecorator('lastName', { 
												rules: FIELD_RULES.lastName,
												initialValue: initialPersoValue.lastName 
											})(
												<RegexInput 
													regex={/[A-Za-z0-9-. ]/}  
													disabled={isDisabledPersoFields} 
													maxLength={50} 
												/>
											)}
										</Form.Item>
									</Col>
									<Col span={6}>
										<Form.Item label={formLabels.suffix}>
											{getFieldDecorator('nameSuffix', { 
												rules: FIELD_RULES.suffix, 
												initialValue: initialPersoValue.suffix
											})(
												<RegexInput 
													regex={/[A-z0-9 -]/} 
													disabled={isDisabledPersoFields} 
													maxLength={5} 
												/>
											)}
										</Form.Item>
									</Col>
								</Row>
								<Row gutter={12}>
									<Col span={18}>
										<Form.Item label={formLabels.dateOfBirth}>
											{getFieldDecorator('dateOfBirth', { 
												rules: FIELD_RULES.dateOfBirth,
												initialValue: initialPersoValue.dateOfBirth
											})(
												<DatePicker 
													format="MM-DD-YYYY"
													disabledDate={this.disabledDate}
													style={{ width: '100%' }}
													onChange={this.onDateChange}
													disabled={isDisabledPersoFields}
												/>
											)}
										</Form.Item>
									</Col>
									<Col span={6}>
										<Form.Item label={formLabels.age}>
											{getFieldDecorator('patientAge', { 
												rules: FIELD_RULES.age,
												initialValue: initialPersoValue.patientAge
											})(
												<Input disabled style={{ textAlign: 'center' }} />
											)}
										</Form.Item>
									</Col>
								</Row>
                                        <Form.Item label={formLabels.contactNumber}>
                                            {getFieldDecorator('contactNumber', { 
                                                rules: FIELD_RULES.contactNumber,
                                                initialValue: initialPersoValue.contactNumber
                                            })(
                                                <NumberInput 
                                                    addonBefore="+ 63" 
                                                    maxLength={10} 
                                                    disabled={isDisabledPersoFields}
                                                />
                                            )}
                                        </Form.Item> 
							</div>
						</Col>
						<Col md={1} style={{ textAlign: 'center' }}>
							<Divider className="divider" type="vertical" style={{ height: 500 }} />
						</Col>
						<Col sm={7} md={7}>
							<div className="center-form">
								<div style={{ padding: '10px 0px' }}>
									<Text strong>LOCATION AND GENDER</Text>
								</div>
								<Row>
									<Col>
										<ProvinceList 
											form={form}
											placeholder={selectDefaultOptions}
											selectedProvince={address.provinceCode}
											disabled={isDisabledPersoFields}
											onChange={this.onProvinceChange}
										/>
									</Col>
								</Row>
								<Row>
									<Col>
										<CityList 
											form={form}
											placeholder={selectDefaultOptions}
											provinceValue={selectedProvinceCode || address.cityMunicipalityCode}
											selectedCity={address.cityMunicipalityCode}
											disabled={isDisabledPersoFields}
											onChange={this.onCityChange}
										/>
									</Col>
								</Row>
								<Row>
									<Col>
										<TownList 
											form={form}
											placeholder={selectDefaultOptions}
											cityValue={selectedCityCode || address.townCode}
											selectedTown={address.townCode}
											disabled={isDisabledPersoFields}
										/>
									</Col>
								</Row>						
								<Row>
									<Col>
										<HouseAddress 
											form={form}
											townValue={selectedTownCode}
											fieldLabel="HOUSE NO./UNIT/FLOOR NO.,BLDG NAME,"
											fieldName={formLabels.unitNo.fieldName}
											selectedValue={address.houseAddress}
											disabled={isDisabledPersoFields}
										/>
									</Col>
								</Row>
								<Form.Item label="GENDER">
									{getFieldDecorator('sex', { 
										rules: FIELD_RULES.gender, 
										initialValue: initialPersoValue.sex
									})(
										<Radio.Group buttonStyle="solid" disabled={isDisabledPersoFields}>
											<Radio.Button value="MALE" className="gender-radio-btn">
												MALE
											</Radio.Button>
											<Radio.Button value="FEMALE" className="gender-radio-btn">
												FEMALE
											</Radio.Button>
										</Radio.Group>
									)}
								</Form.Item>
							</div>
						</Col>
						<Col md={1} style={{ textAlign: 'center' }}>
							<Divider className="divider" type="vertical" style={{ height: 500 }} />
						</Col>
						<Col sm={7} md={7}>
							<div className="right-form">
                            <div style={{ padding: '10px 0px' }}>
                                        <Text strong>HEALTH INFORMATION</Text>
                            </div>
                                    <Form.Item label="BODY WEIGHT">
                                        {getFieldDecorator('bodyWeight', { rules: FIELD_RULES.bodyWeight })(
                                                <NumberInput />
                                        )}
                                    </Form.Item>
                                    <Form.Item label="PULSE RATE">
                                        {getFieldDecorator('pulseRate', { rules: FIELD_RULES.pulseRate })(
                                                <NumberInput />
                                        )}
                                    </Form.Item>
                                    <Form.Item label="BLOOD PRESSURE">
                                        {getFieldDecorator('bloodPressure', { rules: FIELD_RULES.bloodPressure })(
                                                <NumberInput />
                                        )}
                                    </Form.Item>
                                    <Form.Item label="HEMOGLOBIN COUNT">
                                        {getFieldDecorator('hemoglobin', { rules: FIELD_RULES.hemoglobin })(
                                                <NumberInput />
                                        )}
                                    </Form.Item>
                                    <Form.Item label="BODY TEMPERATURE">
                                        {getFieldDecorator('bodyTemperature', { rules: FIELD_RULES.bodyTemperature })(
                                                <NumberInput />
                                        )}
                                    </Form.Item>
                                    <Form.Item label="WEIGHT OF BAG">
                                        {getFieldDecorator('bagWeight', { rules: FIELD_RULES.bagWeight })(
                                                <NumberInput />
                                        )}
                                    </Form.Item>
							</div>
						</Col>
					</Row>
					<Row>
						<FormButtons isLoading={isLoading} />
					</Row>
				</Form>
			</div>
		);
	}
}

BaseForm.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	location: ReactRouterPropTypes.location.isRequired,
	isLoading: PropTypes.bool.isRequired
};

const FillupForm = Form.create()(withRouter(BaseForm));

export default FillupForm;
