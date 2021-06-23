import { Form,Input,Button, Switch } from 'antd'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import createBloodTypeAPI , {updateBloodTypeAPI} from 'services/blood_bank/blood_types'
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

  onSubmit = async (values) => {
		console.log( "buttonNames")
		const loggedinUser = JSON.parse(sessionStorage.getItem(LOGGEDIN_USER_DATA));
		const { buttonNames, selectedBloodTypes } = this.props;
		console.log(selectedBloodTypes, "selectBlood")
    	const payload = {
			blood_type_id :selectedBloodTypes.blood_type_id,
			blood_group :values.blood_group,
			blood_type: values.blood_type,
			blood_desc : values.blood_description,
			created_by: 1,	
			is_active: (values.is_active === true) ? 1 : 0,
		};
		console.log(payload,"payload")
		if(buttonNames === 'ADD'){
			const createdBloodTypeResponse = await createBloodTypeAPI(payload);
			// @ts-ignore
			if(createdBloodTypeResponse.status === 201){
				const httpMessageConfig = {
					message: messagePrompts.successCreateUser,
					// @ts-ignore
					status: createdBloodTypeResponse.status,	
					duration: 3, 
					onClose: () => window.location.reload() 
				}
				HttpCodeMessage(httpMessageConfig);	
			}	
		}
		else {
			payload.blood_type_id = selectedBloodTypes.blood_type_id;
			const updateBloodTypeResponse =  await updateBloodTypeAPI(payload)
			// @ts-ignore)
			if(updateBloodTypeResponse.status === 200){
				const httpMessageConfig = {
					message: messagePrompts.successUpdateUser,
					// @ts-ignore
					status: updateBloodTypeResponse.status,
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
    const { disabled } = this.state
    const { buttonNames, dropdownvalues, selectedBloodTypes } = this.props
    
		return (
      <div>
        <Form 
					onFinish={this.onSubmit} 
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
        <section className="drawerFooter">
          <Button shape="round" style={{ marginRight: 8, width: 120 }} onClick={this.props.onClose}>
            CANCEL
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

BloodTypesForm.propTypes = {
	buttonNames: PropTypes.string.isRequired,
  dropdownvalues:PropTypes.string.isRequired,
  selectedBloodTypes:PropTypes.object.isRequired,
}

