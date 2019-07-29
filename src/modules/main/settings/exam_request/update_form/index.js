import React from 'react';
import { Drawer, Form, Input, Row, Col, Select, Button } from 'antd';
import PropTypes from 'prop-types';

const { Option } = Select;

const footerStyle = { 
	position: 'absolute', 
	width: '100%', 
	bottom: 0, 
	left: 0,  
	borderTop: '1px solid #e8e8e8',
	backgroundColor: '#fff',
	textAlign: 'right'
};

class UpdateForm extends React.Component {
	render() {
		const { getFieldDecorator } = this.props.form;
		const { onClose, visible } = this.props;

		return (
			<Drawer
				title="Update Exam"
				width={400}
				placement="right"
				closable
				onClose={onClose}
				visible={visible}
			>
				<section style={{ marginBottom: 50 }}>
					<Form>
						<Form.Item label="Result Name">
							<Input />
						</Form.Item>
						<Form.Item label="Result General Name">
							<Input />
						</Form.Item>
						<Form.Item label="Result Type">
							<Input />
						</Form.Item>
						<Form.Item label="Integration Code">
							<Input />
						</Form.Item>
					</Form>
				</section>
				<section style={footerStyle}>
					<div>
						<Button 
							shape="round" 
							style={{ margin: 10 }}
						>
							CANCEL
						</Button>
						<Button 
							type="primary" 
							shape="round"
							style={{ margin: 10 }}
						>
							UPDATE
						</Button>
					</div>
				</section>
			</Drawer>
		);
	}
}

UpdateForm.propTypes = {
	onClose: PropTypes.func.isRequired,
	visible: PropTypes.bool.isRequired
};

export default Form.create()(UpdateForm);