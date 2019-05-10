import React from 'react';
import { Route } from 'react-router-dom';

import SearchStep from './search';
import FillupStep from './fillup';
import SelectStep from './select';
import SummaryStep from './summary';
// import SummaryStep2 from './summary_v2';

class StepsPage extends React.Component {
	render() {
		return (
			<div>
				<Route path="/request/create/step/1" component={SearchStep} />
				<Route path="/request/create/step/2" component={FillupStep} />
				<Route path="/request/create/step/3" component={SelectStep} />
				<Route path="/request/create/step/4" component={SummaryStep} />
				{/* <Route path="/request/create/step/4" component={SummaryStep2} /> */}
			</div>
		);
	}
}

export default StepsPage;
