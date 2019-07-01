import React from 'react';
import axiosCall from 'services/axiosCall';
import Message from 'shared_components/message';
import Restriction from '../clr_restriction/restriction';
import PageTitle from '../../title';
import Tracker from '../../tracker';
import SummarySection from './section';
import SummaryTable from './table';
import SummaryFooter from './footer';

import { CLR_SEL_EXAMS } from '../constants';

class SummaryStep extends React.Component {
	state = {
		exams: []
	}
	
	constructor(props) {
		super(props);

		// 4 is the stepnumber
		this.restriction = new Restriction(4);
	}

	componentWillMount() {
		const exams = JSON.parse(sessionStorage.getItem(CLR_SEL_EXAMS));

		this.setState({ exams });
	}

	saveExams = async () => {
		console.log('test');
		let isSuccess = false;
		const payload = {};

		try {
			const response = await axiosCall({ 
				method: 'POST', 
				url: '/Request',
				data: payload
			 });

			const { data } = await response;

			// eslint-disable-next-line prefer-destructuring
			isSuccess = data.isSuccess;
		} catch (e) {
			Message.error();
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
