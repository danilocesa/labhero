import React from 'react';
import { Table, Select, Typography, Button, Icon, Drawer } from 'antd';
import UserAccountForm from '../user_account_form';
import './usertable.css';
// import TablePager from 'shared_components/table_pager';
import axiosCall from 'services/axiosCall';
import { apiUserAccount, apiGetMethod } from 'shared_components/constant-global';


const { Text } = Typography;
const { Option } = Select;

const columns = [
    {
        title: 'USER ID',
        dataIndex: 'userID',
        key: 'userID',
        width: "10%",
        sorter: (a, b) => a.userID - b.userID,
    },
    {
        title: 'USERNAME',
        dataIndex: 'userName',
        key: 'userName',
        sorter: (a, b) => a.userName.localeCompare(b.userName),
    },
    {
        title: 'LAST NAME',
        dataIndex: 'lastName',
        key: 'lastName',
        sorter: (a, b) => a.lastName.localeCompare(b.lastName),
    },
    {
        title: 'FIRST NAME',
        dataIndex: 'givenName',
        key: 'givenName',
        sorter: (a, b) => a.givenName.localeCompare(b.givenName),
    },
    {
        title: 'MIDDLE NAME',
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

const defaultPageSize = 5;


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
                pageSize: defaultPageSize,
            },
            loading: false,
            sortedInfo: null,
        }
    }
    showDrawer = () => {
        this.setState({
          visible: true,
          drawerTitle: 'Add User Account',
          drawerButton: 'Add',
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
            drawerTitle: 'Update User Account',
            drawerButton: 'Update',
            patientInfo: record
        });
    }

    fetchUsers = () => {
		axiosCall({
			method: apiGetMethod,
            url: apiUserAccount,
        }).then(users =>{
            const pagination = { ...this.state.pagination };
            users.data.forEach(e =>{
                e.key = e.userID;
            });
            this.setState({
                users: users.data,
                pagination,
            });
        });
    }

    handleSelectChange = (value) => {
        const pagination = {...this.state.pagination};
        pagination.pageSize = parseInt(value);
        this.setState({ pagination });
    };


    async componentDidMount(){
        this.setState({loading:true});
        await this.fetchUsers();
    }

    render() {
        const { users, pagination, drawerButton, patientInfo, visible, drawerTitle } = this.state;

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
                        Add User
                    </Button>
                    <Text>Display per page</Text>
                    <Select defaultValue="5" style={{ width: 120, marginLeft: '8px' }} onChange={this.handleSelectChange}>
                        <Option value="5">5</Option>
                        <Option value="10">10</Option>
                        <Option value="15">15</Option>
                        <Option value="20">20</Option>
                    </Select>
                </div>
                <div className="user-table">
                    <Table 
                    columns={columns} 
                    dataSource={users || dataSource}
                    pagination={pagination}
                    rowKey={record => record.key}
                    onRow={(record) => {
                        return {     
                            onDoubleClick: () => {
                                const rec = [];
                                for(let [key, value] of Object.entries(record)){
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