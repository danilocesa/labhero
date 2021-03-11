// @ts-nocheck
// LIBRARY
import React from 'react';
import { Row, Col, Table, Button, Input, Icon, Drawer } from 'antd';
import TablePager from 'shared_components/table_pager';
import { LOGGEDIN_USER_DATA, ACCESS_MATRIX } from 'global_config/constant-global'

// CUSTOM
import { getUserAccountsAPI } from 'services/settings/userAccount';
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
		width: 250,
		sorter: (a, b) => a.middleName.localeCompare(b.middleName),
	},
	{
		title: tableHeaders.userTypes,
		dataIndex: 'userTypeName',
		key: 'userTypeName',
		width: 150,
		sorter: (a, b) => a.userTypeName.localeCompare(b.userTypeName),
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
			userMatrix: [],
			userId: [],
			disableAdd: '',
			disableEdit: '',
			pagination: {
				pageSize: tablePageSize,
				showSizeChanger: false
			},
			loading: false
		}
	}
	
	
	async componentDidMount(){

		this.setState({loading:true});
		const userAccounts = await getUserAccountsAPI();

		this.setState({
			pagination: userAccounts.data.length,
			users: userAccounts.data,
			usersRef: userAccounts.data,
			loading:false
		});

		//USER MATRIX
		const getmatrix = sessionStorage.ACCESS_MATRIX ? JSON.parse(sessionStorage.ACCESS_MATRIX) : null;
		const getuserID = sessionStorage.LOGGEDIN_USER_DATA ? JSON.parse(sessionStorage.LOGGEDIN_USER_DATA) : null;
		const userMatrix = getmatrix.settings.create;
		const userID = getuserID.userID;
		const disableToCreate = !userMatrix.includes( userID )

		this.setState({
			disableAdd: disableToCreate,
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

		//USER MATRIX
		const getmatrix = sessionStorage.ACCESS_MATRIX ? JSON.parse(sessionStorage.ACCESS_MATRIX) : null;
		const getuserID = sessionStorage.LOGGEDIN_USER_DATA ? JSON.parse(sessionStorage.LOGGEDIN_USER_DATA) : null;
		const userMatrix = getmatrix.settings.update;
		const userID = getuserID.userID;
		const disableToUpdate = userMatrix.includes( userID )

		console.log(disableToUpdate)
		this.setState({
			visible: disableToUpdate,
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
		const { users, pagination, drawerButton, patientInfo, visible, drawerTitle, loading, disableAdd } = this.state;
	
		return(
			<div>
				<div className="settings-user-table-action">
					<Row>
						<Col span={12}>
							<Search
								allowClear
								onSearch={value => this.onSearch(value)}
								onChange={this.onChangeSearch}
								style={{ width: 200, textTransform: 'uppercase' }}
							/>
						</Col>
						<Col span={12} style={{ textAlign: 'right' }}>
							<Button 
								type="primary" 
								shape="round" 
								style={{ marginRight: '15px' }} 
								onClick={this.showDrawer}
								disabled= {disableAdd}
							>
								<Icon type="plus" />
								{ addUserButton }
							</Button>
							<TablePager handleChange={this.handleSelectChange} />
						</Col>
					</Row>
				</div>
				<div className="settings-user-table">
					<Table 
						loading={loading}
						size={tableSize}
						scroll={{ y: tableYScroll }}
						columns={columns} 
						dataSource={users}
						pagination={{ ...pagination, showSizeChanger: false }}
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