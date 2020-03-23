import React from 'react';
import { Row, Col, Form, Input, Button, Select, DatePicker  } from 'antd';

class SearchForm extends React.Component {

	handleSubmit = () => {}

	clearInputs = () => {}

	render() {
		return (
			<Form className="search-patient-form" onSubmit={this.handleSubmit}>
				<Row type="flex" justify="space-between">
					<Col span={4}>
						<Form.Item label="TRANSACTION DATE">
							<DatePicker style={{ width: '100%' }} />
						</Form.Item>
					</Col>
					<Col span={4}>
						<Form.Item label="SECTION">
							<Select />
						</Form.Item>
					</Col>
					<Col span={4}>
						<Form.Item label="ITEM NAME">
							<Input />
						</Form.Item>
					</Col>
					<Col span={4}>
						<Form.Item label="BARCODE">
							<Input />
						</Form.Item>
					</Col>
					<Col span={4}>
						<Form.Item label="LOCATION">
							<Select />
						</Form.Item>
					</Col>
				</Row>
				<Row type="flex" justify="space-between">
					<Col span={4}>
						<Form.Item label="EXPIRY DATE">
							<DatePicker style={{ width: '100%' }} />
						</Form.Item>
					</Col>
					<Col span={4}>
						<Form.Item label="CURRENT QUANTITY">
							<Input />
						</Form.Item>
					</Col>
					<Col span={4}>
						<Form.Item label="TAKEOUT QUANTITY">
							<Input />
						</Form.Item>
					</Col>
					<Col span={6}>
						<Form.Item style={{ marginTop: 33 }}>
							<Row gutter={12}>
								<Col span={12}>
									<Button 
										block
										shape="round" 
										type="danger"
										style={{ width: 120 }}
										onClick={this.clearInputs} 
									>
										DELETE
									</Button>
								</Col>
								<Col span={12}>
									<Button 
										block
										shape="round" 
										type="primary" 
										htmlType="submit" 
										style={{ width: 120 }}
									>
										ADD TO LIST
									</Button>
								</Col>
							</Row>
						</Form.Item>
					</Col>
					<Col span={2} />
				</Row>
			</Form>
		);
	}
}

export default SearchForm;
