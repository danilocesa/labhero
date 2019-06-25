import React from 'react';

import Restriction from '../clr_restriction';
import PageTitle from '../../title';
import Tracker from '../../tracker';
import SummarySection from './section';
import SummaryTable from './table';
import SummaryFooter from './footer';

import { CLR_SEL_EXAMS } from '../constants';

class SummaryStep extends React.Component {
	state = {
		tests: []
	}
	
	constructor(props) {
		super(props);

		// 4 is the stepnumber
		this.restriction = new Restriction(4);
	}

	componentWillMount() {
		const tests = JSON.parse(sessionStorage.getItem(CLR_SEL_EXAMS));

		this.setState({ tests });
	}

	render() {
		const { tests } = this.state;
		const { restriction } = this;

		if(restriction.hasAccess) {
			return (
				<div>
					<PageTitle />
					<Tracker active={3} />
					<SummarySection />
					<SummaryTable tests={tests} />
					<br />
					<SummaryFooter />
				</div>
			);
		}

		return restriction.redirect();
	}
}

export default SummaryStep;
