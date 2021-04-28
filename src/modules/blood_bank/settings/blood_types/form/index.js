import { Form,Input,Button, Switch } from 'antd'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import HttpCodeMessage from 'shared_components/message_http_status'
import { LOGGEDIN_USER_DATA } from 'global_config/constant-global';
import { messagePrompts } from '../setings'

const { TextArea } = Input;

export default class BloodTypesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
			disabled: true,
    };
	} 

  onFinish = async (values) => {
		// const loggedinUser = JSON.parse(sessionStorage.getItem(LOGGEDIN_USER_DATA));
		// const { buttonNames, selectedBloodGroup } = this.props;
    // const payload = {
		// 	blood_type_id :selectedBloodGroup.blood_type_id,
		// 	blood_group :values.blood_group,
		// 	blood_type: values.blood_type,
		// 	blood_desc : values.blood_description,
		// 	created_by: loggedinUser.userID,	
		// 	is_active: (values.is_active === true) ? 1 : 0,
		// };
		// if(buttonNames === 'ADD'){
		// 	const createdBloodGroupResponse = await createBloodGroupAPI(payload);
		// 	// @ts-ignore
		// 	if(createdBloodGroupResponse.status === 201){
		// 		const httpMessageConfig = {
		// 			message: messagePrompts.successCreateUser,
		// 			// @ts-ignore
		// 			status: createdBloodGroupResponse.status,	
		// 			duration: 3, 
		// 			onClose: () => window.location.reload() 
		// 		}
		// 		HttpCodeMessage(httpMessageConfig);	
		// 	}	
		// }
		// else {
		// 	payload.blood_group_id = selectedBloodGroup.blood_group_id;
		// 	const updateBloodGroupResponse =  await updateBloodGroupAPI(payload)
		// 	// @ts-ignore)
		// 	if(updateBloodGroupResponse.status === 200){
		// 		const httpMessageConfig = {
		// 			message: messagePrompts.successUpdateUser,
		// 			// @ts-ignore
		// 			status: updateBloodGroupResponse.status,
		// 			duration: 3, 
		// 			onClose: () => window.location.reload() 
		// 		}
		// 		HttpCodeMessage(httpMessageConfig);
		// 	}
		// }
	};

  onDisable = () => {
    this.setState({
      disabled:false
    })
  }

  render() {
    const { disabled } = this.state
    const { buttonNames, dropdownvalues, selectedBloodTypes } = this.props
    return (
      <div>
        <Form 
          onFinish={this.onFinish} 
          layout="vertical"
          initialValues={{ 
						is_active:selectedBloodTypes.is_active === true ,
						BG:dropdownvalues,
						BT:selectedBloodTypes.blood_type,
						DES:selectedBloodTypes.blood_desc 
					}}  
        >
          {
						buttonNames == "UPDATE" 
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
            label="BLOOD GROUP"
            name="BG"
          >
            <Input disabled={true}/>
          </Form.Item>
          <Form.Item
            label="BLOOD TYPES"
            name="BT"
            rules={[{ required: true, message: 'Please input your Blood Types!' }]}
          >
            <Input onChange={this.onDisable}/>
          </Form.Item>

          <Form.Item
            label="DESCRIPTION"
            name="DES"
          >
            <TextArea rows={4} onChange={this.onDisable}/>
          </Form.Item>
        </Form>
        <section className="drawerFooter">
          <Button shape="round" style={{ marginRight: 8, width: 120 }} onClick={this.props.onClose}>
            CANCEL
          </Button>
          <Button disabled={disabled} type="primary" shape="round" style={{ margin: 10, width: 120 }} htmlType="submit">
            {buttonNames}
          </Button>
				</section>
      </div>
    )
  }
}

BloodTypesForm.propTypes = {
	buttonNames: PropTypes.string.isRequired,
  dropdownvalues:PropTypes.string.isRequired,
  selectedBloodTypes:PropTypes.object.isRequired,
}

