import React, { Component } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import fetchProvinceItems, { fetchBarangayItems, fetchCityItems } from 'services/blood_bank/address'  
import BarangayForm from '../barangayForm'
import TablePager from 'shared_components/table_pager';
import { Row, Col, Table, Button, Input, Drawer, Select  } from 'antd';

const { Search } = Input;

const columns = [
  {
    title: 'BARANGAY',
    dataIndex: 'barangay_name',
  },
  // {
  //   title: 'CITY',
  //   dataIndex: 'city_name',
  // },
  // {
  //   title: 'PROVINCE',
  //   dataIndex: 'province_name',
  // }
];

export default class BarangayTable extends Component {
  constructor(props) {
		super(props);
		this.state = { 
      visible: false,
      ProvinceItems:[],
      CityItems:[],
      BarangayItem:[],
      buttonDisable:true
    }
	}

  async componentDidMount() {
    const apiresponse = await fetchProvinceItems();
    this.setState({ 
      ProvinceItems:apiresponse,
      pagination: apiresponse.length,
		});
	}

  onChange = async (provinceId) => { 
    const CityResponse =  await fetchCityItems(provinceId);
    this.setState({ 
      CityItems:CityResponse,
      buttonDisable:false
    }) 
	}

  onChangeBarangay = async (cityId) => { 

    const BarangayResponse =  await fetchBarangayItems(cityId);
    this.setState({ 
      BarangayItem:BarangayResponse,
      usersRef:BarangayResponse,
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
  

  handleChange = (value) =>{
    // eslint-disable-next-line react/no-access-state-in-setstate
		const pagination = {...this.state.pagination};
		// eslint-disable-next-line radix
		pagination.pageSize = parseInt(value);
		this.setState({ pagination });
  }

  render() {
    const { 
      provinceId,
      visible,
      drawerTitle, 
      buttonNames,
      CityItems,
      ProvinceItems,
      BarangayItem,
      cityId,
      selecetedData,
      buttonDisable,
      pagination,
    } = this.state


    const ProvincemappedData = ProvinceItems.map((item) => {
      return (
      <option value={item.province_id}>
        {item.province_name}
      </option>
      )
    });


    console.log(cityId)
    const CitymappedData = CityItems.map((item) => {
      return (
        <option value={item.city_id} >
          {item.city_name}
        </option>
      )
    });




    return (
      <div>
        <Row style={{marginTop:12, marginBottom: 12}}>
          <Col span={9} >
          <Select style={{ width: 218}} onChange={this.onChange} placeholder="PLEASE SELECT A PROVINCE">
              {ProvincemappedData}
            </Select>

            <Select style={{ width: 200, marginLeft:28 }} disabled={buttonDisable} onChange={this.onChangeBarangay} placeholder="PLEASE SELECT A CITY">
              {CitymappedData}
            </Select>
            
            </Col> 
          <Col span={4}>
          <Search style={{ width: 220, marginLeft:10}}
                    placeholder="SEARCH BY BARANGAY"
                    disabled={buttonDisable}
                    allowClear
                    onSearch={(value) => this.onSearch(value)}
                    onChange={this.onChangeSearch}
            />
          </Col>
          <Col span={11} style={{ textAlign: 'right' }}>
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
            <TablePager handleChange={this.handleChange}/>
          </Col>
				</Row>
        <Table  
          dataSource={BarangayItem} 
          columns={columns} 
          pagination={pagination}
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
          //cityId={cityId} 
          //Province={Province} 
          selecetedData={selecetedData}
          provinceId={provinceId}
        />
        </Drawer>
      </div>
    )
  }
}