import { Form,Input,Button, Switch, Col, Row} from 'antd'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import createBloodTypeAPI , {updateBloodTypeAPI, fetchBloodTypes} from 'services/general_settings/blood_types'
import HttpCodeMessage from 'shared_components/message_http_status'
import { LOGGEDIN_USER_DATA } from 'global_config/constant-global';
import {buttonLabels, drawerAdd, messagePrompts,} from '../settings';
const { TextArea } = Input;


export default class BloodTypesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
			disabled: true,
    };
	} 
  
  //  async componentDidMount(){
  //   const apiResponseBloodType = await fetchBloodTypes(); 
  //   console.log("🚀 ~ file: index.js ~ line 21 ~ BloodTypesForm ~ componentDidMount ~ apiResponseBloodType", apiResponseBloodType)

  // }

  onSubmit = async (values) => {
		console.log( "buttonNames")
		const loggedinUser = JSON.parse(sessionStorage.getItem(LOGGEDIN_USER_DATA));
		//console.log("file: index.js ~ line 31 ~ BloodTypesForm ~ onSubmit= ~ loggedinUser", loggedinUser)
		const { drawerButton, selectedBloodTypes } = this.props;

    	const payload = {
			blood_type_id :selectedBloodTypes.blood_type_id,
			blood_group :values.blood_group,
			blood_type: values.blood_type,
			blood_desc : values.blood_description,
			created_by: 1,	
			is_active: (values.is_active === true) ? 1 : 0,
		};
	
		if(drawerButton === drawerAdd){

			const createdBloodTypeResponse = await createBloodTypeAPI(payload);
			// @ts-ignore
		
			if(createdBloodTypeResponse.status === 201 ){
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

		// if (!(payload.blood_group && payload.is_active === true)) {
    //   console.log('Probably should just stay in then.');
    // } else {
    //   console.log('You should leave the house quickly.');
    // }
	};

  onDisable = () => {
    this.setState({
      disabled:false
    })
  }

  render() {
    const { disabled } = this.state
    const { drawerButton, selectedBloodTypes, dropdownvalues} = this.props
    
		return (
      <div>
        <Form 
					onFinish={this.onSubmit} 
					layout="vertical"
          initialValues={{ 
						is_active:selectedBloodTypes.is_active === true ,
						blood_group:dropdownvalues,
						blood_type:selectedBloodTypes.blood_type,
						blood_description:selectedBloodTypes.blood_desc,
						
					}}  
        >
          {
						drawerButton === "UPDATE"
						? 
							(		
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
            label="BLOOD GROUP"
            name='blood_group'
          >
            <Input style={{ textTransform: 'uppercase'}} disabled={true}/>
				
          </Form.Item>
          <Form.Item
            label="BLOOD TYPE"
            name='blood_type'
            rules={[{ required: true, message: 'Please input your Blood Type!' }]}
          >
            <Input style={{ textTransform: 'uppercase'}} onChange={this.onDisable}/>
          </Form.Item>

          <Form.Item
            label="DESCRIPTION"
            name='blood_description'
          >
            <TextArea style={{ textTransform: 'uppercase'}} rows={4} maxLength={100} onChange={this.onDisable}/>
          </Form.Item>
        <section className="drawerFooter">
          <Button shape="round" style={{ marginRight: 8, width: 120 }} 
					type="button"
					onClick={this.props.onClose}>
            {buttonLabels.cancel}


          </Button>
          <Button 
						disabled={disabled} 
						type="primary" 
						shape="round" 
						style={{ margin: 10, width: 120 }} 
						htmlType="submit"
					>
            {drawerButton}
          </Button>
				</section>
				
				</Form>
      </div>
    )
  }
}

BloodTypesForm.propTypes = {
	drawerButton: PropTypes.string.isRequired,
  dropdownvalues:PropTypes.string.isRequired,
  selectedBloodTypes:PropTypes.object.isRequired,
	//selectedBloodGroup:PropTypes.object.isRequired,

	form: PropTypes.object,
	onClose: PropTypes.func,
	actionType: PropTypes.string
}

