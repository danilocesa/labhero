import React from 'react';
import PropTypes from 'prop-types';
import saveLabRequest from 'services/lab_request/labRequest';
import { LOGGEDIN_USER_DATA } from 'global_config/constant-global';
import PageTitle from 'shared_components/page_title';
import Restriction from '../clr_restriction/restriction';
import Tracker from '../../tracker';
import SummarySection from './section';
import SummaryTable from './table';
import SummaryFooter from './footer';
import { moduleTitles, requestTypes } from '../../../settings/lab_exam_request/settings';

import { CLR_SEL_EXAMS, CLR_OTHER_INFO  } from '../constants';

class SummaryStep extends React.Component {
	state = {
		exams: [],
		otherInfo: {},
		user: {}
	}
	
	constructor(props) {
		super(props);

		// 4 is the stepnumber
		this.restriction = new Restriction(4);
	}

	async componentDidMount() {
		const exams = JSON.parse(sessionStorage.getItem(CLR_SEL_EXAMS));
		const otherInfo = JSON.parse(sessionStorage.getItem(CLR_OTHER_INFO));
		const user = JSON.parse(sessionStorage.getItem(LOGGEDIN_USER_DATA));

		this.setState({ exams, user, otherInfo });
	}
	
	saveExams = async () => {
		const { otherInfo, exams, user } = this.state;
		const payloadExams = exams.map(exam => ({
			panelID: exam.selectedPanel ? exam.selectedPanel.panelID : 0,
			examID: exam.examID,
			priority: ''
		}));

		const payload = {
			...otherInfo,
			userID: user.userID,
			hospitalRequestID: otherInfo.hospitalID,
			exams: payloadExams,
		};
		
		return saveLabRequest(payload);
	}

	render() {
		const { exams } = this.state;
		const { restriction } = this;
		const moduleTitle = (sessionStorage.getItem('REQUEST_TYPE') === requestTypes.create) ? moduleTitles.create : moduleTitles.edit;

		if(restriction.hasAccess) {
			return (
				<div>
					<PageTitle pageTitle={moduleTitle} />
					<Tracker active={3} />
					<SummarySection />
					<SummaryTable exams={exams} />
					<br />
					<SummaryFooter saveExams={this.saveExams} />
				</div>
			);
		}

		return restriction.redirect();
	}
}


export default SummaryStep;
