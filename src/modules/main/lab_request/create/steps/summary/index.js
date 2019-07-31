import React from 'react';
import axiosCall from 'services/axiosCall';
import Message from 'shared_components/message';
import { LOGGEDIN_USER_DATA } from 'shared_components/constant-global';
import Restriction from '../clr_restriction/restriction';
import PageTitle from '../../title';
import Tracker from '../../tracker';
import SummarySection from './section';
import SummaryTable from './table';
import SummaryFooter from './footer';

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

	componentWillMount() {
		const exams = JSON.parse(sessionStorage.getItem(CLR_SEL_EXAMS));
		const otherInfo = JSON.parse(sessionStorage.getItem(CLR_OTHER_INFO));
		const user = JSON.parse(sessionStorage.getItem(LOGGEDIN_USER_DATA));

		this.setState({ exams, otherInfo, user });
	}

	saveExams = async () => {
		let isSuccess = false;
		const { otherInfo, exams, user } = this.state;
		const payloadExams = exams.map(exam => ({
			examID: exam.examID,
			panelID: exam.selectedPanel ? exam.selectedPanel.panelID : 0,
			priority: ''
		}));

		const payload = {
			...otherInfo,
			userID: user.userID,
			exams: payloadExams,
		};

		try {
			const response = await axiosCall({ 
				method: 'POST', 
				url: '/Request',
				data: payload
			 });

			const { data } = await response;
			console.log(data);
			

			isSuccess = true;
		} catch (e) {
			Message.error();
			isSuccess = false;
		}

		return isSuccess;
	}

	render() {
		const { exams } = this.state;
		const { restriction } = this;

		if(restriction.hasAccess) {
			return (
				<div>
					<PageTitle />
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
