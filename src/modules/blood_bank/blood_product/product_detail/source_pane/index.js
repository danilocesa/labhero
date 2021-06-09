import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Typography } from 'antd';

import './index.css';

const { Text } = Typography;

class SourcePane extends React.Component {
  render() {
    const { Data } = this.props
    return (
      <div className="bp-product-detail-source-pane">
        <Text strong>SOURCE INFORMATION</Text>
        <Row gutter={12} style={{ marginTop: 20 }}>
          <Col span={12}>BAG ID:</Col>
          <Col span={12}>{Data.blood_bag_id}</Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>DATE EXTRACTED:</Col>
          <Col span={12}>{Data.date_extracted}</Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>BEST BEFORE:</Col>
          <Col span={12}>{Data.expiration_date}</Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>BLOOD TYPE:</Col>
          <Col span={12}>{Data.blood_type_name}</Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>LOCATION:</Col>
          <Col span={12}>{Data.storage_name}</Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>STATUS:</Col>
          <Col span={12}><Text strong>{Data.status_name}</Text></Col>
        </Row>
      </div>
    );
  }
}


SourcePane.propTypes = {
	Data:PropTypes.object.isRequired
}


export default SourcePane;