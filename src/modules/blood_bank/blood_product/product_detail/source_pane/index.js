import React from 'react';
import { Row, Col, Typography, Card } from 'antd';

import './index.css';

const { Text } = Typography;

class SourcePane extends React.Component {
  render() {
    return (
      <div className="bp-product-detail-source-pane">
        <Text strong>SOURCE INFORMATION</Text>
        <Row gutter={12} style={{ marginTop: 20 }}>
          <Col span={12}>BAG ID:</Col>
          <Col span={12}>1000</Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>DATE EXTRACTED:</Col>
          <Col span={12}>01/21/2021</Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>BEST BEFORE:</Col>
          <Col span={12}>01/21/2021</Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>BLOOD TYPE:</Col>
          <Col span={12}>O POSITIVE</Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>SIZE:</Col>
          <Col span={12}>250 ml</Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>REMARKS:</Col>
          <Col span={12}>Anticoagulant: CPDA</Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>STATUS:</Col>
          <Col span={12}><Text strong>PROCESSED</Text></Col>
        </Row>
      </div>
    );
  }
}

export default SourcePane;