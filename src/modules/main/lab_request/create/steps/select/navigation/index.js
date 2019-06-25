import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Row, Col, Button, Typography } from 'antd';

import { CLR_STEP_PROGRESS, CLR_SEL_EXAMS } from 'modules/main/lab_request/create/steps/constants';

const { Text } = Typography;

class Navigation extends React.Component {
	onClickNext = () => {
		const { history, selectedExams } = this.props;

		sessionStorage.setItem(CLR_SEL_EXAMS, JSON.stringify(selectedExams));
		sessionStorage.setItem(CLR_STEP_PROGRESS, String(4));

		history.push('/request/create/step/4');
	}
	
	render() {
		const { disabled } = this.props;

		return (
			<Row style={{ marginTop: 20 }}>
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
	selectedExams: PropTypes.arrayOf(PropTypes.shape({
		examID: PropTypes.number.isRequired,
		examName: PropTypes.string.isRequired,
		selectedSection: PropTypes.shape({
			sectionID: PropTypes.number.isRequired,
			sectionName: PropTypes.string.isRequired,
		}).isRequired,
		selectedSpecimen: PropTypes.shape({
			specimenID: PropTypes.number.isRequired,
			specimenName: PropTypes.string.isRequired
		}).isRequired
	})).isRequired
};

export default withRouter(Navigation);
