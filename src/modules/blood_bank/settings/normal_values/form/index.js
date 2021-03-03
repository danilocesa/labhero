// LIBRARY
import React from 'react'
import {  Switch, Form, Input, Button,InputNumber } from 'antd'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';
import HttpCodeMessage from 'shared_components/message_http_status'
import { createData, updateData } from 'services/blood_bank/question_type';
import { buttonLabels,drawerAdd,messagePrompts } from '../settings'

// CSS
import './form.css';

const { TextArea } = Input;
const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
  };

class BloodTypesForm extends React.Component {

    
	render() {
		const { drawerButton,selectedTypes } = this.props;
		console.log("selectedTypes",selectedTypes)
			return(
				<div>
					<Form 
							layout="vertical"
							className="exam-item-add-form"   
						>
							{
								this.props.drawerButton == "UPDATE"? 
								(		
									<Form.Item 
										label="ACTIVE" 
										{...layout} 
										valuePropName='checked' 
										name='is_active'
										style={{marginBottom:'-40px'}}
									>
										<Switch />
									</Form.Item>
								)	
							:
								null
							}
							<div className="form-section">
							<Form.Item 
								name='ques_type_id'
							>
									<Input style={{ textTransform: 'uppercase', display:'none'}} />		
							</Form.Item>
							<Form.Item	 
								label="QUESTION ORDER" 
								name='ques_order'
								style={{marginTop:-15}}
							>
									<Input style={{ textTransform: 'uppercase'}} />		
							</Form.Item>
							<Form.Item 
								label="QUESTION TYPE NAME" 
								name='ques_type_name' 
								style={{marginTop:-25}}
							>
									<Input style={{ textTransform: 'uppercase'}} />
							</Form.Item>
						</div>
						<section className="drawerFooter">
					<Button shape="round" style={{ marginRight: 8, width: 120 }} onClick={this.props.onClose}>
						CANCEL
					</Button>
					<Button type="primary" shape="round" style={{ margin: 10, width: 120 }} htmlType="submit">
						ADD
					</Button>
				</section>
						</Form>
				</div>
			);
	}
}

BloodTypesForm.propTypes = {
	drawerButton: PropTypes.string.isRequired,
	onClose: PropTypes.func,
	actionType: PropTypes.string.isRequired,
	patientInfo: PropTypes.array.isRequired,
	selectedTypes:PropTypes.object.isRequired,
	form: PropTypes.object
}

export default withRouter(BloodTypesForm);