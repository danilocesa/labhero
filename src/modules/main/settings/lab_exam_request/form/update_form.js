/* eslint-disable react/prop-types */
// LIBRARY
import React from 'react';
import { Row, Col, Form, InputNumber } from 'antd';
import { AlphaNumInput, RegexInput, NumberInput } from 'shared_components/pattern_input';
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
								<RegexInput
									regex={/[A-z0-9 -]/} 
									maxLength={254} 
								/>
							)}
						</Form.Item>
					</Col>
					<Col span={14}>
						<Form.Item label={fieldLabels.examCode}>
							{getFieldDecorator('examRequestCode', { rules: fieldRules.examCode })(
								<AlphaNumInput maxLength={50} />
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
								<AlphaNumInput maxLength={100} />
							)}
						</Form.Item>
					</Col>
					<Col span={10}>
						<Form.Item label={fieldLabels.integrationCode}>
							{getFieldDecorator('examRequestIntegrationCode', { rules: fieldRules.integrationCode })(
								<AlphaNumInput maxLength={100} />
							)}
						</Form.Item>
					</Col>
					<Col span={4}>
						<Form.Item label={fieldLabels.examSort}>
							{getFieldDecorator('examRequestSort', { rules: fieldRules.examSort })(
								<NumberInput className="fullWidth" maxLength={32} />
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

// export default Form.create({
// 	mapPropsToFields(props) {
// 		// @ts-ignore
// 		const { examRequest } = props;

//     return {
// 			examRequestName: Form.createFormField({ 
// 				value: examRequest.examRequestName
// 			}),
// 			examRequestCode: Form.createFormField({ 
// 				value: examRequest.examRequestCode
// 			}),
// 			examRequestLoinc: Form.createFormField({ 
// 				value: examRequest.examRequestLoinc
// 			}),
// 			examRequestIntegrationCode: Form.createFormField({ 
// 				value: examRequest.examRequestIntegrationCode
// 			}),
// 			examRequestSort: Form.createFormField({ 
// 				value: examRequest.examRequestSort
// 			}),
// 			sectionID: Form.createFormField({ 
// 				value: examRequest.sectionID
// 			}),
// 			specimenID: Form.createFormField({ 
// 				value: examRequest.specimenID
// 			})
//     };
//   },
// })(InputForm);

export default InputForm;