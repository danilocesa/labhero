import React from 'react';
import { Typography } from 'antd';
import PropTypes from 'prop-types';


const { Text } = Typography;

class ProductDetailHeader extends React.Component {
  
  render() {
    const { Data } = this.props
    return (
      <div>
        <div><Text strong style={{ fontSize: 20 }}>{Data.blood_product}</Text></div>
        <div><Text>SOURCE BAG ID: {Data.blood_bag_id}</Text></div>
      </div>
    );
  }
}


ProductDetailHeader.propTypes = {
	Data:PropTypes.object.isRequired
}

export default ProductDetailHeader;