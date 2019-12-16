import React from 'react';

import StepPage from '../steps';

import './create.css';

class CreateRequestPage extends React.Component {
	render() {
		return (
			<div>
				<StepPage requestType='create' moduleProfile="createRequest" />
			</div>
		);
	}
}

export default CreateRequestPage;
