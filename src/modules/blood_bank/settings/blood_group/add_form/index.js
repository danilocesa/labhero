// LIBRARY
import React from 'react'
import {  Switch, Form, Input, Button} from 'antd'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import { buttonLabels } from '../settings'
// CSS
import './form.css';

const { TextArea } = Input;
const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
  };

class UserAccountForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			userTypeList: []
		};
	}	

	render() {
		const { drawerButton } = this.props;
			return(
				<div style={{marginTop: -20}}>
					<Form>
						{this.props.actionType == "update"? 
							<Form.Item label="ACTIVE" {...layout} style={{marginLeft:'-95px'}}>
									<Switch />
							</Form.Item>	
						:
						null
						}
						<div className="form-section">
							<Form.Item label="BLOOD GROUP" style={{ marginTop:'-25px'}}>
									<Input style={{  textTransform: 'uppercase',marginTop:'-25px' }}  />
							</Form.Item>
							<Form.Item label="DESCRIPTION" style={{ marginTop:'-25px'}}>
									<TextArea rows={5} />
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
	drawerButton: PropTypes.string.isRequired,

	onClose: PropTypes.func,
	actionType: PropTypes.string
}
UserAccountForm.defaultProps = {
	form(){ return null; },
	onClose() { return null}
};

// const UserAccount = Form.create()(withRouter(UserAccountForm));

// export default UserAccount;
export default withRouter(UserAccountForm);