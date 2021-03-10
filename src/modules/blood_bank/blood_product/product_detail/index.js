import React from 'react';
import { Row, Col, Button } from 'antd';
import SourcePane from './source_pane';
import ProductDetailHeader from './header';
import ProductDetailTable from './table';

class ProductDetail extends React.Component {
  render() {
    return (
      <div>
        <Row gutter={12}>
          <Col span={6}>
            <SourcePane />
          </Col>
          <Col span={18}>
            <ProductDetailHeader />
            <div style={{ marginTop: 20 }}>
              <ProductDetailTable 
                loading={false} 
              />
            </div>
            <div style={{ textAlign: 'right', marginTop: 30 }}>
              <Button 
                type="ghost"
                style={{ width: 120 }}
              >
                CANCEL
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ProductDetail;