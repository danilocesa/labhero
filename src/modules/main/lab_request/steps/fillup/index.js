// @ts-nocheck
// LIBRARY
import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';
import { pick } from 'lodash';

// CUSTOM
import { LOGGEDIN_USER_DATA } from 'global_config/constant-global';
import PageTitle from 'shared_components/page_title';
import createPatientInfo from 'services/lab_request/patient';
import Restriction from '../clr_restriction/restriction';
import Tracker from '../../tracker';
import FillupForm from './form';
import { requestTypes, requestLinks, moduleTitles } from '../../../settings/lab_exam_request/settings';

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
	'city',
	'town',
	'address',
	'provinces',
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
		const userSession = JSON.parse(sessionStorage.getItem(LOGGEDIN_USER_DATA));
		const otherInfo = pick(fields, otherInfoKeys);
		const personalInfo = pick(fields, personalInfoKeys);
		
		// Convert each field's value to uppercase
		Object.keys(personalInfo).forEach(field => {
			if(personalInfo[field] !== undefined && personalInfo[field] !== null )
				personalInfo[field] = personalInfo[field].toUpperCase();
		});

		personalInfo.addressCode = fields.town;
		// delete personalInfo.town;
		delete personalInfo.patientID;
		
		this.setState({ isLoading: true }, async() =>{
			// If patientid is null then create new patient
			if(!fields.patientID) {
				const createdPatient = await createPatientInfo({
					userID: userSession.userID,
					...personalInfo
				});

				// If createPatient has an error, stop the function
				if(!createdPatient) 
					return;

				otherInfo.patientID = createdPatient.patientID;
			}

			sessionStorage.setItem(CLR_OTHER_INFO, JSON.stringify(otherInfo));
			sessionStorage.setItem(CLR_PERSONAL_INFO, JSON.stringify(personalInfo));
			sessionStorage.setItem(CLR_STEP_PROGRESS, String(3));

			this.setState({ isLoading: false });

			this.goToNextPage();
		});
	}

	goToNextPage = () => {
		const { history } = this.props;
		if(sessionStorage.getItem('REQUEST_TYPE') === requestTypes.create){
			history.push(requestLinks.create.step3);
		} else {
			history.push(requestLinks.edit.step3);
		}
	}

	dynamicModuleTitle = () =>{
		const pageTitle = (sessionStorage.getItem('REQUEST_TYPE') === requestTypes.create || sessionStorage.getItem('REQUEST_TYPE') === undefined ? moduleTitles.create : moduleTitles.edit);
		return pageTitle;
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
