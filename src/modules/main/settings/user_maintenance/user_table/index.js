// @ts-nocheck
// LIBRARY
import React from 'react';
import { Row, Col, Table, Select, Typography, Button, Input, Icon, Drawer } from 'antd';

// CUSTOM
import { getUserAccountsAPI } from 'services/settings/user_maintenance/userAccount';
import { 
	drawerAdd, 
	drawerUpdate, 
	drawerUpdateTitle, 
	drawerAddTitle, 
	addUserButton, 
	tableHeaders, 
	tablePageSize,
	tableSize ,
	tableYScroll
} from '../settings';
import UserAccountForm from '../user_account_form';

// CSS
import './usertable.css';

const { Search } = Input;
const { Text } = Typography;
const { Option } = Select;
const columns = [
	{
		title: tableHeaders.userID,
		dataIndex: 'userID',
		key: 'userID',
		width: 150,
		sorter: (a, b) => a.userID - b.userID,
	},
	{
		title: tableHeaders.userName,
		dataIndex: 'userName',
		key: 'userName',
		width: 250,
		sorter: (a, b) => a.userName.localeCompare(b.userName),
	},
	{
		title: tableHeaders.lastName,
		dataIndex: 'lastName',
		key: 'lastName',
		width: 250,
		sorter: (a, b) => a.lastName.localeCompare(b.lastName),
	},
	{
		title: tableHeaders.firstName,
		dataIndex: 'givenName',
		key: 'givenName',
		width: 250,
		sorter: (a, b) => a.givenName.localeCompare(b.givenName),
	},
	{
		title: tableHeaders.middleName,
		dataIndex: 'middleName',
		key: 'middleName',
		sorter: (a, b) => a.middleName.localeCompare(b.middleName),
	},
];

class UserTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			drawerTitle: '',
			drawerButton: '',
			patientInfo: [], 
			usersRef: [],
			users: [],
			pagination: {
				pageSize: tablePageSize,
			},
			loading: false
		}
	}
	
	async componentDidMount(){
		this.setState({loading:true});
		const userAccounts = await getUserAccountsAPI();
		// userData.push({})

		this.setState({
			pagination: userAccounts.data.length,
			users: userAccounts.data,
			usersRef: userAccounts.data,
			loading:false
		});
	}

	showDrawer = () => {
		this.setState({
			visible: true,
			drawerTitle: drawerAddTitle,
			drawerButton: drawerAdd,
			patientInfo: [],
		});
	};

	onClose = () => {
		this.setState({
			visible: false,
			patientInfo: [],
		});
	};

	onSearch = (value) => {
		const { usersRef } = this.state;
		const searchedVal = value.toLowerCase();

		const filtered = usersRef.filter(item => {
			const { userName, lastName, givenName } = item;

			return (
				this.containsString(userName, searchedVal) ||
				this.containsString(lastName, searchedVal) ||
				this.containsString(givenName, searchedVal)
			);
		});

		this.setState({ users: filtered });
	}

	onChangeSearch = (event) => {
		const { usersRef } = this.state;

		if(event.target.value === '') 
			this.setState({ users: usersRef });
	}

	displayDrawerUpdate = (record) => {
		this.setState({
			visible: true,
			drawerTitle: drawerUpdateTitle,
			drawerButton: drawerUpdate,
			patientInfo: record
		});
	}

	handleSelectChange = (value) => {
		// eslint-disable-next-line react/no-access-state-in-setstate
		const pagination = {...this.state.pagination};
		// eslint-disable-next-line radix
		pagination.pageSize = parseInt(value);
		this.setState({ pagination });
	};

	// Private Function
	containsString = (searchFrom, searchedVal) => {
		if(searchFrom === null || searchFrom === '')
			return false;

		return searchFrom.toString().toLowerCase().includes(searchedVal);
	}

	render() {
		const { users, pagination, drawerButton, patientInfo, visible, drawerTitle, loading } = this.state;

		return(
			<div>
				<div className="user-table-action">
					<Row>
						<Col span={12}>
							<Search
								allowClear
								onSearch={value => this.onSearch(value)}
								onChange={this.onChangeSearch}
								style={{ width: 200 }}
							/>
						</Col>
						<Col span={12} style={{ textAlign: 'right' }}>
							<Button 
								type="primary" 
								shape="round" 
								style={{ marginRight: '15px' }} 
								onClick={this.showDrawer}
							>
								<Icon type="plus" />
								{ addUserButton }
							</Button>
							<Text>Display per page</Text>
							<Select defaultValue={tablePageSize} style={{ width: 120, marginLeft: '8px' }} onChange={this.handleSelectChange}>
								<Option value="5">5</Option>
								<Option value="10">10</Option>
								<Option value="15">15</Option>
								<Option value="20">20</Option>
							</Select>
						</Col>
					</Row>
				</div>
				<div className="user-table">
					<Table 
						loading={loading}
						size={tableSize}
						scroll={{ y: tableYScroll }}
						columns={columns} 
						dataSource={users}
						pagination={pagination}
						rowKey={record => record.userID}
						onRow={(record) => {
							return {     
								onDoubleClick: () => {
									const rec = [];
									// eslint-disable-next-line no-restricted-syntax
									for(const [key, value] of Object.entries(record)){
										rec[key] = value;
									}
									this.displayDrawerUpdate(rec);
								}
							}
						}}
					/>
				</div>    

				{/* DRAWER */}
				<Drawer
					title={drawerTitle}
					width="85%"
					visible={visible}
					onClose={this.onClose}
					destroyOnClose
				>
					<UserAccountForm
						drawerButton={drawerButton} 
						patientInfo={patientInfo}
						onClose={this.onClose}
					/>
				</Drawer>
			</div>
		)
	}
}


export default UserTable;