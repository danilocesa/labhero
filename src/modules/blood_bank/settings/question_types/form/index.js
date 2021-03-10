// LIBRARY
import React from 'react'
import {  Switch, Form, Input, Button,InputNumber } from 'antd'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';
import HttpCodeMessage from 'shared_components/message_http_status'
import { createData, updateData } from 'services/blood_bank/question_type';
import { buttonLabels,drawerAdd,messagePrompts } from '../settings'

// CSS
import './form.css';

const { TextArea } = Input;
const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
  };

class BloodTypesForm extends React.Component {

	onFinish = async values => {
		const { drawerButton } = this.props;
    const payload = {
			ques_type_id :values.ques_type_id,
			ques_order :values.ques_order,
			ques_type_name :values.ques_type_name,  
			created_by:1
		};
		if(drawerButton === drawerAdd){
			const createdUserResponse = await createData(payload);
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
				payload.ques_type_id = values.ques_type_id
				const updateUserResponse =  await updateData(payload).catch(reason => console.log('TCL->', reason));
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
		const { drawerButton,selectedTypes } = this.props;
		console.log("selectedTypes",selectedTypes)
			return(
				<div>
					<Form 
							layout="vertical"
							className="exam-item-add-form"
							initialValues={{ 
								ques_type_id:selectedTypes.ques_type_id,
								ques_order:selectedTypes.ques_order,
								ques_type_name:selectedTypes.ques_type_name,
							}}
							onFinish={this.onFinish}       
						>
							{
								this.props.drawerButton == "UPDATE"? 
								(		
									<Form.Item 
										label="ACTIVE" 
										{...layout} 
										valuePropName='checked' 
										name='is_active'
										style={{marginBottom:'-40px'}}
									>
										<Switch />
									</Form.Item>
								)	
							:
								null
							}
							<div className="form-section">
							<Form.Item 
								name='ques_type_id'
							>
									<Input style={{ textTransform: 'uppercase', display:'none'}} />		
							</Form.Item>
							<Form.Item	 
								label="QUESTION ORDER" 
								name='ques_order'
								style={{marginTop:-15}}
							>
									<Input style={{ textTransform: 'uppercase'}} />		
							</Form.Item>
							<Form.Item 
								label="QUESTION TYPE NAME" 
								name='ques_type_name' 
								style={{marginTop:-25}}
							>
									<Input style={{ textTransform: 'uppercase'}} />
							</Form.Item>
						</div>
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

BloodTypesForm.propTypes = {
	drawerButton: PropTypes.string.isRequired,
	onClose: PropTypes.func,
	actionType: PropTypes.string.isRequired,
	patientInfo: PropTypes.array.isRequired,
	selectedTypes:PropTypes.object.isRequired,
	form: PropTypes.object
}

export default withRouter(BloodTypesForm);