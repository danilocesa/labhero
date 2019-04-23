import React from 'react';
import { Row, Form, Input, Button, Col, Typography, DatePicker, Select, Radio  } from 'antd';

import 'antd/dist/antd.css';
import './searchform.css';

const { Title } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

class SearchLabTestForm extends React.Component {
    render() {
        return(
           <Row type="flex" align="center">
            <Col span={20}>
            <Form> 
                <Row type="flex" justify="center"><Title level={3}>Search</Title></Row>
                <Row gutter={16}> 
                    <Col className="gutter-row" span={7}>
                        <Form.Item label="FROM DATE - TO DATE" className="gutter-box" >
                            <RangePicker size="large" />
                        </Form.Item>
                    </Col> 
                    <Col className="gutter-row" span={6}>   
                        <Form.Item label="STATUS" hasFeedback  className="gutter-box">
                            <Select size="large" placeholder="Please select a status">
                                <Option value=""></Option>
                                <Option value=""></Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={7}  className="gutter-row" >
                        <Form.Item label="PATIENT ID" className="gutter-box">
                            <Input size="large" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="FULL NAME">
                            <Input size="large" />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="FULL NAME">
                            <RadioGroup defaultValue="a" size="large">
                                <RadioButton value="a">Male</RadioButton>
                                <RadioButton value="b">Female</RadioButton>
                            </RadioGroup>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={7}  className="gutter-row">
                        <Form.Item label="BIRTHDAY" className="gutter-box">
                            <Input size="large" />
                        </Form.Item>
                    </Col> 
                    <Col span={6}  className="gutter-row">   
                        <Form.Item label="CITY ADDRESS" hasFeedback className="gutter-box">
                            <Select size="large" placeholder="Please select a city address">
                                <Option value=""></Option>
                                <Option value=""></Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row type="flex" justify="center" align="center">
                    <Form.Item>
                        <Button shape="round" size="large"> CLEAR </Button>
                        <Button type="primary" shape="round" size="large"> SEARCH </Button>
                    </Form.Item>
                </Row>
            </Form>  
            </Col>
           </Row> 
        )
    }
}

export default SearchLabTestForm;