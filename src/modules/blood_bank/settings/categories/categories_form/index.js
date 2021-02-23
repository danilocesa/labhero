// LIBRARY
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import HttpCodeMessage from 'shared_components/message_http_status'
import { createCategoriesAPI , updateCategoriesAPI} from 'services/blood_bank/categories';
import { Switch, Form, Input, Select, Button } from 'antd';

import { buttonLabels,messagePrompts } from '../settings';
// CSS
import './panel_form.css';

const { TextArea } = Input;

  
class UserAccountForm extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
			disabled: true,
    };
	} 

	onFinish = async values => {
		const { drawerButton } = this.props;
		const payload = {
			categories_id :values.category_id,
			categories_name :values.category_name,
			categories_order :values.order,
			categories_desc :values.desc,
			is_active: (values.is_active === true) ? 1 : 0,
			created_by:1
		};
		if(drawerButton === 'ADD'){
			const createdUserResponse = await createCategoriesAPI(payload);
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
		} else {
			payload.categories_id = values.categories_id;
			const updateUserResponse =  await updateCategoriesAPI(payload);
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
    });
  };
    
	render() {
		const { disabled } = this.state;
		const { drawerButton,selectedCategories} = this.props;
		return(
			<div style={{marginTop: -10}}>
				<Form 
					layout="vertical"
					onFinish={this.onFinish} 
					initialValues={{ 
						is_active:selectedCategories.is_active ===  true,
						categories_id:selectedCategories.categories_id,
						category_name:selectedCategories.categories_name,
						order:selectedCategories.categories_order,
						desc:selectedCategories.categories_desc,
					}}
				>
					{
						drawerButton == "UPDATE"? (
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
						<Form.Item 	name='categories_id'>
							<Input 	
							 	style={{ textTransform: 'uppercase', display:'none'}} 	
							/>		
						</Form.Item>
					<div style={{marginTop:-50}}>
						<Form.Item 
							label="ORDER" 
							name='order'
							rules={[{ required: true, message: 'Please input your Category Order!' }]} 
						>									
							<Input 
								style={{  textTransform: 'uppercase'}}   
								onChange={this.onDisable}
							/>
						</Form.Item>
						<Form.Item 
							label="CATEGORY NAME" 
							name='category_name'	
							rules={[{ required: true, message: 'Please input your Category Name!' }]} 
						>
							<Input 
								style={{ textTransform: 'uppercase' }} 
								onChange={this.onDisable}
							/>
						</Form.Item>
						<Form.Item label="DESCRIPTION" name='desc'>
							<TextArea rows={5} />
						</Form.Item>
					</div>
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
							htmlType="submit"
							style={{ margin: 10, width: 120 }} 
						>
							{drawerButton}
						</Button>
					</section>
				</Form>
			</div>
		);
	}
}

UserAccountForm.propTypes = {
	selectedCategories:PropTypes.object.isRequired,
	patientInfo: PropTypes.array.isRequired,
	drawerButton: PropTypes.string.isRequired,
	form: PropTypes.object,
	onClose: PropTypes.func,
	actionType: PropTypes.string
}

export default withRouter(UserAccountForm);