import React from 'react';
import CircularColor from 'react-circular-color';
import { Row, Col, Input, Typography, Divider } from 'antd';

const { Title } = Typography;

class ConfigSection extends React.Component {
  render () {
    return (
      <div style={{ marginTop: 30 }}>
        <Title level={4}>Installation</Title>
        <Divider />
        <Row> 
          <Col sm={24} md={12} lg={12}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontWeight: 'bold' }}>
                App Name
              </p>
              <Input style={{ width: 200 }} />
            </div>
          </Col>
          <Col sm={24} md={12} lg={12}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontWeight: 'bold' }}>
                Base Themere Color
              </p>
              <div className="installation-color-picker">
                <CircularColor size={120} />
              </div>
            </div>
          </Col>
        </Row> 
      </div>
    );
  }
}

export default ConfigSection;