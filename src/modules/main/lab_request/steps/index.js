// LIBRARY
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

// CUSTOM
import ErrorPage from 'modules/error_page';
import SearchStep from './search';
import FillupStep from './fillup';
import SelectStep from './select';
import SummaryStep from './summary';
import { requestLinks, requestTypes } from '../../settings/lab_exam_request/settings';


class StepsPage extends React.Component {

	componentDidMount(){
		sessionStorage.setItem('REQUEST_TYPE', this.props.requestType);
		sessionStorage.setItem('MODULE_PROFILE', this.props.moduleProfile);
	}

	render() {
		const requestTypeLink = (sessionStorage.getItem('REQUEST_TYPE') === requestTypes.create ? requestLinks.create.base : requestLinks.edit.base);
		return (
			<div>
				<Switch>
					<Route exact path={`${requestTypeLink}step/1`} render={()=> <SearchStep />} />
					<Route exact path={`${requestTypeLink}step/2`} render={()=> <FillupStep />} />
					<Route exact path={`${requestTypeLink}step/3`} render={()=> <SelectStep />} />
					<Route exact path={`${requestTypeLink}step/4`} render={()=> <SummaryStep />} />
					<Route component={ErrorPage} />
				</Switch>
			</div>
		);
	}
}

StepsPage.propTypes ={
	requestType: PropTypes.string.isRequired,
	moduleProfile: PropTypes.string.isRequired
}


export default StepsPage;
