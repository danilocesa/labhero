import React from 'react';
import PropTypes from 'prop-types';
import SearchPatientForm from 'shared_components/search_patient_form';

import { CLR_SEARCHED_NAME, CLR_SEARCHED_ID } from '../../constants';

class SearchForm extends React.Component {
	storeSearchedVal = (patientName, patientID) => {
		if(patientID || patientName) {
			sessionStorage.setItem(CLR_SEARCHED_NAME, patientName);
			sessionStorage.setItem(CLR_SEARCHED_ID, patientID);
		}
	}
	
	render() {
		const { populatePatients, displayLoading } = this.props;
		const sessionPatientId = sessionStorage.getItem(CLR_SEARCHED_ID);
		const sessionPatientName = sessionStorage.getItem(CLR_SEARCHED_NAME);

		return (
			<SearchPatientForm 
				populatePatients={populatePatients}
				storeSearchedVal={this.storeSearchedVal}
				displayLoading={displayLoading}
				sessionPatientId={sessionPatientId}
				sessionPatientName={sessionPatientName}
			/>
		);
	}
}

SearchForm.propTypes = {
	populatePatients: PropTypes.func.isRequired,
	displayLoading: PropTypes.func.isRequired
};

export default SearchForm;