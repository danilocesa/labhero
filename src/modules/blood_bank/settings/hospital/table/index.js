import React, { Component } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import HopitalForm from '../hospitalForm'
import { getHospitalList } from 'services/blood_bank/hospital';
// import getHospitalList from 'services/blood_bank/hospital';
import TablePager from 'shared_components/table_pager';
import { Row, Col, Table, Button, Input, Drawer } from 'antd';

const { Search } = Input;

const columns = [
  {
    title: 'HOSPITAL',
    dataIndex: 'Hospital',
  },
  {
    title: 'LOCATION',
    dataIndex: 'Location',
  },
];

export default class HopitalTable extends Component {
  constructor(props) {
		super(props);
		this.state = { 
      visible: false ,
      HospitalList:[]
    }
	}

  async componentDidMount() {
		this.setState({loading:true});
		const response = await getHospitalList();
		console.log("Data:",response)
		this.setState({ 
			HospitalList: response,
			usersRef:response,
			pagination: response.length,
			loading:false
		});
	}

  displayDrawer = (record) => {
		this.setState({
			visible: true,
			drawerTitle: "UPDATE HOPITAL",
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
			drawerTitle: "ADD HOPITAL",
			selecetedData: record,
      buttonNames:"ADD"
		});
	}

  render() {
    const { 
      visible, 
      drawerTitle, 
      buttonNames, 
      HospitalList,
      loading   
    } = this.state
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
              ADD HOSPITAL
            </Button >
            <TablePager/>
          </Col>
				</Row>
        <Table  
          loading={loading}
          dataSource={HospitalList} 
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
          <HopitalForm  buttonNames={buttonNames} />
        </Drawer>
      </div>
    )
  }
}
