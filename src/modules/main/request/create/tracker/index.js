import React from 'react';
import { Steps, Icon, Row, Col } from 'antd';

import './tracker.css';

const { Step } = Steps;

const items = [
  {
    title: 'Step 1',
    description: 'Search Patient',
    icon: 'search'
  },
  {
    title: 'Step 2',
    description: 'Fill up',
    icon: 'form'
  },
  {
    title: 'Step 3',
    description: 'Select Lab Test',
    icon: 'check-square'
  },
  {
    title: 'Step 4',
    description: 'Summary',
    icon: 'idcard'
  },
  {
    title: 'Step 5',
    description: 'Confirmation',
    icon: 'file-protect'
  }
];

class Tracker extends React.Component {
  render() {
    const StepItems = items.map((item) => (
      <Step 
            // title={item.title}
            title={item.description}
            icon={<Icon type={item.icon} />} />
      // <Step title={item.title} description={item.description} />
    ));

    return (
      <Row>
        <Col sm={{ span: 24 }} md={{ span: 18, offset: 3 }}>
          <Steps size="small"
                 labelPlacement="vertical"
                 current={this.props.active || 0}
                 style={{ marginTop: 20 }}>
            {StepItems}
          </Steps>
        </Col>
      </Row>
    );
  }
} 

export default Tracker;