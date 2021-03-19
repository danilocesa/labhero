// LIBRARY
import React from 'react'
import {  Switch, Form, Input, Button} from 'antd'
import PropTypes from 'prop-types'
import { buttonLabels } from '../settings'

const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
  };

class CityForm extends React.Component {
	render() {
		const { drawerButton } = this.props;
		console.log(drawerButton)
			return(
				<div>
					<Form
						layout="vertical"
					>
						{drawerButton === "UPDATE"? 
							<Form.Item 
								label="ACTIVE" 
								{...layout} 
								valuePropName='checked' 
								name='is_active'
							>
								<Switch />
							</Form.Item>
						:
						null
						}
						<div className="form-section">
							<Form.Item label="HOSPITAL ID">
								<Input style={{  textTransform: 'uppercase' }}  />
							</Form.Item>
							<Form.Item label="HOSPITAL NAME">
                                <Input style={{  textTransform: 'uppercase' }}  />
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
CityForm.propTypes = {
	drawerButton: PropTypes.string.isRequired,

	onClose: PropTypes.func,
	actionType: PropTypes.string
}
CityForm.defaultProps = {
	form(){ return null; },
	onClose() { return null}
};

export default CityForm;