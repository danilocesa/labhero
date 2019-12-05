// @ts-nocheck
// LIBRARY
import React from 'react';
import { Table, Select, Typography, Button, Icon, Drawer } from 'antd';

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

const { Text } = Typography;
const { Option } = Select;
const columns = [
	{
		title: tableHeaders.userID,
		dataIndex: 'userID',
		key: 'userID',
		width: "10%",
		sorter: (a, b) => a.userID - b.userID,
	},
	{
		title: tableHeaders.userName,
		dataIndex: 'userName',
		key: 'userName',
		sorter: (a, b) => a.userName.localeCompare(b.userName),
	},
	{
		title: tableHeaders.lastName,
		dataIndex: 'lastName',
		key: 'lastName',
		sorter: (a, b) => a.lastName.localeCompare(b.lastName),
	},
	{
		title: tableHeaders.firstName,
		dataIndex: 'givenName',
		key: 'givenName',
		sorter: (a, b) => a.givenName.localeCompare(b.givenName),
	},
	{
		title: tableHeaders.middleName,
		dataIndex: 'middleName',
		key: 'middleName',
		sorter: (a, b) => a.middleName.localeCompare(b.middleName),
	},
];
const dataSource = [
	{
		key: '1',
		userID: '1',
		userName: 'WILLIE',
		lastName: 'FABROA',
		firstName: 'WILLIE',
		middleName: 'R'
	},
	{
		key: '2',
		userID: '2',
		userName: 'CANIL',
		lastName: 'NAYRE',
		firstName: 'CANIL',
		middleName: 'A'
	},
	{
		key: '3',
		userID: '3',
		userName: 'GINA',
		lastName: 'SAMSON',
		firstName: 'GINA',
		middleName: 'M'
	},
]

class UserTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			drawerTitle: '',
			drawerButton: '',
			patientInfo: [], 
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
		this.setState({
			pagination: userAccounts.data.length,
			users: userAccounts.data,
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

	render() {
		const { users, pagination, drawerButton, patientInfo, visible, drawerTitle, loading } = this.state;

		return(
			<div className="user-table-options">
				<div>
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
				</div>
				<div className="user-table">
					<Table 
					loading={loading}
					size={tableSize}
					scroll={{ y: tableYScroll }}
					columns={columns} 
					dataSource={users || dataSource}
					pagination={pagination}
					rowKey={record => record.key}
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
					width={1100}
					visible={visible}
					onClose={this.onClose}
				>
					<UserAccountForm
							drawerButton={drawerButton} 
							patientInfo={patientInfo}
					/>
				</Drawer>
			</div>
		)
	}
}


export default UserTable;