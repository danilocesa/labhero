// LIBRARY
import React from 'react';

// CUSTOM
import StepPage from '../steps';

class EditRequestPage extends React.Component {
	render() {
		return (
			<div>
				<StepPage requestType='edit' moduleProfile="editRequest" />
			</div>
		);
	}
}

export default EditRequestPage;
