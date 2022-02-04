import React, { Component } from 'react';
import PropTypes from 'prop-types'
import HttpCodeMessage from 'shared_components/message_http_status'
import { createCityItems, updateCityItems } from 'services/blood_bank/address'
import { LOGGEDIN_USER_DATA } from 'global_config/constant-global';
import { buttonLabels, messagePrompts } from '../settings'
import { Form, Input, Button, Switch, Col, Row } from 'antd';

export default class CityForm extends Component {
  constructor(props) {
    super(props);
    this.state = { disabled: true };
	} 

  onFinish = async (values) => {
    const loggedinUser = JSON.parse(sessionStorage.getItem(LOGGEDIN_USER_DATA));
		const { buttonNames, Province, selecetedData } = this.props;
    
    const payload = {
      city_id:selecetedData.city_id,
			city_name :values.city,
      city_code:values.city_code,
      created_by:loggedinUser.userID,
      province_id:Province,
      is_active: (values.is_active === true) ? 1 : 0,
		};
		if(buttonNames === "ADD"){
			const createdCityResponse = await createCityItems(payload);
			// @ts-ignore
			if(createdCityResponse.status === 201){
				const httpMessageConfig = {
					message: messagePrompts.successCreateUser,
					// @ts-ignore
					status: createdCityResponse.status,	
					duration: 3, 
					onClose: () => window.location.reload() 
				}
				HttpCodeMessage(httpMessageConfig);	
			}	
		}
		else {
			payload.city_id = selecetedData.city_id;
  		const updateProvinceResponse =  await updateCityItems(payload)
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
        onFinish={this.onFinish} 
        layout="vertical"
        initialValues={{ 
          city:selecetedData.city_name,
          city_code:selecetedData.city_code,
          is_active:selecetedData.is_active === true 
        }}
      >
        { 
          buttonNames === "UPDATE"? (		
            <Row >
									<Col span={4}>	
									  <Form.Item >
									    <label >ACTIVE:</label> 	
									  </Form.Item>
									</Col>

                  <Col span={6}>	
									  <Form.Item name='is_active' valuePropName='checked' >
									    <Switch onChange={this.onDisable}/>
							   	  </Form.Item>
									</Col>
								</Row> 
          )	
          :
          null
        }
        <Form.Item
          label="CITY"
          name="city"
          rules={[{ 
            required: true, 
            message: 'Please input your City!' 
          }]}
        >
          <Input style={{ textTransform: 'uppercase'}} maxLength={100} onChange={this.onDisable}/>
        </Form.Item>
        <Form.Item
          label="CITY CODE"
          name="city_code"
          rules={[{ 
            required: true, 
            message: 'Please input your City CODE!'
          }]}
        >
          <Input onChange={this.onDisable}/>
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
            {buttonNames}
          </Button>
        </section>
      </Form>
    </div>
    )
  }
}

CityForm.propTypes = {
	buttonNames: PropTypes.string.isRequired,
  Province:PropTypes.object.isRequired,
  selecetedData:PropTypes.object.isRequired,
}
