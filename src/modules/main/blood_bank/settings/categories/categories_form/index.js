// LIBRARY
import React from 'react';
import { Col, Switch, Typography, Form, Input, Select, Button, Row as AntRow } from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { 
	buttonLabels, 
} from '../settings';
// CSS
import './panel_form.css';

const { TextArea } = Input;

class UserAccountForm extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { drawerButton, form } = this.props;
		const { getFieldDecorator } = form;

		return(
			<div>
				<Form >
				{this.props.actionType == "update"? 
					<Form.Item label="ACTIVE" >
					{
						getFieldDecorator('active',{
						})(
							<Switch />
						)
					}
					</Form.Item>	
					:
					 null
    			  }
							<div className="form-section" >
								<Form.Item label= "ORDER" style={{ marginTop:'-25px'}}>
									{
									
                                            <Input style={{  textTransform: 'uppercase',marginTop:'-25px' }}  />
									
									}
								</Form.Item>
								<Form.Item label= "CATEGORY NAME"style={{ marginTop:'-25px'}}>
									{
                                            <Input style={{ textTransform: 'uppercase',marginTop: 10 }} />
										
									}
								</Form.Item>
								<Form.Item label= "DESCRIPTION" style={{ marginTop:'-25px'}}>
									{
											<TextArea rows={5} />
										
									}
								</Form.Item>
							</div>
					
					<section className="drawerFooter">
						<Button shape="round" style={{ marginRight: 8, width: 120 }} onClick={this.props.onClose}>
							{buttonLabels.cancel}
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

UserAccountForm.propTypes = {
	patientInfo: PropTypes.array.isRequired,
	drawerButton: PropTypes.string.isRequired,
	form: PropTypes.object,
	onClose: PropTypes.func,
	actionType: PropTypes.string
}

UserAccountForm.defaultProps = {
	form(){ return null; },
	onClose() { return null}
};

const UserAccount = Form.create()(withRouter(UserAccountForm));

export default UserAccount;