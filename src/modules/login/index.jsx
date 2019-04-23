import React from 'react';
import { Row, Form, Icon, Input, Button, Layout, Col, Typography  } from 'antd';
import { Link } from "react-router-dom";

import 'antd/dist/antd.css';
import './login.css';

import { CompanyLogo } from '../../images';

const { Header, Content, } = Layout;
const { Title } = Typography;
  
class Login extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <Layout>
            <Header style={{ 'border-bottom': 'none' }} >
                <Row>
                    <Col span={24}>
                        <Icon type="left" />
                        <Link to="/" className="redirect-home" >Go back to homepage</Link>
                    </Col>
                </Row>
            </Header>
            <Content>
                <Row type="flex" align="middle">
                    <div className="login-form" >
                        <Row type="flex" justify="center" align="center">
                                <img src={CompanyLogo} alt="logo" style={{ height:45 }} />
                        </Row>
                        <Row style={{ height:10 }} ></Row>
                        <Row>
                            <Form onSubmit={this.handleSubmit} >
                                <Form.Item label="Username">
                                    {getFieldDecorator('userName', {
                                        rules: [{ required: true, message: 'Please input your username!' }],
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                                <Form.Item label="Password">
                                    {getFieldDecorator('password', {
                                        rules: [{ required: true, message: 'Please input your Password!' }],
                                    })(
                                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)', float:'right' }} />} type="password" />
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className="login-form-button" block>
                                        SIGN IN TO MY ACCOUNT
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Row>
                    </div>
                </Row>
            </Content>
            </Layout>
        );
    }
}

const LoginForm = Form.create({ name: 'normal_login' })(Login);

export default LoginForm;