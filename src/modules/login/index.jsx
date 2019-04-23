import React from 'react';
import { Row, Form, Icon, Input, Button, Col } from 'antd';

import 'antd/dist/antd.css';
import './login.css';

import { CompanyLogo } from '../../images';

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
                                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />
                                )}
                            </Form.Item>
                            <Form.Item label="Password">
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: 'Please input your Password!' }],
                                })(
                                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" />
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
        );
    }
}

const LoginForm = Form.create({ name: 'normal_login' })(Login);

export default LoginForm;