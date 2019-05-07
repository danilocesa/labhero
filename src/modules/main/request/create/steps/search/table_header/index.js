import React from 'react';
import { Typography, Select } from 'antd';

import './table_header.css';

const { Text } = Typography;
const Option = Select.Option;

class TableHeader extends React.Component {
  render() {
    return(
      <div className="table-title">
        <div>
          <Text strong>SEARCH RESULTS</Text> 
        </div>
        <div>
          <div className="left">
            <Text>Showing 0 items out of 0 results</Text>
          </div>
          <div className="right">
            <Text>Display per page</Text> 
            <Select size="small" defaultValue="10" style={{ marginLeft: 10 }}>
              <Option value="10">10</Option>
              <Option value="15">15</Option>
              <Option value="20">20</Option>
            </Select>
          </div>
        </div>
      </div>
    );
  }
}

export default TableHeader;