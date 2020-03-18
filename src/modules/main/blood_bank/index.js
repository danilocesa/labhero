import React from 'react';
import { Route, Switch } from 'react-router-dom';

import BloodBankMenu from './bloodbank_menu'
import DonorRegistration from './donor_registration'
import BloodRecipient from './blood_recipient'
import BloodRequest from './blood_request';
import SearchDonor from './search_donor';

class BloodBank extends React.Component {
	render() {
		return(
			<Switch>
				<Route exact path="/bloodbank" component={BloodBankMenu} />
                <Route exact path="/bloodbank/donor_registration" component={DonorRegistration} />
                <Route exact path="/bloodbank/blood_recipient" component={BloodRecipient} />
								{/* <Route exact path="/settings/profile-exam" component={ProfileExam} /> */}
								<Route exact path="/bloodbank/blood_request" component={BloodRequest} />
								<Route exact path="/bloodbank/search_donor" component={SearchDonor} />
			</Switch>
		)
	}	
}

export default BloodBank;	