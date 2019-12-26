import React from 'react';

import StepPage from '../steps';

import './create.css';

class CreateRequestPage extends React.Component {

	// componentDidMount(){
	// 	sessionStorage.setItem('REQUEST_TYPE', 'create'); // Set request type session
	// 	sessionStorage.setItem('MODULE_PROFILE', 'createRequest'); // Set module profile session 
	// }

	render() {
		return (
			<div>
				<StepPage requestType='create' moduleProfile="createRequest" />
			</div>
		);
	}
}

export default CreateRequestPage;
