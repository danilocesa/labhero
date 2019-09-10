import React from 'react';
import { Table, Select, Typography, Button, Icon, Drawer } from 'antd';
import UserAccountForm from '../user_account_form';
import './usertable.css';
// import TablePager from 'shared_components/table_pager';
import axiosCall from 'services/axiosCall';


const { Text } = Typography;
const { Option } = Select;


const columns = [
    {
        title: 'USERID',
        dataIndex: 'userID',
        key: 'userID',
        width: "10%",
    },
    {
        title: 'USERNAME',
        dataIndex: 'userName',
        key: 'userName',
    },
    {
        title: 'LASTNAME',
        dataIndex: 'lastName',
        key: 'lastName',
    },
    {
        title: 'GIVENNAME',
        dataIndex: 'givenName',
        key: 'givenName',
    },
    {
        title: 'MIDDLENAME',
        dataIndex: 'middleName',
        key: 'middleName',
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
                pageSize: 5,
            },
            loading: false,
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
        console.log('onClose state', this.state);
    };

    displayDrawerUpdate = (record) => {
        this.setState({
            visible: true,
            drawerTitle: 'Update User Account',
            drawerButton: 'Update',
            patientInfo: record
        });
    }

    fetchUsers = (params = {}) => {
		axiosCall({
			method: 'GET',
            url: 'UserAccount',
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
    
    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
          pagination: pager,
        });
        this.fetchUsers({
          results: pagination.pageSize,
          page: pagination.current,
          sortField: sorter.field,
          sortOrder: sorter.order,
          ...filters,
        });
      };

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
                    dataSource={this.state.users || dataSource}
                    pagination={this.state.pagination}
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
                    title={this.state.drawerTitle}
                    width={1100}
                    visible={this.state.visible}
                    onClose={this.onClose}
                >
                    <UserAccountForm 
                        drawerButton={this.state.drawerButton} 
                        patientInfo={this.state.patientInfo}
                    />
                </Drawer>
            </div>
        )
    }
}


export default UserTable;