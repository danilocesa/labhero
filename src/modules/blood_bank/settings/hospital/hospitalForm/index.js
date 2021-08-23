import React  from 'react';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';
import HttpCodeMessage from 'shared_components/message_http_status'
import { LOGGEDIN_USER_DATA } from 'global_config/constant-global';
import  {createHospitalList, updateHospitalList}  from 'services/blood_bank/hospital';
import { Form, Input, Button, Switch, Col, Row } from 'antd';
import {  buttonLabels, drawerAdd, messagePrompts } from '../settings'


const { TextArea } = Input;
class HospitalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { disabled: true };
	} 

  onFinish = async (values) => {
		const loggedinUser = JSON.parse(sessionStorage.getItem(LOGGEDIN_USER_DATA));
    //console.log("file: index.js ~ line 31 ~ BloodGroupForm ~ onFinish= ~ loggedinUser", loggedinUser)
		const { drawerButton, selectedData } = this.props;
    const payload = {
			hospital_id:selectedData.hospital_id,
			hospital_name :values.hospital_name,
			hospital_location:values.hospital_location,
			created_by: 1,	
			is_active: (values.is_active === true) ? 1 : 0,
		};
		if(drawerButton === drawerAdd){
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
			payload.hospital_id = selectedData.hospital_id;
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
    const { drawerButton, selectedData } = this.props
    return (
      <div>
        <Form 
          layout="vertical" 
          onFinish={this.onFinish} 
          initialValues={{ 
						is_active:selectedData.is_active === true ,
						hospital_id:selectedData.hospital_id,
						hospital_name:selectedData.hospital_name,
						hospital_location:selectedData.hospital_location,
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
								// <Form.Item 
								// 	label="ACTIVE" 
								// 	name='is_active'
								// 	valuePropName='checked'
								// >
								// 	<Switch onChange={this.onDisable}/>
								// </Form.Item>
							)	
						:
							null
					}
          <Form.Item
            label="HOSPITAL"
            name= 'hospital_name'
            rules={[{ required: true, message: 'Please input your Hospital!' }]}
          >
            <Input  style={{ textTransform: 'uppercase'}}  maxLength={50}  onChange={this.onDisable}/>
          </Form.Item>
          <Form.Item
            label="LOCATION"
            name= 'hospital_location'
            rules={[{ required: true, message: 'Please input your Location!' }]}
          >
            <TextArea  style={{ textTransform: 'uppercase'}} rows={4} maxLength={500}  onChange={this.onDisable}/>
          </Form.Item>

          <section className="drawerFooter">
            <Button shape="round" 
						style={{ marginRight: 8, width: 120 }} 
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

HospitalForm.propTypes = {
	drawerButton: PropTypes.string.isRequired,
	selectedData:PropTypes.object.isRequired,
	patientInfo: PropTypes.array.isRequired,
  form: PropTypes.object,
  onClose: PropTypes.func,
	actionType: PropTypes.string
}

export default withRouter(HospitalForm);