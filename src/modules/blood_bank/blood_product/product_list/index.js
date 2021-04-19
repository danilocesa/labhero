import React from 'react';
import PageTitle from 'shared_components/page_title';
import { Input, Button, Row, Col, Tabs, Select  } from 'antd';
import TablePager from 'shared_components/search_pager';
import ProductListTable from './table';

const { TabPane } = Tabs;
const { Option } = Select;

const tabs = [
  'WHOLE BLOOD',
  'RED CELLS',
  'PLATELETS',
  'PLASMA',
  'CRYO',
  'WHITE CELLS & GRANULOCYTES'
];

class ProductList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Item: [], 
      pageSize: 0
    }
  }

  handleChangeSize = () => {}

  onChangeTab = () => {}

  render() {
    const TabPanes = tabs.map((item, index) => (
      <TabPane tab={item} key={index + 1} />
    ));

    return (
      <div>
        <PageTitle pageTitle="BLOOD PRODUCT" />
        <Row 
          justify="center"
          gutter={16}
          style={{ marginTop: 20 }}
        >
          <Col span={2}>
            <Input placeholder="STATUS" />
          </Col>
          <Col span={2}>
            <Select defaultValue="Blood Types" style={{ width: '100%' }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Col>
          <Col span={2}>
            <Select defaultValue="Storage" style={{ width: '100%' }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Col>
          <Col span={2}>
            <Select defaultValue="Status" style={{ width: '100%' }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
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
        <Row justify="center" style={{ marginTop: 20 }}>
          <Col span={23}>
            <TablePager 
              handleChangeSize={null}
              pageSize={1}
              pageTotal={1}
            />
            <Tabs defaultActiveKey="1" onChange={this.onChangeTab}>
              {TabPanes}
            </Tabs>
            <ProductListTable 
              loading={false}
              pageSize={1}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default ProductList;