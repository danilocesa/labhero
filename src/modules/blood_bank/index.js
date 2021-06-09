import React from 'react';
import { Route, Switch } from 'react-router-dom';
import BloodBankMenu from './bloodbank_menu';
import DonorRegSearch from './donor_registration/SearchPage';
import DonorRegFingerPrint from './donor_registration/FingerPrintRegPage';
import DonorRegHeathInfo from './donor_registration/HealthInfoPage';
import DonorRegFillUp from './donor_registration/FillupPage';
import ExtractionSearch from './extraction/search';
import ScreeningSearch from './screening/search';
import ScreeningDetail from './screening/details'
import ExtractionDetail from './extraction/details';
import Settings from './settings';
import BloodInventory from './blood_inventory/search';
import BloodInvDashboard from './blood_inventory/dashboard';
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
				{/* MENU */}
				<Route exact path="/bloodbank" component={BloodBankMenu} />
				{/* SETTINGS */}
				<Route exact path="/bloodbank/settings" component={Settings} />
				{/* DONOR REGISTRATION */}
				<Route exact path="/bloodbank/donor_registration/step/1" component={DonorRegSearch} />
				<Route exact path="/bloodbank/donor_registration/step/2" component={DonorRegFillUp} />
				<Route exact path="/bloodbank/donor_registration/step/3" component={DonorRegFingerPrint} />
				<Route exact path="/bloodbank/donor_registration/step/4" component={DonorRegHeathInfo} />
				{/* BLOOD REQUEST */}
				<Route exact path="/bloodbank/blood_request/search" component={SearchRequest} />
				<Route exact path="/bloodbank/blood_request/create" component={CreateRequest} />
				{/* EXTRATION */}
				<Route exact path="/bloodbank/extraction/search" component={ExtractionSearch} />
				<Route exact path="/bloodbank/extraction/details" component={ExtractionDetail} />
				{/* SCREENING */}
				<Route exact path="/bloodbank/screening/search" component={ScreeningSearch} />
				<Route exact path="/bloodbank/screening/details" component={ScreeningDetail} />
				{/* BLOOD INVENTORY */}
				<Route exact path="/bloodbank/blood_inventory/dashboard" component={BloodInvDashboard} />
				<Route exact path="/bloodbank/blood_inventory/search" component={BloodInventory} />
				<Route exact path="/bloodbank/blood_inventory" component={BloodInventory1} />
				{/* BLOOD PRODUCT */}
				<Route exact path="/bloodbank/blood_product" component={ProductList} />
				<Route exact path="/bloodbank/blood_product/detail" component={ProductDetail} />
				<Route exact path="/bloodbank/PRINTING" component={Printing} />
			</Switch> 
		)
	}	
}

export default BloodBank;	