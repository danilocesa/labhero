import React, { Component } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import { fetchCityAllItems, fetchBarangayItems } from 'services/blood_bank/address'  
import BarangayForm from '../barangayForm'
import TablePager from 'shared_components/table_pager';
import { Row, Col, Table, Button, Input, Drawer, Select  } from 'antd';

const { Search } = Input;

const columns = [
  {
    title: 'BARANGAY',
    dataIndex: 'barangay_name',
  },
  {
    title: 'CITY',
    dataIndex: 'city_name',
  },
  {
    title: 'PROVINCE',
    dataIndex: 'province_name',
  }
];

export default class BarangayTable extends Component {
  constructor(props) {
		super(props);
		this.state = { 
      visible: false,
      CityItems:[],
      BarangayItem:[],
      buttonDisable:true
    }
	}

  async componentDidMount() {
		const response = await fetchCityAllItems();
    this.setState({ 
      CityItems:response,
		});
	}

  onChange = async (value) => { 
    const cityId = value[1]
    const provinceId = value[2]
    const BarangayResponse =  await fetchBarangayItems(cityId);
    this.setState({ 
      BarangayItem:BarangayResponse,
      cityId,
      provinceId,
      buttonDisable:false
    }) 
	}

  displayDrawer = (record) => {
		this.setState({
			visible: true,
			drawerTitle: "UPDATE BARANGAY",
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
			drawerTitle: "ADD BARANGAY",
			selecetedData: record,
      buttonNames:"ADD"
		});
	}
  
  render() {
    const { 
      provinceId,
      visible,
      drawerTitle, 
      buttonNames,
      CityItems,
      BarangayItem,
      cityId,
      selecetedData,
      buttonDisable
    } = this.state
    console.log(cityId)
    const CitymappedData = CityItems.map((item) => {
      return (
        <option value={[item.city_name,item.city_id,item.province_id]} >
          {item.city_name}
        </option>
      )
    });

    return (
      <div>
        <Row style={{ marginBottom: 10 }}>
          <Col span={12} >
            <Select style={{ width: 120 }}  onChange={this.onChange}>
              {CitymappedData}
            </Select>
            <Search style={{ width: 200 }}/>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <Button 
              disabled={buttonDisable}
              type="primary" 
              shape="round" 
              onClick={this.showDrawer}
              style={{ marginRight: '15px' }} 
              icon={<PlusOutlined />}
            >
              ADD BARANGAY
            </Button >
            <TablePager/>
          </Col>
				</Row>
        <Table  
          dataSource={BarangayItem} 
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
        <BarangayForm  
          buttonNames={buttonNames} 
          cityId={cityId} 
          selecetedData={selecetedData}
          provinceId={provinceId}
        />
        </Drawer>
      </div>
    )
  }
}
