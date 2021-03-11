// LIBRARY
import React from 'react';
import { Col, Switch, Typography, Form, Input, Select, Button, Row as AntRow } from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { RegexInput, AlphaNumInput } from 'shared_components/pattern_input';
import HttpCodeMessage from 'shared_components/message_http_status';
import { createUserAccountAPI, updateUserAccountAPI } from 'services/settings/userAccount';
import { getAllUserTypesAPI } from 'services/settings/userType';
import { LOGGEDIN_USER_DATA, ACCESS_MATRIX } from 'global_config/constant-global'
import { 
	drawerAdd,  
	labels as gLabels, 
	buttonLabels, 
	fieldLabels, 
	fieldRules,
	errorMessage,
	messagePrompts
} from '../settings';

// CSS
import './useraccountform.css';

const { Text } = Typography;
const { Option } = Select;

const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 8 },
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 16 },
	},
};

class UserAccountForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			userTypeList: [],
		};

		this.formRef = React.createRef();
	}
	
	async componentDidMount(){
		const response = await getAllUserTypesAPI();

		this.setState({
			// @ts-ignore
			userTypeList: response.data
		});

	}

	componentWillUnmount(){
		this.formRef.current.resetFields();
	}

	handleSubmit = async (values) => {
		const { drawerButton } = this.props;
		const userData = sessionStorage.LOGGEDIN_USER_DATA ? JSON.parse(sessionStorage.LOGGEDIN_USER_DATA) : null;

	
		const vData = {
			userName : values.userName.toUpperCase(),
			userTypeID : values.userTypeID,
			givenName : values.givenName.toUpperCase(),
			lastName : values.lastName.toUpperCase(),
			middleName : values.middleName.toUpperCase(),
			password : values.password,
			registryNumber : values.registration_no,
			registryValidityDate: values.registration_validity,
			active: (values.active === true) ? 1 : 0,
		};
				
		if(drawerButton === drawerAdd){
			const createdUserResponse = await createUserAccountAPI(vData);
	
			if(createdUserResponse.status === 201){
				const httpMessageConfig = {
					message: messagePrompts.successCreateUser,
					// @ts-ignore
					status: createdUserResponse.status,
					duration: 3, 
					onClose: () => window.location.reload() 
				}
				HttpCodeMessage(httpMessageConfig);
			}
		} else {
			vData.userID = values.userID;
			const updateUserResponse = await updateUserAccountAPI(vData).catch(() => { });
			
			if(updateUserResponse.status === 200){

				if(userData && userData.userID === vData.userID){
					userData.givenName = vData.givenName;
					userData.middleName = vData.middleName;
					userData.lastName = vData.lastName;
					userData.userName = vData.userName;
					sessionStorage.setItem(LOGGEDIN_USER_DATA, JSON.stringify(userData));
				}

				const httpMessageConfig = {
					message: messagePrompts.successUpdateUser,
					// @ts-ignore
					status: updateUserResponse.status,
					duration: 3, 
					onClose: () => window.location.reload() 
				}

				HttpCodeMessage(httpMessageConfig);
			}
		}
	}

	compareToFirstPassword = (rule, value, callback) => {
		const { getFieldValue } = this.formRef.current;

		if (value && value !== getFieldValue('password')) {
			callback(errorMessage.password.doesNotMatch);
		} else {
			callback();
		}
	};

	render() {
		const { patientInfo, drawerButton } = this.props;
		// const { getFieldDecorator, getFieldsValue } = form;
		const { userTypeList } = this.state;

		const UserTypeOptions = userTypeList.map(userType => (
			<Option value={userType.userTypeID} key={userType.userTypeID}>
				{userType.userTypeName.toUpperCase()}
			</Option>
		));

		const isActive = (patientInfo.active === 1 );

		return(
			<div>
				<Form 
					ref={this.formRef}
					{...formItemLayout} 
					onFinish={this.handleSubmit} 
					className="settings-user-maintence-form"
					layout="horizontal"
				>
					<section style={{ height:'50px', 'overflow': 'hidden' }}>
						<AntRow>
							<Col xs={24} sm={24} style={{ textAlign: "right" }}>
								<Form.Item 
									name="active"
									label="ENABLE LOGIN" 
									valuePropName="checked"
									labelCol={{ span: 22 }} 
									wrapperCol={{ span: 1 }}
									initialValue={isActive}
								>
									<Switch />
								</Form.Item>	
							</Col>
						</AntRow>
					</section>
					<section style={{ marginBottom: 50 }}>
						<AntRow>
							<Col span={12}>
								{/* PERSONAL INFORMATION */}
								<div className="form-section">
									<div className="form-title">
										<Text strong>{gLabels.personalInfoLabel}</Text>
									</div>
									<Form.Item 
										name="userID"
										label={fieldLabels.userID}
										initialValue={patientInfo.userID}
									>
										<Input disabled />
									</Form.Item>
									<Form.Item 
										name="givenName"
										label={fieldLabels.firstName}
										initialValue={patientInfo.givenName}
										rules={fieldRules.firstname}
									>
										<RegexInput
											regex={/[A-Za-z0-9 -]/} 
											maxLength={15} 
										/>
									</Form.Item>
									<Form.Item 
										name="middleName"
										label={fieldLabels.middleName}
										initialValue={patientInfo.middleName}
										rules={fieldRules.middlename}
									>
										<RegexInput
											regex={/[A-Za-z0-9. -]/} 
											maxLength={15} 
										/>
									</Form.Item>
									<Form.Item 
										name="lastName"
										label={fieldLabels.lastName}
										initialValue={patientInfo.lastName}
										rules={fieldRules.lastname}
									>
										<RegexInput
											regex={/[A-Za-z0-9. -]/} 
											maxLength={50} 
										/>
									</Form.Item>
								</div>

								{/* ACCOUNT INFORMATION */}
								<div className="form-section">
									<div className="form-title">
										<Text strong>{gLabels.accountInfoLabel}</Text>
									</div>
									<Form.Item 
										name="userName"
										label={fieldLabels.username}
										initialValue={patientInfo.userName}
										rules={fieldRules.username}
									>
										<AlphaNumInput maxLength={10} />
									</Form.Item>
									<Form.Item 
										name="password"
										label={fieldLabels.password} 
										hasFeedback
										rules={[
											...fieldRules.password,
											{ 
												required: drawerAdd === drawerButton,
												message: errorMessage.requiredField
											},
										]}
										dependencies={['repeat_password']}
									>
										<Input.Password 
											className="password_input"
											maxLength={12} 
										/>
									</Form.Item>
									<Form.Item wrapperCol={{ span: 24 }} shouldUpdate>
										{({ getFieldsValue }) => {
											return (
												<Form.Item 
													name="repeat_password"
													label={fieldLabels.repeatPassword} 
													labelCol={{ span: 8 }}
													rules={[
														...fieldRules.repeat_password,
														{ 
															required: drawerAdd === drawerButton || getFieldsValue().password, 
															message: errorMessage.requiredField 
														},
														{ validator: this.compareToFirstPassword }
													]}
													dependencies={['password']}
													hasFeedback
												>
													<Input.Password 
														className="password_input"
														maxLength={12} 
													/>
												</Form.Item>
											);
										}}
									</Form.Item>
								</div>
							</Col>
							<Col span={12}>
								<div className="form-section">
									<div className="form-title">
										<Text strong>{ gLabels.otherInfoLabel }</Text>
									</div>
									<Form.Item 
										name="registration_no"
										label={fieldLabels.registrationNo}
										initialValue={patientInfo.registryNumber}
									>
										<RegexInput regex={/[A-Za-z0-9 -]/} />
									</Form.Item>
									<Form.Item 
										name="registration_validity"
										label={fieldLabels.registrationValidity}
										initialValue={patientInfo.registryValidityDate}
									>
										<RegexInput regex={/[A-Za-z0-9 -]/} />
									</Form.Item>
									<Form.Item 
										name="userTypeID"
										label={fieldLabels.userRights}
										initialValue={patientInfo.userTypeID}
										rules={[{ required: true, message: errorMessage.requiredField }]}
									>
										<Select>
											{UserTypeOptions}
										</Select>
									</Form.Item>
								</div>
							</Col>
						</AntRow>
					</section>
					<section className="drawerFooter">
						<Button shape="round" style={{ marginRight: 8, width: 120 }} onClick={this.props.onClose}>
							{buttonLabels.cancel}
						</Button>
						<Button type="primary" shape="round" style={{ margin: 10, width: 120 }} htmlType="submit">
							{drawerButton}
						</Button>
					</section>
				</Form>
			</div>
		);
	}
}

UserAccountForm.propTypes = {
	patientInfo: PropTypes.array.isRequired,
	drawerButton: PropTypes.string.isRequired,
	onClose: PropTypes.func
}

UserAccountForm.defaultProps = {
	onClose() { return null}
};


export default withRouter(UserAccountForm);