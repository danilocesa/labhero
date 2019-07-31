import React from 'react';
import { Drawer, Form, Input, Button } from 'antd';
import PropTypes from 'prop-types';

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
	onSubmit = (event) => {
		event.preventDefault();

		// eslint-disable-next-line react/prop-types
		const { getFieldsValue, validateFieldsAndScroll } = this.props.form;

		validateFieldsAndScroll(async(err) => {
			if (!err) {
				const fields = getFieldsValue();
				
				this.setState({ isLoading: true });
				const test = await this.createExamItem(fields);
				this.setState({ isLoading: false });

				console.log(test);
			}
		});
	}
	
	render() {
		const { getFieldDecorator } = this.props.form;
		const { onClose, visible } = this.props;

		return (
			<Drawer
				title="Update Exam"
				width="400"
				placement="right"
				closable
				onClose={onClose}
				visible={visible}
			>
				<Form onSubmit={this.onSubmit}>
					<section style={{ marginBottom: 50 }}>
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
				</Form>
			</Drawer>
		);
	}
}

UpdateForm.propTypes = {
	onClose: PropTypes.func.isRequired,
	visible: PropTypes.bool.isRequired
};

export default Form.create()(UpdateForm);