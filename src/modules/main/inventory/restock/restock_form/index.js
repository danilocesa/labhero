import React from 'react';
import { Row, Col, Form, Input, Button, Select, DatePicker  } from 'antd';

const style = {
	button: {
		width: 130
	}
};

class SearchForm extends React.Component {

	handleSubmit = () => {}

	clearInputs = () => {}

	render() {
		return (
			<Form>
				<Row gutter={24}>
					<Col span={5} offset={2}>
						<Form.Item label="TRANSACTION DATE">
							<DatePicker style={{ width: '100%' }} />
						</Form.Item>
					</Col>	
					<Col span={5}>
						<Form.Item label="SECTION">
							<Select />
						</Form.Item>
					</Col>	
					<Col span={5}>
						<Form.Item label="ITEM">
							<Input />
						</Form.Item>
					</Col>	
					<Col span={5}>
						<Form.Item label="BARCODE">
							<Input />
						</Form.Item>
					</Col>	
				</Row>
				<Row gutter={24}>
					<Col span={5} offset={2}>
						<Form.Item label="EXPIRY DATE">
							<DatePicker style={{ width: '100%' }} />
						</Form.Item>
					</Col>	
					<Col span={5}>
						<Form.Item label="STORAGE LOCATION">
							<Select />
						</Form.Item>
					</Col>	
					<Col span={5}>
						<Form.Item label="SUPPLIER">
							<Select />
						</Form.Item>
					</Col>	
					<Col span={5}>
						<Form.Item label="DR NO.">
							<Input />
						</Form.Item>
					</Col>	
				</Row>
				<Row gutter={24} type="flex" align="middle">
					<Col span={5} offset={2}>
						<Form.Item label="PRICE">
							<Input />
						</Form.Item>
					</Col>	
					<Col span={5}>
						<Form.Item label="QUANTITY">
							<Input />
						</Form.Item>
					</Col>	
					<Col span={10}>
						<Row type="flex" justify="end" gutter={24}> 
							<Col>
								<Button shape="round" style={style.button}>CLEAR</Button>
							</Col>
							<Col>
								<Button shape="round" style={style.button} disabled>VOID</Button>
							</Col>
							<Col>
								<Button shape="round" style={style.button} type="primary">ADD STOCKS</Button>
							</Col>
						</Row>
					</Col>	
				</Row>
			</Form>
		);	
	}
}

export default SearchForm;
