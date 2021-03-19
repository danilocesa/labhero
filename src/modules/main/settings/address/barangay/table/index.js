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
	Drawer 
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

import fetchBarangayItems from 'services/settings/Address';

const { Search } = Input;
const barangayColumns = [
	{
		title: 'BARANGAY ID',
		dataIndex: 'barangay_id',
		key: 1,
		width:210
	},
	{
		title: 'BARANGAY CODE',
		dataIndex: 'barangay_code',
		key: 2,	
		width:250
	},
	{
		title: 'BARANGAY NAME',
		dataIndex: 'barangay_name',
		key: 3,
		width:200
	},
	{
		title: 'CITY',
		dataIndex: 'city',
		key: 3,
  }	
];


class BarangayTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			barangayItem:[],
			actionType:'add',
			drawerTitle: '',
			drawerButton: '',
		}
	}
	
	async componentDidMount(){
		const barangayResponse = await fetchBarangayItems();
		this.setState({
			barangayUserRef:barangayResponse,
			barangayItem:barangayResponse
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
			barangayItem,
			pagination, 
			drawerButton, 
			selectedBarangay, 
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
								<Icon type="plus" /> ADD BARANGAY
							</Button>
							<TablePager handleChange={this.handleSelectChange} />
						</Col>
					</Row>
				</div>
				<div className="settings-user-table">
					<Table 
						dataSource={barangayItem}
						loading={loading}
						size={tableSize}
						scroll={{ y: tableYScroll }}
						columns={barangayColumns} 
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