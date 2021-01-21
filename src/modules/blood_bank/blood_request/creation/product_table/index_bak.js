import React from 'react';
import { List, Row, Col, Select, Button, InputNumber, Typography } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import './index.css';

const { Text } = Typography;

class ProductTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      product: null,
      qty: null,
      selectedProducts: [] 
    }
  }

  onChangeProduct = (value) => {
    this.setState({ product: value });
  }

  onChangeQty = (value) => {
    this.setState({ qty: value });
  }

  onSubmit = () => {
    const { product, qty, selectedProducts } = this.state;

    const clonedProducts = [...selectedProducts, { product, qty }];

    this.setState({ selectedProducts: clonedProducts });
  }

  render() {
    const { product, qty, selectedProducts } = this.state;

    return (
      <div className="blood-req-product-table">
        <Row gutter={8}>
          <Col span={16}>
            <div className="custom-form-label">
              <Text>PRODUCT</Text>
            </div>
            <Select 
              value={product}
              onChange={this.onChangeProduct}
              style={{ width: '100%' }}
              className="red-border"
            >
              <Select.Option value="CBC">CBC</Select.Option>
            </Select>
          </Col>
          <Col span={8}>
            <div className="custom-form-label">
              <Text style={{ marginBottom: 5 }}>QTY</Text>
            </div>
            <InputNumber 
              value={qty}
              onChange={this.onChangeQty}
              style={{ width: '100%' }} 
            />
          </Col>
        </Row>
        <div style={{ marginTop: 25 }}>
          <Button 
            type="default" 
            shape="round"
            block 
            onClick={this.onSubmit}
          >
            ADD PRODUCT
          </Button>
        </div>
        <List
          style={{ marginTop: 30 }}
          header={<Text strong>SELECTED PRODUCTS</Text>}
          dataSource={selectedProducts}
          renderItem={item => (
            <List.Item
              actions={[<CloseOutlined />]}
            >
              {item.product} - {item.qty}
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default ProductTable;