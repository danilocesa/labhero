/* eslint-disable react/prop-types */
/* eslint-disable func-names */
// LIBRARY
import React from 'react';
import { Form, Button, Row, Col, DatePicker, Select, Input } from 'antd';
// CUSTOM MODULES
import ClearFormFields from 'shared_components/form_clear_button';
import { 


	fieldRules

} from '../settings';
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
		const { getFieldDecorator } = form;
		const { loading } = this.state;
		return (
			<Form className="search-patient-form" onSubmit={this.handleSubmit}>
				<Row gutter={12} type="flex" justify="center">
				<Col span={6}>
						<Form.Item label="SECTION">
							{getFieldDecorator('section', { 
								rules: fieldRules.section
							})(
							<DatePicker style={{ width: '100%' }} />
							)}
						</Form.Item>
					</Col>
					<Col span={4}>
						<Form.Item label="ITEM CODE">
							{getFieldDecorator('item_code', { 
								rules: fieldRules.item_code
							})(
								<Select/>
							)}
						</Form.Item>
					</Col>
					<Col span={4}>
						<Form.Item label="ITEM NAME">
							{getFieldDecorator('item_name', { 
								rules: fieldRules.item_name
							})(
								<Input 	/>
							)}
						</Form.Item>
					</Col>
					<Col span={4}>
						<Form.Item label="UNIT">
							{getFieldDecorator('unit', { 
								rules: fieldRules.unit
							})(
								<Input />
							)}
						</Form.Item>
					</Col>
					<Col span={4}>
						<Form.Item label="THRESHOLD">
							{getFieldDecorator('threshold', { 
								rules: fieldRules.threshold
							})(
								<Input />
							)}
						</Form.Item>
					</Col>
					<Col span={4}>
						<Form.Item label="THRESHOLD">
							{getFieldDecorator('thresholds', { 
								rules: fieldRules.thresholds
							})(
								<Input />
							)}
						</Form.Item>
					</Col>
					<Col span={4}>
						<Form.Item label="SUPPLY">
							{getFieldDecorator('supply', { 
								rules: fieldRules.supply
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
								type="primary" 
								shape="round" 
								htmlType="submit" 
								loading={this.state.loading} 
								style={{ margin: 10, width: 120 }}
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

// export default Form.create()(SearchPatientForm);
export default SearchPatientForm;
