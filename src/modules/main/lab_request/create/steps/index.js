import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ErrorPage from 'modules/error_page';
import SearchStep from './search';
import FillupStep from './fillup';
import SelectStep from './select';
import SummaryStep from './summary';


class StepsPage extends React.Component {
	render() {
		return (
			<div>
				<Switch>
					<Route exact path="/request/create/step/1" component={SearchStep} />
					<Route exact path="/request/create/step/2" component={FillupStep} />
					<Route exact path="/request/create/step/3" component={SelectStep} />
					<Route exact path="/request/create/step/4" component={SummaryStep} />
					<Route component={ErrorPage} />
				</Switch>
			</div>
		);
	}
}

export default StepsPage;
