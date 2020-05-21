/* eslint-disable react/prop-types */
import React from 'react'
import moment from 'moment'
import { withRouter } from 'react-router-dom'
import { Form, Input, Row, Col, Typography, DatePicker, Radio, Divider } from 'antd'

// CUSTOM MODULES
import ProvinceList from 'shared_components/province_list'
import CityList from 'shared_components/city_list'
import TownList from 'shared_components/town_list'
import HouseAddress from 'shared_components/address'
import { NumberInput } from 'shared_components/pattern_input'
import { FIELD_RULES, selectDefaultOptions, formLabels } from './constant'
import FormButtons from './form_buttons';

// CSS
import './form.css';

// CONSTANTS
const { Text } = Typography;

class BaseForm extends React.Component { 	
    state = {
		patientAddress: {} 
    };

	computeAge = (date) => {
		const years = Math.floor(moment().diff(date, 'years', true));
		const age = years > 0 ? years : '---';
	
		return age;
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

	handleSubmit = e => {
		e.preventDefault();
		// eslint-disable-next-line react/prop-types
		this.props.form.validateFields((err, values) => {
		  if (!err) {
			console.log("Received values of form: ", values);
		  }
		});
	  };
	
	onDateChange = (date) => {
		// eslint-disable-next-line react/prop-types
		const { setFieldsValue } = this.props.form;
		const patientAge = this.computeAge(date);

		setFieldsValue({ patientAge });
    }

	render() {
		const { form } = this.props;
		const { patientAddress } = this.state;
		const { getFieldsValue,getFieldDecorator } = form;
		const { provinceCode, cityMunicipalityCode, townCode, houseAddress } = patientAddress;
		const { 
			provinces: selectedProvinceCode, 
			city: selectedCityCode, 
			town: selectedTownCode
        } = getFieldsValue();


return (
	<div style={{ marginTop: 50 }}>
		<Form className="clr-fillup-form" onSubmit={this.handleSubmit} >
			<Row gutter={12}>
				<Col sm={7} md={7}>
					<div className="left-form">
						<div style={{ padding: '10px 0px' }}>
							<Text strong>PERSONAL INFORMATION</Text>
						</div>
							<Form.Item label="FIRST NAME">
								{getFieldDecorator('firstName', { rules: FIELD_RULES.firstName })(
										<Input />
								)}
							</Form.Item>
							<Form.Item label="MIDDLE NAME">
								{getFieldDecorator('middleName', { rules: FIELD_RULES.middleName })(
										<Input />
								)}
							</Form.Item>
						<Row gutter={12}>
							<Col span={18}>
							<Form.Item label="LAST NAME">
										{getFieldDecorator('lastName', { rules: FIELD_RULES.lastName })(
											<Input />
										)}
							</Form.Item>
							</Col>
							<Col span={6}>
							<Form.Item label="SUFFIX">
										{getFieldDecorator('suffix', { rules: FIELD_RULES.suffix })(
											<Input maxLength={1} />
										)}
							</Form.Item>
							</Col>
						</Row>
						<Row gutter={12}>
							<Col span={18}>
							<Form.Item label="DATE OF BIRTH">
								{getFieldDecorator('dateOfBirth', { 
									rules: FIELD_RULES.dateOfBirth
								})(
									<DatePicker 
										format="MM-DD-YYYY"
										style={{ width: '100%' }}
										onChange={this.onDateChange}
									/>
								)}
							</Form.Item>
							</Col>
							<Col span={6}>
							<Form.Item label="AGE">
								{getFieldDecorator('patientAge', { 
									rules: FIELD_RULES.age
								})(
									<Input disabled style={{ textAlign: 'center' }} />
								)}
							</Form.Item>
							</Col>
						</Row> 
						<Form.Item label="PATIENT'S GENDER">
							{getFieldDecorator('gender', { rules: FIELD_RULES.gender })(
								<Radio.Group buttonStyle="solid">
									<Radio.Button value="MALE">MALE</Radio.Button>
									<Radio.Button value="FEMALE">FEMALE</Radio.Button>
								</Radio.Group>
							)}
						</Form.Item>
					</div>
				</Col>
				<Col md={1} style={{ textAlign: 'center' }}>
					<Divider className="divider" type="vertical" style={{ height: 500 }} />
				</Col>
				<Col sm={7} md={7}>
					<div className="center-form" style={{marginTop:'40px'}}>
								<Form.Item>
									{getFieldDecorator('address', { rules: FIELD_RULES.address })(
										<ProvinceList
											required
											form={form}
											placeholder={selectDefaultOptions} 
											selectedProvince={provinceCode}
											onChange={this.onProvinceChange}
										/>
									)}
								</Form.Item>
								<Form.Item style={{marginTop:'-8px'}}>
									{getFieldDecorator('address', { rules: FIELD_RULES.address })(
										<CityList 
											required
											form={form}
											placeholder={selectDefaultOptions} 
											provinceValue={selectedProvinceCode || provinceCode}
											selectedCity={cityMunicipalityCode}
											onChange={this.onCityChange}
										/>
									)}
								</Form.Item>
								<Form.Item style={{marginTop:'-8px'}}>
									{getFieldDecorator('address', { rules: FIELD_RULES.address })(
										<TownList 
											required
											form={form}
											placeholder={selectDefaultOptions} 
											cityValue={selectedCityCode || cityMunicipalityCode}
											selectedTown={townCode}
										/>
									)}
								</Form.Item>
								<Form.Item style={{marginTop:'-8px'}}>
									{getFieldDecorator('address', { rules: FIELD_RULES.address })(
										<HouseAddress
											required 
											form={form}
											townValue={selectedTownCode || townCode}
											fieldLabel="HOUSE NO./UNIT/FLOOR NO.,BLDG NAME,"
											fieldName={formLabels.unitNo.fieldName}
											selectedValue={houseAddress}
										/>
									)}
								</Form.Item>
								<Form.Item label="CONTACT NUMBER" style={{marginTop:'-5px'}}>
										{getFieldDecorator('contactNumber', { rules: FIELD_RULES.contactNumber })(
												<NumberInput addonBefore="+ 63" />
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
				<FormButtons />
			</Row>
		</Form>
	</div>
);
	}
}


// const FillupForm = Form.create()(withRouter(BaseForm));

// export default FillupForm;

export default withRouter(BaseForm);