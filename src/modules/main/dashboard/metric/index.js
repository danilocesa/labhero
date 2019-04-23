import React from 'react';
import { Card } from 'antd';

import './metric.css';

class Metrics extends React.Component {
  render() {
    const { image, value, label } = this.props;

    return (
      <Card className="metrics">
        <img src={image} alt="metrics icon" />
        <div>
          <text className="metric-value">{value}</text>
        </div>
        <div>
          <text className="metric-label">{label}</text>
        </div>
      </Card>
    );
  }
}

export default Metrics;