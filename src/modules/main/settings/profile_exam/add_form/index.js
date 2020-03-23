import React from 'react';
import { Drawer, Form, Input, Row, Col, Select } from 'antd';
import ExamTable from './table';

const { Option } = Select;

class AddForm extends React.Component {
	state = {
		data: []
	};
	
	render() {
		const { getFieldDecorator } = this.props.form;
		const { onClose, visible } = this.props;
		const { data } = this.state;

		return (
			<Drawer
				title="Add Profile"
				width={1080}
				placement="right"
				closable={false}
				onClose={onClose}
				visible={visible}
			>
				<Form>
					<div style={{ margin: '0px 30px' }}>
						<Row gutter={24}>
							<Col span={6}>
								<Form.Item label="PROFILE ID">
									{getFieldDecorator('username')(
										<Input />
									)}
								</Form.Item>
							</Col>
							<Col span={6}>
								<Form.Item label="TEMPLATE">
									{getFieldDecorator('template')(
										<Select>
											<Option key="1">CHEM</Option>
										</Select>
									)}
								</Form.Item>
							</Col>
							<Col span={6}>
								<Form.Item label="STATUS">
									{getFieldDecorator('status')(
										<Select>
											<Option key="1">ACTIVE</Option>
										</Select>
									)}
								</Form.Item>
							</Col>
							<Col span={6}>
								<Form.Item label="PROFILE NAME">
									{getFieldDecorator('profileName')(
										<Input />
									)}
								</Form.Item>
							</Col>
						</Row>
					</div>
				</Form>
				<ExamTable data={data} />
			</Drawer>
		);
	}
}

export default Form.create()(AddForm);