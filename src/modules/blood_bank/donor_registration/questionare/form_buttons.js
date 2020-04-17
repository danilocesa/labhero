import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Typography } from 'antd';

const { Text } = Typography;

class FormButtons extends React.Component {
	render() {
		return (
			<Row style={{ marginTop: 10 }}>
				<Col sm={{ span: 12 }} md={{ span: 4, offset: 20 }}>
					<Button
						className="nav-btn-round"
						type="primary"
						style={{ width: '100px', marginBottom: '20px' }}
					>
						SUBMIT
					</Button>
				</Col>
			</Row>
		);
	}
}


export default FormButtons;
