// LIBRARY
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import HttpCodeMessage from 'shared_components/message_http_status'
import { createCategoriesAPI , updateCategoriesAPI} from 'services/blood_bank/categories';
import { Col, Switch, Typography, Form, Input, Select, Button, Row as AntRow } from 'antd';

import { buttonLabels,messagePrompts } from '../settings';
// CSS
import './panel_form.css';

const { TextArea } = Input;
const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
  };
  
class UserAccountForm extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
			disabled: true,
    };
	} 

	onFinish = async values => {
  console.log("file: index.js ~ line 28 ~ UserAccountForm ~ values", (values.is_active === true) ? 1 : 0)
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
			}else {
				payload.categories_id = values.categories_id;
				const updateUserResponse =  await updateCategoriesAPI(payload).catch(reason => console.log('TCL->', reason));
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
		const {disabled} = this.state
		const { drawerButton,selectedCategories} = this.props;
    console.log("file: index.js ~ line 76 ~ UserAccountForm ~ render ~ selectedCategories", selectedCategories.is_active)
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
						this.props.drawerButton == "UPDATE"? (

							<Form.Item label="ACTIVE" name='is_active'valuePropName='checked'	>	 
								<Switch onChange={this.onDisable}/>
							</Form.Item>
						)	
						:
							null
					}

					<Form.Item 	name='categories_id'>
						<Input style={{ textTransform: 'uppercase', display:'none'}} />		
					</Form.Item>

					<div style={{marginTop:-50}}>

						<Form.Item rules={[{ required: true, message: 'Please input your Category Order!' }]}label="ORDER" name='order'>									
							<Input style={{  textTransform: 'uppercase'}}   onChange={this.onDisable}/>
						</Form.Item>

						<Form.Item rules={[{ required: true, message: 'Please input your Category Name!' }]} label="CATEGORY NAME" name='category_name'	>
							<Input style={{ textTransform: 'uppercase' }}  onChange={this.onDisable}/>
						</Form.Item>

						<Form.Item label="DESCRIPTION" name='desc'>
							<TextArea rows={5} />
						</Form.Item>

					</div>

					<section className="drawerFooter">

						<Button shape="round" style={{ marginRight: 8, width: 120 }} onClick={this.props.onClose}>
							{buttonLabels.cancel}
						</Button>

						<Button  disabled={disabled} type="primary" shape="round" style={{ margin: 10, width: 120 }} htmlType="submit">
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

UserAccountForm.defaultProps = {
	form(){ return null; },
	onClose() { return null}
};
export default withRouter(UserAccountForm);