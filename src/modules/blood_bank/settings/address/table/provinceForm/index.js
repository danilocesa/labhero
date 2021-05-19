import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Form, Input, Button, Switch } from 'antd';
import HttpCodeMessage from 'shared_components/message_http_status'
import { LOGGEDIN_USER_DATA } from 'global_config/constant-global';
import { createProvinceItems,updateProvinceItems } from 'services/blood_bank/address'
import { messagePrompts } from '../settings'

export default class ProvinceForm extends Component {
  constructor(props) {
    super(props);
    this.state = { disabled: true };
	} 

  onFinish = async (values) => {
    const loggedinUser = JSON.parse(sessionStorage.getItem(LOGGEDIN_USER_DATA));
		const { buttonNames, selecetedData } = this.props;
    
    const payload = {
			province_name :values.Province,
      province_code:values.Province_code,
      created_by:loggedinUser.userID,
      province_id:selecetedData.province_id,
      is_active: (values.is_active === true) ? 1 : 0,
		};
		if(buttonNames === "ADD"){
			const createdProvinceResponse = await createProvinceItems(payload);
			// @ts-ignore
			if(createdProvinceResponse.status === 201){
				const httpMessageConfig = {
					message: messagePrompts.successCreateUser,
					// @ts-ignore
					status: createdProvinceResponse.status,	
					duration: 3, 
					onClose: () => window.location.reload() 
				}
				HttpCodeMessage(httpMessageConfig);	
			}	
		}
		else {
			payload.province_id = selecetedData.province_id;
  		const updateProvinceResponse =  await updateProvinceItems(payload)
			// @ts-ignore)
			if(updateProvinceResponse.status === 200){
				const httpMessageConfig = {
					message: messagePrompts.successUpdateUser,
					// @ts-ignore
					status: updateProvinceResponse.status,
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
    const { disabled } = this.state
    const { buttonNames, selecetedData } = this.props

    return (
      <div>
        <Form 
          layout="vertical"
          onFinish={this.onFinish}
          initialValues={{ 
						Province:selecetedData.province_name,
            Province_code:selecetedData.province_code,
            is_active:selecetedData.is_active === true 
					}}
        >
          {
            buttonNames === "UPDATE"? (		
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
            label="Province Code"
            name="Province_code"
            rules={[{ required: true, message: 'Please input your Province Code!' }]}
          >
            <Input onChange={this.onDisable}/>
          </Form.Item>
          <Form.Item
            label="Province"
            name="Province"
            rules={[{ required: true, message: 'Please input your Province!' }]}
          >
            <Input onChange={this.onDisable}/>
          </Form.Item>
          <section className="drawerFooter">
            <Button 
              shape="round" 
              style={{ marginRight: 8, width: 120 }} 
              onClick={this.props.onClose}
            >
              CANCEL
            </Button>
            <Button disabled={disabled} type="primary" shape="round" style={{ margin: 10, width: 120 }} htmlType="submit">
              {buttonNames}
            </Button>
				  </section>
        </Form>
      </div>
    )
  }
}

ProvinceForm.propTypes = {
	buttonNames: PropTypes.string.isRequired,
  selecetedData:PropTypes.object.isRequired,
}


