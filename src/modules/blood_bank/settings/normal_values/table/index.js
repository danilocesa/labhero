// @ts-nocheck
// LIBRARY
import React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Row, Col, Table, Button, Input, Icon, Drawer } from 'antd';
import TablePager from 'shared_components/table_pager';
import fetchNormalValuesItems from 'services/blood_bank/normal_values'
import UserAccountForm from '../form';

const { Search } = Input;
const columns = [
	{
		title: 'BLOOD ID',
		dataIndex: 'normal_value_id',
		key: 'normal_value_id',
	},
	{
		title: 'BLOOD TEST',
		dataIndex: 'reference_field_name',
		key: 'reference_field_name',
	},
	{
		title: 'DESCRIPTION',
		dataIndex: 'prompt_message',
		key: 'prompt_message',
	},
	{
		title: 'NORMAL VALUES',
		dataIndex: 'normal_values',
		key: 'normal_values',
	},
];

class BloodTestTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			normalValuesList: [],
			actionType:'add',
			drawerTitle: '',
			loading:false,
			drawerButton: '',
			selectedBloodTest:{},
			pagination: {
				pageSize: 0,
			},
			pagination1:0
		}
	}

	onClose = () => {
		this.setState({
			visible: false,
			patientInfo: [],
		});
	};

	showDrawer = (record) => {
		this.setState({
			visible: true,
			drawerTitle: "ADD BLOOD TEST",
			drawerButton: 'ADD',
			actionType : 'add',
			selectedBloodTest: record,
		});
	};

	displayDrawerUpdate = (record) => {
		this.setState({
			visible: true,
			drawerTitle: "UPDATE BLOOD TEST",
			drawerButton: 'UPDATE',
			actionType:'update',
			selectedBloodTest:record
		});
	}

	async componentDidMount() {
    const normalValuesList = await fetchNormalValuesItems();
		this.setState({
			normalValuesList:normalValuesList.results,
			usersRef:normalValuesList.results
		})
  }

  onSearch = (value) => {
    const searchedVal = value.toLowerCase();
		const { usersRef } = this.state;
    const filtered = usersRef.filter((item) => {
      // eslint-disable-next-line camelcase
      const { reference_field_name } = item;

      return (
        this.containsString(reference_field_name, searchedVal)
      );
    });
		this.setState({ normalValuesList: filtered });
  };

  onChangeSearch = (event) => {
    const { usersRef } = this.state;
    if (event.target.value === "") this.setState({ normalValuesList: usersRef });
  };

	// Private Function
  containsString = (searchFrom, searchedVal) => {
    if (searchFrom === null || searchFrom === "") return false;
    return searchFrom.toString().toLowerCase().includes(searchedVal);
  };
	
	handleSelectChange = (value) => {
		// eslint-disable-next-line react/no-access-state-in-setstate
		const pagination1 = {...this.state.pagination};
		// eslint-disable-next-line radix
		pagination1.pageSize = parseInt(value);
		this.setState({ pagination1:pagination1 });
	};

	render() {
		const { 
			drawerButton, 
			patientInfo, 
			visible,
			drawerTitle,
			selectedBloodTest, 
			actionType,
			normalValuesList,
		} = this.state;
		return(
			<div>
				<div className="settings-user-table-action">
					<Row>
						<Col span={12}>
						<Search
							allowClear
							onSearch={(value) => this.onSearch(value)}
							onChange={this.onChangeSearch}
							style={{ width: 200 }}
							className="panel-table-search-input"
						/>
						</Col>
						<Col span={12} style={{ textAlign: 'right' }}>
							<Button 
								type="primary" 
								shape="round" 
								style={{ marginRight: '15px' }} 
								onClick={this.showDrawer}
							>
								<Icon type="plus" /> ADD BLOOD TEST
							</Button>
							<TablePager handleChange={this.handleSelectChange} />
						</Col>
					</Row>
				</div>
				<DndProvider backend={HTML5Backend}>
				<div className="settings-user-table">
					<Table 
						dataSource={normalValuesList}
						columns={columns} 
						rowKey={record => record.userID}
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
						title={drawerTitle}
						width="30%"
						visible={visible}
						onClose={this.onClose}
						destroyOnClose
					>
						<UserAccountForm
							selectedBloodTest={selectedBloodTest} 
							actionType={actionType}
							drawerButton={drawerButton} 
							patientInfo={patientInfo}
							onClose={this.onClose}
						/>
					</Drawer>
				</DndProvider>
			</div>
		)
	}
}


export default BloodTestTable;	