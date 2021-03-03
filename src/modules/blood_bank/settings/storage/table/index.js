import React, { Component } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import StorageForm from '../storageForm'
import TablePager from 'shared_components/table_pager';
import { Row, Col, Table, Button, Input, Drawer } from 'antd';

const { Search } = Input;
export default class StorageTable extends Component {
  constructor(props) {
		super(props);
		this.state = {
			visible: false,
		}
	}

  displayDrawer = (record) => {
		this.setState({
			visible: true,
			drawerTitle: "UPDATE STORAGE",
			selecetedData:record,
      buttonNames:"UPDATE"
		});
	}

  onDrawerClose = () => {
		this.setState({
			visible: false,
		});
	};
  
  showDrawer = (record) => {
		this.setState({
			visible: true,
			drawerTitle: "ADD STORAGE",
			selecetedData: record,
      buttonNames:"ADD"
		});
	}

  render() {
    const { visible , drawerTitle,buttonNames } = this.state
    const dataSource = [
      {
        Storage: 'Mike',
        Description: '10 Downing Street',
      },
      {
        Storage: 'John',
        Description: '10 Downing Street',
      },
    ];
    
    const columns = [
      {
        title: 'Storage',
        dataIndex: 'Storage',
        key: 'Storage',
      },
      {
        title: 'Description',
        dataIndex: 'Description',
        key: 'Description',
      },

    ];

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
              ADD STORAGE
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
              <StorageForm 
                buttonNames={buttonNames} 
              />
            </Drawer>
      </div>
    )
  }
}
