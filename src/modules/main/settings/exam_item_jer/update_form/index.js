import React from 'react';
import { Row, Col, Drawer, Form, Input, Button, Select, Icon, Switch } from 'antd';
import PropTypes from 'prop-types';
import axiosCall from 'services/axiosCall';
import Message from 'shared_components/message';

import FIELD_RULES from './constant';

import './update_form.css';

const { Option } = Select;
const { TextArea } = Input;

let id = 0;

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
	state = {
		isLoading: false,
		selectedRsType: null
	}
	
	onChangeResultType = (resultType) => {
		this.setState({ selectedRsType: resultType });
	}

	onSubmit = (event) => {
		event.preventDefault();

		// eslint-disable-next-line react/prop-types
		const { getFieldsValue, validateFieldsAndScroll } = this.props.form;

		validateFieldsAndScroll(async(err) => {
			if (!err) {
				const fields = getFieldsValue();
				
				this.setState({ isLoading: true });
				const test = await this.createExamItem(fields);
				this.setState({ isLoading: false });

				console.log(test);
			}
		});
	}
	
	createExamItem = async (examItem) => {
		let createdExamItem;

		try{
			const content = {
				method: 'POST',
				url: '/ExamResult',
				data: { ...examItem, sectionID: 0, specimenID: 0 }
			}

			const response = await axiosCall(content);
			const { data } = await response;

			// eslint-disable-next-line no-unneeded-ternary
			createdExamItem = data;
		}
		catch(error) {
			Message.error();
		}

		return createdExamItem;
	}

	remove = k => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');

    if (keys.length === 1) {
      return;
    }

    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  add = () => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
		const nextKeys = keys.concat(id++);
		
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

	render() {
		const { isLoading, selectedRsType } = this.state;
		const { onClose, visible, form } = this.props;
		const { getFieldDecorator, getFieldValue } = form;
		
		getFieldDecorator('keys', { initialValue: [] });
		const keys = getFieldValue('keys');
    const OptionFormItems = keys.map((k, index) => (
      <Form.Item
        label={<span style={{ color: '#BFBFBF', fontWeight: 10 }}>Option Value {index + 1}</span>}
        key={k}
      >
				<Row>
					<Col span={4}><Switch /></Col>
					<Col span={16}>
						{getFieldDecorator(`names[${k}]`, {
							validateTrigger: ['onChange', 'onBlur'],
							rules: [
								{
									required: true,
									whitespace: true,
									message: 'This field is required'
								},
							],
						})(<Input />)}
					</Col>
					<Col span={4}>
						<Icon
							className="dynamic-delete-button"
							type="minus-circle-o"
							onClick={() => this.remove(k)}
						/>
					</Col>
				</Row>
      </Form.Item>
    ));

		return (
			<Drawer
				title="Add Exam"
				width="400"
				placement="right"
				closable
				onClose={onClose}
				visible={visible}
			>
				<Form onSubmit={this.onSubmit} className="exam-item-update-form">
					<section style={{ marginBottom: 50 }}>
						<Form.Item label="Exam Item Name">
							{getFieldDecorator('examItemName', { rules: FIELD_RULES.examItemName })(
								<Input />
							)}
						</Form.Item>
						<Form.Item label="Exam Item General Name">
							{getFieldDecorator('examItemGeneralName', { rules: FIELD_RULES.examItemGeneralName })(
								<Input />
							)}
						</Form.Item>
						<Form.Item label="Exam Item Type">
							{getFieldDecorator('resultType', { rules: FIELD_RULES.resultType })(
								<Select onChange={this.onChangeResultType}>
									<Option value={1}>Alpha Numeric</Option>
									<Option value={2}>Numeric</Option>
									<Option value={3}>Checkbox</Option>
									<Option value={4}>Option</Option>
									<Option value={5}>Text Area</Option>
								</Select>
							)}
						</Form.Item>
						{ (selectedRsType === 1 || selectedRsType === 2) && (
							<Form.Item label="Default Value">
								{getFieldDecorator('resultTypeDefault')(
									<Input />
								)}
							</Form.Item>
						)}
						{ (selectedRsType === 3 || selectedRsType === 4) && OptionFormItems }
						{ (selectedRsType === 3 || selectedRsType === 4) && (
							<Form.Item>
								<Button type="dashed" onClick={this.add} style={{ width: '100%' }}>
									<Icon type="plus" /> Add field
								</Button>
							</Form.Item>
						)}
						{ selectedRsType === 5 && (
							<Form.Item label="Default Value">
								<TextArea />
							</Form.Item>
						)}
						<Form.Item label="Integration Code">
							{getFieldDecorator('integrationCode', { rules: FIELD_RULES.integrationCode })(
								<Input />
							)}
						</Form.Item>
					</section>
					<section style={styles.footer}>
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
								htmlType="submit"
								loading={isLoading}
								style={{ margin: 10 }}
							>
								CREATE
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
	visible: PropTypes.bool.isRequired
};

export default Form.create()(UpdateForm);