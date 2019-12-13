import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Typography } from 'antd';

const { Text } = Typography;

class FormButtons extends React.Component {
	render() {
		const { isLoading } = this.props;

		return (
			<Row style={{ marginTop: 10 }}>
				<Col sm={{ span: 12 }} md={{ span: 4, offset: 20 }}>
					<Link to="/request/step/1">
						<Text><u>BACK</u></Text>
					</Link>
					<Button
						className="nav-btn-round"
						htmlType="submit"
						type="primary"
						loading={isLoading}
						style={{ marginLeft: 20 }}
					>
						NEXT STEP
					</Button>
				</Col>
			</Row>
		);
	}
}

FormButtons.propTypes = {
	isLoading: PropTypes.bool.isRequired
}

// FormButtons.defaultProps = {
// 	isLoading: false
// }

export default FormButtons;
