// LIBRARY
import React from 'react'
// @ts-ignore
import {  Switch, Form, Input, Button } from 'antd'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';
import { LOGGEDIN_USER_DATA } from 'global_config/constant-global';
import HttpCodeMessage from 'shared_components/message_http_status'
import { createNormalValuesAPI, updateNormalValuesAPI } from 'services/blood_bank/normal_values';
import { buttonLabels, drawerAdd, messagePrompts } from '../settings'
// CSS
import './form.css';

// @ts-ignore
const { TextArea } = Input;

class BloodTestsForm extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
			disabled: true,
    };
	} 


  onFinish = async (values) => {
		const loggedinUser = JSON.parse(sessionStorage.getItem(LOGGEDIN_USER_DATA));
		const { drawerButton} = this.props;
    	const payload = {
			normal_value_id :values.normal_value_id,
			normal_values :values.normal_values,
			is_active: (values.is_active === true) ? 1 : 0,
      created_by: 1
		};
		if(drawerButton === drawerAdd){
			const createdNormalValuesResponse = await createNormalValuesAPI(payload);
			// @ts-ignore
			if(createdNormalValuesResponse.status === 201){
				const httpMessageConfig = {
					message: messagePrompts.successCreateUser,
					// @ts-ignore
					status: createdNormalValuesResponse.status,	
					duration: 3, 
					onClose: () => window.location.reload() 
				}
				HttpCodeMessage(httpMessageConfig);	
			}	
		}
		else {
			payload.normal_value_id= values.normal_value_id;
			const updateNormalValuesResponse =  await updateNormalValuesAPI(payload)
			// @ts-ignore)
			if(updateNormalValuesResponse.status === 200){
				const httpMessageConfig = {
					message: messagePrompts.successUpdateUser,
					// @ts-ignore
					status: updateNormalValuesResponse.status,
					duration: 3, 
					onClose: () => window.location.reload() 
				}
				HttpCodeMessage(httpMessageConfig);
			}
		}
	};

  onDisable = () => {
    this.setState({ disabled:false })
  }
    
	render() {
		// @ts-ignore
		const { disabled } = this.state
		const { drawerButton,selectedBloodTest } = this.props;
			return(
				<div style={{marginTop: -10}}>
					<Form 
							layout="vertical"
							onFinish={this.onFinish} 
							initialValues={{ 
								is_active:selectedBloodTest.is_active === true ,
								normal_value_id:selectedBloodTest.normal_value_id,
								normal_values:selectedBloodTest.normal_values,
					
							}}  
						>
							{
								drawerButton === "UPDATE"
							? 
								(		
									<Form.Item 
										label="ACTIVE" 
										name='is_active'
										valuePropName='checked' 
										
										style={{marginBottom:'-40px'}}
									>
										<Switch onChange={this.onDisable}/>
									</Form.Item>
								)	
							:
								null
							}
						<div style={{marginTop:-50}}>
							<Form.Item 
							  label="BLOOD ID"
								name='normal_value_id'
							>
									<Input style={{ textTransform: 'uppercase', display:'none'}} />		
							</Form.Item>
							<Form.Item	 
								label="BLOOD TEST" 
								name='blood_test'
								style={{marginTop:10}}
								rules={[{ required: true, message: 'Please input your Blood Test!' }]} 
							>
									<Input style={{ textTransform: 'uppercase'}}  onChange={this.onDisable}/>		
							</Form.Item>
							<Form.Item 
								label="DESCRIPTION" 
								name='blood_desc' 
								style={{marginTop: 10}}
							>
									<TextArea rows={4} onChange={this.onDisable}/>
							</Form.Item>
							<Form.Item 
								label="NORMAL VALUE" 
								name='normal_values' 
								style={{marginTop: 10}}
								rules={[{ required: true, message: 'Please input Normal Value!' }]} 
							>
									<Input style={{ textTransform: 'uppercase'}}  onChange={this.onDisable}/>
							</Form.Item>
						
							</div>
						<section className="drawerFooter">
					<Button 
					 shape="round" 
					 style={{ marginRight: 8, width: 120 }} 
					 onClick={this.props.onClose}>
						{buttonLabels.cancel}
					</Button>
					<Button 
					  disabled={disabled} 
					  type="primary" 
						shape="round" 
						style={{ margin: 10, width: 120 }} 
						htmlType="submit"
					>
					
						{drawerButton}
					</Button>
				</section>
				  </Form>
				</div>
			);
	}
}

BloodTestsForm.propTypes = {
	drawerButton: PropTypes.string.isRequired,
	onClose: PropTypes.func,
	actionType: PropTypes.string.isRequired,
	patientInfo: PropTypes.array.isRequired,
	selectedBloodTest:PropTypes.object.isRequired,
	form: PropTypes.object
}

export default withRouter(BloodTestsForm);