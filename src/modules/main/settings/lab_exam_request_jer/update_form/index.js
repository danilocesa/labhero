import React from 'react';
import { Drawer, Form, Input, Row, Col, Button, InputNumber } from 'antd';
import PropTypes from 'prop-types';
import Message from 'shared_components/message';
import axiosCall from 'services/axiosCall';

import FIELD_RULES from './constant';

/** @type {{footer: React.CSSProperties, fullWidth: React.CSSProperties }} */
const styles = { 
	fullWidth: {
		width: '100%'
	},
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

class UpdateForm extends React.Component {
	state = { isLoading: false }

	onSubmit = (event) => {
		event.preventDefault();

		// eslint-disable-next-line react/prop-types
		const { examRequest, form, onSuccess } = this.props;
		const { getFieldsValue, validateFieldsAndScroll } = form;
		const { examRequestID, examRequestActive } = examRequest;

		validateFieldsAndScroll(async(err) => {
			if(!err) {
				const updatedExamRequest = await this.updateExamRequest({ 
					examRequestID,
					examRequestActive,
					...getFieldsValue()
				});

				if(updatedExamRequest) {
					onSuccess();
				}
			}
		});
	}
	
	updateExamRequest = async (examRequest) => {
		let updatedExamRequest = null;

		try{
			const content = {
				method: 'PUT',
				url: '/ExamRequest',
				data: { ...examRequest }
			}

			const response = await axiosCall(content);
			const { data } = await response;

			updatedExamRequest = data;
		}
		catch(error) {
			Message.error();
		}

		return updatedExamRequest;
	}

	render() {
		const { isLoading } = this.state;
		const { onClose, visible, form } = this.props;
		const { getFieldDecorator } = form;
		
		return (
			<Drawer
				title="Update Exam Request"
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
									<Form.Item label="EXAM REQUEST NAME">
										{getFieldDecorator('examRequestName', { rules: FIELD_RULES.examName })(
											<Input />
										)}
									</Form.Item>
								</Col>
								<Col span={12}>
									<Form.Item label="EXAM REQUEST CODE">
										{getFieldDecorator('examRequestCode', { rules: FIELD_RULES.examCode })(
											<Input />
										)}
									</Form.Item>
								</Col>
							</Row>
							<Row gutter={64}>
								<Col span={12}>
									<Form.Item label="EXAM REQUEST LOINC">
										{getFieldDecorator('examRequestLoinc', { rules: FIELD_RULES.loinc })(
											<Input />
										)}
									</Form.Item>
								</Col>
								<Col span={12}>
									<Form.Item label="EXAM REQUEST INTEGRATION CODE">
										{getFieldDecorator('examRequestIntegrationCode', { rules: FIELD_RULES.integrationCode })(
											<Input />
										)}
									</Form.Item>
								</Col>
							</Row>
							<Row gutter={64}>
								<Col span={12}>
									<Form.Item label="EXAM REQUEST SORT">
										{getFieldDecorator('examRequestSort', { rules: FIELD_RULES.examSort })(
											<InputNumber style={styles.fullWidth} />
										)}
									</Form.Item>
								</Col>
								<Col span={12}>
									<Form.Item label="EXAM REQUEST SECTION ID">
										{getFieldDecorator('sectionID', { rules: FIELD_RULES.sectionID })(
											<InputNumber style={styles.fullWidth} />
										)}
									</Form.Item>
								</Col>
							</Row>
							<Row gutter={64}>
								<Col span={12}>
									<Form.Item label="EXAM REQUEST SPECIMEN ID">
										{getFieldDecorator('specimenID', { rules: FIELD_RULES.specimenID })(
											<InputNumber style={styles.fullWidth} />
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
								style={{ margin: 10, width: 100 }}
							>
								CANCEL
							</Button>
							<Button 
								shape="round" 
								type="primary" 
								htmlType="submit"
								loading={isLoading}
								style={{ margin: 10, width: 100 }}
							>
								SAVE
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
	onSuccess: PropTypes.func.isRequired,
	visible: PropTypes.bool.isRequired,
	examRequest: PropTypes.shape({
		examRequestID: PropTypes.number,
		examRequestName: PropTypes.string,
		examRequestCode: PropTypes.string,
		examRequestLoinc: PropTypes.string,
		examRequestIntegrationCode: PropTypes.string,
		examRequestSort: PropTypes.number,
		sectionID: PropTypes.number,
		specimenID: PropTypes.number,
	}).isRequired
};

export default Form.create({
	mapPropsToFields(props) {
    return {
			// @ts-ignore
			examRequestName: Form.createFormField({ value: props.examRequest.examRequestName }),
			// @ts-ignore
			examRequestCode: Form.createFormField({ value: props.examRequest.examRequestCode }),
			// @ts-ignore
			examRequestLoinc: Form.createFormField({ value: props.examRequest.examRequestLoinc }),
			// @ts-ignore
			examRequestIntegrationCode: Form.createFormField({ value: props.examRequest.examRequestIntegrationCode }),
			// @ts-ignore
			examRequestSort: Form.createFormField({ value: props.examRequest.examRequestSort }),
			// @ts-ignore
			sectionID: Form.createFormField({ value: props.examRequest.sectionID }),
			// @ts-ignore
			specimenID: Form.createFormField({ value: props.examRequest.specimenID })
    };
  },
})(UpdateForm);