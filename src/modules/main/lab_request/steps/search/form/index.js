import React from 'react';
import PropTypes from 'prop-types';
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
		const { populatePatients, displayLoading, moduleProfile } = this.props;
		const sessionPatientId = sessionStorage.getItem(CLR_SEARCHED_ID);
		const sessionPatientName = sessionStorage.getItem(CLR_SEARCHED_NAME);

		return (
			<SearchPatientForm 
				populatePatients={populatePatients}
				storeSearchedVal={this.storeSearchedVal}
				displayLoading={displayLoading}
				sessionPatientId={sessionPatientId}
				sessionPatientName={sessionPatientName}
				moduleProfile={moduleProfile}
			/>
		);
	}
}

SearchForm.propTypes = {
	populatePatients: PropTypes.func.isRequired,
	displayLoading: PropTypes.func.isRequired,
	updateSearchedValue: PropTypes.func.isRequired,
	moduleProfile: PropTypes.string.isRequired
};


export default SearchForm;