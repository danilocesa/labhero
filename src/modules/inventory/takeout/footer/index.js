import React from "react";
import { Row, Button } from "antd";

class Footer extends React.Component {
  render() {
    return (
      <Row type="flex" justify="end" style={{ marginTop: 10 }}>
        <Button
          className="form-button"
          shape="round"
          type="primary"
          htmlType="submit"
          style={{ width: 200 }}
        >
          PROCESS TRANSACTION
        </Button>
      </Row>
    );
  }
}

export default Footer;
