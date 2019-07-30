import React from 'react';
import { Table, Drawer, Typography, Icon, Select, Button } from 'antd';

import PanelForm from '../panel_form';

import './paneltable.css'

const { Text } = Typography;
const { Option } = Select;

const columns = [
    {
        title: 'CODE',
        dataIndex: 'code',
        key: 'code'
    },
    {
        title: 'PANEL NAME',
        dataIndex: 'panel_name',
        key: 'panel_name'
    },
    {   
        title: 'STATUS',
        dataIndex: 'status',
        key: 'status'
    },
]

const dataSource = [
    {
        key: '1',
        code: '1',
        panel_name: 'OGGT FOR OB CODE 1',
        status: '1'
    },
    {
        key: '2',
        code: '2',
        panel_name: 'CHLORIDES/POTASSIUM/SODIUM',
        status: '1'
    },
    {
        key: '3',
        code: '3',
        panel_name: 'NA, K, Cl, Ca',
        status: '1'
    },
    {
        key: '4',
        code: '4',
        panel_name: 'TOTAL BILIRUBIN',
        status: '1'
    },
    {
        key: '5',
        code: '5',
        panel_name: 'TPAG ROTAIO',
        status: '1'
    },
    {
        key: '6',
        code: '6',
        panel_name: 'OGGT FOR MED',
        status: '1'
    },
    {
        key: '7',
        code: '7',
        panel_name: 'HDL LDL',
        status: '1'
    }
]

const expandedRowPanelData = () => {
    const columnsData = [
        {
            title: 'CODE',
            dataIndex: 'code',
            key: 'code'
        },
        {
            title: 'EXAM NAME',
            dataIndex: 'exam_name',
            key: 'exam_name',
            width: '20%'
        },
        {
            title: 'INST. EXAM NAME',
            dataIndex: 'inst_exam_name',
            key: 'inst_exam_name'
        },
        {
            title: 'FACTOR',
            dataIndex: 'factor',
            key: 'factor'
        },
        {
            title: 'DATAFORM',
            dataIndex: 'dataform',
            key: 'dataform',
        },
        {
            title: 'GROUP',
            dataIndex: 'group',
            key: 'group',
        },
        {
            title: 'GROUP ORDER',
            dataIndex: 'group_order',
            key: 'group_order'
        },
        {
            title: 'EXTRA COLUMN1',
            dataIndex: 'extra_col_1',
            key: 'extra_col_1'
        },       
        {
            title: 'EXTRA COLUMN2',
            dataIndex: 'extra_col_2',
            key: 'extra_col_2'
        },
        {
            title: 'EXTRA COLUMN3',
            dataIndex: 'extra_col_3',
            key: 'extra_col_3'
        }
    ]

    const data = [
        {
            key: 'p1',
            code: '1',
            exam_name: 'CHLORIDE',
            inst_exam_name: '04A',
            factor: '1',
            dataform: '',
            group: '',
            group_order: '1',
            extra_col_1: 'col1',
            extra_col_2: 'col2',
            extra_col_3: 'col3'
        },
        {
            key: 'p2',
            code: '2',
            exam_name: 'POTASSIUM',
            inst_exam_name: '01B',
            factor: '1',
            dataform: '',
            group: '',
            group_order: '1',
            extra_col_1: 'col1',
            extra_col_2: 'col2',
            extra_col_3: 'col3'
        },
        {
            key: 'p3',
            code: '3',
            exam_name: 'SODIUM',
            inst_exam_name: '01A',
            factor: '1',
            dataform: '',
            group: '',
            group_order: '1',
            extra_col_1: 'col1',
            extra_col_2: 'col2',
            extra_col_3: 'col3'
        }
    ]

    return <Table columns={columnsData} dataSource={data} scroll={{ x: 100 }} pagination={false} />;
}


class PanelTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            drawerTitle: '',
            drawerButton: '',
            panelInfo: []
        }
    }

    displayDrawerUpdate = (record) => {
        this.setState({
            visible: true,
            drawerTitle: 'Update Panel',
            drawerButton: 'Update',
            panelInfo: record
        });
        console.log(record);
    }

    onClose = () => {
        this.setState({
          visible: false,
        });
    };

    showDrawer = () => {
        this.setState({
            visible: true,
            drawerTitle: 'Add Panel',
            drawerButton: 'Add',
            panelInfo: ''
        })
    }

    render() {
        return(
            <div className="user-table">
                <div className="panel-table-options">
                    <Button 
                    type="primary" 
                    shape="round" 
                    style={{ marginRight: '15px' }} 
                    onClick={this.showDrawer}
                    >
                        <Icon type="plus" />
                        Add Panel
                    </Button>
                    <Text>Display per page</Text>
                    <Select defaultValue="5" style={{ width: 120, marginLeft: '8px' }}>
                        <Option value="5">5</Option>
                        <Option value="10">10</Option>
                        <Option value="15">15</Option>
                        <Option value="20">20</Option>
                    </Select>
                </div>
                <Table 
                dataSource={dataSource} 
                columns={columns} 
                expandedRowRender={expandedRowPanelData}
                rowKey={record => record.key}
                onRow={(record) => {
                    return {
                        onDoubleClick: () => {
                            this.displayDrawerUpdate(record);
                        }
                    }
                }}
                />

                <Drawer 
                    title={this.state.drawerTitle}
                    visible={this.state.visible}
                    onClose={this.onClose}
                    width={300}
                >
                    <PanelForm 
                        drawerButton={this.state.drawerButton} 
                        panelInfo={this.state.panelInfo}
                    />
                </Drawer>
            </div>

        );
    }
}

export default PanelTable;