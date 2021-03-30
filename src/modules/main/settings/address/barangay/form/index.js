// LIBRARY
import React from 'react'
import {  Switch, Form, Input, Button, Select } from 'antd'
import PropTypes from 'prop-types'
import { createBarangayItems,fetchProvincesItems,fetchCityItems,updateBarangayItems } from 'services/settings/Address';
import HttpCodeMessage from 'shared_components/message_http_status'
import { buttonLabels,messagePrompts } from '../settings'

const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
  };

const { Option } = Select;

class BarangayForm extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
			disabled: true,
			ProvincesItems:[],
			CityItem:[]
    };
	} 

	async componentDidMount (){
		const ProvincesResponse = await fetchProvincesItems();
		const CityResponse = await fetchCityItems();
		this.setState({
			ProvincesItems:ProvincesResponse,
			CityItem:CityResponse
		})
	}

	// onFinish = async values => {
	// 	const { drawerButton } = this.props;
  //   const payload = {
	// 		barangay_id :values.barangay_id,
	// 		barangay_code :values.barangay_code,
	// 		barangay_name :values.barangay_name,
	// 		province:values.province,
	// 		city:values.province,
	// 		created_by: 1,	
	// 		is_active: (values.is_active === true) ? 1 : 0,
	// 	};
	// 	if(drawerButton === 'ADD'){
	// 		const createdUserResponse = await createBarangayItems(payload);
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
	// 		payload.barangay_id = values.barangay_id;
	// 		const updateUserResponse =  await updateBarangayItems(payload).catch(reason => console.log('TCL->', reason));
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
		const { disabled,ProvincesItems,CityItem } = this.state
		const { drawerButton,selectedBarangay } = this.props;

		const provinceMappedData = ProvincesItems.map((item) => {
      return (<option  value={item.province_id}>{item.province_name}</option>)
    });
		const CityMappedData = CityItem.map((item) => {
      return (<option  value={item.city_id}>{item.city_name}</option>)
    });


		return(
			<div>
				<Form 
					layout="vertical"
					initialValues={{ 
						is_active:selectedBarangay.is_active === true ,
						barangay_id:selectedBarangay.barangay_id,
						barangay_code:selectedBarangay.barangay_code,
						barangay_name:selectedBarangay.barangay_name 
					}}
					// onFinish={this.onFinish}       
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
					{/* Defualt Input */}
					<div className="form-section">
						<Form.Item name='barangay_id'>
							<Input style={{ textTransform: 'uppercase', display:'none'}} />		
						</Form.Item>
						<Form.Item 
							label="BARANGAY CODE"
							name='barangay_code' 
							rules={[{required: true,message: 'Please input your username!',	},]}
						>
							<Input style={{ textTransform: 'uppercase'}} onChange={this.onDisable}/>
						</Form.Item>
						<Form.Item 
							label="BARANGAY NAME" 
							name='barangay_name' 
							rules={[{required: true,message: 'Please input your username!',},]}
						>
							<Input style={{ textTransform: 'uppercase'}} onChange={this.onDisable}/>
						</Form.Item>
						<Form.Item 
							label="PROVINCE" 
							name='province' 
							rules={[{required: true,message: 'Please input Province!',},]}
						>
							<Select placeholder="Province">
								{provinceMappedData}
							</Select>
						</Form.Item>
						<Form.Item 
							label="CITY" 
							name='city' 
							rules={[{required: true,message: 'Please input Province!',},]}
						>
							<Select placeholder="Province">
								{CityMappedData}
							</Select>
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
BarangayForm.propTypes = {
	selectedBarangay:PropTypes.array.isRequired,
	drawerButton: PropTypes.string.isRequired,
	onClose: PropTypes.func,
	actionType: PropTypes.string
}

export default BarangayForm;