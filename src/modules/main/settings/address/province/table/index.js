// @ts-nocheck
// LIBRARY
import React from 'react';
import { fetchProvincesItems } from 'services/settings/Address';
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
const provinceColumns = [
	{
		title: 'PROVINCE ID',
		dataIndex: 'province_id',
		key: 1,
		width:210
	},
	{
		title: 'PROVINCE CODE',
		dataIndex: 'province_code',
		key: 2,	
		width:250
	},
	{
		title: 'PROVINCE NAME',
		dataIndex: 'province_name',
		key: 3,
  },
];

class ProvinceTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			ProvincesItems:[],
			actionType:'add',
			drawerTitle: '',
			drawerButton: '',
		}
	}

	async componentDidMount(){
		const ProvincesResponse = await fetchProvincesItems();
		this.setState({
			ProvincesusersRef:ProvincesResponse,
			ProvincesItems:ProvincesResponse
		})
	}

	
	onSearch = (value) => { 
    const searchedVal = value.toLowerCase();
		const {  ProvincesusersRef } = this.state;

			const Provincesfiltered = ProvincesusersRef.filter((item) => {
				// eslint-disable-next-line camelcase
				const { province_name } = item;
				return (
					this.containsString(province_name, searchedVal)
				);
			});
			this.setState({ 
				ProvincesItems:Provincesfiltered
			});
		
	
  };
	
	onChangeSearch = (event) => {
    const { ProvincesusersRef } = this.state;
    if (event.target.value === "") this.setState({ ProvincesItems: ProvincesusersRef });
  };

	containsString = (searchFrom, searchedVal) => {
    if (searchFrom === null || searchFrom === "") return false;
    return searchFrom.toString().toLowerCase().includes(searchedVal);
  };

	showDrawer = () => {
		this.setState({
			visible: true,
			drawerTitle: "ADD BARANGAY",
			drawerButton: drawerAdd,
			actionType : 'add',
			selectedProvince: [],
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
			selectedProvince: record
		});
	}

	render() {
		const { 
			ProvincesItems,
      pagination, 
      drawerButton, 
      selectedProvince, 
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
							dataSource={ProvincesItems}
							loading={loading}
							size={tableSize}
							scroll={{ y: tableYScroll }}
							columns={provinceColumns} 
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
								selectedProvince={selectedProvince}
								onClose={this.onClose}
							/>
						</Drawer>
				</div>
			)
	}
}


export default ProvinceTable;