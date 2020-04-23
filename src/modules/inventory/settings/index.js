// LiBRARY
import React from 'react';
import { Tabs as AntTabs} from 'antd';

// CUSTOM MODULES
import InventoryPageCrumb from 'modules/inventory/settings/shared_components/page_bread_crumb';
import InventorySupplier from 'modules/inventory/settings/supplier';
import InventoryStorage from 'modules/inventory/settings/storage';
import InventorySection from 'modules/inventory/settings/sections';
import InventoryCategories from 'modules/inventory/settings/categories';
import InventoryTransactionTypes from  'modules/inventory/settings/transaction_types';
import InventoryUnitofMeasure from  'modules/inventory/settings/unit_measure';
import InventoryItems from 'modules/inventory/settings/items';

//  CONSTANTS
const { TabPane } = AntTabs;
const pageTitleSettings = "INVENTORY / SETTINGS /";
const pageTitle = [
  `${pageTitleSettings } SUPPLIERS`,
  `${pageTitleSettings } SUPPLIERS`, 
  `${pageTitleSettings } STORAGES`,
  `${pageTitleSettings } SECTIONS`,
  `${pageTitleSettings } CATEGORIES`,
  `${pageTitleSettings } TRANSACTION TYPES`,
  `${pageTitleSettings } UNIT OF MEASURES`,
  `${pageTitleSettings } ITEMS`
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
          <TabPane tab="STORAGES/LOCATIONS" key="2">
            <InventoryStorage />
          </TabPane>
          <TabPane tab="SECTIONS" key="3">
            <InventorySection />
          </TabPane>
          <TabPane tab="CATEGORIES" key="4">
            <InventoryCategories />
          </TabPane>
          <TabPane tab="TRANSACTION TYPES" key="5">
            <InventoryTransactionTypes />
          </TabPane>
          <TabPane tab="UNIT OF MEASURES" key="6">
            <InventoryUnitofMeasure />
          </TabPane>
          <TabPane tab="ITEMS" key="7">
            <InventoryItems />
          </TabPane>
        </AntTabs>
			</div>
    );
  }
}

export default InventorySettings;