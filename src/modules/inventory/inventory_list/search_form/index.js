/* eslint-disable jsx-a11y/label-has-for */
import React from "react";
import { Row, Col, Form, Button, Select } from "antd";

const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}

class SearchForm extends React.Component {
  render() {
    return (
      <Row gutter={12} type="flex" justify="center">
        <Col span={12}>
          <Form.Item style={{ marginTop: 40 }}>
            {/* <label style={{ marginRight: 10 }}>ITEM:</label> */}
            <Select
              defaultValue=""
              style={{ width: 230, marginRight: 20 }}
              onChange={handleChange}
            >
              <Option value="ITEM 1">ITEM 1</Option>
              <Option value="ITEM 2">ITEM 2</Option>
            </Select>
            <Button
              className="form-button"
              block
              shape="round"
              style={{ width: 120 }}
              onClick={() => {
                // eslint-disable-next-line react/prop-types
                this.props.form.resetFields();
              }}
            >
              CLEAR
            </Button>
            <Button
              className="form-button"
              block
              shape="round"
              type="primary"
              htmlType="submit"
              style={{ width: 120, marginLeft: 10 }}
            >
              SEARCH
            </Button>
          </Form.Item>
        </Col>
      </Row>
    );
  }
}

export default SearchForm;
