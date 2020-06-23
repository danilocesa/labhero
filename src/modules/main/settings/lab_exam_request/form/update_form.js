/* eslint-disable react/prop-types */
// LIBRARY
import React from 'react';
import { Row, Col, Form, InputNumber } from 'antd';
import { AlphaNumInput, RegexInput, NumberInput } from 'shared_components/pattern_input';
import PropTypes from 'prop-types';

// CUSTOM
import { fieldRules, fieldLabels } from '../settings';

class InputForm extends React.Component {
	render() {
		return (
			<div className="settings-exam-request-form">
				<Row gutter={12}>
					<Col span={10}>
						<Form.Item 
							name="examRequestName"
							label={fieldLabels.examName}
							rules={fieldRules.examName}
						>
							<RegexInput
								regex={/[A-z0-9 -]/} 
								maxLength={254} 
							/>
						</Form.Item>
					</Col>
					<Col span={14}>
						<Form.Item 
							name="examRequestCode"
							label={fieldLabels.examCode}
							rules={fieldRules.examCode}
						>
							<AlphaNumInput maxLength={50} />
						</Form.Item>
					</Col>
					<Col span={4} className="hide">
						<Form.Item 
							name="specimenID"
							label={fieldLabels.specimenID}
							rules={fieldRules.specimenID}
						>
							<InputNumber className="fullWidth" />
						</Form.Item>
					</Col>
					<Col span={4} className="hide">
						<Form.Item 
							name="sectionID"
							label={fieldLabels.sectionID}
							rules={fieldRules.sectionID}
						>
							<InputNumber className="fullWidth" />
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={12}>
					<Col span={10}>
						<Form.Item 
							name="examRequestLoinc"
							label={fieldLabels.loinc}
							rules={fieldRules.loinc}
						>
							<AlphaNumInput maxLength={100} />
						</Form.Item>
					</Col>
					<Col span={10}>
						<Form.Item 
							name="examRequestIntegrationCode"
							label={fieldLabels.integrationCode}
							rules={fieldRules.integrationCode}
						>
							<AlphaNumInput maxLength={100} />
						</Form.Item>
					</Col>
					<Col span={4}>
						<Form.Item 
							name="examRequestSort"
							label={fieldLabels.examSort}
							rules={fieldRules.examSort}
						>
							<NumberInput className="fullWidth" maxLength={32} />
						</Form.Item>
					</Col>
				</Row>
			</div>
		);
	}
}

InputForm.propTypes = {
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

export default InputForm;