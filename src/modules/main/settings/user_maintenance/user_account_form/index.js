// LIBRARY
import React from 'react';
import { Col, Switch, Typography, Form, Input, Select, Button, Row as AntRow } from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { RegexInput, AlphaNumInput } from 'shared_components/pattern_input';
import HttpCodeMessage from 'shared_components/message_http_status';
import { createUserAccountAPI, updateUserAccountAPI } from 'services/settings/user_maintenance/userAccount';
import { getAllUserTypesAPI } from 'services/settings/user_maintenance/userType';
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
			confirmDirty: false,
			userTypeList: []
		};
	}
	
	async componentDidMount(){
		const response = await getAllUserTypesAPI();
		this.setState({
			// @ts-ignore
			userTypeList: response.data
		})
	}

	componentWillUnmount(){
		const { form } = this.props;
		form.resetFields();
	}

	handleSubmit = (event) => {
		event.preventDefault();
		const { form, drawerButton } = this.props;
		
		form.validateFields( async (err, values) => {
			if (!err) {
				const vData = {
					userName : values.userName,
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
					const updateUserResponse = await updateUserAccountAPI(vData).catch(reason => console.log('TCL->', reason));
          
					if(updateUserResponse.status === 200){
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
		});
	}

	compareToFirstPassword = (rule, value, callback) => {
		const { form } = this.props;
		if (value && value !== form.getFieldValue('password')) {
			callback(errorMessage.password.doesNotMatch);
		} else {
			callback();
		}
	};

	validateToNextPassword = (rule, value, callback) => {
		const { form } = this.props;
		if (value && this.state.confirmDirty) {
			form.validateFields(['repeat_password'], { force: true });
		}
		callback();
	};

	render() {
		const { patientInfo, drawerButton, form } = this.props;
		const { getFieldDecorator } = form;
		const { userTypeList } = this.state;

		const UserTypeOptions = userTypeList.map(userType => (
			<Option value={userType.userTypeID} key={userType.userTypeID}>
				{userType.userTypeName}
			</Option>
		));

		const isActive = (patientInfo.active === 1 );
		
		const passwordValidation = (drawerAdd === drawerButton ? {
			initialValue: patientInfo.password,
			rules:[
				...fieldRules.password,
				{ validator: this.compareToFirstPassword }
			]
		} :
		{
			initialValue: patientInfo.password
		});
		 
		return(
			<div>
				<Form 
					{...formItemLayout} 
					onSubmit={this.handleSubmit} 
					className="settings-user-maintence-form"
				>
					<section style={{ height:'50px', marginTop:'-25px', 'overflow': 'hidden' }}>
						<AntRow>
							<Col xs={24} sm={24} style={{ textAlign: "right" }}>
								<Form.Item label="ENABLE LOGIN" labelCol={{ span: 22 }} wrapperCol={{ span: 1 }}>
									{
										getFieldDecorator('active',{
											initialValue: isActive,
											valuePropName: 'checked'
										})(
											<Switch />
										)
									}
								</Form.Item>	
							</Col>
						</AntRow>
					</section>
					<section style={{ marginBottom: 50 }}>
						<Col span={12}>
							{/* PERSONAL INFORMATION */}
							<div className="form-section">
								<div className="form-title">
									<Text strong>{gLabels.personalInfoLabel}</Text>
								</div>
								<Form.Item label={fieldLabels.userID}>
									{
										getFieldDecorator('userID',{
											initialValue: patientInfo.userID,
										})(<Input disabled />)
									}
								</Form.Item>
								<Form.Item label={fieldLabels.firstName}>
									{getFieldDecorator('givenName', {
										initialValue: patientInfo.givenName,
										rules: fieldRules.firstname
									})(
										<RegexInput
											regex={/[A-z0-9 -]/} 
											maxLength={100} 
										/>
									)}	
								</Form.Item>
								<Form.Item label={fieldLabels.middleName}>
									{
										getFieldDecorator('middleName',{
											initialValue: patientInfo.middleName,
											rules: fieldRules.middlename
										})(
											<RegexInput
												regex={/[A-z0-9 -]/} 
												maxLength={100} 
											/>
										)
									}
								</Form.Item>
								<Form.Item label={fieldLabels.lastName}>
									{
										getFieldDecorator('lastName',{
											initialValue: patientInfo.lastName,
											rules: fieldRules.lastname
										})(
											<RegexInput
												regex={/[A-z0-9 -]/} 
												maxLength={100} 
											/>
										)
									}
								</Form.Item>
							</div>

							{/* ACCOUNT INFORMATION */}
							<div className="form-section">
								<div className="form-title">
									<Text strong>{gLabels.accountInfoLabel}</Text>
								</div>
								<Form.Item label={fieldLabels.username}>
									{
										getFieldDecorator('userName',{
											initialValue: patientInfo.userName,
											rules: fieldRules.username
										})(
										<AlphaNumInput maxLength={10} />)
									}
								</Form.Item>
								<Form.Item label={fieldLabels.password}>
									{
										getFieldDecorator('password',passwordValidation)(
										<Input.Password maxLength={12} />)
									}
								</Form.Item>
								<Form.Item label={fieldLabels.repeatPassword}>
									{
										getFieldDecorator('repeat_password',)(
										<Input.Password maxLength={12} />)
									}
								</Form.Item>
							</div>
						</Col>
						<Col span={12}>
							<div className="form-section">
								<div className="form-title">
									<Text strong>{ gLabels.otherInfoLabel }</Text>
								</div>
								<Form.Item label={fieldLabels.registrationNo}>
									{
										getFieldDecorator('registration_no',{
											initialValue: patientInfo.registryNumber
										})(
											<AlphaNumInput />
										)
									}
								</Form.Item>
								<Form.Item label={fieldLabels.registrationValidity}>
									{
										getFieldDecorator('registration_validity', {
											initialValue: patientInfo.registryValidityDate
										})(
											<AlphaNumInput />
										)
									}
								</Form.Item>
								<Form.Item label={fieldLabels.userRights}>
									{
										getFieldDecorator('userTypeID', { 
											initialValue: patientInfo.userTypeID,
											rules: [{ required: true, message: errorMessage.requiredField}],
										})(
											<Select>
												{UserTypeOptions}
											</Select>
										)
									}
								</Form.Item>
							</div>
						</Col>
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
	form: PropTypes.object,
	onClose: PropTypes.func
}

UserAccountForm.defaultProps = {
	form(){ return null; },
	onClose() { return null}
};

const UserAccount = Form.create()(withRouter(UserAccountForm));

export default UserAccount;