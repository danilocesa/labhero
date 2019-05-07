import React from 'react';
import { Typography, Select } from 'antd';

import './table_header.css';

const { Text } = Typography;
const Option = Select.Option;

class TableHeader extends React.Component {
  render() {
    return(
      <div className="table-title">
        <div className="left">
          <Text strong>SEARCH RESULTS</Text>
          <br />
          <Text>Showing <b>0</b> items out of <b>0</b> results</Text>
        </div>
        <div className="right">
          <Text>Display per page</Text> 
          <Select defaultValue="10" style={{ marginLeft: 5 }}>
            <Option value="10">10</Option>
            <Option value="15">15</Option>
            <Option value="20">20</Option>
          </Select>
        </div>
      </div>
    );
  }
}

export default TableHeader;