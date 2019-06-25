import React from 'react';

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
					<SummaryFooter />
				</div>
			);
		}

		return restriction.redirect();
	}
}

export default SummaryStep;
