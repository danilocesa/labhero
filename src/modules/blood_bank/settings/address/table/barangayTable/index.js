import React, { Component } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import fetchProvinceItems , { fetchCityItems, fetchBarangayItems }   from 'services/blood_bank/address'  
import BarangayForm from '../barangayForm'
import TablePager from 'shared_components/table_pager';
import { Row, Col, Table, Button, Input, Drawer, Select  } from 'antd';
import { tickStep } from 'd3-array';
import { Point } from 'bizcharts';

const { Search } = Input;
const { Option } = Select;

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
      ProvinceItems:[],
      BarangayItem:[],
      buttonDisable:true
    }
	}

  async componentDidMount() {
    const response = await fetchProvinceItems();
		// const response = await fetchCityAllItems();
    this.setState({ 
      ProvinceItems:response,
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

  handleChange = async (ProvinceId) => {
    const response = await fetchCityItems(ProvinceId);
    this.setState({
			CityItems: response
		});
  }

  BarangayhandleChange = async (Cityid) => {
    const response = await fetchBarangayItems(Cityid)
    this.setState({
      TableData : response
    })
  }

  
  render() {
    const { 
      provinceId,
      visible,
      drawerTitle, 
      buttonNames,
      ProvinceItems,
      CityItems,
      BarangayItem,
      cityId,
      selecetedData,
      buttonDisable
    } = this.state

    const ProvincemappedData = ProvinceItems.map((item) => {
      return (
        <Option value={item.province_id} >
          {item.province_name}
        </Option>
      )
    });

    const CityMappedData = CityItems.map((item) => {
      return (
        <Option value={item.city_id} >
          {item.city_name}
        </Option>
      )
    });

    return (
      <div>
        <Select placeholder="Province" style={{ width: 120 }} onChange={this.handleChange}>
          {ProvincemappedData}
        </Select>
        <Select placeholder="City" style={{ width: 120 }} onChange={this.BarangayhandleChange}>
          {CityMappedData}
        </Select>
        
      </div>
    )
  }
}
