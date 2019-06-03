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
	state = {
		personalInfo: {
			caseNumber: '',
			givenName: '',
			nameSuffix: '',
			lastName: '',
			middleName: '',
			dateOfBirth: '',
			age: '',
			sex: ''
		},
		otherInfo: {
			ward: '',
			physicianId: '',
			classType: '',
			comment: '',
			amount: ''
		},
		fields: {}
	};

	goToNextPage = (personalInfo) => {
		this.storeSessionVariables();

		console.log(personalInfo);
	}

	updatePersonalInfo = (field) => {
		this.setState(({ personalInfo }) => ({ personalInfo: { ...personalInfo, ...field } }));
	}

	handleFormChange = changedFields => {
    this.setState(({ fields }) => ({
      fields: { ...fields, ...changedFields },
    }));
  };

	onFieldChange = (changedField) => {
		const { personalInfo, otherInfo } = this.state;
		const fieldName = Object.keys(changedField)[0]; 
		const fieldValue = changedField[fieldName].value;
		const field = { [fieldName]: fieldValue };
		// Check if the fieldname is in state.personInfo
		const isInPersInfoObj = Object.keys(personalInfo).some(item => item === fieldName);
	
		// Pass field value to respective obj to be updated. <otherinfo or personalInfo>
		const ObjToBeUpdated = isInPersInfoObj 
			? { personalInfo: { ...personalInfo, ...field } } 
			: { otherInfo: { ...otherInfo, ...field } };

		this.setState(ObjToBeUpdated);
	}


	createPatient = async () => {
		try{
			const { personalInfo } = this.state;
			const content = {
				method: 'POST',
				url: '/Patient',
				data: personalInfo
			}

			const response = await axiosCall(content);
			const { data } = await response;
		}
		catch(error) {
			Message.error();
		}
	}

	storeSessionVariables = () => {
		const { history } = this.props;
		const { personalInfo, otherInfo } = this.state;

		sessionStorage.setItem(CLR_OTHER_INFO, JSON.stringify(otherInfo));
		sessionStorage.setItem(CLR_PERSONAL_INFO, JSON.stringify(personalInfo));

		history.push('/request/create/step/3');
	}

	render() {
		const { personalInfo, otherInfo, fields } = this.state;

		return (
			<div>
				<PageTitle />
				<Tracker active={1} />
				<FillupForm 
					{...fields}
					personalInfo={personalInfo}
					otherInfo={otherInfo}
					onFieldChange={this.onFieldChange}
					handleFormChange={this.handleFormChange}
					updatePersonalInfo={this.updatePersonalInfo}
					goToNextPage={this.goToNextPage}
				/>
			</div>
		);
	}
}

FillupStep.propTypes = {
	history: ReactRouterPropTypes.history.isRequired
};

export default withRouter(FillupStep);
