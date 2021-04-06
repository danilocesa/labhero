import React, { useRef, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Form, Input, Button, Layout, Col, Spin } from 'antd';
import { CompanyLogo } from 'images';
import auth from 'services/login/auth';
import login from 'services/login/login';
import { LOGGEDIN_USER_DATA, ACCESS_MATRIX } from 'global_config/constant-global';
import URI from 'global_config/uri';
import { AlphaNumInput } from 'shared_components/pattern_input';
import Message from 'shared_components/message';
import { UserAccessContext } from 'context/userAccess';
import FIELD_RULES from './constants';
import cryptr from 'cryptr';

import './login.css';

const { Header, Content } = Layout;

function Login() {
	const formRef = useRef();
	const history = useHistory();
	const crypt = new cryptr(process.env.REACT_APP_CRYPTR_KEY);
	const { defineUserAccess } = useContext(UserAccessContext);
	const [loading, setLoading] = useState(false);
 

	async function handleSubmit() {
		const { getFieldsValue } = formRef.current;
		const { username, password } = getFieldsValue();
		
		try {
			setLoading(true);
			const response = await login(username, password);
		
			const loggedinUserData = {
				...response.data,
				secret: crypt.encrypt(password)
			};
			
			// @ts-ignore
			const { accessRights } = response.data;
			
			defineUserAccess({ 
				accessMatrix: accessRights, 
				userData: loggedinUserData 
			});

			sessionStorage.setItem(LOGGEDIN_USER_DATA, JSON.stringify(loggedinUserData));
			sessionStorage.setItem(ACCESS_MATRIX, JSON.stringify(accessRights));

			Message.success({ message: 'You are now successfully logged in!' });

			auth.authenticate();
			redirectPage();
		}
		catch(error) {
			if(error.response && error.response.status === 401)
				Message.error('Incorrect Username/Password');
			else
				Message.error();
		}
		finally {
			setLoading(false);
		}
	}
	
	function redirectPage() {
		// Redirect to current session module or to dashboard module
		let selectedLink = URI.dashboard.link;


		Object.keys(URI).forEach(k => {
			if(URI[k].key.toString() === sessionStorage.SELECTED_SIDER_KEY)
				selectedLink = URI[k].link;
		});

		history.push(selectedLink); 
	}
	

  
	return (
		<Layout>
			<Spin spinning={loading}>
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
							onFinish={handleSubmit} 
							ref={formRef} 
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


export default Login;
