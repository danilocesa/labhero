import React from 'react';

// CUSTOM MODULES
import PageTitle from 'shared_components/page_title';
import RecipientForm from './registration';

class BloodRequest extends React.Component{
	render(){
		return(
			<div>
				<PageTitle pageTitle="BLOOD REQUEST" />
				<RecipientForm />
			</div>
		);
	}
}

export default BloodRequest;