/* eslint-disable react/prop-types */
/* eslint-disable func-names */
// LIBRARY
import React from 'react';
import { Form, Button, Row, Col, DatePicker, Select, Input } from 'antd';
// CUSTOM MODULES
import ClearFormFields from 'shared_components/form_clear_button';
import { fieldRules } from '../settings';
class SearchPatientForm extends React.Component {
	state = {
		loading: false
	};
	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		  if (!err) {
			console.log('Received values of form: ', values);
		  }
		});
	  };
	render() {
		const { form } = this.props;
		const { getFieldDecorator, getFieldsValue } = form;
		const { loading } = this.state;

		return (
			<Form className="search-patient-form" onSubmit={this.handleSubmit} >
				<Row gutter={12} type="flex" justify="center">
				<Col span={6}>
						<Form.Item label="TRANSACTION DATE">
							{getFieldDecorator('transaction_date', { 
									rules: fieldRules.transaction_date
							})(
							<DatePicker style={{ width: '100%' }} />
							)}
						</Form.Item>
					</Col>
					<Col span={4}>
						<Form.Item label="SECTION">
							{getFieldDecorator('section', { 
									rules: fieldRules.section
							})(
								<Select/>
							)}
						</Form.Item>
					</Col>
					<Col span={4}>
						<Form.Item label="ITEM">
							{getFieldDecorator('item', { 
									rules: fieldRules.item
							})(
								<Input 	/>
							)}
						</Form.Item>
					</Col>
					<Col span={4}>
						<Form.Item label="BAR CODE">
							{getFieldDecorator('bard_code', { 
									rules: fieldRules.bar_code
							})(
								<Input />
							)}
						</Form.Item>
					</Col>
					<Col xs={24} sm={24} md={6} lg={6}>
						<Form.Item style={{ marginTop: 20 }}>
							<Row>
							<ClearFormFields form={this.props.form} />
								<Button 
									className="form-button"
									shape="round" 
									type="primary" 
									htmlType="submit" 	
									loading={loading}
									style={{ width: 120 }}
								>
									SEARCH
								</Button>
							</Row>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		);
	}
}
export default Form.create()(SearchPatientForm);
