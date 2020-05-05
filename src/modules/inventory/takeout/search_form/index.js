/* eslint-disable no-unused-vars */
// @ts-nocheck
/* eslint-disable react/prop-types */
/* eslint-disable func-names */
// LIBRARY
import React from "react";
import { Form, Button, Row, Col, DatePicker, Select, Input, Icon } from "antd";
// CUSTOM MODULES
import ClearFormFields from "shared_components/form_clear_button";
import { addTakeout } from "modules/inventory/settings/settings";
import { fieldRules } from "../settings";

const { RangePicker } = DatePicker;

const OPTIONS = ["Apples", "Nails", "Bananas", "Helicopters"];

class SearchPatientForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      value: undefined,
      data: []
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  onChange = value => {
    console.log(value);
    this.setState({ value });
  };

  handleAdd = () => {
    const { count, data } = this.state;
    const newData = {
      lot_code: "100",
      item: "Potassium",
      quantity: "Description",
      amount: "P500.00",
      expiry_date: "04/04/2020",
      storage: "Storage 1",
      supplier: "supplier 1"
    };
    this.setState({
      data: [...data, newData],
      count: count + 1
    });
    console.log(newData);
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator, getFieldsValue } = form;
    const { loading } = this.state;
    const { patientID, patientName } = getFieldsValue();
    const disabled = !(patientID || (patientName && patientName.length > 1));
    const { Option } = Select;
    const categoryData = ["Category1", "Category2", "Caegory3"];

    return (
      <Form className="search-patient-form" onSubmit={this.handleSubmit}>
        <Row gutter={12} type="flex" justify="center">
          <Col span={4}>
            <Form.Item label="TRANSACTION NO.">
              {getFieldDecorator("transaction_no", {
                rules: fieldRules.search
              })(<Input />)}
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="TRANSACTION DATE">
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="LOT CODE">
              {getFieldDecorator("lot_code", {
                rules: fieldRules.search
              })(<Input />)}
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="ITEM">
              {getFieldDecorator("item", {
                rules: fieldRules.search
              })(<Input />)}
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="QUANTITY">
              {getFieldDecorator("quantity", {
                rules: fieldRules.search
              })(<Input />)}
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="AMOUNT">
              {getFieldDecorator("amount", {
                rules: fieldRules.search
              })(<Input />)}
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="EXPIRY DATE">
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="SUPPLIER">
              {getFieldDecorator("supplier", {
                rules: fieldRules.search
              })(
                <Select>
                  <Option value="SUPPLIER 1">SUPPLIER 1</Option>
                  <Option value="SUPPLIER 2">SUPPLIER 2</Option>
                  <Option value="SUPPLIER 3">SUPPLIER 3</Option>
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="STORAGE">
              {getFieldDecorator("storage", {
                rules: fieldRules.section
              })(
                <Select>
                  <Option value="STORAGE 1">STORAGE 1</Option>
                  <Option value="STORAGE 2">STORAGE 2</Option>
                  <Option value="STORAGE 3">STORAGE 3</Option>
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item style={{ marginTop: 20, float: "right" }}>
              <Row>
                <ClearFormFields form={this.props.form} />
                <Button
                  className="form-button"
                  shape="round"
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  style={{ width: 120 }}
                  disabled
                >
                  VOID
                </Button>
                <Button
                  type="primary"
                  shape="round"
                  style={{ marginRight: "15px" }}
                  onClick={this.handleAdd}
                >
                  <Icon />
                  {addTakeout}
                </Button>
              </Row>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
}
export default Form.create()(SearchPatientForm);
