import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import ErrorPage from 'modules/error_page';
import SearchStep from './search';
import FillupStep from './fillup';
import SelectStep from './select';
import SummaryStep from './summary';


class StepsPage extends React.Component {
	render() {
		const {requestType, moduleProfile } = this.props;
		const requestTypeLink = (requestType === 1 ? '/request/create/' : '/request/edit/')
		return (
			<div>
				<Switch>
					<Route exact path={`${requestTypeLink}step/1`} render={()=> <SearchStep requestType={requestType} moduleProfile={moduleProfile} />} />
					<Route exact path={`${requestTypeLink}step/2`} render={()=> <FillupStep requesType={requestType} moduleProfile={moduleProfile} />} />
					<Route exact path={`${requestTypeLink}step/3`} render={()=> <SelectStep requesType={requestType} moduleProfile={moduleProfile} />} />
					<Route exact path={`${requestTypeLink}step/4`} render={()=> <SummaryStep requesType={requestType} moduleProfile={moduleProfile} />} />
					<Route component={ErrorPage} />
				</Switch>
			</div>
		);
	}
}

StepsPage.propTypes ={
	requestType: PropTypes.number.isRequired,
	moduleProfile: PropTypes.string.isRequired
}


export default StepsPage;
