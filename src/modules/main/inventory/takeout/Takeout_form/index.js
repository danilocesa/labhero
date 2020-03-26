/* eslint-disable react/prop-types */
/* eslint-disable func-names */
// LIBRARY
import React from 'react';
import { Form, Button, Row, Col, DatePicker, Select, Input } from 'antd';
// CUSTOM MODULES
import ClearFormFields from 'shared_components/form_clear_button';
const { RangePicker } = DatePicker;
class SearchPatientForm extends React.Component {
	state = {
		loading: false
	};
	render() {
		const { form } = this.props;
		const { getFieldDecorator, getFieldsValue } = form;
		const { loading } = this.state;
		const { patientID, patientName } = getFieldsValue();
		const disabled = !(patientID || (patientName && patientName.length > 1));
		return (
			<Form className="search-patient-form" >
				<Row gutter={12} type="flex" justify="center">
				<Col span={6}>
						<Form.Item label="TRANSACTION DATE">
							{getFieldDecorator('transaction_date', { 
							})(
							<DatePicker style={{ width: '100%' }} />
							)}
						</Form.Item>
					</Col>
					<Col span={4}>
						<Form.Item label="EXPIRED DATE">
							{getFieldDecorator('expired_date', { 
							})(
								<DatePicker/>
							)}
						</Form.Item>
					</Col>
					<Col span={4}>
						<Form.Item label="SECTION">
							{getFieldDecorator('section', { 
							})(
								<Input 	/>
							)}
						</Form.Item>
					</Col>
					<Col span={4}>
						<Form.Item label="ITEM NAME">
							{getFieldDecorator('item_name', { 
							})(
								<Input />
							)}
						</Form.Item>
					</Col>
					<Col span={4}>
						<Form.Item label="LOCATION">
							{getFieldDecorator('location', { 
							})(
								<Select  />
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
									disabled={disabled}
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
