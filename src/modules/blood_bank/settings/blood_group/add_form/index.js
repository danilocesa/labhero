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
	constructor(props) {
    super(props);
    this.state = {
			disabled: true,
    };
	} 

	onFinish = async values => {
		const { drawerButton } = this.props;
    const payload = {
			blood_type_id :values.blood_group_id,
			blood_group :values.blood_group_code,
			blood_type :values.blood_group,
			blood_desc : values.blood_description,
			created_by: 1,	
			is_active: (values.is_active === true) ? 1 : 0,
		};
		if(drawerButton === drawerAdd){
			const createdUserResponse = await createBloodGroupAPI(payload);
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
		}
		else {
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
		
	onDisable = () => {
    this.setState({
      disabled:false
    })
  }

	render() {
		const { disabled } = this.state
		const { drawerButton,selectedBloodGroup } = this.props;
		return(
			<div>
				<Form 
					layout="vertical"
					initialValues={{ 
						is_active:selectedBloodGroup.is_active === true ,
						blood_group_id:selectedBloodGroup.blood_type_id,
						blood_group:selectedBloodGroup.blood_type,
						blood_description:selectedBloodGroup.blood_desc 
					}}
					onFinish={this.onFinish}       
				>
						{this.props.drawerButton == "UPDATE"? (		
							<Form.Item 
								label="ACTIVE" 
								{...layout} 
								name='is_active'
								style={{marginBottom:'-40px'}}
							>
								<Switch onChange={this.onDisable}/>
							</Form.Item>
						)	
						:
						null
						}
						<div className="form-section">
						<Form.Item 
							name='blood_group_id'
						>
							<Input style={{ textTransform: 'uppercase', display:'none'}} />		
						</Form.Item>
						<Form.Item 
							label="BLOOD TYPE" 
							name='blood_group' 
							rules={[
								{
									required: true,
									message: 'Please input your username!',
								},
							]}
						>
								<Input style={{ textTransform: 'uppercase'}} onChange={this.onDisable}/>
						</Form.Item>
						<Form.Item 
							label="DESCRIPTION" 
							name='blood_description'
						>
								<TextArea rows={5} onChange={this.onDisable}/>
						</Form.Item>
					</div>
						<section className="drawerFooter">
							<Button shape="round" style={{ marginRight: 8, width: 120 }} onClick={this.props.onClose}>
								{buttonLabels.cancel}
							</Button>
							<Button disabled={disabled} type="primary" shape="round" style={{ margin: 10, width: 120 }} htmlType="submit">
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