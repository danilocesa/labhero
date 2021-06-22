import React from 'react';
import { Row, Col, Button } from 'antd';
import SourcePane from './source_pane';
import ProductDetailHeader from './header';
import ProductDetailTable from './table';

class ProductDetail extends React.Component {
  render() {
    
  const { state } = this.props.history.location
    return (
      <div>
        <Row gutter={12}>
          <Col span={6}>
            <SourcePane Data={state}/>
          </Col>
          <Col span={18}>
            <ProductDetailHeader Data={state}/>
            <div style={{ marginTop: 20 }}>
              <ProductDetailTable 
                history={this.props.history}
                loading={false} 
                Data={state}
              />
            </div>
            
          </Col>
        </Row>
      </div>
    );
  }
}

export default ProductDetail;