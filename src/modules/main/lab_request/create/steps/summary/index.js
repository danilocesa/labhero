import React from 'react';

import Tracker from '../../tracker';
import SummarySection from './section';
import SummaryTable from './table';
import SummaryFooter from './footer';

class SummaryStep extends React.Component {
	state = {
		tests: []
	}
	
	componentWillMount() {
		const tests = JSON.parse(sessionStorage.getItem('create_lab_request_tests'));

		this.setState({ tests });
	}

	render() {
		const { tests } = this.state;

		return (
			<div>
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
