import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Notification from './notifications'
import InventorySettings from './settings'

class Inventory extends React.Component {
	render() {
		return(
			<Switch>
				<Route exact path="/inventory" component={Notification} />
				{/* Notifications */}
				<Route exact path="/inventory/notifications" component={Notification} />
				{/* Inventory settings */}
				<Route exact path="/inventory/settings" component={InventorySettings} />
			</Switch>
		)
	}
}

export default Inventory;