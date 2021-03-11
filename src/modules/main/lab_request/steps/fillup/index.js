// @ts-nocheck
// LIBRARY
import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';
import { pick } from 'lodash';

import { LOGGEDIN_USER_DATA } from 'global_config/constant-global';
import PageTitle from 'shared_components/page_title';
import createPatientInfo from 'services/lab_request/patient';
import Restriction from 'modules/main/lab_request/steps/lr_restriction/restriction';
import Tracker from 'modules/main/lab_request/tracker';
import { requestTypes, requestLinks, moduleTitles } from 'modules/main/settings/lab_exam_request/settings';
import { 
	LR_PERSONAL_INFO, 
	LR_OTHER_INFO, 
	LR_STEP_PROGRESS, 
	LR_REQUEST_TYPE
} from 'modules/main/lab_request/steps/constants';

import FillupForm from './form';

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
	// 'city',
	// 'town',
	// 'provinces',
	'address',
	'addressCode',
	'contactNumber'
];

const otherInfoKeys = [
	'hospitalID',
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
		const sessUser = JSON.parse(sessionStorage.getItem(LOGGEDIN_USER_DATA));
		const sessOtherInfo = JSON.parse(sessionStorage.getItem(LR_OTHER_INFO));
		const reqType = sessionStorage.getItem(LR_REQUEST_TYPE);


		const otherInfo = pick(fields, otherInfoKeys);
		const personalInfo = pick(fields, personalInfoKeys);
		

		// Convert each field's value to uppercase
		Object.keys(personalInfo).forEach(field => {
			if(personalInfo[field] !== undefined && personalInfo[field] !== null )
				personalInfo[field] = personalInfo[field].toUpperCase();
		});
		
		delete personalInfo.patientID;
		
		this.setState({ isLoading: true }, async() =>{
			// If patientid is null then create new patient
			if(!fields.patientID) {
				const createdPatient = await createPatientInfo({
					userID: sessUser.userID,
					...personalInfo,
					addressCode: fields.town
				});

				// If createPatient has an error, stop the function
				if(!createdPatient) 
					return;

				otherInfo.patientID = createdPatient.patientID;
			}

			// If form is came from edit search module, append requestID on otherInfo
			if(reqType === 'edit') {
				otherInfo.requestID = sessOtherInfo.requestID;
			}

			sessionStorage.setItem(LR_OTHER_INFO, JSON.stringify(otherInfo));
			sessionStorage.setItem(LR_PERSONAL_INFO, JSON.stringify(personalInfo));
			sessionStorage.setItem(LR_STEP_PROGRESS, String(3));

			this.setState({ isLoading: false });

			this.goToNextPage();
		});
	}

	goToNextPage = () => {
		const { history } = this.props;

		if(sessionStorage.getItem(LR_REQUEST_TYPE) === requestTypes.create)
			history.push(requestLinks.create.step3);
		else 
			history.push(requestLinks.edit.step3);
	}

	dynamicModuleTitle = () =>{
		const reqType = sessionStorage.getItem(LR_REQUEST_TYPE);
		const pageTitle = (reqType === requestTypes.create || reqType === undefined)
			? moduleTitles.create 
			: moduleTitles.edit;
		return pageTitle;
	}

	render() {
		const { isLoading } = this.state;
		
		if(this.restriction.hasAccess) {
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

		return this.restriction.redirect();
	}
}

FillupStep.propTypes = {
	history: ReactRouterPropTypes.history.isRequired
};

export default withRouter(FillupStep);
