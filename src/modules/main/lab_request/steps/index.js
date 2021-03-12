// LIBRARY
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { ACCESS_MATRIX, LOGGEDIN_USER_DATA } from 'global_config/constant-global';
import SearchStep from './search';
import FillupStep from './fillup';
import SelectStep from './select';
import SummaryStep from './summary';


class StepsPage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			userAccess: { 
				create: false,
				update: false,
			}
		};
	}

	componentDidMount(){
		const accessMatrix = JSON.parse(sessionStorage.getItem(ACCESS_MATRIX));
		const loggedinUser = JSON.parse(sessionStorage.getItem(LOGGEDIN_USER_DATA));

		const userAccess = {
			create: accessMatrix.request.create.includes(loggedinUser.loginType),
			update: accessMatrix.request.update.includes(loggedinUser.loginType),
		};

		this.setState({ userAccess });

	}

	render() {
		const { moduleType } = this.props;

		return (
			<div>
				<Switch>
					<Route exact path={`/request/${moduleType}/step/1`} render={()=> <SearchStep />} />
					<Route exact path={`/request/${moduleType}/step/2`} render={()=> <FillupStep />} />
					<Route exact path={`/request/${moduleType}/step/3`} render={()=> <SelectStep />} />
					<Route exact path={`/request/${moduleType}/step/4`} render={()=> <SummaryStep />} />
				</Switch>
			</div>
		);
	}
}

StepsPage.propTypes ={
	moduleType: PropTypes.string.isRequired,
}


export default StepsPage;
