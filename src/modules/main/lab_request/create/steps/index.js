import React from 'react';
import { Route } from 'react-router-dom';

import SearchStep from './search';
import FillupStep from './fillup';
import SelectStep from './select';
import SummaryStep from './summary';

class StepsPage extends React.Component {
	render() {
		return (
			<div>
				<Route path="/request/create/step/1" component={SearchStep} />
				<Route path="/request/create/step/2" component={FillupStep} />
				<Route path="/request/create/step/3" component={SelectStep} />
				<Route path="/request/create/step/4" component={SummaryStep} />
			</div>
		);
	}
}

export default StepsPage;
