import React from 'react';
import { Row, Col, Form, Input, Button, Select, DatePicker  } from 'antd';

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
							<RangePicker  />
						</Form.Item>
					</Col>
					<Col span={6}>
						<Form.Item label="SECTION">
							<Select />
						</Form.Item>
					</Col>
					<Col span={6}>
						<Form.Item label="SEARCH">
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
