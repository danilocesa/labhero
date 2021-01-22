import React from 'react';
import PageTitle from 'shared_components/page_title';
import { Input, Button, Row, Col, Form } from 'antd';


class ProductList extends React.Component {
  render() {
    return (
      <div>
        <PageTitle pageTitle="BLOOD PRODUCT" />
        <Row 
          justify="center"
          gutter={16}
          style={{ marginTop: 20 }}
        >
          <Col span={6}>
            <Input placeholder="STATUS" />
          </Col>
          <Col>
            <Button
              shape="round"
              style={{ width: 120 }}
            >
                CLEAR
            </Button>
          </Col>
          <Col>
            <Button
              shape="round"
              type="primary"
              style={{ width: 120 }}
            >
                SEARCH
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ProductList;