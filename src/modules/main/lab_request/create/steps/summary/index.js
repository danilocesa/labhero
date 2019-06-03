import React from 'react';

import PageTitle from '../../title';
import Tracker from '../../tracker';
import SummarySection from './section';
import SummaryTable from './table';
import SummaryFooter from './footer';

import { CLR_TESTS } from '../constants';

class SummaryStep extends React.Component {
	state = {
		tests: []
	}
	
	componentWillMount() {
		const tests = JSON.parse(sessionStorage.getItem(CLR_TESTS));

		this.setState({ tests });
	}

	render() {
		const { tests } = this.state;

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
}

export default SummaryStep;
