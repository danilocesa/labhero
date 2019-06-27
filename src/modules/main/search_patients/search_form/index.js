// LIBRARY
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

// CUSTOM MODULES
import SearchPatientForm from 'shared_components/search_patient_form'

class Search extends React.Component {
	render() {
		const { populatePatients, displayLoading } = this.props;

		return (
			<SearchPatientForm 
				populatePatients={populatePatients}
				displayLoading={displayLoading}
			/>
		);
	}
}

Search.propTypes = {
	populatePatients: PropTypes.func.isRequired,
	displayLoading: PropTypes.func.isRequired
};


export default withRouter(Search);