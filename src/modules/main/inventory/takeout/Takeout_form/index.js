import React from 'react';
import { Row, Col, Form, Input, Button, Select, DatePicker  } from 'antd';

class SearchForm extends React.Component {
	state = { }
  
	handleSubmit = e => {
	  e.preventDefault();
	  this.props.form.validateFields((err, values) => {
		if (!err) {
		  console.log('Received values of form: ', values);
		}
	  });
	};
  
	handleReset = () => {
	  this.props.form.resetFields();
	};
	
	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<Form onSubmit={this.handleSubmit}>
				<Row type="flex" justify="space-between">
					<Col span={4}>
					<Form.Item label="TRANSACTION DATE">
                {getFieldDecorator('supplier', {
                  rules: [{ required: true, message: 'Please input!' }],
                })(
					<DatePicker style={{ width: '100%' }} />,
                )}
              </Form.Item>
						{/* <Form.Item label="TRANSACTION DATE">
							<DatePicker style={{ width: '100%' }} />
						</Form.Item> */}
					</Col>
					{/* <Col span={4}>
						<Form.Item label="EXPIRED DATE">
                          <DatePicker style={{ width: '100%' }} />
						</Form.Item>
					</Col>
					<Col span={4}>
						<Form.Item label="SECTION">
							<Input />
						</Form.Item>
					</Col>
					<Col span={4}>
						<Form.Item label="ITEM NAME">
							<Input />
						</Form.Item>
					</Col>
					<Col span={4}>
						<Form.Item label="LOCATION">
							<Select />
						</Form.Item>
					</Col> */}
				</Row>
				<Row type="flex" justify="space-between">
                <Col span={6}>
						<Form.Item style={{ marginTop: 33 }}>
							<Row gutter={12}>
								<Col span={12}>
									<Button 
										block
										shape="round" 
										type="danger"
										style={{ width: 120 }}	
									>
										UPDATE
									</Button>
								</Col>
								<Col span={12}>
									<Button 
										onClick={this.handleReset} shape="round" 
									>
										CLEAR
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
