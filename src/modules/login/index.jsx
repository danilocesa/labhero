import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Row, Form, Input, Button, Layout, Col, message, Spin } from 'antd';
import auth from 'services/login/auth';
import login from 'services/login/login';
import { LOGGEDIN_USER_DATA } from 'global_config/constant-global';
import URI from 'global_config/uri';
import { AlphaNumInput } from 'shared_components/pattern_input';
import FIELD_RULES from './constants';

import './login.css';

import { CompanyLogo } from '../../images';

const { Header, Content } = Layout;

class Login extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
			loading: false
		}
	}

	handleSubmit = (event) => {
		event.preventDefault();

		const { username, password } = this.props.form.getFieldsValue();

		this.setState({ loading: true });

		this.props.form.validateFields(async (err) => {
			if (!err) {
				const response = await login(username, password);

				this.setState({ loading: false });

				if(response && response.status === 200) {
					const loggedinUserData = {
						...response.data,
						password
					};
					
					sessionStorage.setItem(LOGGEDIN_USER_DATA, JSON.stringify(loggedinUserData));
					message.success('You are now successfully logged in!', 1.5);
					auth.authenticate();
					this.redirectPage();
				} 
				else {
					message.error('Incorrect Username/Password');
					this.setState({ loading: false });
				}
			}
		});

		
	}
	
	redirectPage = () => {
		// Redirect to current session module or to dashboard module
		let selectedLink = URI.dashboard.link;

		Object.keys(URI).forEach(k => {
			if(URI[k].key.toString() === sessionStorage.SELECTED_SIDER_KEY)
				selectedLink = URI[k].link;
		});

		Object.keys(URI.inventory.sub).forEach(k => {
			if(URI.inventory.sub[k].key.toString() === sessionStorage.SELECTED_SIDER_KEY)
				selectedLink = URI.inventory.sub[k].link;
		});

		this.props.history.push(selectedLink); 
	}
	

  render() {
		// eslint-disable-next-line react/prop-types
		const { getFieldDecorator } = this.props.form;
	
		return (
			<Layout>
				<Spin spinning={this.state.loading}>
					<Header style={{ borderBottom: 'none' }}>
						<Row>
							<Col span={24} />
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
											{getFieldDecorator('username', { 
												rules: FIELD_RULES.Username,
											})(
												<AlphaNumInput maxLength={20} />
											)}
										</Form.Item>
										<Form.Item label="Password">
											{getFieldDecorator('password', { 
												rules: FIELD_RULES.password, 
											})(
												<Input.Password type="password" maxLength={20} />
											)}
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
