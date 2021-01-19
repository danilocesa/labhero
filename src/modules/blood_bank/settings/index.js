// LiBRARY
import React from 'react';
import { Tabs as AntTabs} from 'antd';
// CUSTOM MODULES
import InventoryPageCrumb from 'modules/inventory/settings/shared_components/page_bread_crumb';
import BloocBankCategories from './categories'
import Questionnaire from './questionnaire'
import BloodGroup from './blood_group'
import QuestionType from './question_types'
import Normal_Values from './normal_values'

//  CONSTANTS
const { TabPane } = AntTabs;
const pageTitleSettings = "BLOODBANK /";
const pageTitle = [
  `${pageTitleSettings } CATEGORIES`, 
  `${pageTitleSettings } CATEGORIES`,
  `${pageTitleSettings } QUESTIONNAIRE`,
  `${pageTitleSettings } BLOOD GROUP`,
  `${pageTitleSettings } QUESTION TYPES`,
  `${pageTitleSettings } NORMAL VALUES`,
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
          <TabPane tab="CATEGORIES" key="1">
            <BloocBankCategories />
          </TabPane>
          <TabPane tab="QUESTIONNAIRE" key="2">
            <Questionnaire />
          </TabPane>
          <TabPane tab="BLOOD GROUP" key="3">
            <BloodGroup />
          </TabPane>
          <TabPane tab="QUESTION TYPES" key="4">
            <QuestionType />
          </TabPane>
          <TabPane tab="NORMAL VALUES" key="5">
            <Normal_Values />
          </TabPane>
        </AntTabs>
			</div>
    );
  }
}

export default settings;