import React from 'react';
import { Row, Col } from 'antd';

import Navigation from './navigation';
import SummaryActions from './actions';

class SummaryFooter extends React.Component {
  render() {
    return (
      <Row>
        <Col span={16} offset={4}>
          <Row>
            <Col span={12}>
              <SummaryActions />
            </Col>
            <Col span={12}>
              <Navigation />
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default SummaryFooter;