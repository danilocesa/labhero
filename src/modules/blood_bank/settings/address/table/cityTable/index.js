import React, { Component } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import fetchProvinceItems , { fetchCityItems } from 'services/blood_bank/address'  
import CityForm from '../cityForm'
import TablePager from 'shared_components/table_pager';
import { Row, Col, Table, Button, Input, Drawer, Select  } from 'antd';

const { Search } = Input;

const columns = [
  {
    title: 'CITY',
    dataIndex: 'city_name',
  },
  {
    title: 'CITY CODE',
    dataIndex: 'city_code',
  }
];

export default class CityTable extends Component {
  constructor(props) {
		super(props);
		this.state = { 
      visible: false,
      ProvinceItems:[],
      CityItem:[],
      buttonDisable:true
    }
	}

  async componentDidMount() {
		this.setState({loading:true});
		const response = await fetchProvinceItems();
    this.setState({ 
      ProvinceItems:response
		});
	}

  onChange = async (value) => { 
    const CityResponse =  await fetchCityItems(value);
    this.setState({ 
      usersRef:CityResponse,
      CityItem:CityResponse,
      Province:value,
      buttonDisable:false
    }) 
	}

  onSearch = (value) => {
		const searchedVal = value.toLowerCase();
		const { usersRef } = this.state;

		const filtered = usersRef.filter((item) => {
			// eslint-disable-next-line camelcase
			const { city_name } = item;
			return (
				this.containsString(city_name, searchedVal)
			);
		});
		this.setState({ 
			CityItem: filtered 
		});
	};

	onChangeSearch = (event) => {
		const { usersRef } = this.state;
		if (event.target.value === "") this.setState({ CityItem: usersRef });
	};

	containsString = (searchFrom, searchedVal) => {
		if (searchFrom === null || searchFrom === "") return false;
		return searchFrom.toString().toLowerCase().includes(searchedVal);
	};


  displayDrawer = (record) => {
		this.setState({
			visible: true,
			drawerTitle: "UPDATE CITY",
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
			drawerTitle: "ADD CITY",
			selecetedData: record,
      buttonNames:"ADD"
		});
	}

  render() {
    const { 
      visible,
      drawerTitle, 
      buttonNames,
      ProvinceItems,
      CityItem,
      selecetedData,
      Province,
      buttonDisable
    } = this.state

    const ProvincemappedData = ProvinceItems.map((item) => {
      return (
      <option value={item.province_id}>
        {item.province_name}
      </option>
      )
    });

    return (
      <div>
        <Row style={{ marginBottom: 10 }}>
          <Col span={12} >
            <Select style={{ width: 200 }} onChange={this.onChange}>
              {ProvincemappedData}
            </Select>
            <Search style={{ width: 200, marginLeft:20 }}
                    placeholder="Search By City"
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
              ADD CITY
            </Button >
            <TablePager/>
          </Col>
				</Row>
        <Table  
          dataSource={CityItem} 
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
          <CityForm  
            buttonNames={buttonNames} 
            Province={Province} 
            selecetedData={selecetedData}
          />
        </Drawer>
      </div>
    )
  }
}
