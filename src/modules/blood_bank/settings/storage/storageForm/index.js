import React from 'react';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';
import { Form, Input, Button, Switch, Col, Row} from 'antd';
import { LOGGEDIN_USER_DATA } from 'global_config/constant-global';
import HttpCodeMessage from 'shared_components/message_http_status'
import { createBloodStorageAPI, updateBloodStorageAPI } from 'services/blood_inventory/blood_storage';
import { buttonLabels, drawerAdd, messagePrompts } from '../settings'
//import { FormControlLabel } from '@material-ui/core';
const { TextArea } = Input;

class StorageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { disabled: true };
	} 

  onFinish = async (values) => {
		const loggedinUser = JSON.parse(sessionStorage.getItem(LOGGEDIN_USER_DATA));
		const { drawerButton, selectedBloodStorage } = this.props;
    	const payload = {
			blood_storage_id :selectedBloodStorage.blood_storage_id,
      created_date: values.created_date,
      last_updated_by: values.last_updated_by,
      last_updated_date: values.last_updated_date,
			storage_name :values.storage_name,
			storage_desc : values.storage_desc,	
			is_active: (values.is_active === true) ? 1 : 0,
      created_by: loggedinUser.userID
		};
		if(drawerButton === drawerAdd){
			const createdBloodStorageResponse = await createBloodStorageAPI(payload);
			// @ts-ignore
			if(createdBloodStorageResponse.status === 201){
				const httpMessageConfig = {
					message: messagePrompts.successCreateUser,
					// @ts-ignore
					status: createdBloodStorageResponse.status,	
					duration: 3, 
					onClose: () => window.location.reload() 
				}
				HttpCodeMessage(httpMessageConfig);	
			}	
		}
		else {
			payload.blood_storage_id = selectedBloodStorage.blood_storage_id;
			const updateBloodStorageResponse =  await updateBloodStorageAPI(payload)
			// @ts-ignore)
			if(updateBloodStorageResponse.status === 200){
				const httpMessageConfig = {
					message: messagePrompts.successUpdateUser,
					// @ts-ignore
					status: updateBloodStorageResponse.status,
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
    const { drawerButton, selectedBloodStorage } = this.props
    return (
      <div>
        <Form
          layout="vertical"
          onFinish={this.onFinish}
          initialValues={{ 
						is_active:selectedBloodStorage.is_active === true ,
						blood_storage_id:selectedBloodStorage.blood_storage_id,
						storage_name:selectedBloodStorage.storage_name,
						storage_desc:selectedBloodStorage.storage_desc 
					}}   
        >
          {
						drawerButton == "UPDATE" 
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
            label="STORAGE"
            name='storage_name'
            rules={[{ required: true, message: 'Please input your Storage!' }]}
          >
            <Input style={{ textTransform: 'uppercase'}} maxLength={50} onChange={this.onDisable}/>
          </Form.Item>
          <Form.Item
					  maxLength={100}
            label="DESCRIPTION"
            name= 'storage_desc'
          >
            <TextArea style={{ textTransform: 'uppercase'}} rows={4} onChange={this.onDisable}/>
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
              {drawerButton}
            </Button>
				  </section>
        </Form>
      </div>
    );
  }
}

StorageForm.propTypes = {
	drawerButton: PropTypes.string.isRequired,
  selectedBloodStorage:PropTypes.object.isRequired,
  patientInfo: PropTypes.array.isRequired,
  form: PropTypes.object,
  onClose: PropTypes.func,
	actionType: PropTypes.string
}


export default withRouter(StorageForm);