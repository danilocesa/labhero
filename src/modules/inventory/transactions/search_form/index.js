/* eslint-disable react/prop-types */
/* eslint-disable func-names */
// LIBRARY
import React from "react";
import { Form, Button, Row, Col, DatePicker, Select } from "antd";
// CUSTOM MODULES
import ClearFormFields from "shared_components/form_clear_button";
import { AlphaNumInput } from "shared_components/pattern_input";
import { fieldRules } from "../settings";

const { RangePicker } = DatePicker;
class SearchPatientForm extends React.Component {
  state = {
    loading: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  handleFocus = () => {

    // if (event.target.name === "itemName") setFieldsValue({ patientName: "" });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator, getFieldsValue } = form;
    const { loading } = this.state;
    const { itemName,transactionDate,section,tranType } = getFieldsValue();
    const disabled = !(transactionDate || section || tranType || (itemName && itemName.length > 1));
    console.log(disabled)
    const { Option } = Select;

    return (
      <Form className="search-patient-form" onSubmit={this.handleSubmit}>
        <Row gutter={12} type="flex" justify="center">
          <Col span={4}>
            <Form.Item label="FROM DATE ~ TO DATE">
              {getFieldDecorator("transactionDate", {
                rules: fieldRules.transactions,
              })(<RangePicker style={{ width: "100%" }} />)}
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="SECTION">
              {getFieldDecorator("section", {
                rules: fieldRules.transactions,
              })(
                <Select>
                  <Option value="SECTION 1">SECTION 1</Option>
                  <Option value="SECTION 2">SECTION 2</Option>
                  <Option value="SECTION 3">SECTION 3</Option>
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="ITEM">
              {getFieldDecorator("itemName", {
                rules: fieldRules.transactions
              })(
                <AlphaNumInput
                  name="itemName"
                  onFocus={this.handleFocus}
                  maxLength={20}
                />
              )}
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="TRANSACTION TYPE">
              {getFieldDecorator("tranType", {
                rules: fieldRules.transactions,
              })(
                <Select>
                  <Option value="TRANSACTION TYPE 1">TRANSACTION TYPE 1</Option>
                  <Option value="TRANSACTION TYPE 2">TRANSACTION TYPE 2</Option>
                  <Option value="TRANSACTION TYPE 3">TRANSACTION TYPE 3</Option>
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={6} lg={6}>
            <Form.Item style={{ marginTop: 20 }}>
              <Row>
                <ClearFormFields form={this.props.form} />
                <Button
                  className="form-button"
                  shape="round"
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  style={{ width: 120 }}
                  disabled={disabled}
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
