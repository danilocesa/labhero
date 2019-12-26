import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Typography } from 'antd';

import { requestLinks, requestTypes } from '../../../../settings/lab_exam_request/settings';

const { Text } = Typography;

class FormButtons extends React.Component {
	render() {

		
		const { isLoading } = this.props;
		const { create, edit } = requestLinks
		const dynamicLink = (sessionStorage.getItem('REQUEST_TYPE') === requestTypes.create || sessionStorage.getItem('REQUEST_TYPE') === undefined ? create.step1 : edit.step1);

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
