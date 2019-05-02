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
          <span className="metric-value">{value}</span>
        </div>
        <div>
          <span className="metric-label">{label}</span>
        </div>
      </Card>
    );
  }
}

export default Metrics;