// @ts-nocheck
// LIBRARY
import React from 'react';
import { fetchCityItems,fetchProvincesItems } from 'services/settings/Address';
import { Row, Col, Table, Button, Input, Icon, Drawer,Select } from 'antd';
import TablePager from 'shared_components/table_pager';

// CUSTOM
import { 
	tableSize ,
	tableYScroll,
	drawerAdd,
	drawerUpdate
} from '../settings';
import CityForm from '../form';

const { Search } = Input;
const cityColumns = [
	{
		title: 'CITY CODE',
		dataIndex: 'cityMunicipalityCode',
		key: 2,	
		width:250
	},
	{
		title: 'CITY NAME',
		dataIndex: 'cityMunicipalityName',
		key: 3,
		width:200
	},
];

class CityTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			actionType:'add',
			drawerTitle: '',
			drawerButton: '',
			CityItem:[],
			ProvincesItems:[],
		}
	}

	async componentDidMount(){
		const ProvincesResponse = await fetchProvincesItems();
		this.setState({
			ProvincesItems:ProvincesResponse
		})
	}

	onChange = async (value) => { 
		const CityResponse =  await fetchCityItems(value);
		this.setState({ 
			CityusersRef:CityResponse,
			CityItem:CityResponse,
		}) 
	}
	
	showDrawer = () => {
		this.setState({
			visible: true,
			drawerTitle: "ADD BARANGAY",
			drawerButton: drawerAdd,
			actionType : 'add',
			selectedCity: [],
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
			selectedCity: record
		});
	}
	
	onSearch = (value) => { 
    const searchedVal = value.toLowerCase();
		const { CityusersRef } = this.state;
			const Cityfiltered = CityusersRef.filter((item) => {
				// eslint-disable-next-line camelcase
				const { cityMunicipalityName } = item;
				return (
					this.containsString(cityMunicipalityName, searchedVal)
				);
			});
				this.setState({ 
					CityItem:Cityfiltered,
				});
  };

	onChangeSearch = (event) => {
    const { CityusersRef } = this.state;
    if (event.target.value === "") this.setState({ CityItem: CityusersRef });
  };

	containsString = (searchFrom, searchedVal) => {
    if (searchFrom === null || searchFrom === "") return false;
    return searchFrom.toString().toLowerCase().includes(searchedVal);
  };


	render() {
		
		const { 
			CityItem,
      pagination, 
      drawerButton, 
      selectedCity, 
      visible, 
      drawerTitle, 
      loading,
      actionType,
			ProvincesItems 
    } = this.state;
		const mappedData = ProvincesItems.map((item) => {
      return (<option value={item.provinceCode}>{item.provinceName}</option>)
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
								<Select defaultValue="PROVINCE" style={{ width: 200, marginLeft:20 }} onChange={this.onChange} >
									{mappedData}
								</Select>
							</Col>
						</Row>
					</div>
					<div className="settings-user-table">
						<Table 
							dataSource={CityItem}
							loading={loading}
							size={tableSize}
							scroll={{ y: tableYScroll }}
							columns={cityColumns} 
							pagination={pagination}
							rowKey={record => record.userID}
							onRow={(record) => {
								return {     
									onDoubleClick: () => {
										this.displayDrawerUpdate(record);
									}
								}
							}}
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
							<CityForm
								actionType={actionType}
								drawerButton={drawerButton} 
								selectedCity={selectedCity}
								onClose={this.onClose}
							/>
						</Drawer>
				</div>
			)
	}
}


export default CityTable;