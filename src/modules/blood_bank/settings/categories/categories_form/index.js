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
    
	render() {
		const { drawerButton,selectedCategories} = this.props;
		return(
			<div style={{marginTop: -10}}>
				<Form 
					layout="vertical"
					onFinish={this.onFinish} 
					initialValues={{ 
						is_active:selectedCategories.is_active === true ,
						categories_id:selectedCategories.categories_id,
						category_name:selectedCategories.categories_name,
						order:selectedCategories.categories_order,
						desc:selectedCategories.categories_desc,
					}}
				>
					{this.props.drawerButton == "UPDATE"? (
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
						name='categories_id'
						style={{marginTop:-20 }}
					>
						<Input style={{ textTransform: 'uppercase', display:'none'}} />		
					</Form.Item>
					<Form.Item 
						label="ORDER" 
						style={{ marginTop:'-15px'}}
						name='order'
					>									
							<Input style={{  textTransform: 'uppercase',marginTop:'-25px' }}  />
					</Form.Item>
					<Form.Item 
						label="CATEGORY NAME" 
						style={{ marginTop:'-25px'}}
						name='category_name'
					>
							<Input style={{ textTransform: 'uppercase',marginTop: 10 }} />
					</Form.Item>
					<Form.Item 
						label="DESCRIPTION" 
						style={{ marginTop:'-25px'}}
						name='desc'
					>
								<TextArea rows={5} />
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