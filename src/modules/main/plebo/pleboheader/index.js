import React from 'react';
import { Typography, Row, Col, Select } from 'antd';

const { Text } = Typography;
const { Option } = Select;

class PleboHeader extends React.Component {
  render() {
    return(
      <div style={{   marginTop: 25, marginBottom: 10 }}>
        <Row>
          <Col lg={12} md={24} sm={24} xs={24}>
            <Text>Showing <b>0</b> items out of <b>0</b> results</Text>
          </Col>
          <Col 
            lg={12} 
            md={24} 
            sm={24} 
            xs={24} 
            className="gutter-row"
          >
            <Select 
              defaultValue="10" 
              style={{ width: '10%', float: 'right' }} 
              className="gutter-box"
            >
              <Option value="10">10</Option>
              <Option value="20">20</Option>
              <Option value="50">50</Option>
              <Option value="100">100</Option>
            </Select>
            <span 
              className="gutter-box" 
              style={{ float:'right', paddingTop: 5, marginRight: '15px'}}
            > 
              Display per page 
            </span>
          </Col>
        </Row>
      </div>
    );
  }
}

export default PleboHeader;