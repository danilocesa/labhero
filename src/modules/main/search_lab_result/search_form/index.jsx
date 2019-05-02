import React from 'react';
import { Row, Form, Input, Button, Col, Typography, Select, Radio, DatePicker } from 'antd';
import { withRouter  } from "react-router-dom";
import ReactDatePicker from "../../../../shared_components/DatePicker";

//CSS
import './searchform.css';
// import "react-datepicker/dist/react-datepicker.css";

//Constant
const { Title } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

class SearchLabTestForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date()
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
        this.setState({
            startDate: date
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, fieldsValue) => {
          if (!err) {
            // this.props.history.push('/dashboard');
            console.log('Received values of form: ', fieldsValue);
            return;
          }
          const values = {
            'date-picker': fieldsValue['date-picker'].format('YYYY-MM-DD'),
          };
          console.log('Received values of form: ', values);
        });
    }

    handleChange(date) {
        this.setState({
          startDate: date
        });
    }

    handleReset = (e) => {
        console.log(e);
        document.getElementById("searchlabtestresultform").reset();
        // this.props.form.resetFields();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <Row type="flex" justify="center" align="middle" style={{ paddingBottom: '1em' }} >
            <Col sm={22} xs={24} > 
                <Form onSubmit={this.handleSubmit} id="searchlabtestresultform" > 
                    <Row type="flex" align="middle" justify="center">
                        <Title level={3}>Search</Title>
                    </Row>
                    <Row type="flex" align="top" gutter={24}> 
                        <Col className="gutter-row" lg={8} md={8} sm={10} xs={24}>
                            <Form.Item label="DATE CATEGORY" className="gutter-box">
                                <RadioGroup buttonStyle="solid">
                                    <RadioButton value="a">REQUEST</RadioButton>
                                    <RadioButton value="b">VERIFY</RadioButton>
                                    <RadioButton value="c">CHECK-IN</RadioButton>
                                </RadioGroup>
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" lg={8} md={8} sm={10} xs={24} >
                            <Form.Item label="FROM DATE - TO DATE" className="gutter-box" >
                                <RangePicker allowClear="true" style={{ width:'100%' }} />
                            </Form.Item>
                        </Col> 
                        <Col className="gutter-row" lg={8} md={8} sm={10} xs={24}>   
                            <Form.Item label="STATUS" hasFeedback  className="gutter-box">
                                <Select placeholder="Please select a status" style={{ width: "100%" }} allowClear="true" >
                                    <Option value=""></Option>
                                    <Option value=""></Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row type="flex" align="top" gutter={24} >
                        <Col lg={8} md={8} sm={10} xs={24}  className="gutter-row" xs={24} >
                            <Form.Item label="PATIENT ID" className="gutter-box">
                                <Input allowClear='true' />
                            </Form.Item>
                        </Col>
                        <Col lg={8} md={8} sm={10} xs={24} >
                            <Form.Item label="PATIENT NAME" className="gutter-box">
                                {getFieldDecorator('PatientName', {
                                    rules: [
                                        { max: 100, message: 'Less than 100 characters only!' },
                                        { pattern: '^[a-zA-Z0-9äöüÄÖÜ]*$', message: 'Special character not allowed!' }
                                    ],
                                })(
                                    <Input id="PatientName" allowClear='true' />
                                )}
                            </Form.Item>
                        </Col>
                        <Col lg={8} md={8} sm={10} xs={24}  className="gutter-row" xs={24} >
                            <Form.Item label="SAMPLE ID" className="gutter-box">
                                <Input allowClear='true' />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24} type="flex" align="bottom" gutter={24}>
                        <Col lg={8} md={8} sm={12} xs={24}  className="gutter-row">   
                            <Form.Item label="ADDRESS" hasFeedback className="gutter-box">
                                <Select placeholder="Please select address" style={{ "width": "100%" }} allowClear="true" >
                                    <Option value=""></Option>
                                    <Option value=""></Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col lg={8} md={8} sm={8} xs={24}  className="gutter-row">
                            <Row type="flex" justify="space-between">
                                <Col className="gutter-row" span={8}>
                                    <Form.Item label="DATE OF BIRTH" className="gutter-box" >
                                        <ReactDatePicker />
                                    </Form.Item>
                                </Col>    
                                <Col className="gutter-row">
                                    <Form.Item label="GENDER" className="gutter-box">
                                        <RadioGroup buttonStyle="solid">
                                            <RadioButton value="a">MALE</RadioButton>
                                            <RadioButton value="b">FEMALE</RadioButton>
                                        </RadioGroup>
                                    </Form.Item>
                                </Col>
                            </Row>    
                        </Col>
                        <Col lg={6} className="gutter-row">
                            <Row gutter={6} type="flex" justify="end">
                                <Col className="gutter-row">
                                    <Form.Item>
                                        <Button shape="round" onClick={this.handleReset}> CLEAR </Button>
                                    </Form.Item>
                                </Col>
                                <Col className="gutter-row">
                                    <Form.Item>
                                        <Button type="primary" shape="round" htmlType="submit"> SEARCH </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Form> 
            </Col>   
            </Row>
        )
    }
}

const WrappedSearchLabTestForm = Form.create({ name: 'searchlabtestform' })(SearchLabTestForm);

export default withRouter(WrappedSearchLabTestForm);