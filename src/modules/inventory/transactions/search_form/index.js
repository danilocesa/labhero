/* eslint-disable react/prop-types */
/* eslint-disable func-names */
// LIBRARY
import React from "react";
import { Form, Button, Row, Col, DatePicker, Select } from "antd";
// CUSTOM MODULES
import { AlphaNumInput } from "shared_components/pattern_input";

import './index.css';


const { RangePicker } = DatePicker;


class SearchForm extends React.Component {
  constructor() {
    super();

    this.formRef = React.createRef();
    this.state = { loading: false };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  handleFocus = () => {

  };

  clearSearch = () => {
    this.formRef.current.resetFields();
  }


  render() {
    const { loading } = this.state;
    // const { itemName,transactionDate,section,tranType } = getFieldsValue();
    // const disabled = !(transactionDate || section || tranType || (itemName && itemName.length > 1));
    const disabled = false;
    const { Option } = Select;

    return (
      <Form 
        ref={this.formRef}
        labelCol={{ span: 24 }}
        onFinish={this.handleSubmit}
        className="inv-trans-search-form"
      >
        <Row gutter={12} justify="center">
          <Col span={5}>
            <Form.Item 
              name="transactionDate"
              label="FROM DATE ~ TO DATE"
              className="no-padding"
            >
              <RangePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item 
              name="section"
              label="SECTION"
              className="no-padding"
            >
              <Select>
                <Option value="SECTION 1">SECTION 1</Option>
                <Option value="SECTION 2">SECTION 2</Option>
                <Option value="SECTION 3">SECTION 3</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item 
              name="itemName"
              label="ITEM"
              className="no-padding"
            >
              <AlphaNumInput
                name="itemName"
                onFocus={this.handleFocus}
                maxLength={20}
              />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item 
              name="tranType"
              label="TRANSACTION TYPE"
              className="no-padding"
            >
              <Select>
                <Option value="TRANSACTION TYPE 1">TRANSACTION TYPE 1</Option>
                <Option value="TRANSACTION TYPE 2">TRANSACTION TYPE 2</Option>
                <Option value="TRANSACTION TYPE 3">TRANSACTION TYPE 3</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <div style={{ marginTop: 32 }}>
              <Button
                shape="round" 
                style={{ width: 120 }}
                onClick={this.clearSearch}
              >
                CLEAR
              </Button>
              <Button
                className="form-button"
                shape="round"
                type="primary"
                htmlType="submit"
                loading={loading}
                style={{ width: 120, marginLeft: 10 }}
                disabled={disabled}
              >
                SEARCH
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default SearchForm;
