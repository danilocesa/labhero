import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Row, Col, Button, Typography } from 'antd';

const { Text } = Typography;

class FormButtons extends React.Component {

	// onSubmit = () => {
	// 		return  <Redirect  to="../questionare" />
	//  }

	render() {
		return (
			<Row style={{ marginTop: 10 }}>
				<Col sm={{ span: 12 }} md={{ span: 4, offset: 20 }}>
					<Link to="/bloodbank">
						<Text><u>BACK</u></Text>
					</Link>
					<Button
						className="nav-btn-round"
						// htmlType="submit"
						htmlType="submit"
						type="primary"
						style={{ marginLeft: 20 }}
						// onClick={this.onSubmit}
					>
					SUBMIT
					</Button>
				</Col>
			</Row>
		);
	}

}


export default FormButtons;
