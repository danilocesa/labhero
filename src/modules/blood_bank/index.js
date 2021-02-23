import React from 'react';
import { Route, Switch } from 'react-router-dom';

import BloodBankMenu from './bloodbank_menu';
import DonorRegSearch from './donor_registration/search';
import DonorRegHeathInfo from './donor_registration/health_info';
import SearchDonor from './search_donor';
import DonorRegFillUp from './donor_registration/fill_up';
import ExtractionSearch from './extraction/search';
import ExtractionDetail from './extraction/details';
import Settings from './settings';
import BloodInventory from './blood_inventory/search';
import BloodInventory1 from './blood_inventory';
import Printing from './blood_request/printing';
import SearchRequest from './blood_request/search';
import CreateRequest from './blood_request/creation';
import ProductList from './blood_product/product_list';
import ProductDetail from './blood_product/product_detail';

class BloodBank extends React.Component {
	render() {
		return(
			<Switch>
				<Route exact path="/bloodbank/settings" component={Settings} />
				<Route exact path="/bloodbank" component={BloodBankMenu} />
				<Route exact path="/bloodbank/donor_registration/step/1" component={DonorRegSearch} />
				<Route exact path="/bloodbank/donor_registration/step/2" component={DonorRegFillUp} />
				<Route exact path="/bloodbank/donor_registration/step/3" component={DonorRegHeathInfo} />
				<Route exact path="/bloodbank/blood_request/search" component={SearchRequest} />
				<Route exact path="/bloodbank/blood_request/create" component={CreateRequest} />
				<Route exact path="/bloodbank/search_donor" component={SearchDonor} />
				<Route exact path="/bloodbank/extraction/search" component={ExtractionSearch} />
				<Route exact path="/bloodbank/extraction/details" component={ExtractionDetail} />
				<Route exact path="/bloodbank/blood_inventory/search" component={BloodInventory} />
				<Route exact path="/bloodbank/PRINTING" component={Printing} />
				<Route exact path="/bloodbank/blood_product" component={ProductList} />
				<Route exact path="/bloodbank/blood_product/detail" component={ProductDetail} />
				<Route exact path="/bloodbank/blood_inventory" component={BloodInventory1} />
			</Switch> 
		)
	}	
}

export default BloodBank;	