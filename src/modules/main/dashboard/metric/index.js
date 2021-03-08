import React from 'react';
import PropTypes from 'prop-types';
import { Card, Typography, Row, Col } from 'antd';

import './metric.css';

const { Text } = Typography;

class Metrics extends React.Component {
  render() {
    const { image, label, data } = this.props;

    const ItemList = data.map(i => (
      <Row key={i.sectionCode} style={{ marginTop: 5 }}>
        <Col span={20}>
          <Text className="text">{i.sectionName}</Text> 
        </Col>
        <Col span={4}>
          <Text className="text">{i.records}</Text> 
        </Col>
      </Row>
    ));

    return (
      <div className="dashboard-metrics-con">
        <Card >
          <Row>
            <Col span={10} className="image-con">
              {image}
            </Col>
            <Col span={14}>
              <Row>
                <Text strong className="text">{label}</Text>
              </Row>
              {ItemList}
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}

Metrics.propTypes = {
  image: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    sectionName: PropTypes.string,
    records: PropTypes.string
  }))
};

Metrics.defaultProps = {
  data: []
};

export default Metrics;
