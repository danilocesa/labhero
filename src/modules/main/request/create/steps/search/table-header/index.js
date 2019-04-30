import React from 'react';
import { Typography, Input } from 'antd';

import './table-header.css';

const { Text } = Typography;

class TableHeader extends React.Component {
  render() {
    return(
      <div className="table-title">
        <div className="left">
          <Text strong>SEARCH RESULTS</Text>
        </div>
        <div className="right">
          <Text>Display per page</Text>
          <Input value={3}/>
        </div>
      </div>
    );
  }
}

export default TableHeader;