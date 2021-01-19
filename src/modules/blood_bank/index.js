import React from 'react';
import { Route, Switch } from 'react-router-dom';

import BloodBankMenu from './bloodbank_menu'
import DonorRegistration from './donor_registration'
import BloodRequest from './blood_request';
import SearchDonor from './search_donor';
import FillUp from './donor_registration/fill_up';
import Extraction from './extraction';
import Information from './extraction/information'
import HealthInformation from './donor_registration/health_info';
import Settings from './settings';

class BloodBank extends React.Component {
	render() {
		return(
			<Switch>
				<Route exact path="/bloodbank/settings" component={Settings} />
				<Route exact path="/bloodbank" component={BloodBankMenu} />
				<Route exact path="/bloodbank/donor_registration/step/2" component={FillUp} />
				<Route exact path="/bloodbank/donor_registration" component={DonorRegistration} />
				<Route exact path="/bloodbank/blood_request" component={BloodRequest} />
				<Route exact path="/bloodbank/search_donor" component={SearchDonor} />
				<Route exact path="/bloodbank/extraction/screening" component={Extraction} />
				<Route exact path="/bloodbank/extraction/screening/step/1" component={Information} />
				<Route exact path="/bloodbank/donor_registration/step/3" component={HealthInformation} />
			</Switch>
		)
	}	
}

export default BloodBank;	