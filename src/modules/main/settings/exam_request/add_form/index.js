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

class AddForm extends React.Component {
	render() {
		const { getFieldDecorator } = this.props.form;
		const { onClose, visible } = this.props;

		return (
			<Drawer
				title="Add Exam Request"
				width={800}
				placement="right"
				closable
				onClose={onClose}
				visible={visible}
			>
				<section style={{ marginBottom: 50 }}>
					<Form>
						<div style={{ margin: '0px 50px' }}>
							<Row gutter={64}>
								<Col span={12}>
									<Form.Item label="EXAM REQUEST NAME">
										{getFieldDecorator('instrumentID')(
											<Input placeholder="examRequestName" />
										)}
									</Form.Item>
								</Col>
								<Col span={12}>
									<Form.Item label="EXAM REQUEST CODE">
										{getFieldDecorator('examRequestID')(
											<Input placeholder="examRequestCode" />
										)}
									</Form.Item>
								</Col>
							</Row>
							<Row gutter={64}>
								<Col span={12}>
									<Form.Item label="LOINC">
										{getFieldDecorator('profileName')(
											<Input placeholder="examRequestLoinc" />
										)}
									</Form.Item>
								</Col>
								<Col span={12}>
									<Form.Item label="INTEGRATION CODE">
										{getFieldDecorator('profileCode')(
											<Input placeholder="examRequestIntegrationCode" />
										)}
									</Form.Item>
								</Col>
							</Row>
							<Row gutter={64}>
								<Col span={12}>
									<Form.Item label="EXAM REQUEST SORT">
										{getFieldDecorator('hisRequestID')(
											<Input placeholder="examRequestSort" />
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
							shape="round" 
							type="primary" 
							style={{ margin: 10 }}
						>
							CREATE
						</Button>
					</div>
				</section>
			</Drawer>
		);
	}
}

AddForm.propTypes = {
	onClose: PropTypes.func.isRequired,
	visible: PropTypes.bool.isRequired
};

export default Form.create()(AddForm);