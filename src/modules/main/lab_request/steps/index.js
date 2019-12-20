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


class StepsPage extends React.Component {
	componentDidMount(){
		sessionStorage.setItem('REQUEST_TYPE', this.props.requestType); // Set request type session
		sessionStorage.setItem('MODULE_PROFILE', this.props.moduleProfile); // Set module profile session 
	}

	render() {
		const requestTypeLink = (sessionStorage.getItem('REQUEST_TYPE') === 'create' ? '/request/create/' : '/request/edit/')
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
