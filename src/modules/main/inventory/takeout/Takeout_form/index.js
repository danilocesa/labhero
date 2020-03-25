	import React from 'react';
import { Row, Col, Form, Input, Button, Select, DatePicker  } from 'antd';
import ClearInput from 'shared_components/clear_form'
class SearchForm extends React.Component {

	constructor(){
		super();
		this.state ={data: 'test'};
	  }
	
	  btnClick(){
		alert('---')
	   this.setState({data: 'nannsd'});
		 // this.state ={data: 'sds'};
	  }
	render() {
		return (
			<Form className="search-patient-form" ref={(el) => this.myFormRef = el}>
				<Row type="flex" justify="space-between">
					<Col span={4}>
						<Form.Item label="TRANSACTION DATE">
							<DatePicker style={{ width: '100%' }} />
						</Form.Item>
					</Col>
					<Col span={4}>
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
					</Col>
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
										block
										shape="round" 
										type="primary" 
										htmlType="submit" 
										onClick = {ClearInput}
										style={{ width: 120 }}
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
