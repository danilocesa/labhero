import React from 'react';
import { Typography } from 'antd';

const { Text } = Typography;

const DashboardHeader = (props) => (
  <div style={{ fontSize: 16 }}>
    <Text strong>Welcome {props.user || 'Guest'}, </Text>
    <Text>here are the analytics overview.</Text>
  </div>
);

export default DashboardHeader;