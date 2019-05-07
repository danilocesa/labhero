import React from 'react';
import {
  Form, Input, Button, Row, Col
} from 'antd';

import './searchplebo.css';

const formItemLayout = [
  {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 6 },
    lg: { span: 5 }
  },
  {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 6 },
    lg: { span: 8 }
  },
  {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 6 },
    lg: { span: 5 }
  },
];

class SearchPleboTest extends React.Component {
  render() {
    return (
      <Form>
        <Row gutter={12}>
          <Col {...formItemLayout[0]}>  
            <Form.Item label="PATIENT'S ID">
              <Input />
            </Form.Item>
          </Col>
          <Col {...formItemLayout[1]} style={{ paddingLeft: 15,
                                               width: 500}}>
            <Form.Item label="PATIENT'S FULLNAME">
              <Input />
            </Form.Item>
          </Col>
          <Col {...formItemLayout[2]}>
            <Form.Item style={{ marginTop: 22}}>
              <Row gutter={12}>
                <Col span={12}>
                  <Button block shape="round" style={{ width: 120 }}>
                    CLEAR
                  </Button> 
                </Col>
                <Col span={12}>
                  <Button block shape="round" type="primary" 
                          style={{ width: 120 }}>
                    SEARCH
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default SearchPleboTest;