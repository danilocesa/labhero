import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Notification from './notifications';
import InventorySettings from './settings';
import Restock from './restock';

class Inventory extends React.Component {
	render() {
		return(
			<Switch>
				<Route exact path="/inventory" component={Notification} />
				<Route exact path="/inventory/notifications" component={Notification} />
				<Route exact path="/inventory/settings" component={InventorySettings} />
				<Route exact path="/inventory/restock" component={Restock} />
			</Switch>
		)
	}
}

export default Inventory;