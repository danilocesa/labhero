// LIBRARY
import React from 'react';
import PropTypes from 'prop-types';

// CUSTOM
import SearchPatientForm from 'shared_components/search_patient_form';
import { CLR_SEARCHED_NAME, CLR_SEARCHED_ID } from '../../constants';


class SearchForm extends React.Component {
	storeSearchedVal = (patientName, patientID) => {
		if(patientID || patientName) {
			const { updateSearchedValue } = this.props;
			updateSearchedValue(patientID, patientName);
		}
	}
	
	render() {
		const { populatePatients, displayLoading } = this.props;
		const sessionPatientId = sessionStorage.getItem(CLR_SEARCHED_ID);
		const sessionPatientName = sessionStorage.getItem(CLR_SEARCHED_NAME);
		const isEditting = (sessionStorage.getItem('REQUEST_TYPE') === "edit" ? true : false);

		return (
			<SearchPatientForm 
				populatePatients={populatePatients}
				storeSearchedVal={this.storeSearchedVal}
				displayLoading={displayLoading}
				sessionPatientId={sessionPatientId}
				sessionPatientName={sessionPatientName}
				enableRequestDate={isEditting}
			/>
		);
	}
}

SearchForm.propTypes = {
	populatePatients: PropTypes.func.isRequired,
	displayLoading: PropTypes.func.isRequired,
	updateSearchedValue: PropTypes.func.isRequired
};


export default SearchForm;