import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';

import './form.css';

const formItemLayout = [
  {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 6 },
    lg: { span: 5 },
  },
  {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 6 },
    lg: { span: 8 },
  },
  {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 6 },
    lg: { span: 5 },
  },
];

// eslint-disable-next-line react/prefer-stateless-function
class SearchForm extends React.Component {
  state = {
    patientId: '',
    patientName: ''
  };
  
  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  clearInputs = () => {
    this.setState({
      patientId: '',
      patientName: ''
    });
  }

  render() {
    const { patientId, patientName } = this.state;
    const disabled = !(patientId || patientName);

    return (
      <Form onSubmit={this.handleSubmit}>
        <Row gutter={12}>
          <Col {...formItemLayout[0]} offset={3}>
            <Form.Item label="PATIENT'S ID">
              <Input 
                name="patientId" 
                value={patientId} 
                onChange={this.handleInputChange}
                allowClear
              />
            </Form.Item>
          </Col>
          <Col {...formItemLayout[1]}>
            <Form.Item label="PATIENT'S FULLNAME">
              <Input 
                name="patientName" 
                value={patientName} 
                onChange={this.handleInputChange} 
                allowClear
              />
            </Form.Item>
          </Col>
          <Col {...formItemLayout[2]}>
            <Form.Item style={{ marginTop: 22 }}>
              <Row gutter={12}>
                <Col span={12}>
                  <Button block shape="round" onClick={this.clearInputs}>
                    CLEAR
                  </Button>
                </Col>
                <Col span={12}>
                  <Button block shape="round" type="primary" htmlType="submit" disabled={disabled}>
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

export default SearchForm;
