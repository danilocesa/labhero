import React from 'react';
import { withRouter } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import { pick } from 'lodash';
import { LOGGEDIN_USER_DATA } from 'shared_components/constant-global';
import createPatientInfo from 'services/lab_request/patient';
import Restriction from '../clr_restriction/restriction';
import PageTitle from '../../title';
import Tracker from '../../tracker';
import FillupForm from './form';


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
			console.log(personalInfo, field);
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

			console.log(personalInfo);

			sessionStorage.setItem(CLR_OTHER_INFO, JSON.stringify(otherInfo));
			sessionStorage.setItem(CLR_PERSONAL_INFO, JSON.stringify(personalInfo));
			sessionStorage.setItem(CLR_STEP_PROGRESS, String(3));

			this.goToNextPage();
		});
	}

	goToNextPage = () => {
		const { history } = this.props;

		history.push('/request/create/step/3');
	}

	render() {
		const { restriction } = this;
		const { isLoading } = this.state;
		
		if(restriction.hasAccess) {
			return (
				<div>
					<PageTitle />
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
