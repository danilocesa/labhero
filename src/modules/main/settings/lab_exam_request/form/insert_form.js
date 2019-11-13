/* eslint-disable react/prop-types */
import React from 'react';
import { Row, Col, Form, Input, InputNumber } from 'antd';
import PropTypes from 'prop-types';

import { FIELD_RULES, FIELD_LABELS } from './constant';

/** @type {{fullWidth: React.CSSProperties}} */
const styles = {
	fullWidth: {
		width: '100%'
	}
};

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
			<React.Fragment>
				<Row gutter={12}>
					<Col span={10}>
						<Form.Item label={FIELD_LABELS.examName}>
							{getFieldDecorator('examRequestName', { rules: FIELD_RULES.examName })(
								<Input />
							)}
						</Form.Item>
					</Col>
					<Col span={14}>
						<Form.Item label={FIELD_LABELS.examCode}>
							{getFieldDecorator('examRequestCode', { rules: FIELD_RULES.examCode })(
								<Input />
							)}
						</Form.Item>
					</Col>
					<Col span={4} className="hide">
						<Form.Item label={FIELD_LABELS.specimenID}>
							{getFieldDecorator('specimenID', { 
								rules: FIELD_RULES.specimenID, 
								initialValue: specimenId 
							})(
								<InputNumber style={styles.fullWidth} />
							)}
						</Form.Item>
					</Col>
					<Col span={4} className="hide">
						<Form.Item label={FIELD_LABELS.sectionID}>
							{getFieldDecorator('sectionID', { 
								rules: FIELD_RULES.sectionID, 
								initialValue: sectionId 
							})(
								<InputNumber style={styles.fullWidth} />
							)}
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={12}>
					<Col span={10}>
						<Form.Item label={FIELD_LABELS.loinc}>
							{getFieldDecorator('examRequestLoinc', { rules: FIELD_RULES.loinc })(
								<Input />
							)}
						</Form.Item>
					</Col>
					<Col span={10}>
						<Form.Item label={FIELD_LABELS.integrationCode}>
							{getFieldDecorator('examRequestIntegrationCode', { rules: FIELD_RULES.integrationCode })(
								<Input />
							)}
						</Form.Item>
					</Col>
					<Col span={4}>
						<Form.Item label={FIELD_LABELS.examSort}>
							{getFieldDecorator('examRequestSort', { rules: FIELD_RULES.examSort })(
								<Input style={styles.fullWidth} />
							)}
						</Form.Item>
					</Col>
				</Row>
			</React.Fragment>
		);
	}
}

InputForm.propTypes = {
	specimenId: PropTypes.number.isRequired,
	sectionId: PropTypes.number.isRequired,
};

export default Form.create()(InputForm);