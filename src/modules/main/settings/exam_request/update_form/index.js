import React from 'react';
import { Drawer, Form, Input, Row, Col, Select, Button } from 'antd';
import PropTypes from 'prop-types';

const { Option } = Select;

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
	render() {
		const { getFieldDecorator } = this.props.form;
		const { onClose, visible } = this.props;

		return (
			<Drawer
				title="Update Exam"
				width="70%"
				placement="right"
				closable
				onClose={onClose}
				visible={visible}
			>
				<section style={{ marginBottom: 50 }}>
					<Form>
						<div style={{ margin: '0px 30px' }}>
							<Row gutter={24}>
								<Col span={6}>
									<Form.Item label="INSTRUMENT ID">
										{getFieldDecorator('instrumentID', { initialValue: "1" })(
											<Input />
										)}
									</Form.Item>
								</Col>
								<Col span={6}>
									<Form.Item label="INSTRUMENT EXAM CODE">
										{getFieldDecorator('instExamCode')(
											<Input />
										)}
									</Form.Item>
								</Col>
								<Col span={6}>
									<Form.Item label="INSTRUMENT EXAM NAME">
										{getFieldDecorator('instExamName')(
											<Input />
										)}
									</Form.Item>
								</Col>
								<Col span={6}>
									<Form.Item label="DISPLAY NAME">
										{getFieldDecorator('displayName')(
											<Select>
												<Option key="1">ACTIVE</Option>
											</Select>
										)}
									</Form.Item>
								</Col>
							</Row>
							<Row gutter={24}>
								<Col span={6}>
									<Form.Item label="UNIT">
										{getFieldDecorator('unit')(
											<Input />
										)}
									</Form.Item>
								</Col>
								<Col span={6}>
									<Form.Item label="INSTRUMENT RUN">
										{getFieldDecorator('instrumentRun', { initialValue: "NO" })(
											<Input disabled />
										)}
									</Form.Item>
								</Col>
								<Col span={6}>
									<Form.Item label="SUPPLEMENTARY RESULT">
										{getFieldDecorator('suppResult', { initialValue: 0 })(
											<Input disabled />
										)}
									</Form.Item>
								</Col>
								<Col span={6}>
									<Form.Item label="SUPPLEMENTARY HANDLER">
										{getFieldDecorator('suppHandler', { initialValue: "1" })(
											<Select disabled>
												<Option key="1">NONE</Option>
											</Select>
										)}
									</Form.Item>
								</Col>
							</Row>
							<Row gutter={24}>
								<Col span={6}>
									<Form.Item label="DIFF COUNT">
										{getFieldDecorator('diffCount', { initialValue: "FALSE" })(
											<Input disabled />
										)}
									</Form.Item>
								</Col>
								<Col span={6}>
									<Form.Item label="DEFAULT FACTOR">
										{getFieldDecorator('defaultFactor', { initialValue: "1" })(
											<Input />
										)}
									</Form.Item>
								</Col>
								<Col span={6}>
									<Form.Item label="DEFAULT FORMAT">
										{getFieldDecorator('defaultFormat')(
											<Input />
										)}
									</Form.Item>
								</Col>
								<Col span={6}>
									<Form.Item label="PERIOD RUN">
										{getFieldDecorator('periodRun', { initialValue: "1" })(
											<Select>
												<Option key="1">0</Option>
											</Select>
										)}
									</Form.Item>
								</Col>
							</Row>
							<Row gutter={24}>
								<Col span={6}>
									<Form.Item label="GLOBAL EXAM CODE">
										{getFieldDecorator('globalExamCode')(
											<Input />
										)}
									</Form.Item>
								</Col>
								<Col span={6}>
									<Form.Item label="FORMULA">
										{getFieldDecorator('formula')(
											<Input />
										)}
									</Form.Item>
								</Col>
								<Col span={6}>
									<Form.Item label="RESULT STATUS FLAGS">
										{getFieldDecorator('resultStatusFlags')(
											<Input />
										)}
									</Form.Item>
								</Col>
								<Col span={6}>
									<Form.Item label="RESULT TYPE">
										{getFieldDecorator('resultType', { initialValue: "1" })(
											<Select disabled>
												<Option key="1">NV</Option>
											</Select>
										)}
									</Form.Item>
								</Col>
							</Row>
							<Row gutter={24}>
								<Col span={6}>
									<Form.Item label="MV FIELD">
										{getFieldDecorator('mvField')(
											<Input disabled />
										)}
									</Form.Item>
								</Col>
								<Col span={6}>
									<Form.Item label="RESULT 2 FACTOR">
										{getFieldDecorator('result2Factor', { initialValue: "1" })(
											<Input />
										)}
									</Form.Item>
								</Col>
								<Col span={6}>
									<Form.Item label="RESULT 2 OPERATOR">
										{getFieldDecorator('result2Operator')(
											<Input />
										)}
									</Form.Item>
								</Col>
								<Col span={6}>
									<Form.Item label="RESULT 2 FORMAT">
										{getFieldDecorator('result2Format', { initialValue: "1" })(
											<Select>
												<Option key="1">0.00</Option>
											</Select>
										)}
									</Form.Item>
								</Col>
							</Row>
							<Row gutter={24}>
								<Col span={6}>
									<Form.Item label="EXAM NOTES">
										{getFieldDecorator('examNotes')(
											<Input />
										)}
									</Form.Item>
								</Col>
								<Col span={6}>
									<Form.Item label="HOST LINK ID">
										{getFieldDecorator('hostLinkID')(
											<Input />
										)}
									</Form.Item>
								</Col>
								<Col span={6}>
									<Form.Item label="EXAM GROUP">
										{getFieldDecorator('examGroup')(
											<Input />
										)}
									</Form.Item>
								</Col>
								<Col span={6}>
									<Form.Item label="ENABLE">
										{getFieldDecorator('enable', { initialValue: "1" })(
											<Select disabled>
												<Option key="1" value="1">TRUE</Option>
											</Select>
										)}
									</Form.Item>
								</Col>
							</Row>
						</div>
					</Form>
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
			</Drawer>
		);
	}
}

UpdateForm.propTypes = {
	onClose: PropTypes.func.isRequired,
	visible: PropTypes.bool.isRequired
};

export default Form.create()(UpdateForm);