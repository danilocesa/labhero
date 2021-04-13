// @ts-nocheck
/* eslint-disable func-names */
// LIBRARY
import React from 'react';
import { Row, Col, Input, Table, Drawer, Icon, Button } from 'antd';

// CUSTOM MODULES
// import HttpCodeMessage from 'shared_components/message_http_status';
import { panelListAPI } from 'services/settings/panelExamRequesting';	
import TablePager from 'shared_components/table_pager';
import PanelForm from '../panel_form';

import { drawerUpdateTitle, drawerAddTitle, tablePageSize, tableSize, buttonLabels } from '../settings';

// CSS
import './paneltable.css';

// CONSTANTS
const { Search } = Input;

const columns = [
    {
        title: 'CODE',
        dataIndex: 'code',
				key: 'code',
				width: 200,
				sorter: (a, b) => { return a.code.localeCompare(b.code)}
    },
    {
        title: 'PANEL NAME',
        dataIndex: 'panel_name',
				key: 'panel_name',
				sorter: (a, b) => { return a.panel_name.localeCompare(b.panel_name)}
    },
    {   
        title: 'INTEGRATION CODE',
        dataIndex: 'integration_code',
				key: 'integration_code',
				width: 250,
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
			panelListRef: [],
			panelListState: [],
			pagination: {
				pageSize: tablePageSize,
			}
		}
	}

	componentDidMount = async () => {
		const userData = JSON.parse(sessionStorage.LOGGEDIN_USER_DATA);
		const UserDatatype = userData.loginType //1
		const jsonFormatAccessMatrix = JSON.parse(sessionStorage.ACCESS_MATRIX);
		const settingsCreateArray =  jsonFormatAccessMatrix.settings.create
		if (settingsCreateArray.some(data => data === UserDatatype))
		{
			this.setState({
				buttonAddVisible:true
			})
		}
		this.populatePanelList();
	}

	populatePanelList = async () => {
		this.setState({ loading: true });
		const panelListData = await panelListAPI();
		// if(panelListData.status !== 200){
		// 	HttpCodeMessage(panelListData.status);
		// }

		const panelListArray = []; 
		
		if(panelListData.data) {
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
		}

		this.setState({ 
			loading: false, 
			panelListState: panelListArray,
			panelListRef: panelListArray
		});
	}
    
	displayDrawerUpdate = (record) => {
		this.setState({
			isDrawerVisible: true,
			drawerTitle: drawerUpdateTitle,
			drawerButton: buttonLabels.update,
			panelInfo: record
		});
	}

	onClose = () => {
		this.setState({
			isDrawerVisible: false,
		});
	};

	onSearch = (value) => {
		const { panelListRef } = this.state;
		const searchedVal = value.toLowerCase();

		const filtered = panelListRef.filter(item => {
			// eslint-disable-next-line camelcase
			const { panel_name, integration_code } = item;

			return (
				this.containsString(panel_name, searchedVal) ||
				this.containsString(integration_code, searchedVal)
			);
		});

		this.setState({ panelListState: filtered });
	}

	onChangeSearch = (event) => {
		const { panelListRef } = this.state;

		if(event.target.value === '') 
			this.setState({ panelListState: panelListRef });
	}

	// Private Function
	containsString = (searchFrom, searchedVal) => {
		if(searchFrom === null || searchFrom === '')
			return false;

		return searchFrom.toString().toLowerCase().includes(searchedVal);
	}

	showDrawer = async () => {
		this.setState({ loading:true });
		this.setState({
			isDrawerVisible: true,
			drawerTitle: drawerAddTitle,
			drawerButton: buttonLabels.create,
			panelInfo: {},
			loading:false
		})
	}

	handleSelectChange = (value) => {
		const {pagination} = this.state; 
		// eslint-disable-next-line radix
		pagination.pageSize = parseInt(value);
		this.setState({ pagination });
	};

	render() {
		const { buttonAddVisible } = this.state
		return(
			<div>
				<div className="panel-table-options">
					<Row>
						<Col span={12}>
							<Search
								allowClear
								onSearch={value => this.onSearch(value)}
								onChange={this.onChangeSearch}
								style={{ width: 200 }}
								className="panel-table-search-input"
							/>
						</Col>
						<Col span={12} style={{ textAlign: 'right' }}>
							{ 
								buttonAddVisible === true ? 
									<Button 
										type="primary" 
										shape="round" 
										style={{ marginRight: '15px' }} 
										onClick={this.showDrawer}
									>
										<Icon type="plus" />
										{drawerAddTitle}
									</Button>
								: 
								null 
							} 
							<TablePager handleChange={this.handleSelectChange} />
						</Col>
					</Row>
				</div>
				<Table 
					className="settings-panel-exam-table"
					size={tableSize}
					dataSource={this.state.panelListState}
					pagination={{ ...this.state.pagination, showSizeChanger: false }}
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
				<Drawer 
					title={this.state.drawerTitle}
					visible={this.state.isDrawerVisible}
					onClose={this.onClose}
					width="60%"
					destroyOnClose
				>
					<PanelForm 
						drawerButton={this.state.drawerButton} 
						panelInfo={this.state.panelInfo}
						onCancel={this.onClose}
					/>
				</Drawer>
			</div>
		);
	}
}

export default PanelTable;