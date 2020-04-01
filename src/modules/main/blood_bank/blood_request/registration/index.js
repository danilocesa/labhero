import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { Form, Input, Row, Col, Typography, DatePicker, Radio, Divider, Select } from 'antd';
import { NumberInput } from 'shared_components/pattern_input';

// CUSTOM MODULES
import FormButtons from './form_buttons';
import FIELD_RULES from './constant';

import './form.css';

// CONSTANTS
const { Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

class FillupRecipient extends React.Component{

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
        // eslint-disable-next-line react/prop-types
        const { getFieldDecorator } = this.props.form;
        return(
            <div>
                <div style={{ marginTop: 50 }}>
                    <Form className="fillup-form" onSubmit={this.onSubmit}>
                        <Row gutter={12}>
                            <Col sm={12} md={11}>
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
                                    <Form.Item label="CONTACT NUMBER">
                                        {getFieldDecorator('contactNumber', { rules: FIELD_RULES.contactNumber })(
                                                <NumberInput addonBefore="+ 63"  />
                                        )}
                                    </Form.Item>
                                    <Form.Item label="EMAIL">
                                        {getFieldDecorator('email', { rules: FIELD_RULES.email })(
                                                <Input />
                                        )}
                                    </Form.Item>
                                    <Form.Item label="ADDRESS">
                                        {getFieldDecorator('address', { rules: FIELD_RULES.adress })(
                                                <Input />
                                        )}
                                    </Form.Item>
                                    
                                </div>
                            </Col>
                            <Col md={2} style={{ textAlign: 'center' }}>
                                <Divider className="divider" type="vertical" style={{ height: 500 }} />
                            </Col>
                            <Col sm={12} md={11}>
                                <div className="right-form">
                                    <div style={{ padding: '20px 0px' }}>
                                    </div>
                                    <Form.Item label="PATIENT'S GENDER">
                                        {getFieldDecorator('gender', { rules: FIELD_RULES.gender })(
                                            <Radio.Group buttonStyle="solid">
                                                <Radio.Button value="MALE">MALE</Radio.Button>
                                                <Radio.Button value="FEMALE">FEMALE</Radio.Button>
                                            </Radio.Group>
                                        )} 
                                    </Form.Item>
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
                                    <Form.Item label="BLOOD GROUP">
                                        {getFieldDecorator('bloddGroup', { 
                                                rules: FIELD_RULES.bloodGroup
                                            })(
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
                                        )}
                                    </Form.Item>
                                    <Form.Item label="UNIT OF BLOOD">
                                        {getFieldDecorator('bloodBag', { rules: FIELD_RULES.bloodBag })(
                                                <NumberInput />
                                        )}
                                    </Form.Item>
                                    <Form.Item label="REQUIRED DATE">
                                        {getFieldDecorator('requiredDate', { rules: FIELD_RULES.requiredDate })(
                                            <DatePicker 
                                               format="MM-DD-YYYY"
                                               style={{ width: '100%' }}
                                            />
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
            </div>
        );
    }   
}


FillupRecipient.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	location: ReactRouterPropTypes.location.isRequired
};

const RecipientForm = Form.create()(withRouter(FillupRecipient));

export default RecipientForm;
// export default FillupRecipient;