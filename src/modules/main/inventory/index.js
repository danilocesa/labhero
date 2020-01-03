import React from 'react';
import { Route, Switch } from 'react-router-dom';
import URI from 'shared_components/uri';

import Notification from './notifications';
import InventorySettings from './settings';
import Restock from './restock';
import ItemSetup from './item_setup';
import Transactions from './transactions';
import Takeout from './takeout';

class Inventory extends React.Component {
	render() {
		return(
			<Switch>
				<Route exact path={URI.inventory.sub.notifications.link} component={Notification} />
				<Route exact path={URI.inventory.sub.settings.link} component={InventorySettings} />
				<Route exact path={URI.inventory.sub.restock.link} component={Restock} />
				<Route exact path={URI.inventory.sub.itemsetup.link} component={ItemSetup} />
				<Route exact path={URI.inventory.sub.transaction.link} component={Transactions} />
				<Route exact path={URI.inventory.sub.takeout.link} component={Takeout} />
			</Switch>
		)
	}
}

export default Inventory;