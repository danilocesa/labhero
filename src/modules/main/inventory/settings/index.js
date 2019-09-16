// LiBRARY
import React from 'react';
import { Tabs as AntTabs} from 'antd';

// CUSTOM MODULES
import InventoryPageCrumb from 'modules/main/inventory/settings/shared_components/page_bread_crumb';
import InventorySupplier from 'modules/main/inventory/settings/supplier';

//  CONSTANTS
const { TabPane } = AntTabs;

class InventorySettings extends React.Component {
	state = { 
    pageTitle: "Inventory/Settings/Suppliers"
  }

  handleTabChange = (event) => {
    console.log("TCL: InventorySettings -> handleTabChange -> event", event)
  }

  render() {
    return ( 
			<div>
        <InventoryPageCrumb pageTitle={this.state.pageTitle} />
        <AntTabs defaultActiveKey="1" onChange={this.handleTabChange}>
          <TabPane tab="SUPPLIERS" key="1">
            <InventorySupplier />
          </TabPane>
          <TabPane tab="STORAGE/LOCATION" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="SECTION" key="3">
            Content of Tab Pane 3
          </TabPane>
          <TabPane tab="CATEGORIES" key="4">
            Content of Tab Pane 4
          </TabPane>
        </AntTabs>
			</div>
    );
  }
}

export default InventorySettings;