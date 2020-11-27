// LIBRARY
import React from 'react'
import {  Switch, Form, Input, Button} from 'antd'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';
import HttpCodeMessage from 'shared_components/message_http_status'
import { createBloodGroupAPI, updateBloodGroupAPI } from 'services/blood_bank/blood_group';
import { buttonLabels,drawerAdd,messagePrompts } from '../settings'


// CSS
import './form.css';

const { TextArea } = Input;
const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
  };

class BloodGroupForm extends React.Component {

	onFinish = async values => {
		const { drawerButton } = this.props;
    const payload = {
			blood_group_id :values.blood_group_id,
			blood_group_code :values.blood_group_code,
			blood_group :values.blood_group,
			blood_description : values.blood_description,
			created_by: 1,	
			is_active: (values.is_active === true) ? 1 : 0,
		};

		console.log(payload)
		if(drawerButton === drawerAdd){
			const createdUserResponse = await createBloodGroupAPI(payload);
			console.log("createUserResponse: ",createdUserResponse);
			// @ts-ignore
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
			}else {
				payload.blood_group_id = values.blood_group_id;
				const updateUserResponse =  await updateBloodGroupAPI(payload).catch(reason => console.log('TCL->', reason));
				// @ts-ignore)
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

	};
    
	render() {
		const { drawerButton,selectedBloodGroup } = this.props;
			return(
				<div>
					<Form 
						layout="vertical"
						initialValues={{ 
							is_active:selectedBloodGroup.is_active === true ,
							blood_group_id:selectedBloodGroup.blood_group_id,
							blood_group_code:selectedBloodGroup.blood_group_code,
							blood_group:selectedBloodGroup.blood_group,
							blood_description:selectedBloodGroup.blood_description 
						}}
						onFinish={this.onFinish} 
						style={{marginTop:-20}}	
					>
						{this.props.actionType == "update"? (		
							<Form.Item 
								label="ACTIVE" 
								{...layout} 
								valuePropName='checked' 
								name='is_active'
							>
								<Switch />
							</Form.Item>
						)	
						:
						null
						}
						<div className="form-section">
							<Form.Item 
								label="BLOOD GROUP ID" 
								name='blood_group_id'
								style={{marginTop:-20 }}
							>
									<Input style={{ textTransform: 'uppercase', display:'none'}} />		
							</Form.Item>
							<Form.Item	 
								label="BLOOD GROUP CODE" 
								name='blood_group_code'
								style={{marginTop:-20 }}
							>
									<Input style={{ textTransform: 'uppercase'}} />		
							</Form.Item>
							<Form.Item 
								label="BLOOD GROUP NAME" 
								name='blood_group' 
								style={{marginTop:-20}}
							>
									<Input style={{ textTransform: 'uppercase'}} />
							</Form.Item>
							<Form.Item 
								label="DESCRIPTION" 
								name='blood_description'
								style={{marginTop:-20}}
							>
									<TextArea rows={5} />
							</Form.Item>
						</div>
						<section className="drawerFooter">
							<Button shape="round" style={{ marginRight: 8, width: 120 }} onClick={this.props.onClose()}>
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

BloodGroupForm.propTypes = {
	drawerButton: PropTypes.string.isRequired,
	onClose: PropTypes.func,
	actionType: PropTypes.string.isRequired,
	patientInfo: PropTypes.array.isRequired,
	selectedBloodGroup:PropTypes.object.isRequired,
	form: PropTypes.object
}

BloodGroupForm.defaultProps = {
	form(){ return null; },
	onClose() { return null}
};


export default withRouter(BloodGroupForm);