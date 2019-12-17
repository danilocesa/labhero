import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Typography } from 'antd';

const { Text } = Typography;

class FormButtons extends React.Component {
	render() {

		
		const { isLoading } = this.props;
		const dynamicLink = (sessionStorage.getItem('REQUEST_TYPE') === 'create' || sessionStorage.getItem('REQUEST_TYPE') === undefined ? "/request/create/step/1" : "/request/edit/step/1" );

		return (
			<Row style={{ marginTop: 10 }}>
				<Col sm={{ span: 12 }} md={{ span: 4, offset: 20 }}>
					<Link to={dynamicLink}>
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

export default FormButtons;
