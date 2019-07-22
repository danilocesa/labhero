import React from 'react';
import PropTypes from 'prop-types';
import { Drawer, Form, Input, Row, Col, Select } from 'antd';
import ExamTable from './table';

const { Option } = Select;

class UpdateForm extends React.Component {
	state = {
		data: [
			{
				code: 'A',
				examName: 'CHLORIDE',
				instExamName: '04A',
				factor: 1,
				dataForm: null,
				group: null,
				order: 1
			},
			{
				code: 'B',
				examName: 'CHLORIDE',
				instExamName: '04A',
				factor: 1,
				dataForm: null,
				group: null,
				order: 1
			},
			{
				code: 'A',
				examName: 'CHLORIDE',
				instExamName: '04A',
				factor: 1,
				dataForm: null,
				group: null,
				order: 1
			}
		]
	};
	
	render() {
		const { data } = this.state;
		const { onClose, visible } = this.props;
		const { getFieldDecorator } = this.props.form;

		return (
			<Drawer
				title="Update Profile Exam"
				width={1080}
				placement="right"
				closable={false}
				onClose={onClose}
				visible={visible}
			>
				<Form>
					<div style={{ margin: '0px 50px' }}>
						<Row gutter={64}>
							<Col span={12}>
								<Form.Item label="PROFILE ID">
									{getFieldDecorator('username')(
										<Input />
									)}
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item label="PROFILE NAME">
									{getFieldDecorator('profileName')(
										<Input />
									)}
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={64}>
							<Col span={12}>
								<Form.Item label="TEMPLATE">
									{getFieldDecorator('template')(
										<Select>
											<Option key="1">CHEM</Option>
										</Select>
									)}
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item label="STATUS">
									{getFieldDecorator('status')(
										<Select>
											<Option key="1">ACTIVE</Option>
										</Select>
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

UpdateForm.propTypes = {
	onClose: PropTypes.func.isRequired,
	visible: PropTypes.bool.isRequired,
	data: PropTypes.shape({
		profileID: PropTypes.string.isRequired,
		template: PropTypes.string.isRequired,
		profName: PropTypes.string.isRequired,
		status: PropTypes.string.isRequired
	}).isRequired
};

export default Form.create()(UpdateForm);