import React from 'react';
import { Row, Form, Input, Button, Layout, Col, message, Spin } from 'antd';
// import { Link } from 'react-router-dom';
import axiosCall from 'services/axiosCall';
import auth from 'services/auth';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import './login.css';

import { CompanyLogo } from '../../images';

const { Header, Content } = Layout;

class Login extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			loading: false
		}
		this.handleUsernameChange=this.handleUsernameChange.bind(this);
		this.handlePasswordChange=this.handlePasswordChange.bind(this);
		this.handleSubmit=this.handleSubmit.bind(this);
	}
	
	handleUsernameChange=(event)=>{
		this.setState({username:event.target.value});
	}

	handlePasswordChange=(event)=>{
		this.setState({password:event.target.value});
	}

	handleSubmit = (event) => {
		event.preventDefault();

		this.setState({loading: true});
		// console.log(this.state.loading);

		const { username, password, userid } = this.state;

		this.props.form.validateFields(async (err) => {
			if (username !== '' && password!== '') {
				if (!err) {
					const response = await this.login(username, password, userid);
					if(response && response.status === 200) {
						sessionStorage.setItem('LOGGEDIN_USER_DATA',JSON.stringify(response.data));
						auth.authenticate();
						message.success('You are now successfully logged in!', 1.5);
						
						switch(sessionStorage.SELECTED_SIDER_KEY) {
							case '1':
								this.props.history.push("/");
								break;
							case '2':
								this.props.history.push("/request/create/step/1");
								break;
							case '3':
								this.props.history.push("/searchlabresult");
								break;
							case '4':
								this.props.history.push("/phleboresult");
								break;
							case '5':
								this.props.history.push("/searchpatient");
								break;
							case '6':
								this.props.history.push("/settings");
								break;
							default : 
								this.props.history.push("/");
								break;	
						}
					} 
					else {
						this.setState({loading: false});
						message.error('Incorrect Username/Password');
					}
				}
			} else {
				this.setState({loading: false});
				message.error('Enter Valid Username/Password');
			}
		});

	}

  login = async (userName, password, userID) => {
    let data = null;
    
    try{
			const body = { userName, password, userID };
			const response = await axiosCall({
				method: 'POST',
				url: 'lab/LogIn',
				data: body,
				headers: {
					'content-type': 'application/json',
					'authorization': `Bearer ${process.env.LAB_API_SECREY_KEY}`
				}
			});
			data = response;
    }
    catch(e) {
   		console.log("TCL: login -> e", e)
    }

    return data;
  }
	
  
  render() {
		// eslint-disable-next-line react/prop-types
		const { getFieldDecorator } = this.props.form;
	
		return (
			<Layout>
				<Spin spinning={this.state.loading}>
					<Header style={{ borderBottom: 'none' }}>
						<Row>
							<Col span={24}>
								{/* <Icon type="left" /> */}
								{/* <Link to="/" className="redirect-home">
									Go back to homepage
								</Link> */}
							</Col>
						</Row>
					</Header>
					<Content>
						<Row type="flex" align="middle">
							<div className="login-form">
								<Row type="flex" justify="center" align="middle">
									<img src={CompanyLogo} alt="logo" className="login-logo-image" />
								</Row>
								<Row>
									<Form onSubmit={this.handleSubmit}>
										<Form.Item label="Username" className="login-input font12">
											{getFieldDecorator('userName', {
												rules: [{ required: true, message: 'Please enter your username!' }],
											})(<Input onChange={this.handleUsernameChange} />)}
										</Form.Item>
										<Form.Item label="Password">
											{getFieldDecorator('password', {
												rules: [{ required: true, message: 'Please enter your password!' }],
											})(<Input.Password onChange={this.handlePasswordChange} type="password" />)}
										</Form.Item>
										<Form.Item style={{marginBottom:'0px'}}>
											<Button type="primary" htmlType="submit" className="login-form-button" block>
												SIGN IN TO MY ACCOUNT
											</Button>
										</Form.Item>
									</Form>
								</Row>
							</div>
						</Row>
					</Content>
				</Spin>
			</Layout>
		);
	}
}

Login.propTypes = {
	history:ReactRouterPropTypes.history.isRequired,
	form: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
}

Login.defaultProps = {
	form: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
}

const LoginForm = Form.create({ name: 'normal_login' })(Login);

export default LoginForm;
