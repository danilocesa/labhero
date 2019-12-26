import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Row, Col, Button, Typography } from 'antd';

import { 
	CLR_STEP_PROGRESS, 
	CLR_SEL_EXAMS,
	CLR_SEL_CONTENTS,
	CLR_SEL_PANEL_CONTENTS
} from '../../constants';

const { Text } = Typography;

class Navigation extends React.Component {
	onClickNext = () => {
		const { history, selectedExams, selectedContents, selectedPanelContents } = this.props;

		sessionStorage.setItem(CLR_SEL_EXAMS, JSON.stringify(selectedExams));
		sessionStorage.setItem(CLR_SEL_CONTENTS, JSON.stringify(selectedContents));
		sessionStorage.setItem(CLR_SEL_PANEL_CONTENTS, JSON.stringify(selectedPanelContents));
		sessionStorage.setItem(CLR_STEP_PROGRESS, String(4));

		if(sessionStorage.getItem('REQUEST_TYPE') ==='create'){
			history.push('/request/create/step/4');
		}else{
			history.push('/request/edit/step/4');
		}
	}
	
	render() {
		const { disabled } = this.props;
		const dynamicLink = (sessionStorage.getItem('REQUEST_TYPE') === 'create') ? "/request/create/step/2" : "/request/edit/step/2";

		return (
			<Row style={{ marginTop: 20 }}>
				<Col sm={{ span: 12 }} md={{ span: 4, offset: 20 }}>
					<Link to={dynamicLink}>
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
	})).isRequired,
	selectedContents: PropTypes.arrayOf(PropTypes.string).isRequired,
	selectedPanelContents: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default withRouter(Navigation);
