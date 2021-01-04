import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { Form, Input, Row, Col, Typography, DatePicker, Radio, Divider, Select } from 'antd';
import { NumberInput } from 'shared_components/pattern_input';

// CUSTOM MODULES

import ProvinceList from 'shared_components/province_list';
import CityList from 'shared_components/city_list';
import TownList from 'shared_components/town_list';
import HouseAddress from 'shared_components/address';
import FormButtons from './form_buttons';
import {
    formLabels,
    FIELD_RULES,
    selectDefaultOptions
} from './constant';


import './form.css';

// CONSTANTS
const { Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

class FillupRecipient extends React.Component{
    state = {
		patientAddress: {} 
    };
    
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
		// eslint-disable-next-line react/prop-types
		const { setFieldsValue } = this.props.form;
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
            <div style={{ marginTop: 50 }}>
            <Form className="clr-fillup-form">
                <Row gutter={12}>
                    <Col sm={7} md={7}>
                        <div className="left-form">
                            <div style={{ padding: '10px 0px' }}>
                                <Text strong>PERSONAL INFORMATION</Text>
                            </div>
                                <Form.Item label="FIRST NAME">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="MIDDLE NAME">
                                            <Input />
                                </Form.Item>
                            <Row gutter={12}>
                                <Col span={18}>
                                <Form.Item label="LAST NAME">
                                      <Input />
                                </Form.Item>
                                </Col>
                                <Col span={6}>
                                <Form.Item label="SUFFIX">
                                    <Input maxLength={1} />
                                </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={12}>
                                <Col span={18}>
                                <Form.Item label="DATE OF BIRTH">
                                        <DatePicker 
                                            format="MM-DD-YYYY"
                                            style={{ width: '100%' }}
                                            onChange={this.onDateChange}
                                        />
                                </Form.Item>
                                </Col>
                                <Col span={6}>
                                <Form.Item label="AGE">
                                        <Input disabled style={{ textAlign: 'center' }} />
                                </Form.Item>
                                </Col>
                            </Row> 
                            <Form.Item label="PATIENT'S GENDER">
                                    <Radio.Group buttonStyle="solid">
                                        <Radio.Button value="MALE">MALE</Radio.Button>
                                        <Radio.Button value="FEMALE">FEMALE</Radio.Button>
                                    </Radio.Group>
                            </Form.Item>
                        </div>
                    </Col>
                    <Col md={1} style={{ textAlign: 'center' }}>
                        <Divider className="divider" type="vertical" style={{ height: 450 }} />
                    </Col>
                    <Col sm={7} md={7}>
                        <div className="center-form" style={{marginTop:'40px'}}>
                            <Row>
                                <Col>
                                    <Form.Item style={{marginTop:'-1spx'}}>
                                            <ProvinceList
                                                required
                                                form={form}
                                                placeholder={selectDefaultOptions} 
                                                selectedProvince={provinceCode}
                                                onChange={this.onProvinceChange}
                                            />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Item style={{marginTop:'-8px'}}>
                                            <CityList 
                                                required
                                                form={form}
                                                placeholder={selectDefaultOptions} 
                                                selectedCity={cityMunicipalityCode}
                                                onChange={this.onCityChange}
                                            />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Item style={{marginTop:'-8px'}}>
                                            <TownList 
                                                required
                                                form={form}
                                                placeholder={selectDefaultOptions} 
                                                selectedTown={townCode}
                                            />
                                    </Form.Item>
                                </Col>
                            </Row>						
                            <Row>
                                <Col>
                                    <Form.Item style={{marginTop:'-8px'}}>
                                            <HouseAddress
                                                required 
                                                form={form}
                                                fieldLabel="HOUSE NO./UNIT/FLOOR NO.,BLDG NAME,"
                                                fieldName={formLabels.unitNo.fieldName}
                                                selectedValue={houseAddress}
                                            />
                                    </Form.Item>
                                </Col>
                            </Row>
                                    <Form.Item label="CONTACT NUMBER" style={{marginTop:'-8px'}}>
                                              <NumberInput addonBefore="+ 63" />
                                    </Form.Item>
                        </div>
                    </Col>
                    <Col md={1} style={{ textAlign: 'center' }}>
                        <Divider className="divider" type="vertical" style={{ height: 450 }} />
                    </Col>
                    <Col sm={7} md={7}>
                        <div className="right-form">
                        <div style={{ padding: '10px 0px' }}>
                                    <Text strong>HEALTH INFORMATION</Text>
                        </div>
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
                        <Form.Item label="UNIT OF BLOOD">
                            <NumberInput />
                                    </Form.Item>
                                    <Form.Item label="REQUIRED DATE">
                                        <DatePicker 
                                               format="MM-DD-YYYY"
                                               style={{ width: '100%' }}
                                            />
                                    </Form.Item>
                        </div>
                    </Col>
                </Row>
            </Form>
            </div>
            );
    }   
}



// const RecipientForm = Form.create()(withRouter(FillupRecipient));

// export default RecipientForm;
export default withRouter(FillupRecipient);