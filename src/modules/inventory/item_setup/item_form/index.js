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
	
	handleSubmit = () => {
		
	};

	render() {
		return (
			<Form 
				className="search-patient-form" 
				onFinish={this.handleSubmit}
			>
				<Row gutter={12} justify="center">
					<Col span={6}>
						<Form.Item 
							name="section"
							label="SECTION"
							rules={fieldRules.section}
						>
							<DatePicker style={{ width: '100%' }} />
						</Form.Item>
					</Col>
					<Col span={4}>
						<Form.Item 
							name="item_code"
							label="ITEM CODE"
							rules={fieldRules.item_code}
						>
							<Select/>
						</Form.Item>
					</Col>
					<Col span={4}>
						<Form.Item 
							name="item_name"
							label="ITEM NAME"
							rules={fieldRules.item_name}
						>
							<Input 	/>
						</Form.Item>
					</Col>
					<Col span={4}>
						<Form.Item 
							name="unit" 
							label="UNIT"
							rules={fieldRules.unit}
						>
							<Input />
						</Form.Item>
					</Col>
					<Col span={4}>
						<Form.Item 
							name="threshold"
							label="THRESHOLD"
							rules={fieldRules.threshold}
						>
							<Input />
						</Form.Item>
					</Col>
					<Col span={4}>
						<Form.Item 
							name="thresholds" 
							label="THRESHOLD"
							rules={fieldRules.thresholds}
						>
							<Input />
						</Form.Item>
					</Col>
					<Col span={4}>
						<Form.Item 
							name="supply"
							label="SUPPLY"
							rules={fieldRules.supply}
						>
							<Input />
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

export default SearchPatientForm;
