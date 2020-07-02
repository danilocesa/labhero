// @ts-nocheck
// LIBRARY
import React from 'react';
import { Row, Col, Table, Button, Input, Icon, Drawer } from 'antd';
import fetchbloodgroupitems from 'services/blood_bank/blood_group';
import TablePager from 'shared_components/table_pager';

// CUSTOM
import { 
	drawerAdd, 
	drawerUpdate, 
	tableSize ,
	tableYScroll,
	tablePageSize
} from '../settings';
import UserAccountForm from '../add_form';

const { Search } = Input;
const columns = [
	{
		title: 'BLOOD GROUP CODE',
		dataIndex: 'blood_group_code',
		key: '1',
		width: 200,
		sorter: (a, b) => a.blood_group_id - b.blood_group_id,
	},
	{
		title: 'BLOOD GROUP NAME',
		dataIndex: 'blood_group',
		key: 2,	
		width: 300,
		sorter: (a, b) => a.blood_group.localeCompare(b.blood_group),
	},
	{
		title: 'DESCRIPTION',
		dataIndex: 'blood_description',
		key: 3,
	},
];

class BloodGroupTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bloodgroupItem: [],
			actionType:'add',
			drawerTitle: '',
			loading:false,
			drawerButton: '',
			selectedBloodGroup:{},
			pagination: {
				pageSize: tablePageSize,
			}
		}
	}

	async componentDidMount() {
		this.setState({loading:true});
		const response = await fetchbloodgroupitems();
		console.log("Data:",response)
		this.setState({ 
			bloodgroupItem: response,
			usersRef:response,
		pagination: response.length,
		loading:false
		});
	
	}

	onClose = () => {
		this.setState({
			visible: false,
			patientInfo: [],
		});
	};

	showDrawer = () => {
		this.setState({
			visible: true,
			drawerTitle: "ADD BLOOD GROUP",
			drawerButton: drawerAdd,
			actionType : 'add',
			patientInfo: [],
		});
	};

	displayDrawerUpdate = (record) => {
		this.setState({
			visible: true,
			drawerTitle: "UPDATE BLOOD GROUP",
			drawerButton: drawerUpdate,
			actionType:'update',
			selectedBloodGroup:record // 3. set natin yung state ng record
			
		});
	}



  onSearch = (value) => {
    const searchedVal = value.toLowerCase();
		const { usersRef } = this.state;

    const filtered = usersRef.filter((item) => {
      // eslint-disable-next-line camelcase
      const { blood_group } = item;

      return (
        this.containsString(blood_group, searchedVal)
      );
    });
    this.setState({ bloodgroupItem: filtered });
  };

  onChangeSearch = (event) => {
    const { usersRef } = this.state;

    if (event.target.value === "") this.setState({ bloodgroupItem: usersRef });
  };

	// Private Function
  containsString = (searchFrom, searchedVal) => {
    if (searchFrom === null || searchFrom === "") return false;

    return searchFrom.toString().toLowerCase().includes(searchedVal);
  };
	
	handleSelectChange = (value) => {
		// eslint-disable-next-line react/no-access-state-in-setstate
		const pagination = {...this.state.pagination};
		// eslint-disable-next-line radix
		pagination.pageSize = parseInt(value);
		this.setState({ pagination });
	};

	render() {
		const { 
			pagination, 
			drawerButton, 
			patientInfo, 
			visible,
			drawerTitle,
			selectedBloodGroup, 
			actionType,
			bloodgroupItem,
			loading } = this.state;
			
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
								<Icon type="plus" /> ADD BLOOD GROUP
								
							</Button>
							<TablePager handleChange={this.handleSelectChange} />
						</Col>
					</Row>
				</div>
				<div className="settings-user-table">
					<Table 
						loading={loading}
						dataSource={bloodgroupItem}
						size={tableSize}
						scroll={{ y: tableYScroll }}
						columns={columns} 
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
						<UserAccountForm
							selectedBloodGroup={selectedBloodGroup} 
							actionType={actionType}
							drawerButton={drawerButton} 
							patientInfo={patientInfo}
							onClose={this.onClose}
						/>
					</Drawer>
			</div>
		)
	}
}


export default BloodGroupTable;	