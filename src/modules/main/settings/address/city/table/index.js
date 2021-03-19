// @ts-nocheck
// LIBRARY
import React from 'react';
import { fetchCityItems } from 'services/settings/Address';
import { Row, Col, Table, Button, Input, Icon, Drawer } from 'antd';
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
		title: 'CITY ID',
		dataIndex: 'city_id',
		key: 1,
		width:210
	},
	{
		title: 'CITY CODE',
		dataIndex: 'city_code',
		key: 2,	
		width:250
	},
	{
		title: 'CITY NAME',
		dataIndex: 'city_name',
		key: 3,
		width:200
	},
	{
		title: 'PROVINCE',
		dataIndex: 'province',
		key: 3,
	}
];

class CityTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			actionType:'add',
			drawerTitle: '',
			drawerButton: '',
			CityItem:[]
		}
	}

	async componentDidMount(){
		const CityResponse = await fetchCityItems();
		this.setState({
			CityusersRef:CityResponse,
			CityItem:CityResponse
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
				const { city_name } = item;
				return (
					this.containsString(city_name, searchedVal)
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
      actionType 
    } = this.state;
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
							</Col>
							<Col span={12} style={{ textAlign: 'right' }}>
								<Button 
									type="primary" 
									shape="round" 
									style={{ marginRight: '15px' }} 
									onClick={this.showDrawer}
								>
									<Icon type="plus" /> ADD CITY
								</Button>
								<TablePager handleChange={this.handleSelectChange} />
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