import React from 'react';
import { Table, Row, Col, Select, Typography, Button, Icon, Drawer } from 'antd';

import UserAccountForm from '../user_account_form';
import './usertable.css';

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
        title: 'FIRSTNAME',
        dataIndex: 'firstName',
        key: 'firstName',
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
        }
    }

    showDrawer = () => {
        this.setState({
          visible: true,
          drawerTitle: 'Add User Account',
          drawerButton: 'Add'
        });
    };

    onClose = () => {
        this.setState({
          visible: false,
        });
    };

    displayDrawerUpdate = (record) => {
        this.setState({
            visible: true,
            drawerTitle: 'Update User Account',
            drawerButton: 'Update',
        });
        console.log(record);
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
                    <Select defaultValue="5" style={{ width: 120, marginLeft: '8px' }}>
                        <Option value="5">5</Option>
                        <Option value="10">10</Option>
                        <Option value="15">15</Option>
                        <Option value="20">20</Option>
                    </Select>
                </div>
                <div className="user-table">
                    <Table 
                    columns={columns} 
                    dataSource={dataSource}
                    rowKey={record => record.key}
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
                    title={this.state.drawerTitle}
                    width={1100}
                    visible={this.state.visible}
                    onClose={this.onClose}
                >
                    <UserAccountForm 
                        drawerButton={this.state.drawerButton} 
                    />
                </Drawer>
            </div>
        )
    }
}


export default UserTable;