// LiBRARY
import React from 'react';
import { Tabs as AntTabs} from 'antd';

// CUSTOM MODULES
import InventoryPageCrumb from 'modules/main/inventory/settings/shared_components/page_bread_crumb';
import InventorySupplier from 'modules/main/inventory/settings/supplier';
import InventoryStorage from 'modules/main/inventory/settings/storage';
import InventorySection from 'modules/main/inventory/settings/sections';

//  CONSTANTS
const { TabPane } = AntTabs;
const pageTitleSettings = "INVENTORY / SETTINGS /";
const pageTitle = [
  `${pageTitleSettings } SUPPLIERS`,
  `${pageTitleSettings } SUPPLIERS`, 
  `${pageTitleSettings } STORAGE`,
  `${pageTitleSettings } SECTION`,
  `${pageTitleSettings } CATEGORIES`
]

class InventorySettings extends React.Component {
	state = { 
    pageTitle: pageTitle[0]
  }

  handleTabChange = (key) => {
    this.setState({ pageTitle: pageTitle[key] })
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
            <InventoryStorage />
          </TabPane>
          <TabPane tab="SECTION" key="3">
            <InventorySection />
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