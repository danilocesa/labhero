// LIBRARY
import React from 'react'
import {  Switch, Form, Input, Button} from 'antd'
import PropTypes from 'prop-types'
import { buttonLabels } from '../settings'

const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
};

class ProvinceForm extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
			disabled: true,
    };
	} 

	// onFinish = async values => {
	// 	const { drawerButton } = this.props;
  //   const payload = {
	// 		province_id :values.province_id,
	// 		province_code :values.province_code,
	// 		province_name :values.province_name,
	// 		created_by: 1,	
	// 		is_active: (values.is_active === true) ? 1 : 0,
	// 	};
	// 	if(drawerButton === 'ADD'){
	// 		const createdUserResponse = await createProvincesItems(payload);
	// 		// @ts-ignore
	// 		if(createdUserResponse.status === 201){
	// 			const httpMessageConfig = {
	// 				message: messagePrompts.successCreateUser,
	// 				// @ts-ignore
	// 				status: createdUserResponse.status,	
	// 				duration: 3, 
	// 				onClose: () => window.location.reload() 
	// 			}
	// 			HttpCodeMessage(httpMessageConfig);	
	// 		}	
	// 	}
	// 	else {
	// 		payload.province_id = values.province_id;
	// 		const updateUserResponse =  await updateProvincesItems(payload).catch(reason => console.log('TCL->', reason));
	// 		// @ts-ignore)
	// 		if(updateUserResponse.status === 200){
	// 			const httpMessageConfig = {
	// 				message: messagePrompts.successUpdateUser,
	// 				// @ts-ignore
	// 				status: updateUserResponse.status,
	// 				duration: 3, 
	// 				onClose: () => window.location.reload() 
	// 			}
	// 			HttpCodeMessage(httpMessageConfig);
	// 		}
	// 	}
	// };

	onDisable = () => {
    this.setState({
      disabled:false
    })
  }

	render() {
		const { disabled } = this.state
 		const { drawerButton,selectedProvince } = this.props;
		return(
			<div>
				<Form 
					layout="vertical"
					initialValues={{ 
						is_active:selectedProvince.is_active === true ,
						province_id:selectedProvince.province_id,
						province_code:selectedProvince.province_code,
						province_name:selectedProvince.province_name 
					}}
					// onFinish={this.onFinish}       
				>
					{this.props.drawerButton === "UPDATE"? (		
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
					{/* Defualt Input */}
					<div className="form-section">
						<Form.Item name='province_id'>
							<Input style={{ textTransform: 'uppercase', display:'none'}} />		
						</Form.Item>
						<Form.Item 
							label="PROVINCE CODE"
							name='province_code' 
							rules={[{required: true,message: 'Please input your username!',	},]}
						>
							<Input style={{ textTransform: 'uppercase'}} onChange={this.onDisable}/>
						</Form.Item>
						<Form.Item 
							label="PROVINCE NAME" 
							name='province_name' 
							rules={[{required: true,message: 'Please input your username!',},]}
						>
							<Input style={{ textTransform: 'uppercase'}} onChange={this.onDisable}/>
						</Form.Item>
					</div>
					{/* Footer */}
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
ProvinceForm.propTypes = {
	drawerButton: PropTypes.string.isRequired,
	onClose: PropTypes.func,
	actionType: PropTypes.string,
	selectedProvince:PropTypes.array.isRequired
}
ProvinceForm.defaultProps = {
	form(){ return null; },
	onClose() { return null}
};

export default ProvinceForm;