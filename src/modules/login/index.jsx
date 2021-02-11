import React from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Form, Input, Button, Layout, Col, Spin } from 'antd';
import { CompanyLogo } from 'images';
import auth from 'services/login/auth';
import login from 'services/login/login';
import { LOGGEDIN_USER_DATA } from 'global_config/constant-global';
import URI from 'global_config/uri';
import { AlphaNumInput } from 'shared_components/pattern_input';
import Message from 'shared_components/message';
import FIELD_RULES from './constants';

import './login.css';


const { Header, Content } = Layout;

class Login extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
			loading: false
		}

		this.formRef = React.createRef();
	}

	handleSubmit = async () => {
		const { username, password } = this.formRef.current.getFieldsValue();
		
		try {
			this.setState({ loading: true });
			const response = await login(username, password);
			this.setState({ loading: false });
		
			const loggedinUserData = {
				...response.data,
				password
			};
			
			sessionStorage.setItem(LOGGEDIN_USER_DATA, JSON.stringify(loggedinUserData));
			Message.success({ message: 'You are now successfully logged in!' });

			auth.authenticate();
			this.redirectPage();
		}
		catch(error) {
				this.setState({ loading: false });
				if(error.response && error.response.status === 401)
					Message.error('Incorrect Username/Password');
				else
					Message.error();
		}
	}
	
	redirectPage = () => {
		// Redirect to current session module or to dashboard module
		let selectedLink = URI.dashboard.link;

		Object.keys(URI).forEach(k => {
			if(URI[k].key.toString() === sessionStorage.SELECTED_SIDER_KEY)
				selectedLink = URI[k].link;
		});

		this.props.history.push('/dashboard'); 
	}
	

  render() {
		return (
			<Layout>
				<Spin spinning={this.state.loading}>
					<Header style={{ borderBottom: 'none' }}>
						<Row>
							<Col span={24} />
						</Row>
					</Header>
					<Content>
						<div className="login-form">
							<div style={{ textAlign: 'center' }}>
								<img src={CompanyLogo} alt="logo" className="login-logo-image" />
							</div>
							<Form 
								onFinish={this.handleSubmit} 
								ref={this.formRef} 
								layout="vertical"
							>
								<Form.Item 
									name="username" 
									label="Username" 
									className="login-input font12"
									rules={FIELD_RULES.Username}
								>
									<AlphaNumInput maxLength={20} />
								</Form.Item>
								<Form.Item 
									name="password" 
									label="Password"
									rules={FIELD_RULES.password}
								>
									<Input.Password type="password" maxLength={20} />
								</Form.Item>
								<Form.Item style={{ marginBottom: 0 }}>
									<Button type="primary" htmlType="submit" className="login-form-button" block>
										SIGN IN TO MY ACCOUNT
									</Button>
								</Form.Item>
							</Form>
						</div>
					</Content>
				</Spin>
			</Layout>
		);
	}
}




export default withRouter(Login);
