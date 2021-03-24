// @ts-nocheck
// LIBRARY
import React from 'react';
import { 
	Row, 
	Col, 
	Table, 
	Button, 
	Input, 
	Icon, 
	Drawer,
	Select 
} from 'antd';
import TablePager from 'shared_components/table_pager';

// CUSTOM
import { 
	tableSize ,
	tableYScroll,
	drawerAdd,
	drawerUpdate
} from '../settings';
import BarangayForm from '../form';

import  fetchBarangayItems,{ fetchCityItems, fetchProvincesItems } from 'services/settings/Address';

const { Search } = Input;
const barangayColumns = [
	{
		title: 'BARANGAY CODE',
		dataIndex: 'townCode',
		key: 2,	
		width:250
	},
	{
		title: 'BARANGAY NAME',
		dataIndex: 'townName',
		key: 3,
		width:200
	},
];


class BarangayTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			barangayItem:[],
			actionType:'add',
			drawerTitle: '',
			drawerButton: '',
			ProvincesItems:[],
			CityItem:[],
			BarangayItem:[]
		}
	}
	
	async componentDidMount(){
		const ProvincesResponse = await fetchProvincesItems();
		this.setState({
			ProvincesItems:ProvincesResponse
		})
	}

	onChangeProvince = async (value) => { 
		const CityResponse =  await fetchCityItems(value);
    console.log("file: index.js ~ line 78 ~ BarangayTable ~ onChangeProvince= ~ CityResponse", CityResponse)
		this.setState({ 
			CityItem:CityResponse,
		}) 
	}

	onChangeCity = async (value) => { 
		const BarangayResponse =  await fetchBarangayItems(value);
    console.log("file: index.js ~ line 86 ~ BarangayTable ~ onChangeCity= ~ BarangayResponse", BarangayResponse)
		this.setState({ 
			BarangayItem:BarangayResponse,
		}) 
	}

	onSearch = (value) => { 
    const searchedVal = value.toLowerCase();
		const { barangayUserRef } = this.state;
		// Search In Barangay
		const Barangayfiltered = barangayUserRef.filter((item) => {
			// eslint-disable-next-line camelcase
			const { barangay_name } = item;
			return (
				this.containsString(barangay_name, searchedVal)
			);
		});
		this.setState({ 
			barangayItem: Barangayfiltered
		});
  };
	
	onChangeSearch = (event) => {
    const { barangayUserRef } = this.state;
    if (event.target.value === "") this.setState({ barangayItem: barangayUserRef });		
  };

	containsString = (searchFrom, searchedVal) => {
    if (searchFrom === null || searchFrom === "") return false;
    return searchFrom.toString().toLowerCase().includes(searchedVal);
  };

	showDrawer = (record) => {
		this.setState({
			visible: true,
			drawerTitle: "ADD BARANGAY",
			drawerButton: drawerAdd,
			actionType : 'add',
			selectedBarangay: record
		});
	};

	onClose = () => {
		this.setState({
			visible: false,
			patientInfo: [],
		});
	};

	displayDrawerUpdate = (record) => {
		this.setState({
			visible: true,
			drawerTitle: "UPDATE BARANGAY",
			drawerButton: drawerUpdate,
			actionType:'update',
			selectedBarangay: record
		});
	}

	render() {
		const { 
			BarangayItem,
			pagination, 
			drawerButton, 
			selectedBarangay, 
			visible, 
			drawerTitle, 
			loading,
			actionType,
			ProvincesItems,
			CityItem 
		} = this.state;
		
		const mappedDataProvince = ProvincesItems.map((item) => {
      return (<option value={item.provinceCode}>{item.provinceName}</option>)
    });

		const mappedDataCity = CityItem.map((item) => {
      return (<option value={item.cityMunicipalityCode}>{item.cityMunicipalityName}</option>)
    });

		return(
			<div>
				<div className="settings-user-table-action">
					<Row>
						<Col span={12}>
							<Search
								allowClear
								onSearch={(value) => this.onSearch(value)}
								onChange={this.onChangeSearch}
								style={{ width: 200 }}
								className="panel-table-search-input"
							/>
							<Select 
								defaultValue="PROVINCE" 
								style={{ width: 200, marginLeft:20 }} 
								onChange={this.onChangeProvince} 
							>
								{mappedDataProvince}
							</Select>
							<Select 
								defaultValue="CITY" 
								style={{ width: 200, marginLeft:20 }} 
								onChange={this.onChangeCity} 
							>
								{mappedDataCity}
							</Select>
						</Col>
					</Row>
				</div>
				<div className="settings-user-table">
					<Table 
						dataSource={BarangayItem}
						loading={loading}
						size={tableSize}
						scroll={{ y: tableYScroll }}
						columns={barangayColumns} 
						pagination={pagination}
						rowKey={record => record.userID}
						
					/>
				</div>    
				{/* DRAWER */}
					<Drawer
						title={drawerTitle}
						width="30%"
						visible={visible}
						onClose={this.onClose}
						destroyOnClose
					>
						<BarangayForm
							actionType={actionType}
							drawerButton={drawerButton} 
							selectedBarangay={selectedBarangay}
							onClose={this.onClose}
						/>
					</Drawer>
			</div>
		)
	}
}


export default BarangayTable;