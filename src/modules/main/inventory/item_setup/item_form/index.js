import React from 'react';
import { Row, Col, Button, Input, Form, Select, Typography } from 'antd';

const { Title } = Typography;

/** @type {{button: React.CSSProperties}} */
const style = {
	button: {
		width: 120
	}
};

class ItemForm extends React.Component {
	render() {
		return(
			<Form>
				<Row>
					<Title level={4}>INVENTORY / ITEM SETUP</Title>
				</Row>
				<Row gutter={48} justify="center" type="flex">
					<Col span={5}>
						<Form.Item label="SECTION">
							<Select />
						</Form.Item>
					</Col>
					<Col span={5}>
						<Form.Item label="ITEM CODE">
							<Input disabled />
						</Form.Item>
					</Col>
					<Col span={5}>
						<Form.Item label="ITEM NAME">
							<Input />
						</Form.Item>
					</Col>
					<Col span={5}>
						<Form.Item label="UNIT">
							<Input />
						</Form.Item>
					</Col>
					<Col span={4}>
						<Form.Item label="THRESHOLD">
							<Input />
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={48} justify="center" type="flex" align="middle">
					<Col span={10}>
						<Form.Item label="THRESHOLD">
							<Input />
						</Form.Item>
					</Col>
					<Col span={5}>
						<Form.Item label="SUPPLY">
							<Input />
						</Form.Item>
					</Col>
					<Col span={9}>
						<Row gutter={24}>
							<Col span={8}>
								<Button style={style.button} shape="round">CANCEL</Button>
							</Col>
							<Col span={8}>
								<Button style={style.button} type="primary" shape="round">SAVE</Button>
							</Col>
							<Col span={8}>
								<Button style={style.button} type="primary" shape="round">UPDATE</Button>
							</Col>
						</Row>
					</Col>
				</Row>
			</Form>
		)
	}
}

export default ItemForm;