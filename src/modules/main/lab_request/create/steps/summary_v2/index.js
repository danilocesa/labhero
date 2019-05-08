import React from 'react';
import { Row, Col, Typography } from 'antd';

import Tracker from '../../tracker';
import SummarySection from './section';
import SummaryTable from './table';
import SummaryFooter from './footer';

const { Text } = Typography;

class SummaryStep2 extends React.Component {
  render() {
    return (
      <div>
        <Tracker active={3} />
        <div style={{ textAlign: 'center', marginTop: 50 }}>
          <Text strong style={{ fontSize: 18 }}>
            REQUEST SUMMARY
          </Text>
        </div>
        <Row style={{ marginTop: 20 }} gutter={48}>
          <Col sm={24} md={12} lg={12}>
            <SummarySection />
          </Col>
          <Col sm={24} md={12} lg={12}>
            <SummaryTable />
          </Col>
        </Row>
        <br />
        <SummaryFooter />
      </div>
    );
  }
}

export default SummaryStep2;
