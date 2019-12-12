import React from 'react';

import StepPage from '../steps';

import './create.css';



class CreateRequestPage extends React.Component {
	render() {
		return (
			<div>
				<StepPage requestType={1} moduleProfile="createRequest" />
			</div>
		);
	}
}

export default CreateRequestPage;
