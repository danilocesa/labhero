import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Row, Col, Button, Typography, Form, Drawer } from 'antd';

import Questionare from '../questionare';
const { Text } = Typography;

class FormButtons extends React.Component {

	state= {showForm: false}

	showDrawer = () => {
		this.setState({
		visible: true,
		});
	};

	onClose = () => {
		this.setState({
		visible: false,
		});
	};

	render() {
		return (
			<Form className="fillup-form">
				<Row style={{ marginTop: 10 }}>
					<Col sm={{ span: 12 }} md={{ span: 4, offset: 20 }}>
						<Link to="/bloodbank">
							<Text><u>BACK</u></Text>
						</Link>
						<Button
							className="nav-btn-round"
							// htmlType="submit"
							type="primary"
							style={{ marginLeft: 20 }}
							htmlType="submit"
							onClick={this.showDrawer}
						>
						NEXT STEP
						</Button>
					</Col>
				</Row>
				<Drawer width={600}
						closable={false}
						onClose={this.onClose}
						visible={this.state.visible}
				>
					<Questionare />
				</Drawer>
			</Form>
		);
	}
}


export default FormButtons;
