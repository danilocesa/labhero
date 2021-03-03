import React from 'react';
import { List, Row, Col, Select, Button, InputNumber, Form, Typography } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import fetchBloodProducts from 'services/blood_bank/blood_product';

const { Text } = Typography;

class ProductTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      isProductEmpty: true,
      isQtyEmpty: true,
      productList: [],
      selectedProducts: [] 
    }
  }

  async componentDidMount() {
		const productList = await fetchBloodProducts();

		this.setState({ productList });
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
    .validateFields(['product_id', 'quantity'])
    .then(values => {
      const { selectedProducts, productList } = this.state;
      const { product_id, quantity } = values;

      const selectedProduct = productList.find(i => i.blood_product_id);

      const clonedSelected = [...selectedProducts, { ...selectedProduct, quantity }];
      const filteredProducts = productList.filter(product => product.blood_product_id !== product_id);

      this.setState({ 
        selectedProducts: clonedSelected,
        productList: filteredProducts,
        isProductEmpty: true,
        isQtyEmpty: true
      });

      form.current.setFieldsValue({ product_id: null, quantity: null });
    });
  }

  onRemove = (itemDetail, itemIndex) => {
    const { selectedProducts, productList } = this.state;
    const { quantity, ...restItemDetail } = itemDetail;


    const filteredProducts = selectedProducts.filter((item, index) => index !== itemIndex);
    const newProductList = [...productList, restItemDetail];

    console.log(newProductList);

    this.setState({ 
      selectedProducts: filteredProducts,
      productList: newProductList
    });
  }

  render() {
    const { selectedProducts, isProductEmpty, isQtyEmpty, productList } = this.state;
    const isRequired = (selectedProducts.length === 0);
    const Options = productList.map(product => (
      <Select.Option value={product.blood_product_id} key={product.blood_product_id}>
        {product.blood_product_name}
      </Select.Option>
    ));

    return (
      <div>
        <Row gutter={8}>
          <Col span={16}>
            <Form.Item 
              name="product_id"
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
              name="quantity"
              label="QTY"
              rules={[{ required: isRequired }]}
            >
              <InputNumber 
                onChange={this.onChangeQty}
                style={{ width: '100%' }} 
                min={1}
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
              {item.quantity} x {item.blood_product_name}
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default ProductTable;