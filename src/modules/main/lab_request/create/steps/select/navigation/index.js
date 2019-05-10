import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Row, Col, Button, Typography } from 'antd';

const { Text } = Typography;

class Navigation extends React.Component {
	onClickNext = () => {
		const { history, tests } = this.props;

		sessionStorage.setItem('create_lab_request_tests', JSON.stringify(tests));

		history.push('/request/create/step/4');
	}
	
	render() {
		const { disabled } = this.props;

		return (
			<Row>
				<Col sm={{ span: 12 }} md={{ span: 4, offset: 20 }}>
					<Link to="/request/create/step/2">
						<Text>
							<u>BACK</u>
						</Text>
					</Link>
					<Button 
						className="nav-btn-round" 
						type="primary" 
						style={{ marginLeft: 20 }}
						disabled={disabled}
						onClick={this.onClickNext}
					>
						NEXT STEP
					</Button>
				</Col>
			</Row>
		);
	}
}

Navigation.propTypes = {
	history: ReactRouterPropTypes.history.isRequired,
	disabled: PropTypes.bool.isRequired,
	tests: PropTypes.arrayOf(PropTypes.shape({
		key: PropTypes.string.isRequired,
		section: PropTypes.string.isRequired,
		exam: PropTypes.string.isRequired
	})).isRequired
};

export default withRouter(Navigation);
