// LiBRARY
import React from 'react';
import { Tabs as AntTabs} from 'antd';

// CUSTOM MODULES

//  CONSTANTS
const { TabPane } = AntTabs;

class Phlebo extends React.Component {
	state = { }

  render() {
    return ( 
			<div>
        <AntTabs defaultActiveKey="1">
          <TabPane tab="Tab 1" key="1">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            Content of Tab Pane 3
          </TabPane>
        </AntTabs>
			</div>
    );
  }
}

export default Phlebo;