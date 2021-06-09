// LIBRARY
import React from 'react'
// @ts-ignore
import {  Switch, Form, Input, Button } from 'antd'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';

// CSS
import './form.css';

// @ts-ignore
const { TextArea } = Input;
const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
  };

class BloodTestsForm extends React.Component {

    
	render() {
		// @ts-ignore
		const { drawerButton,selectedTypes } = this.props;
		console.log("selectedTypes",selectedTypes)
			return(
				<div>
					<Form 
							layout="vertical"
							className="exam-item-add-form"   
						>
							{
								this.props.drawerButton === "UPDATE"? 
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
								name='id'
							>
									<Input style={{ textTransform: 'uppercase', display:'none'}} />		
							</Form.Item>
							<Form.Item	 
								label="BLOOD TEST" 
								name='blood_test'
								style={{marginTop:10}}
							>
									<Input style={{ textTransform: 'uppercase'}} />		
							</Form.Item>
							<Form.Item 
								label="DESCRIPTION" 
								name='blood_desc' 
								style={{marginTop: 10}}
							>
									<TextArea  style={{ textTransform: 'uppercase'}} />
							</Form.Item>
							<Form.Item 
								label="NORMAL VALUE" 
								name='normal_value' 
								style={{marginTop: 10}}
							>
									<Input style={{ textTransform: 'uppercase'}} />
							</Form.Item>
						</div>
						<section className="drawerFooter">
					<Button shape="round" style={{ marginRight: 8, width: 120 }} onClick={this.props.onClose}>
						CANCEL
					</Button>
					<Button type="primary" shape="round" style={{ margin: 10, width: 120 }} htmlType="submit">
							{drawerButton}
					</Button>
				</section>
						</Form>
				</div>
			);
	}
}

BloodTestsForm.propTypes = {
	drawerButton: PropTypes.string.isRequired,
	onClose: PropTypes.func,
	actionType: PropTypes.string.isRequired,
	patientInfo: PropTypes.array.isRequired,
	selectedTypes:PropTypes.object.isRequired,
	form: PropTypes.object
}

export default withRouter(BloodTestsForm);