import React from 'react';
import { Typography } from 'antd';

const { Text } = Typography;

class ProductDetailHeader extends React.Component {
  render() {
    return (
      <div>
        <div><Text strong style={{ fontSize: 20 }}>WHOLE BLOOD</Text></div>
        <div><Text>SOURCE BAG ID 10000</Text></div>
      </div>
    );
  }
}

export default ProductDetailHeader;