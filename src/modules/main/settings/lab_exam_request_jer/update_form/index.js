import React from 'react';
import { Drawer, Form, Input, Row, Col, Button } from 'antd';
import PropTypes from 'prop-types';

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

class UpdateForm extends React.Component {
	state = { isLoading: false }

	onSubmit = (event) => {
		event.preventDefault();

		// eslint-disable-next-line react/prop-types
		const { getFieldsValue, validateFieldsAndScroll } = this.props.form;

		validateFieldsAndScroll(async(err) => {
			getFieldsValue();
			console.log(err);
		});
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
											<Input />
										)}
									</Form.Item>
								</Col>
								<Col span={12}>
									<Form.Item label="SECTION ID">
										{getFieldDecorator('sectionId', { rules: FIELD_RULES.sectionID })(
											<Input />
										)}
									</Form.Item>
								</Col>
							</Row>
							<Row gutter={64}>
								<Col span={12}>
									<Form.Item label="SPECIMEN ID">
										{getFieldDecorator('specimenID', { rules: FIELD_RULES.specimenID })(
											<Input />
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
	visible: PropTypes.bool.isRequired,
	examRequest: PropTypes.shape({
		examName: PropTypes.string,
		examCode: PropTypes.string,
		loinc: PropTypes.string,
		integrationCode: PropTypes.string,
		examSort: PropTypes.string,
		sectionID: PropTypes.any,
		specimenID: PropTypes.any,
	}).isRequired
};

export default Form.create({
	mapPropsToFields(props) {
    return {
			examName: Form.createFormField({ value: props.examRequest.examName }),
			examCode: Form.createFormField({ value: props.examRequest.examCode }),
			loinc: Form.createFormField({ value: props.examRequest.loinc }),
			integrationCode: Form.createFormField({ value: props.examRequest.integrationCode }),
			examSort: Form.createFormField({ value: props.examRequest.examSort }),
			sectionID: Form.createFormField({ value: props.examRequest.sectionID }),
			specimenID: Form.createFormField({ value: props.examRequest.specimenID })
    };
  },
})(UpdateForm);