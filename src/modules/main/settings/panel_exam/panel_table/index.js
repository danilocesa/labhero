/* eslint-disable func-names */
// LIBRARY
import React from 'react';
import { 
	Table as AntTable, 
	Drawer as AntDrawer, 
	Typography as AntTypography, 
	Icon as AntIcon, 
	Select as AntSelect, 
	Button as AntButton} from 'antd';

// CUSTOM MODULES
import panelListAPI from 'services/settings/panel/panelList';
import HttpCodeMessage from 'shared_components/message_http_status';
import PanelForm from '../panel_form';

// CSS
import './paneltable.css'

// CONSTANTS
const { Text } = AntTypography;
const { Option } = AntSelect;
// const popoverContent = (data = []) => (
// 	<div>
// 	<AntTable 
// 		dataSource={data}
// 		columns={[
// 			{ title: 'CODE', dataIndex: 'code' },
// 			{ title: 'EXAM NAME', dataIndex: 'exam' }
// 		]}
// 		pagination={false}
// 		rowKey={record => record.code}
// 	/>
// 	{console.log(data)}
// 	</div>

// );
// const popover = (item) => (  
// 	<AntPopover 
// 		content={popoverContent(item)} 
// 		trigger="hover"
// 	>
// 		<div>
// 			{item.panel_name}
// 		</div>
// 	</AntPopover>
// );
const columns = [
    {
        title: 'CODE',
        dataIndex: 'code',
				key: 'code',
				sorter: (a, b) => { return a.code.localeCompare(b.code)}
    },
    {
        title: 'PANEL NAME',
        dataIndex: 'panel_name',
				key: 'panel_name',
				sorter: (a, b) => { return a.panel_name.localeCompare(b.panel_name)}
        // render: (text, record) => popover(record),
    },
    {   
        title: 'INTEGRATION CODE',
        dataIndex: 'integration_code',
				key: 'integration_code',
				sorter: (a, b) => { return a.integration_code.localeCompare(b.integration_code)}
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
			panelListState: [],
			pagination: {
				pageSize: 5,
			}
		}
	}

	componentDidMount = async () => {
		this.populatePanelList();
	}

	populatePanelList = async () => {
		this.setState({ loading: true });
		const panelListData = await panelListAPI();
		HttpCodeMessage(panelListData.status);
		const panelListArray = []; 
		panelListData.data.map(function(valuePanel,indexPanel){ 
			panelListArray[indexPanel] = {
				key: valuePanel.panelRequestID,
				code: valuePanel.panelRequestCode, 
				panel_name: valuePanel.panelRequestName,
				integration_code: valuePanel.panelRequestIntegrationCode,
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
	}

	onClose = () => {
		this.setState({
			isDrawerVisible: false,
		});
	};

	showDrawer = async () => {
		this.setState({ loading:true });
		this.setState({
			isDrawerVisible: true,
			drawerTitle: 'Add Panel',
			drawerButton: 'Add',
			panelInfo: {},
			loading:false
		})
	}

	handleSelectChange = (value) => {
		const pagination = {...this.state.pagination};
		console.log(pagination);
		pagination.pageSize = parseInt(value);
		this.setState({ pagination });
	};

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
					<AntSelect defaultValue="5" style={{ width: 120, marginLeft: '8px' }} onChange={this.handleSelectChange}>
						<Option value="5">5</Option>
						<Option value="10">10</Option>
						<Option value="15">15</Option>
						<Option value="20">20</Option>
					</AntSelect>
				</div>
					<AntTable 
						dataSource={this.state.panelListState}
						pagination={this.state.pagination}
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
					<AntDrawer 
						title={this.state.drawerTitle}
						visible={this.state.isDrawerVisible}
						onClose={this.onClose}
						width="40%"
						destroyOnClose
					>
						<PanelForm 
							drawerButton={this.state.drawerButton} 
							panelInfo={this.state.panelInfo}
							onCancel={this.onClose}
						/>
					</AntDrawer>
			</div>
		);
	}
}

export default PanelTable;