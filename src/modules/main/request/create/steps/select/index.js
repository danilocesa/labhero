import React from 'react';
import { Row, Col } from 'antd';

import Tracker from '../../tracker';
import SectionGroup from './section-header';
import TestList from './section-content';
import SelectTable from './table';
import Navigation from './navigation';

const ColLayout = {
  sm: { span: 24 },
  md: { span: 12 },
  lg: { span: 12 }
};

class SelectStep extends React.Component {
  render() {
    return (
      <div>
        <Tracker active={2}/>
        <Row gutter={48} style={{ marginTop: 50 }}>
          <Col {...ColLayout}>
            <SectionGroup />
            <TestList />
          </Col>
          <Col {...ColLayout}>
            <SelectTable />
          </Col>
        </Row>
        <br />
        <Navigation />
      </div>
    );
  }
}

export default SelectStep;