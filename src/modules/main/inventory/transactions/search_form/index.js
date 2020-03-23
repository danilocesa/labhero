import React from 'react';
import { Row, Col, Form, Input, Button, Select, DatePicker } from 'antd';

const { RangePicker } = DatePicker;

class SearchForm extends React.Component {

	handleSubmit = () => {}

	clearInputs = () => {}

	render() {
		return (
			<Form className="search-patient-form" onSubmit={this.handleSubmit}>
				<Row gutter={24}>
					<Col span={6}>
						<Form.Item label="FROM DATE ~ TO DATE">
							<RangePicker style={{ width: '100%' }} />
						</Form.Item>
					</Col>
					<Col span={4}>
						<Form.Item label="SECTION">
							<Select />
						</Form.Item>
					</Col>
					<Col span={4}>
						<Form.Item label="ITEM">
							<Input />
						</Form.Item>
					</Col>
					<Col span={4}>
						<Form.Item label="TRANSACTION TYPE">
							<Select />
						</Form.Item>
					</Col>
					<Col span={6}>
						<Form.Item style={{ marginTop: 33 }}>
							<Row gutter={12}>
								<Col span={12}>
									<Button 
										block
										shape="round" 
										style={{ width: 120 }}
										onClick={this.clearInputs} 
									>
										CLEAR
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
										SEARCH
									</Button>
								</Col>
							</Row>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		);
	}
}

export default SearchForm;
