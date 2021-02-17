import React from 'react';
import { List, Row, Col, Select, Button, InputNumber, Form, Typography } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

const { Text } = Typography;

class ProductTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      isProductEmpty: true,
      isQtyEmpty: true,
      productList: ['CBC', 'PLASMA', 'PLT'],
      selectedProducts: [] 
    }
  }

  
  getSelectedProducts = () => {
    return this.state.selectedProducts;
  }

  onChangeProduct = (value) => {
    this.setState({ isProductEmpty: value === null });
  }
  
  onChangeQty= (value) => {
    this.setState({ isQtyEmpty: value === null });
  }

  onSubmit = () => {
    const { form } = this.props;

    form.current
    .validateFields(['product', 'qty'])
    .then(values => {
      const { selectedProducts, productList } = this.state;
      const { product, qty } = values;
      const clonedSelected = [...selectedProducts, { product, qty }];
      const filteredProducts = productList.filter(iproduct => product !== iproduct);

      this.setState({ 
        selectedProducts: clonedSelected,
        productList: filteredProducts,
        isProductEmpty: true,
        isQtyEmpty: true
      });

      form.current.setFieldsValue({ product: null, qty: null });
    });
  }

  onRemove = (itemDetail, itemIndex) => {
    const { selectedProducts, productList } = this.state;

    const filteredProducts = selectedProducts.filter((item, index) => index !== itemIndex);
    const newProductList = [...productList, itemDetail.product];

    this.setState({ 
      selectedProducts: filteredProducts,
      productList: newProductList
    });
  }

  render() {
    const { selectedProducts, productList, isProductEmpty, isQtyEmpty } = this.state;
    const isRequired = (selectedProducts.length === 0);
    const Options = productList.map(product => (
      <Select.Option value={product} key={product}>
        {product}
      </Select.Option>
    ));

    return (
      <div>
        <Row gutter={8}>
          <Col span={16}>
            <Form.Item 
              name="product"
              label="PRODUCT"
              rules={[{ required: isRequired }]}
            >
              <Select 
                onChange={this.onChangeProduct}
                style={{ width: '100%' }}
              >
                {Options}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item 
              name="qty"
              label="QTY"
              rules={[{ required: isRequired }]}
            >
              <InputNumber 
                onChange={this.onChangeQty}
                style={{ width: '100%' }} 
              />
            </Form.Item>
          </Col>
        </Row>
        <div style={{ marginTop: 15 }}>
          <Button 
            type="default" 
            shape="round"
            block 
            onClick={this.onSubmit}
            disabled={isProductEmpty || isQtyEmpty}
          >
            ADD PRODUCT
          </Button>
        </div>
        <List
          style={{ marginTop: 30 }}
          header={<Text strong>SELECTED PRODUCTS</Text>}
          dataSource={selectedProducts}
          renderItem={(item, index) => (
            <List.Item 
              actions={[
                <CloseOutlined onClick={() => this.onRemove(item, index)}/>
              ]}
            >
              {item.qty} x {item.product}
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default ProductTable;