import React from 'react';
import PropTypes from 'prop-types';
import SearchPatientForm from 'shared_components/search_patient_form';

import { CLR_SEARCHED_NAME, CLR_SEARCHED_ID } from '../../constants';

class SearchForm extends React.Component {
	state = {
		patientId: '',
		patientName: ''
	};
	
	handleInputChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	handleSubmit = async (event) => {
		event.preventDefault();
		const { patientName } = this.state;
		const { populatePatients } = this.props;

		try {
			// const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6InJvb3QiLCJleHAiOjE1NTc4MjEzMjIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDQzODciLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjQ0Mzg3In0.fbIB7Kxc087zQfkD-Hgln__Plr3VwPrEHo1lQCAWlgY`;
			const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
			const url = `----------lab/Patient/name/${patientName}`;
			const headers = { 'Content-Type': `application/json` };
			const response = await LabApi.get(PROXY_URL + url);
			const data = await response;

			console.log(data);
			populatePatients(data);
		}
		catch(error) {
			console.log(error);
			message.error(`Something went wrong, Please try again.`);
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