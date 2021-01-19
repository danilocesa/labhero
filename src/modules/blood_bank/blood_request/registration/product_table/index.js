import React from 'react';
import { List, Row, Col, Select, Button, InputNumber, Form, Typography } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

const { Text } = Typography;

class ProductTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = { selectedProducts: [] }
  }

  onSubmit = () => {
    const { form } = this.props;
    const { selectedProducts } = this.state;
    const { product, qty } = form.current.getFieldsValue();
    const clonedProducts = [...selectedProducts, { product, qty }];

    form.current
    .validateFields(['product', 'qty'])
    .then(values => this.setState({ selectedProducts: clonedProducts }));
  }

  render() {
    const { selectedProducts } = this.state;

    return (
      <div>
        <Row gutter={8}>
          <Col span={16}>
            <Form.Item 
              name="product"
              label="PRODUCT"
              rules={[{ required: true }]}
            >
              <Select style={{ width: '100%' }}>
                <Select.Option value="CBC">CBC</Select.Option>
                <Select.Option value="PLASMA">PLASMA</Select.Option>
                <Select.Option value="PLT">PLT</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item 
              name="qty"
              label="QTY"
              rules={[{ required: true }]}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
        <div style={{ marginTop: 15 }}>
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
            <List.Item actions={[<CloseOutlined />]} >
              {item.qty} x {item.product}
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default ProductTable;