import React from 'react';
import { Drawer, Form, Input, Button } from 'antd';
import PropTypes from 'prop-types';
import axiosCall from 'services/axiosCall';
import Message from 'shared_components/message';

import FIELD_RULES from './constant';

const footerStyle = { 
	position: 'absolute', 
	width: '100%', 
	bottom: 0, 
	left: 0,  
	borderTop: '1px solid #e8e8e8',
	backgroundColor: '#fff',
	textAlign: 'right'
};

class AddForm extends React.Component {
	state = {
		isLoading: false
	}
	
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
	
	createExamItem = async (examItem) => {
		let createdExamItem;

		try{
			const content = {
				method: 'POST',
				url: '/ExamResult',
				data: { ...examItem, sectionID: 0, specimenID: 0 }
			}

			const response = await axiosCall(content);
			const { data } = await response;

			// eslint-disable-next-line no-unneeded-ternary
			createdExamItem = data;
		}
		catch(error) {
			Message.error();
		}

		return createdExamItem;
	}

	render() {
		const { isLoading } = this.state;
		const { getFieldDecorator } = this.props.form;
		const { onClose, visible } = this.props;

		return (
			<Drawer
				title="Add Exam"
				width="400"
				placement="right"
				closable
				onClose={onClose}
				visible={visible}
			>
				<Form onSubmit={this.onSubmit}>
					<section style={{ marginBottom: 50 }}>
						<Form.Item label="Result Name">
							{getFieldDecorator('resultName', { rules: FIELD_RULES.resultName })(
								<Input />
							)}
						</Form.Item>
						<Form.Item label="Result General Name">
							{getFieldDecorator('resultGeneralName', { rules: FIELD_RULES.resultGeneralName })(
								<Input />
							)}
						</Form.Item>
						<Form.Item label="Result Type">
							{getFieldDecorator('resultType', { rules: FIELD_RULES.resultType })(
								<Input />
							)}
						</Form.Item>
						<Form.Item label="Integration Code">
							{getFieldDecorator('integrationCode', { rules: FIELD_RULES.integrationCode })(
								<Input />
							)}
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
								shape="round" 
								type="primary" 
								htmlType="submit"
								loading={isLoading}
								style={{ margin: 10 }}
							>
								CREATE
							</Button>
						</div>
					</section>
				</Form>
			</Drawer>
		);
	}
}

AddForm.propTypes = {
	onClose: PropTypes.func.isRequired,
	visible: PropTypes.bool.isRequired
};

export default Form.create()(AddForm);