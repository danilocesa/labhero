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
			<div className="settings-exam-request-form">
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
			</div>
		);
	}
}

InputForm.propTypes = {
	specimenId: PropTypes.number.isRequired,
	sectionId: PropTypes.number.isRequired,
	examRequest: PropTypes.shape({
		examRequestID: PropTypes.number,
		examRequestName: PropTypes.string,
		examRequestCode: PropTypes.string,
		examRequestLoinc: PropTypes.string,
		examRequestIntegrationCode: PropTypes.string,
		examRequestSort: PropTypes.number,
		sectionID: PropTypes.number,
		specimenID: PropTypes.number,
	})
};

InputForm.defaultProps = {
	examRequest: {}
}

// Here I bind the props value to the fields, this is used in update panel
// to prevent manual setting of fields value in componentDidUpdate.
export default Form.create({
	mapPropsToFields(props) {
		// @ts-ignore
		const { examRequest } = props;

    return {
			examRequestName: Form.createFormField({ 
				value: examRequest.examRequestName
			}),
			examRequestCode: Form.createFormField({ 
				value: examRequest.examRequestCode
			}),
			examRequestLoinc: Form.createFormField({ 
				value: examRequest.examRequestLoinc
			}),
			examRequestIntegrationCode: Form.createFormField({ 
				value: examRequest.examRequestIntegrationCode
			}),
			examRequestSort: Form.createFormField({ 
				value: examRequest.examRequestSort
			}),
			sectionID: Form.createFormField({ 
				value: examRequest.sectionID
			}),
			specimenID: Form.createFormField({ 
				value: examRequest.specimenID
			})
    };
  },
})(InputForm);