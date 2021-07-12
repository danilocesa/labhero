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
      usersRef:BarangayResponse,
      cityId,
      provinceId,
      buttonDisable:false
    }) 
	}

  onSearch = (value) => {
		const searchedVal = value.toLowerCase();
		const { usersRef } = this.state;

		const filtered = usersRef.filter((item) => {
			// eslint-disable-next-line camelcase
			const { barangay_name } = item;
			return (
				this.containsString(barangay_name, searchedVal)
			);
		});
		this.setState({ 
			BarangayItem: filtered 
		});
	};

	onChangeSearch = (event) => {
		const { usersRef } = this.state;
		if (event.target.value === "") this.setState({ BarangayItem: usersRef });
	};

	containsString = (searchFrom, searchedVal) => {
		if (searchFrom === null || searchFrom === "") return false;
		return searchFrom.toString().toLowerCase().includes(searchedVal);
	};


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
            <Select style={{ width: 200 }}  onChange={this.onChange}>
              {CitymappedData}
            </Select>
            <Search style={{ width: 200, marginLeft:20  }}
                    placeholder="Search By Barangay"
                    allowClear
                    onSearch={(value) => this.onSearch(value)}
                    onChange={this.onChangeSearch}
            />
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
