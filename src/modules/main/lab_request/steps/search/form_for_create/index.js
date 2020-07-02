// LIBRARY
import React from 'react';
import PropTypes from 'prop-types';

// CUSTOM
import SearchPatientForm from 'shared_components/search_patient_form';
import { LR_SEARCHED_NAME, LR_SEARCHED_ID, LR_REQUEST_TYPE } from 'modules/main/lab_request/steps/constants';


class SearchForm extends React.Component {
	render() {
		const { populatePatients, displayLoading, updateSearchCount } = this.props;
		const sessionPatientId = sessionStorage.getItem(LR_SEARCHED_ID);
		const sessionPatientName = sessionStorage.getItem(LR_SEARCHED_NAME);
		const isEditting = sessionStorage.getItem(LR_REQUEST_TYPE) === 'edit';

		return (
			<SearchPatientForm 
				populatePatients={populatePatients}
				storeSearchedVal={updateSearchCount}
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
	updateSearchCount: PropTypes.func.isRequired
};


export default SearchForm;