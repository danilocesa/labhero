// LIBRARY
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

// CUSTOM
import SearchStep from './search';
import FillupStep from './fillup';
import SelectStep from './select';
import SummaryStep from './summary';
import { requestTypes } from '../../settings/lab_exam_request/settings';


class StepsPage extends React.Component {

	constructor(props) {
		super(props);

		sessionStorage.setItem('REQUEST_TYPE', props.requestType);
		sessionStorage.setItem('MODULE_PROFILE', props.moduleProfile);
	}

	render() {
		const { requestType } = this.props;
		const module = requestType === requestTypes.create ? 'create' : 'edit';

		return (
			<div>
				<Switch>
					<Route exact path={`/request/${module}/step/1`} render={()=> <SearchStep />} />
					<Route exact path={`/request/${module}/step/2`} render={()=> <FillupStep />} />
					<Route exact path={`/request/${module}/step/3`} render={()=> <SelectStep />} />
					<Route exact path={`/request/${module}/step/4`} render={()=> <SummaryStep />} />
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
