import React from 'react';
import { withRouter } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';

import axiosCall from 'services/axiosCall';
import Message from 'shared_components/message';
import { CLR_PERSONAL_INFO, CLR_OTHER_INFO } from '../constants';

import PageTitle from '../../title';
import Tracker from '../../tracker';
import FillupForm from './form';

class FillupStep extends React.Component {
	handleSubmit = (fields) => {
		const personalInfo = fields;
		const otherInfo = fields;
		
		this.createPatient(personalInfo);
		this.storeSessionVariables(personalInfo, otherInfo);
		this.goToNextPage();
	}
	// onFieldChange = (changedField) => {
	// 	const { personalInfo, otherInfo } = this.state;
	// 	const fieldName = Object.keys(changedField)[0]; 
	// 	const fieldValue = changedField[fieldName].value;
	// 	const field = { [fieldName]: fieldValue };
	// 	// Check if the fieldname is in state.personInfo
	// 	const isInPersInfoObj = Object.keys(personalInfo).some(item => item === fieldName);
	
	// 	// Pass field value to respective obj to be updated. <otherinfo or personalInfo>
	// 	const ObjToBeUpdated = isInPersInfoObj 
	// 		? { personalInfo: { ...personalInfo, ...field } } 
	// 		: { otherInfo: { ...otherInfo, ...field } };

	// 	this.setState(ObjToBeUpdated);
	// }

	goToNextPage = () => {
		const { history } = this.props;

		history.push('/request/create/step/3');
	}

	createPatient = async (personalInfo) => {
		try{
			const content = {
				method: 'POST',
				url: '/Patient',
				data: personalInfo
			}

			const response = await axiosCall(content);
			const { data } = await response;

			console.log(data);
		}
		catch(error) {
			Message.error();
		}
	}

	storeSessionVariables = (personalInfo, otherInfo) => {
		

		sessionStorage.setItem(CLR_OTHER_INFO, JSON.stringify(otherInfo));
		sessionStorage.setItem(CLR_PERSONAL_INFO, JSON.stringify(personalInfo));
	}

	render() {
		return (
			<div>
				<PageTitle />
				<Tracker active={1} />
				<FillupForm handleSubmit={this.handleSubmit} />
			</div>
		);
	}
}

FillupStep.propTypes = {
	history: ReactRouterPropTypes.history.isRequired
};

export default withRouter(FillupStep);
