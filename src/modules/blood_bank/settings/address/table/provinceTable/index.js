import React, { Component } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import ProvinceForm from '../provinceForm'
import TablePager from 'shared_components/table_pager';
import { Row, Col, Table, Button, Input, Drawer } from 'antd';

const { Search } = Input;
const dataSource = [
  {
    province: 'Mike',
  },
  {
    province: 'John',
  },
];

const columns = [
  {
    title: 'PROVINCE',
    dataIndex: 'province',
  }
];
export default class ProvinceTable extends Component {
  constructor(props) {
		super(props);
		this.state = { visible: false }
	}

  displayDrawer = (record) => {
		this.setState({
			visible: true,
			drawerTitle: "UPDATE PROVINCE",
			selecetedData:record,
      buttonNames:"UPDATE"
		});
	}

  onDrawerClose = () => {
		this.setState({ visible: false });
	};
  
  showDrawer = (record) => {
		this.setState({
			visible: true,
			drawerTitle: "ADD PROVINCE",
			selecetedData: record,
      buttonNames:"ADD"
		});
	}

  render() {
    const { visible , drawerTitle, buttonNames } = this.state
    return (
      <div>
        <Row style={{ marginBottom: 10 }}>
          <Col span={12} >
            <Search style={{ width: 200 }}/>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <Button 
              type="primary" 
              shape="round" 
              onClick={this.showDrawer}
              style={{ marginRight: '15px' }} 
              icon={<PlusOutlined />}
            >
              ADD PROVINCE
            </Button >
            <TablePager/>
          </Col>
				</Row>
        <Table  
          dataSource={dataSource} 
          columns={columns} 
          onRow={(record) => {
            return {     
              onDoubleClick: () => {
                this.displayDrawer(record);
              }
            }
          }}/>
        <Drawer
          title={drawerTitle}
          width="30%"
          visible={visible}
          onClose={this.onDrawerClose}
          destroyOnClose
        >
          <ProvinceForm  buttonNames={buttonNames} />
        </Drawer>
      </div>
    )
  }
}
