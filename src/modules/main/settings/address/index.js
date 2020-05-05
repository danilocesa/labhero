// LiBRARY
import React from 'react';
import { Tabs as AntTabs} from 'antd';
// CUSTOM MODULES
import InventoryPageCrumb from 'modules/inventory/settings/shared_components/page_bread_crumb';
import Province from './province'
import City from './city'
import Barangay from './barangay'


//  CONSTANTS
const { TabPane } = AntTabs;
const pageTitleSettings = "SETTINGS /";
const pageTitle = [
  `${pageTitleSettings } PROVINCE`, 
  `${pageTitleSettings } PROVINCE`,
  `${pageTitleSettings } CITY`,
  `${pageTitleSettings } BARANGAY`,
]

class settings extends React.Component {
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
          <TabPane tab='PROVINCE' key="1">
            <Province />
          </TabPane>
          <TabPane tab='CITY' key="2">
            <City />
          </TabPane>
          <TabPane tab='BARANGAY' key="3">
            <Barangay />
          </TabPane>
        </AntTabs>
			</div>
    );
  }
}

export default settings;