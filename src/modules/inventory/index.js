import React from "react";
import { Route, Switch } from "react-router-dom";
// import URI from 'global_config/uri';

import Notification from "./notifications";
import InventorySettings from "./settings";
import Restock from "./restock";
import ItemSetup from "./item_setup";
import Transactions from "./transactions";
import Takeout from "./takeout";
import InventoryMenu from "./inventory_menu";

class Inventory extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/inventory" component={InventoryMenu} />
        <Route exact path="/inventory/notification" component={Notification} />
        <Route exact path="/inventory/settings" component={InventorySettings} />
        <Route exact path="/inventory/restock" component={Restock} />
        <Route exact path="/inventory/itemsetup" component={ItemSetup} />
        <Route exact path="/inventory/transactions" component={Transactions} />
        <Route exact path="/inventory/takeout" component={Takeout} />
      </Switch>
    );
  }
}

export default Inventory;
