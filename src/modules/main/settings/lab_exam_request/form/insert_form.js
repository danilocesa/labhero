/* eslint-disable react/prop-types */
// LIBRARY
import React from 'react';
import { Row, Col, Form, Input, InputNumber } from 'antd';
import PropTypes from 'prop-types';

// CUSTOM
import { fieldRules, fieldLabels } from '../settings';

class InputForm extends React.Component {
	
	resetForm = () => {
		this.props.form.resetFields();
	}

	getFormValues = () => {
		const { getFieldsValue } = this.props.form;

		return getFieldsValue();
	}

	triggerValidation = () => {
		const { validateFields } = this.props.form;
		let hasNoError = false;
		
		validateFields((err) => { hasNoError = err === null });
		
		return hasNoError;
	}
	
	render() {
		const { form, sectionId, specimenId } = this.props;
		const { getFieldDecorator } = form;

		return (
			<div className="settings-exam-request-form">
				<Row gutter={12}>
					<Col span={10}>
						<Form.Item label={fieldLabels.examName}>
							{getFieldDecorator('examRequestName', { rules: fieldRules.examName })(
								<Input />
							)}
						</Form.Item>
					</Col>
					<Col span={14}>
						<Form.Item label={fieldLabels.examCode}>
							{getFieldDecorator('examRequestCode', { rules: fieldRules.examCode })(
								<Input />
							)}
						</Form.Item>
					</Col>
					<Col span={4} className="hide">
						<Form.Item label={fieldLabels.specimenID}>
							{getFieldDecorator('specimenID', { 
								rules: fieldRules.specimenID, 
								initialValue: specimenId 
							})(
								<InputNumber className="fullWidth" />
							)}
						</Form.Item>
					</Col>
					<Col span={4} className="hide">
						<Form.Item label={fieldLabels.sectionID}>
							{getFieldDecorator('sectionID', { 
								rules: fieldRules.sectionID, 
								initialValue: sectionId 
							})(
								<InputNumber className="fullWidth" />
							)}
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={12}>
					<Col span={10}>
						<Form.Item label={fieldLabels.loinc}>
							{getFieldDecorator('examRequestLoinc', { rules: fieldRules.loinc })(
								<Input />
							)}
						</Form.Item>
					</Col>
					<Col span={10}>
						<Form.Item label={fieldLabels.integrationCode}>
							{getFieldDecorator('examRequestIntegrationCode', { rules: fieldRules.integrationCode })(
								<Input />
							)}
						</Form.Item>
					</Col>
					<Col span={4}>
						<Form.Item label={fieldLabels.examSort}>
							{getFieldDecorator('examRequestSort', { rules: fieldRules.examSort })(
								<Input className="fullWidth" />
							)}
						</Form.Item>
					</Col>
				</Row>
			</div>
		);
	}
}

InputForm.propTypes = {
	specimenId: PropTypes.number.isRequired,
	sectionId: PropTypes.number.isRequired,
};

export default Form.create()(InputForm);