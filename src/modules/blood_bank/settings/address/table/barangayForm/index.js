import React, { Component } from 'react';
import { LOGGEDIN_USER_DATA } from 'global_config/constant-global';
import HttpCodeMessage from 'shared_components/message_http_status'
import PropTypes from 'prop-types'
import { createBarangayItems, updateBarangayItems } from 'services/blood_bank/address'
import { Form, Input, Button, Switch, Col, Row } from 'antd';
import { buttonLabels, messagePrompts } from '../settings'

export default class BarangayForm extends Component {
  constructor(props) {
    super(props);
    this.state = { disabled: true };
	} 

  onFinish = async (values) => {
    const loggedinUser = JSON.parse(sessionStorage.getItem(LOGGEDIN_USER_DATA));
		const { 
      buttonNames, 
      cityId, 
      selecetedData, 
      provinceId 
    } = this.props;
    console.log("🚀 ~ file: index.js ~ line 23 ~ BarangayForm ~ onFinish= ~ cityId", cityId)
    console.log("🚀 ~ file: index.js ~ line 22 ~ BarangayForm ~ onFinish= ~ provinceId", provinceId)
    const payload = {
      barangay_id:selecetedData.barangay_id,
      province:provinceId,
			barangay_name :values.barangay,
      barangay_code:values.barangay_code,
      created_by:loggedinUser.userID,
      city:cityId,
      is_active: (values.is_active === true) ? 1 : 0,
		};
		// if(buttonNames === "ADD"){
		// 	const createdBarangayResponse = await createBarangayItems(payload);
		// 	// @ts-ignore
		// 	if(createdBarangayResponse.status === 201){
		// 		const httpMessageConfig = {
		// 			message: messagePrompts.successCreateUser,
		// 			// @ts-ignore
		// 			status: createdBarangayResponse.status,	
		// 			duration: 3, 
		// 			onClose: () => window.location.reload() 
		// 		}
		// 		HttpCodeMessage(httpMessageConfig);	
		// 	}	
		// }
		// else {
		// 	payload.barangay_id = selecetedData.barangay_id;
  	// 	const updateBarangayResponse =  await updateBarangayItems(payload)
		// 	// @ts-ignore)
		// 	if(updateBarangayResponse.status === 200){
		// 		const httpMessageConfig = {
		// 			message: messagePrompts.successUpdateUser,
		// 			// @ts-ignore
		// 			status: updateBarangayResponse.status,
		// 			duration: 3, 
		// 			onClose: () => window.location.reload() 
		// 		}
		// 		HttpCodeMessage(httpMessageConfig);
		// 	}
		// }
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
            barangay:selecetedData.barangay_name,
            barangay_code:selecetedData.barangay_code,
            is_active:selecetedData.is_active === true 
          }}
        >
          { 
            buttonNames === "UPDATE"? (		
              <Row >
              <Col span={4} >	
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
            label="BARANGAY"
            name="barangay"
            rules={[{ 
              required: true, 
              message: 'PLEASE INPUT YOUR BARANGAY!'
            }]}
          >
            <Input style={{ textTransform: 'uppercase'}} maxLength={50} onChange={this.onDisable}/>
          </Form.Item>
          <Form.Item
            label="Barangay Code"
            name="barangay_code"
            rules={[{ 
              required: true, 
              message: 'Please input your Barangay Code!'
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
              htmlType="submit"
              style={{ 
                margin: 10, 
                width: 120 
              }} 
            >
              {buttonNames}
            </Button>
				  </section>
        </Form>
      </div>
    )
  }
}
BarangayForm.propTypes = {
	buttonNames: PropTypes.string.isRequired,
  cityId:PropTypes.number,
  provinceId:PropTypes.number,
  selecetedData:PropTypes.object.isRequired,
}
