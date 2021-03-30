// LiBRARY
import React from 'react';
import { Tabs as AntTabs} from 'antd';
// CUSTOM MODULES
import InventoryPageCrumb from 'modules/inventory/settings/shared_components/page_bread_crumb';
import BloocBankCategories from './categories'
import Questionnaire from './questionnaire'
import BloodGroup from './blood_group'
import BloodTypes from './blood_types'
import Storage from './storage'
import NormalValues from './normal_values'

//  CONSTANTS
const { TabPane } = AntTabs;
const pageTitleSettings = "BLOODBANK /";
const pageTitle = [
  `${pageTitleSettings } BLOOD GROUP`, 
  `${pageTitleSettings } BLOOD GROUP`,
  `${pageTitleSettings } BLOOD TYPES`,
  `${pageTitleSettings } QUESTIONNAIRE`,
  `${pageTitleSettings } STORAGE`,
  `${pageTitleSettings } BLOOD TYPES`,
  `${pageTitleSettings } BLOOD TYPES`,
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
          <TabPane tab="BLOOD GROUP" key="1">
            <BloodGroup />
          </TabPane>
          <TabPane tab="BLOOD TYPES" key="2">
            {/* <BloodTypes /> */}
          </TabPane>
          <TabPane tab="CATEGORIES" key="3">
            <BloocBankCategories />
          </TabPane>
          <TabPane tab="QUESTIONNAIRE" key="4">
            <Questionnaire />
          </TabPane>
          <TabPane tab="STORAGE" key="5">
            <Storage />
          </TabPane>
          <TabPane tab="BLOOD TYPE" key="6">
            <Storage />
          </TabPane>
          <TabPane tab="NORMAL VALUES" key="7">
            <NormalValues />
          </TabPane>
        </AntTabs>
			</div>
    );
  }
}

export default settings;