import React from 'react';
import { withRouter } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import { pick } from 'lodash';
import axiosCall from 'services/axiosCall';
import Message from 'shared_components/message';
import { LOGGEDIN_USER_DATA } from 'shared_components/constant-global';
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
	'contactNo'
];

const otherInfoKeys = [
	'bed',
	'chargeSlip',
	'comment',
	'hospitalRequestID',
	'locationID',
	'locationName',
	'officialReceipt',
	'patientAge',
	'patientID',
	'physicianID',
	'physicianName',
	'requestID',
	'visit'
];



class FillupStep extends React.Component {
	constructor(props) {
		super(props);

		// 2 is the stepnumber
		this.restriction = new Restriction(2);
	}

	handleSubmit = async (fields) => {
		const userSession = JSON.parse(sessionStorage.getItem(LOGGEDIN_USER_DATA));
		const otherInfo = pick(fields, otherInfoKeys);
		const personalInfo = pick(fields, personalInfoKeys);
		
		// If patientid is null then create new patient
		if(!fields.patientID) {
			const createdPatient = await this.createPatientInfo({
				userID: userSession.userID,
				...personalInfo
			});
			
			// If createPatient has an error, stop the function
			if(!createdPatient) return;

			otherInfo.patientID = createdPatient.patientID;
		}
		
		const createdOtherInfo = await this.createOtherInfo({ ...otherInfo });

		// If createOtherInfo has an error, stop the function
		if(!createdOtherInfo) return;

		sessionStorage.setItem(CLR_OTHER_INFO, JSON.stringify(otherInfo));
		sessionStorage.setItem(CLR_PERSONAL_INFO, JSON.stringify(personalInfo));
		sessionStorage.setItem(CLR_STEP_PROGRESS, String(3));

		this.goToNextPage();
	}

	goToNextPage = () => {
		const { history } = this.props;

		history.push('/request/create/step/3');
	}

	createPatientInfo = async (personalInfo) => {
		let createdPatient;
		const userData = JSON.parse(sessionStorage.getItem(LOGGEDIN_USER_DATA));

		try{
			const content = {
				method: 'POST',
				url: '/Patient',
				data: personalInfo,
				headers: { 
					'authorization': `Bearer ${userData.token}`
				}
			}

			const response = await axiosCall(content);
			const { data } = await response;

			// eslint-disable-next-line no-unneeded-ternary
			createdPatient = data;
		}
		catch(error) {
			const { errors } = error.response.data;
			Object.keys(errors).forEach(key => { Message.error(errors[key]); });

			createdPatient = null;
		}

		return createdPatient;
	}

	createOtherInfo = async (otherInfo) => {
		let createdOtherInfo;
		
		try{
			const content = {
				method: 'POST',
				url: '/RequestHeader',
				data: otherInfo,
				headers: { 'content-type': 'application/json' }
			}

			const response = await axiosCall(content);
			const { data } = await response;

			// eslint-disable-next-line no-unneeded-ternary
			createdOtherInfo = data;
		}
		catch(error) {
			const { errors } = error.response.data;
			Object.keys(errors).forEach(key => { Message.error(errors[key]); });

			createdOtherInfo = null;
		}

		return createdOtherInfo;
	}

	render() {
		const { restriction } = this;

		if(restriction.hasAccess) {
			return (
				<div>
					<PageTitle />
					<Tracker active={1} />
					<FillupForm handleSubmit={this.handleSubmit} />
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
