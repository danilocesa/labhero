// LIBRARY
import React from 'react';
import { Col, Switch, Typography, Form, Input, Select, Button } from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

// CUSTOM
import {createUserAccountAPI, updateUserAccountAPI } from 'services/settings/user_maintenance/userAccount';
import {getAllUserTypesAPI} from 'services/settings/user_maintenance/userType';
import { drawerAdd, labels as gLabels, errorMessages, buttonLabels, fieldLabels } from '../settings';

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
		const { form, drawerButton } = this.props;

		event.preventDefault();
		form.validateFields( (err, values) => {
			if (!err) {
				const vData = {
					userName : values.userName,
					userTypeID : values.userTypeID,
					givenName : values.givenName,
					lastName : values.lastName,
					middleName : values.middleName,
					password : values.password,
					registryNumber : values.registration_no,
					registryValidityDate: values.registration_validity,
					active: (values.active === true) ? 1 : 0,
				};
				
				if(drawerButton === drawerAdd){
					createUserAccountAPI(vData);
				} else {
					vData.userID = values.userID;
					updateUserAccountAPI(vData).catch(
						reason => console.log('TCL->', reason));
				}
				window.location.reload();
			}
		});
	}

	compareToFirstPassword = (rule, value, callback) => {
		const { form } = this.props;
		if (value && value !== form.getFieldValue('password')) {
			callback(errorMessages.password.doesNotMatch);
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

		const isActive = (patientInfo.active === 1 ) ? true : false;
		 
		return(
			<div>
				<Form {...formItemLayout} onSubmit={this.handleSubmit}>
					<section style={{ height:'50px' }}>
							{/* <Col span={11}></Col> */}
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
										rules: [{ required: true, message: errorMessages.requiredField }]
									})(
										<Input />
									)}	
								</Form.Item>
								<Form.Item label={fieldLabels.middleName}>
									{
										getFieldDecorator('middleName',{
											initialValue: patientInfo.middleName,
											rules: [{ required: true, message: errorMessages.requiredField}]
										})(<Input />)
									}
								</Form.Item>
								<Form.Item label={fieldLabels.lastName}>
									{
										getFieldDecorator('lastName',{
											initialValue: patientInfo.lastName,
											rules: [{ required: true, message: errorMessages.requiredField}]
										})(<Input />)
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
											rules: [{ required: true, message: errorMessages.requiredField}],
										})(
										<Input />)
									}
								</Form.Item>

								<Form.Item label={fieldLabels.password}>
									{
										getFieldDecorator('password',{
											initialValue: patientInfo.password,
											rules: [
												{ required: true, message: errorMessages.requiredField},
												{ validator: this.validateToNextPassword}
											]
										})(
										<Input.Password />)
									}
								</Form.Item>

								<Form.Item label={fieldLabels.repeatPassword}>
									{
										getFieldDecorator('repeat_password',{
											initialValue: patientInfo.password,
											rules:[
												{ required: true, message: errorMessages.requiredField },
												{ validator: this.compareToFirstPassword }
											]
										})(
										<Input.Password />)
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
										<Input />)
									}
								</Form.Item>
								<Form.Item label={fieldLabels.registrationValidity}>
									{
										getFieldDecorator('registration_validity',{
											initialValue: patientInfo.registryValidityDate
										})(
										<Input />)
									}
								</Form.Item>
								<Form.Item label={fieldLabels.userRights}>
									{
										getFieldDecorator('userTypeID',{ 
											initialValue: patientInfo.userTypeID,
											rules: [{ required: true, message: errorMessages.requiredField}],
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
						<Button shape="round" style={{ marginRight: 8 }}>
							{buttonLabels.cancel}
						</Button>
						<Button type="primary" shape="round" style={{ margin: 10 }} htmlType="submit">
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
	form: PropTypes.object
}

UserAccountForm.defaultProps = {
	form(){ return null; }
};

const UserAccount = Form.create()(withRouter(UserAccountForm));

export default UserAccount;