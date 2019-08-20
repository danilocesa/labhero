import React from 'react';
import { Drawer, Form, Input, Row, Col, Button, InputNumber } from 'antd';
import PropTypes from 'prop-types';
import Message from 'shared_components/message';
import axiosCall from 'services/axiosCall';

import FIELD_RULES from './constant';

/** @type {{footer: React.CSSProperties}} */
const styles = {
	footer: { 
		position: 'absolute', 
		width: '100%', 
		bottom: 0, 
		left: 0,  
		borderTop: '1px solid #e8e8e8',
		backgroundColor: '#fff',
		textAlign: 'right'
	}
};

class AddForm extends React.Component {
	state = { isLoading: false }
	
	onSubmit = (event) => {
		event.preventDefault();

		// eslint-disable-next-line react/prop-types
		const { onSuccess, form } = this.props;
		const { getFieldsValue, validateFieldsAndScroll } = form;

		validateFieldsAndScroll(async(err) => {
			if (!err) {
				const fields = getFieldsValue();
				
				this.setState({ isLoading: true });
				const createdExamRequest = await this.createExamRequest(fields);
				this.setState({ isLoading: false });

				if(createdExamRequest){
					onSuccess();
				}
			}
		});
	}
	
	createExamRequest = async (examItem) => {
		let createdExamItem = null;

		try{
			const content = {
				method: 'POST',
				url: '/ExamRequest',
				data: { ...examItem, sectionID: 0, specimenID: 0 }
			}

			const response = await axiosCall(content);
			const { data } = await response;

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
				title="Add Exam Request"
				width="60%"
				placement="right"
				closable
				onClose={onClose}
				visible={visible}
			>
				<Form onSubmit={this.onSubmit}>
					<section style={{ marginBottom: 50 }}>
						<div style={{ margin: '0px 50px' }}>
							<Row gutter={64}>
								<Col span={12}>
									<Form.Item label="EXAM NAME">
										{getFieldDecorator('examName', { rules: FIELD_RULES.examName })(
											<Input />
										)}
									</Form.Item>
								</Col>
								<Col span={12}>
									<Form.Item label="EXAM CODE">
										{getFieldDecorator('examCode', { rules: FIELD_RULES.examCode })(
											<Input />
										)}
									</Form.Item>
								</Col>
							</Row>
							<Row gutter={64}>
								<Col span={12}>
									<Form.Item label="LOINC">
										{getFieldDecorator('loinc', { rules: FIELD_RULES.loinc })(
											<Input />
										)}
									</Form.Item>
								</Col>
								<Col span={12}>
									<Form.Item label="INTEGRATION CODE">
										{getFieldDecorator('integrationCode', { rules: FIELD_RULES.integrationCode })(
											<Input />
										)}
									</Form.Item>
								</Col>
							</Row>
							<Row gutter={64}>
								<Col span={12}>
									<Form.Item label="EXAM SORT">
										{getFieldDecorator('examSort', { rules: FIELD_RULES.examSort })(
											<InputNumber style={{ width: '100%' }} />
										)}
									</Form.Item>
								</Col>
								<Col span={12}>
									<Form.Item label="SECTION ID">
										{getFieldDecorator('sectionId', { rules: FIELD_RULES.sectionID })(
											<InputNumber style={{ width: '100%' }} />
										)}
									</Form.Item>
								</Col>
							</Row>
							<Row gutter={64}>
								<Col span={12}>
									<Form.Item label="SPECIMEN ID">
										{getFieldDecorator('specimenID', { rules: FIELD_RULES.specimenID })(
											<InputNumber style={{ width: '100%' }} />
										)}
									</Form.Item>
								</Col>
							</Row>
						</div>
				
					</section>
					<section style={styles.footer}>
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
	visible: PropTypes.bool.isRequired,
	onSuccess: PropTypes.func.isRequired
};

export default Form.create()(AddForm);