/* eslint-disable react/prop-types */
/* eslint-disable func-names */
// LIBRARY
import React from "react";
import { Form, Button, Row, Col, DatePicker, Select, Input } from "antd";
// CUSTOM MODULES
import ClearFormFields from "shared_components/form_clear_button";
import { fieldRules } from "../settings";

const { RangePicker } = DatePicker;
class SearchPatientForm extends React.Component {
  state = {
    loading: false
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator, getFieldsValue } = form;
    const { loading } = this.state;
    const { patientID, patientName } = getFieldsValue();
    const disabled = !(patientID || (patientName && patientName.length > 1));
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
              {getFieldDecorator("transaction_date", {
                rules: fieldRules.search
              })(<DatePicker style={{ width: "100%" }} />)}
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
              {getFieldDecorator("expiry_date", {
                rules: fieldRules.search
              })(<DatePicker style={{ width: "100%" }} />)}
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="SUPPLIER">
              {getFieldDecorator("supplier", {
                rules: fieldRules.search
              })(<Select />)}
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="STORAGE">
              {getFieldDecorator("storage", {
                rules: fieldRules.section
              })(<Select />)}
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
                >
                  SEARCH
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
