import React from 'react';
import { Row, Form, Icon, Input, Button, Layout, Col } from 'antd';
import { Link } from 'react-router-dom';
import axiosCall from 'services/axiosCall';

import './login.css';

import { CompanyLogo } from '../../images';

const { Header, Content } = Layout;

class Login extends React.Component {
  constructor(props) {
		super(props);
		this.handleUsernameChange=this.handleUsernameChange.bind(this);
		this.handlePasswordChange=this.handlePasswordChange.bind(this);
		this.handleSubmit=this.handleSubmit.bind(this);
    this.state={
      username: '',
      password: ''
		}
		this.userState={
			username: 'Nicole',
			password: '12345'
		}
	}

	componentWillMount(){
		
	}
	
	handleUsernameChange=(event)=>{
		this.setState({username:event.target.value});
	}

	handlePasswordChange=(event)=>{
		this.setState({password:event.target.value});
	}

	handleSubmit=(event)=>{
		if(this.state.username===this.userState.username && this.state.password===this.userState.password){
			event.preventDefault();
			this.props.form.validateFields((err, values) => {
				if (!err) {
				 console.log('Received values of form: ', values);
				 alert("Welcome");
				 }
			 });
		} else {
			alert("Wrong");
		}
	}

	
  
		render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<Layout>
				<Header style={{ borderBottom: 'none' }}>
					<Row>
						<Col span={24}>
							<Icon type="left" />
							<Link to="/" className="redirect-home">
								Go back to homepage
							</Link>
						</Col>
					</Row>
				</Header>
				<Content>
					<Row type="flex" align="middle">
						<div className="login-form">
							<Row type="flex" justify="center" align="center">
								<img src={CompanyLogo} alt="logo" style={{ height: 45 }} />
							</Row>
							<Row style={{ height: 10 }} />
							<Row>
								<Form>
									<Form.Item label="Username">
										{getFieldDecorator('userName', {
											rules: [{ required: true, message: 'Please input your username!' }],
										})(<Input onChange={this.handleUsernameChange} />)}
									</Form.Item>
									<Form.Item label="Password">
										{getFieldDecorator('password', {
											rules: [{ required: true, message: 'Please input your Password!' }],
										})(<Input.Password onChange={this.handlePasswordChange} placeholder="input password" type="password" />)}
									</Form.Item>
									<Form.Item>
										<Button type="primary" htmlType="submit" className="login-form-button" onClick={this.handleSubmit} block>
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
