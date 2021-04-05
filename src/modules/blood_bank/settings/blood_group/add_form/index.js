// LIBRARY
import React from 'react'
import {  Switch, Form, Input, Button} from 'antd'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';
import { LOGGEDIN_USER_DATA } from 'global_config/constant-global';
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
	constructor(props) {
    super(props);
    this.state = {
			disabled: true,
    };
	} 

	onFinish = async (values) => {
		const loggedinUser = JSON.parse(sessionStorage.getItem(LOGGEDIN_USER_DATA));
    console.log("file: index.js ~ line 31 ~ BloodGroupForm ~ onFinish= ~ loggedinUser", loggedinUser)
		const { drawerButton, selectedBloodGroup } = this.props;
    const payload = {
			blood_type_id :selectedBloodGroup.blood_type_id,
			blood_group :values.blood_group,
			blood_type: values.blood_type,
			blood_desc : values.blood_description,
			created_by: loggedinUser.userID,	
			is_active: (values.is_active === true) ? 1 : 0,
		};
		if(drawerButton === drawerAdd){
			const createdBloodGroupResponse = await createBloodGroupAPI(payload);
			// @ts-ignore
			if(createdBloodGroupResponse.status === 201){
				const httpMessageConfig = {
					message: messagePrompts.successCreateUser,
					// @ts-ignore
					status: createdBloodGroupResponse.status,	
					duration: 3, 
					onClose: () => window.location.reload() 
				}
				HttpCodeMessage(httpMessageConfig);	
			}	
		}
		else {
			payload.blood_group_id = selectedBloodGroup.blood_group_id;
			const updateBloodGroupResponse =  await updateBloodGroupAPI(payload)
			// @ts-ignore)
			if(updateBloodGroupResponse.status === 200){
				const httpMessageConfig = {
					message: messagePrompts.successUpdateUser,
					// @ts-ignore
					status: updateBloodGroupResponse.status,
					duration: 3, 
					onClose: () => window.location.reload() 
				}
				HttpCodeMessage(httpMessageConfig);
			}
		}
	};
		
	onDisable = () => {
    this.setState({
      disabled:false
    })
  }

	render() {
		const { disabled } = this.state
		const { drawerButton, selectedBloodGroup } = this.props;
		return(
			<div>
				<Form 
					onFinish={this.onFinish} 
					layout="vertical"
					initialValues={{ 
						is_active:selectedBloodGroup.is_active === true ,
						blood_group_id:selectedBloodGroup.blood_type_id,
						blood_group:selectedBloodGroup.blood_type,
						blood_type:selectedBloodGroup.blood_type,
						blood_description:selectedBloodGroup.blood_desc 
					}}   
				>
					{
						drawerButton == "UPDATE" 
						? 
							(		
								<Form.Item 
									label="ACTIVE" 
									name='is_active'
									valuePropName='checked'
								>
									<Switch onChange={this.onDisable}/>
								</Form.Item>
							)	
						:
							null
					}
					<Form.Item 
						label="BLOOD GROUP" 
						name='blood_group' 
						rules={[{ required: true, message: 'Please input your BLOOD GROUP!'}]}
					>
						<Input style={{ textTransform: 'uppercase'}} onChange={this.onDisable}/>
					</Form.Item>
					<Form.Item 
						label="BLOOD TYPE" 
						name='blood_type' 
						rules={[{ required: true, message: 'Please input your BLOOD TYPE!'}]}
					>
						<Input style={{ textTransform: 'uppercase'}} onChange={this.onDisable}/>
					</Form.Item>
					<Form.Item 
						label="DESCRIPTION" 
						name='blood_description'
					>
						<TextArea rows={5} onChange={this.onDisable}/>
					</Form.Item>
					<section className="drawerFooter">
						<Button 
							shape="round" 
							style={{ marginRight: 8, width: 120 }} 
							onClick={this.props.onClose}
						>
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

BloodGroupForm.propTypes = {
	drawerButton: PropTypes.string.isRequired,
	onClose: PropTypes.func,
	actionType: PropTypes.string.isRequired,
	patientInfo: PropTypes.array.isRequired,
	selectedBloodGroup:PropTypes.object.isRequired,
	form: PropTypes.object
}

export default withRouter(BloodGroupForm);