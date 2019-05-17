import React from 'react';
import { withRouter } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';

import { CLR_TESTS } from '../constants';

import Tracker from '../../tracker';
import FillupForm from './form';
import Navigation from './navigation';

class FillupStep extends React.Component {
	state = {
		caseNumber: '',
		givenName: '',
		nameSuffix: '',
		lastName: '',
		middleName: '',
		dateOfBirth: '',
		age: '',
		sex: '',
		ward: '',
		physicianId: '',
		classType: '',
		comment: '',
		amount: ''
	};

	onClickNext = () => {
		const { history } = this.props;
		
		sessionStorage.setItem(CLR_TESTS, JSON.stringify(this.state));

		history.push('/request/create/step/3');
	}

	updateState = (value) => {
		this.setState(value);
	}

	render() {
		return (
			<div>
				<Tracker active={1} />
				<FillupForm 
					fields={this.state}
					updateState={this.updateState}
				/>
				<Navigation onClickNext={this.onClickNext} />
			</div>
		);
	}
}

FillupStep.propTypes = {
	// disabled: PropTypes.bool.isRequired,
	history: ReactRouterPropTypes.history.isRequired
};

export default withRouter(FillupStep);
