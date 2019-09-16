import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Notification from './notifications'
import InventorySupplier from './settings/supplier'

class Inventory extends React.Component {
	render() {
		return(
			<Switch>
				{/* Notifications */}
				<Route exact path="/inventory/notifications" component={Notification} />
				{/* Inventory settings */}
				<Route exact path="/inventory/settings/supplier" component={InventorySupplier} />
			</Switch>
		)
	}
}

export default Inventory;