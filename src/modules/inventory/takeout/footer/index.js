import React from "react";
import { Row, Button, Col } from "antd";

class Footer extends React.Component {
  render() {
    return (
      <Row style={{ marginTop: 10 }}>
        <Col span={8}>
          <h1 style={{ float: "right" }}>
            TOTAL QUANTITY: <br /> 100
          </h1>
        </Col>
        <Col span={8}>
          <h1 style={{ float: "right" }}>
            TOTAL AMOUNT: <br /> 10,000
          </h1>
        </Col>
        <Col span={8}>
          <Button
            className="form-button"
            shape="round"
            type="primary"
            htmlType="submit"
            style={{ fontSize: 12, float: "right" }}
          >
            PROCESS TRANSACTION
          </Button>
        </Col>
      </Row>
    );
  }
}

export default Footer;
