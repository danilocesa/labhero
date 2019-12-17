// @ts-nocheck
// LIBRARY
import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';
import { pick } from 'lodash';

// CUSTOM
import { LOGGEDIN_USER_DATA } from 'shared_components/constant-global';
import PageTitle from 'shared_components/page_title';
import createPatientInfo from 'services/lab_request/patient';
import Restriction from '../clr_restriction/restriction';
import Tracker from '../../tracker';
import FillupForm from './form';
import {moduleTitle} from '../../create/settings';

// CONSTANTS
import { 
	CLR_PERSONAL_INFO, 
	CLR_OTHER_INFO, 
	CLR_STEP_PROGRESS 
} from '../constants';


const personalInfoKeys = [
	'hospitalID',
	'patientID',
	'emailAdd',
	'givenName',
	'middleName',
	'lastName',
	'nameSuffix',
	'dateOfBirth',
	'sex',
	'address',
	'addressCode',
	'contactNumber'
];

const otherInfoKeys = [
	'patientID',
	'visit',
	'chargeSlip',
	'officialReceipt',
	'hospitalRequestID',
	'patientAge',
	'locationID',
	'bed',
	'physicianID',
	'comment'
];

class FillupStep extends React.Component {
	constructor(props) {
		super(props);

		// 2 is the stepnumber
		this.restriction = new Restriction(2);
		this.state = { isLoading: false };
	}

	handleSubmit = (fields) => {
		const userSession = JSON.parse(sessionStorage.getItem(LOGGEDIN_USER_DATA));
		const otherInfo = pick(fields, otherInfoKeys);
		const personalInfo = pick(fields, personalInfoKeys);
		
		// Convert each field's value to uppercase
		Object.keys(personalInfo).forEach(field => {
			if(field !== 'emailAdd' && personalInfo[field] !== undefined)
				personalInfo[field] = personalInfo[field].toUpperCase();
		});

		personalInfo.addressCode = fields.town;
		delete personalInfo.town;
		delete personalInfo.patientID;
		
		this.setState({ isLoading: true }, async() =>{
			// If patientid is null then create new patient
			if(!fields.patientID) {
				const createdPatient = await createPatientInfo({
					userID: userSession.userID,
					...personalInfo
				});

				// If createPatient has an error, stop the function
				if(!createdPatient) return;

				otherInfo.patientID = createdPatient.patientID;
			}

			this.setState({ isLoading: false });

			sessionStorage.setItem(CLR_OTHER_INFO, JSON.stringify(otherInfo));
			sessionStorage.setItem(CLR_PERSONAL_INFO, JSON.stringify(personalInfo));
			sessionStorage.setItem(CLR_STEP_PROGRESS, String(3));

			this.goToNextPage();
		});
	}

	goToNextPage = () => {
		const { history } = this.props;
		if(sessionStorage.getItem('REQUEST_TYPE') === 'create'){
			history.push('/request/create/step/3');
		} else {
			history.push('/request/edit/step/3');
		}
		
	}

	dynamicModuleTitle = () =>{
		const pageTitle = (sessionStorage.getItem('REQUEST_TYPE') === 'create' || sessionStorage.getItem('REQUEST_TYPE') === undefined ? "CREATE REQUEST" : "EDIT REQUEST");
		return pageTitle || moduleTitle;
	}

	render() {
		const { restriction } = this;
		const { isLoading } = this.state;
		
		if(restriction.hasAccess) {
			return (
				<div>
					<PageTitle pageTitle={this.dynamicModuleTitle()} />
					<Tracker active={1} />
					<FillupForm 
						handleSubmit={this.handleSubmit} 
						isLoading={isLoading}
					/>
				</div>
			);
		}

		return restriction.redirect();
	}
}

FillupStep.propTypes = {
	history: ReactRouterPropTypes.history.isRequired
};

export default withRouter(FillupStep);
