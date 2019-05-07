import React from 'react';
import { Form, Input, Row, Col, Typography, DatePicker, Radio, Divider } from 'antd';

import './form.css';

const { Text } = Typography;
const { TextArea } = Input;

class FillupForm extends React.Component {
  render() {
    return (
      <div style={{ marginTop: 50 }}>
        <Form>
          <Row gutter={12}>
            <Col sm={{ span: 12 }} md={{ span: 11 }}>
              <div className="left-form">
                <div style={{ padding: '10px 0px' }}>
                  <Text strong>PERSONAL INFORMATION</Text>
                </div>
                <Form.Item label="CASE NO.">
                  <Input />
                </Form.Item>
                <Form.Item label="LAST NAME">
                  <Input name="lastname" onChange={this.props.onChangeInput} />
                </Form.Item>
                <Form.Item label="FIRST NAME">
                  <Input name="firstname" onChange={this.props.onChangeInput} />
                </Form.Item>
                <Form.Item label="MIDDLE NAME">
                  <Input />
                </Form.Item>
                <Row gutter={12}>
                  <Col span={18}>
                    <Form.Item label="DATE OF BIRTH">
                      <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item label="AGE">
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item label="PATIENT'S GENDER">
                  <Radio.Group defaultValue="a" buttonStyle="solid">
                    <Radio.Button value="M">MALE</Radio.Button>
                    <Radio.Button value="F">FEMALE</Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </div>
            </Col>
            <Col md={{ span: 2 }} style={{ textAlign: 'center' }}>
              <Divider className="divider" type="vertical" style={{ height: 420 }} />
            </Col>
            <Col sm={{ span: 12 }} md={{ span: 11 }}>
              <div className="right-form">
                <div style={{ padding: '10px 0px' }}>
                  <Text strong>OTHER INFORMATION</Text>
                </div>
                <Form.Item label="WARD">
                  <Input />
                </Form.Item>
                <Form.Item label="PHYSICIAN ID">
                  <Input />
                </Form.Item>
                <Form.Item label="CLASS">
                  <Input />
                </Form.Item>
                <Form.Item label="COMMENT">
                  <TextArea rows={3} />
                </Form.Item>
                <Row>
                  <Col span={8}>
                    <Form.Item label="AMOUNT">
                      <Input size="large" value="0.00" style={{ textAlign: 'center' }} />
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default FillupForm;
