import React from 'react';
import { Row, Col, Typography, Card } from 'antd';

import './section.css';

const { Text } = Typography;

class SummarySection extends React.Component {
  render() {
    return (
      <div className="request-summary">
        <Card title="Patient Information" style={{ height: 360 }}>
          <Row gutter={12}>
            <Col span={8}>
              <Text strong>NAME:</Text>
            </Col>
            <Col span={16}>
              <Text>Dante A. Gulapa</Text>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={8}>
              <Text strong>DATE OF BIRTH:</Text>
            </Col>
            <Col span={16}>
              <Text>05/01/1978 - 41 y/o</Text>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={8}>
              <Text strong>GENDER:</Text>
            </Col>
            <Col span={16}>
              <Text>MALE</Text>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={8}>
              <Text strong>CASE NO:</Text>
            </Col>
            <Col span={16}>
              <Text>123456</Text>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={8}>
              <Text strong>PHYSICIAN ID:</Text>
            </Col>
            <Col span={16}>
              <Text>123456</Text>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={8}>
              <Text strong>WARD:</Text>
            </Col>
            <Col span={16}>
              <Text>----</Text>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={8}>
              <Text strong>CLASS:</Text>
            </Col>
            <Col span={16}>
              <Text>----</Text>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={8}>
              <Text strong>Comment:</Text>
            </Col>
            <Col span={16}>
              <Text>This is a sample comment from a person named John Doe.</Text>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={8}>
              <Text strong>AMOUNT:</Text>
            </Col>
            <Col span={16}>
              <Text>P12,000.00</Text>
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}

export default SummarySection;
