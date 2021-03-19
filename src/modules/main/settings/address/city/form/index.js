// LIBRARY
import React from 'react'
import {  Switch, Form, Input, Button, Select} from 'antd'
import PropTypes from 'prop-types'
import { fetchProvincesItems, createCityItems, updateCityItems } from 'services/settings/Address';
import HttpCodeMessage from 'shared_components/message_http_status'
import { buttonLabels, messagePrompts } from '../settings'

const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
};

const { Option } = Select;

class CityForm extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
			disabled: true,
			ProvincesItems:[]
    };
	} 

	async componentDidMount (){
		const ProvincesResponse = await fetchProvincesItems();
		this.setState({
			ProvincesItems:ProvincesResponse,
		})
	}

	onFinish = async values => {
		const { drawerButton } = this.props;
    const payload = {
			city_id :values.city_id,
			city_code :values.city_code,
			city_name :values.city_name,
			created_by: 1,
			province_id:	values.province,
			is_active: (values.is_active === true) ? 1 : 0,
		};
		if(drawerButton === 'ADD'){
			const createdUserResponse = await createCityItems(payload);
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
			payload.city_id = values.city_id;
			const updateUserResponse =  await updateCityItems(payload).catch(reason => console.log('TCL->', reason));
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
		const { disabled,ProvincesItems } = this.state
 		const { drawerButton,selectedCity } = this.props;
		const provinceMappedData = ProvincesItems.map((item) => {
      return (<option  value={item.province_id}>{item.province_name}</option>)
    });
		
		return(
			<div>
				<Form 
					layout="vertical"
					initialValues={{ 
						is_active:selectedCity.is_active === true ,
						city_id:selectedCity.city_id,
						city_code:selectedCity.city_code,
						city_name:selectedCity.city_name,
						province:selectedCity.selectedCity
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
					{/* Defualt Input */}
					<div className="form-section">
						<Form.Item name='city_id'>
							<Input style={{ textTransform: 'uppercase', display:'none'}} />		
						</Form.Item>
						<Form.Item 
							label="CITY CODE"
							name='city_code' 
							rules={[{required: true,message: 'Please input your username!',	},]}
						>
							<Input style={{ textTransform: 'uppercase'}} onChange={this.onDisable}/>
						</Form.Item>
						<Form.Item 
							label="CITY NAME" 
							name='city_name' 
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
CityForm.propTypes = {
	drawerButton: PropTypes.string.isRequired,
	onClose: PropTypes.func,
	actionType: PropTypes.string,
	selectedCity:PropTypes.array.isRequired
}

export default CityForm;