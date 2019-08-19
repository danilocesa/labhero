/* eslint-disable func-names */
// LIBRARY
import React from 'react';
import { 
    Table as AntTable, 
    Drawer as AntDrawer, 
    Typography as AntTypography, 
    Icon as AntIcon, 
    Select as AntSelect, 
    Button as AntButton,
    Popover as AntPopover,
    Spin as AntSpin 
} from 'antd';

// CUSTOM MODULES
import panelListAPI from 'services/panelList';
import CustomMessage from 'shared_components/message';
import PanelForm from '../panel_form';

// CSS
import './paneltable.css'

// CONSTANTS
const { Text } = AntTypography;
const { Option } = AntSelect;
const popoverContent = (data = []) => (
	<AntTable 
		dataSource={data}
		columns={[
			{ title: 'CODE', dataIndex: 'code' },
			{ title: 'EXAM NAME', dataIndex: 'exam' }
		]}
		pagination={false}
		rowKey={record => record.code}
	/>
);
const rowItem = (item) => (    
	<AntPopover 
		content={popoverContent(item.subcontent)} 
		trigger="hover"
		visible={item.active}
	>
		<div>
			{item.code}
		</div>
	</AntPopover>
);
const columns = [
    {
        title: 'CODE',
        dataIndex: 'code',
        key: 'code',
    },
    {
        title: 'PANEL NAME',
        dataIndex: 'panel_name',
        key: 'panel_name',
        render: (text, record) => rowItem(record),
    },
    {   
        title: 'STATUS',
        dataIndex: 'status',
        key: 'status'
    },
]

class PanelTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDrawerVisible: false,
            drawerTitle: '',
            drawerButton: '',
            loading: false,
            panelInfo: [],
            panelListState: []
        }
    }

    componentDidMount = async () => {
       this.populatePanelList();
    }

    populatePanelList = async () => {
        this.setState({ loading: true });
        const panelListData = await panelListAPI;
        if(panelListData.status === 204){
            CustomMessage.info('No results found!');
            this.setState({loading:false});
            return;
        }
        const panelListArray = []; 
        panelListData.data.map(function(valuePanel,indexPanel){ 
            panelListArray[indexPanel] = {
                key: valuePanel.panelRequestID,
                code: valuePanel.panelRequestCode, 
                panel_name: valuePanel.panelRequestName,
                status: valuePanel.panelRequestActive
            }
            return panelListArray;
        });

        this.setState({ loading: false, panelListState: panelListArray});
    }
    
    displayDrawerUpdate = (record) => {
        this.setState({
            isDrawerVisible: true,
            drawerTitle: 'Update Panel',
            drawerButton: 'Update',
            panelInfo: record
        });
        console.log(record);
    }

    onClose = () => {
        this.setState({
            isDrawerVisible: false,
        });
    };

    showDrawer = async () => {
        this.setState({ loading:true });
        // const examRequestList = await this.populateExamRequest();
        this.setState({
            isDrawerVisible: true,
            drawerTitle: 'Add Panel',
            drawerButton: 'Add',
            panelInfo: '',
            loading:false
        })
    }

    populateExamRequest = async () => {
         
    }

    render() {
        return(
            <div className="user-table">
                <div className="panel-table-options">
                    <AntButton 
                        type="primary" 
                        shape="round" 
                        style={{ marginRight: '15px' }} 
                        onClick={this.showDrawer}
                    >
                        <AntIcon type="plus" />
                            Add Panel
                    </AntButton>
                    <Text>Display per page</Text>
                    <AntSelect defaultValue="5" style={{ width: 120, marginLeft: '8px' }}>
                        <Option value="5">5</Option>
                        <Option value="10">10</Option>
                        <Option value="15">15</Option>
                        <Option value="20">20</Option>
                    </AntSelect>
                </div>
                <AntTable 
                    dataSource={this.state.panelListState}
                    loading={this.state.loading} 
                    columns={columns}
                    rowKey={record => record.key}
                    onRow={(record) => {
                        return {
                            onDoubleClick: () => {
                                this.displayDrawerUpdate(record);
                        }
                    }
                }}
                />
                <AntSpin spinning={this.state.loading}>
                    <AntDrawer 
                        title={this.state.drawerTitle}
                        visible={this.state.isDrawerVisible}
                        onClose={this.onClose}
                        width="40%"
                    >
                        <PanelForm 
                            drawerButton={this.state.drawerButton} 
                            panelInfo={this.state.panelInfo}
                        />
                    </AntDrawer>
                </AntSpin>
            </div>

        );
    }
}

export default PanelTable;