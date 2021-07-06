import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Row, Col, Button, Typography } from 'antd';
import { 
	LR_STEP_PROGRESS, 
	LR_SEL_EXAMS,
	LR_SEL_CONTENTS,
	LR_SEL_PANEL_CONTENTS,
	LR_REQUEST_TYPE,
	LR_IS_EXAM_UPDATED
} from 'modules/main/lab_request/steps/constants';
import {requestLinks, requestTypes} from 'modules/main/settings/lab_exam_request/settings';

const { Text } = Typography;

class Navigation extends React.Component {
	onClickNext = () => {
		const { 
			history, 
			selectedExams, 
			selectedContents, 
			selectedPanelContents
		} = this.props;

		sessionStorage.setItem(LR_IS_EXAM_UPDATED, String(1));
		sessionStorage.setItem(LR_SEL_EXAMS, JSON.stringify(selectedExams));
		sessionStorage.setItem(LR_SEL_CONTENTS, JSON.stringify(selectedContents));
		sessionStorage.setItem(LR_SEL_PANEL_CONTENTS, JSON.stringify(selectedPanelContents));
		sessionStorage.setItem(LR_STEP_PROGRESS, String(4));

		if(sessionStorage.getItem(LR_REQUEST_TYPE) === requestTypes.create){
			history.push(requestLinks.create.step4);
		}else{
			history.push(requestLinks.edit.step4);
		}
	}
	
	render() {
		const { disabled } = this.props;
		const dynamicLink = (sessionStorage.getItem(LR_REQUEST_TYPE) === requestTypes.create) 
			? requestLinks.create.step2 
			: requestLinks.edit.step2;

		return (
			<Row style={{ marginTop: 20 }}>
				<Col span={16} offset={17}>
					<Link to={dynamicLink}>
						<Text>
							<u>BACK</u>
						</Text>
					</Link>
					<Button 
						className="nav-btn-round" 
						type="primary" 
						style={{ marginLeft: 10 }}
						disabled={disabled}
						onClick={this.onClickNext}
					>
						NEXT STEP
					</Button>
					{
						sessionStorage.getItem(LR_REQUEST_TYPE) === requestTypes.edit 
						? 	
							<Button 
								className="nav-btn-round" 
								type="primary" 
								style={{ marginLeft: 10, width:150 }}
							>
								CANCEL REQUEST
							</Button>
							:
								null
					}
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
		sampleSpecimenID: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
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
	selectedPanelContents: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default withRouter(Navigation);
