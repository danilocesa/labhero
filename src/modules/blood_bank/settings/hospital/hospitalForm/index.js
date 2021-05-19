import React, { Component } from 'react';
import PropTypes from 'prop-types'
import HttpCodeMessage from 'shared_components/message_http_status'
import { LOGGEDIN_USER_DATA } from 'global_config/constant-global';
import { createHospitalList, updateHospitalList } from 'services/blood_bank/hospital';
import { Form, Input, Button, Switch } from 'antd';
import { messagePrompts } from '../settings'

const { TextArea } = Input;
export default class HospitalForm extends Component {
  constructor(props) {
    super(props);
    this.state = { disabled: true };
	} 

  onFinish = async (values) => {
		const loggedinUser = JSON.parse(sessionStorage.getItem(LOGGEDIN_USER_DATA));
    console.log("file: index.js ~ line 31 ~ BloodGroupForm ~ onFinish= ~ loggedinUser", loggedinUser)
		const { buttonNames, selecetedData } = this.props;
    const payload = {
			hospital_id:selecetedData.hospital_id,
			hospital_name :values.Hospital,
			created_by: loggedinUser.userID,	
			is_active: (values.is_active === true) ? 1 : 0,
		};
		if(buttonNames === 'ADD'){
			const createdHospitalresponse = await createHospitalList(payload);
			// @ts-ignore
			if(createdHospitalresponse.status === 201){
				const httpMessageConfig = {
					message: messagePrompts.successCreateUser,
					// @ts-ignore
					status: createdHospitalresponse.status,	
					duration: 3, 
					onClose: () => window.location.reload() 
				}
				HttpCodeMessage(httpMessageConfig);	
			}	
		}
		else {
			payload.hospital_id = selecetedData.hospital_id;
			const updateHospitalresponse =  await updateHospitalList(payload)
			// @ts-ignore)
			if(updateHospitalresponse.status === 200){
				const httpMessageConfig = {
					message: messagePrompts.successUpdateUser,
					// @ts-ignore
					status: updateHospitalresponse.status,
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
						is_active:selecetedData.is_active === true ,
						Hospital:selecetedData.hospital_name
					}}   
        >
          {
						buttonNames === "UPDATE" 
						? 
							(		
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
            label="Hospital"
            name="Hospital"
            rules={[{ required: true, message: 'Please input your Hospital!' }]}
          >
            <Input onChange={this.onDisable}/>
          </Form.Item>
          <Form.Item
            label="Location"
            name="Location"
            rules={[{ required: true, message: 'Please input your Location!' }]}
          >
            <TextArea rows={4} onChange={this.onDisable}/>
          </Form.Item>
          <section className="drawerFooter">
            <Button shape="round" style={{ marginRight: 8, width: 120 }} onClick={this.props.onClose}>
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

HospitalForm.propTypes = {
	buttonNames: PropTypes.string.isRequired,
	selecetedData:PropTypes.object.isRequired,
}

