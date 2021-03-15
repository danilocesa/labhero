// @ts-nocheck
// LIBRARY
import React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Row, Col, Table, Button, Input, Icon, Drawer } from 'antd';
// import fetchbloodTests from 'services/blood_bank/blood_group';
import TablePager from 'shared_components/table_pager';

// CUSTOM
import { 
	drawerAdd, 
	drawerUpdate, 
	tableSize ,
	tableYScroll,
	tablePageSize
} from '../settings';
import UserAccountForm from '../form';

const { Search } = Input;
const columns = [
	{
		title: 'ID',
		dataIndex: 'id',
		key: 'id',
	},
	{
		title: 'BLOOD TEST',
		dataIndex: 'blood_test',
		key: 'blood_test',
	},
	{
		title: 'DESCRIPTION',
		dataIndex: 'blood_desc',
		key: 'blood_desc',
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
			bloodTest: [
				{
					id: '001',
					blood_test: 'HEPATITIS B',
					blood_desc: 'SURFACE ANTIGEN (HBSAG)',
					normal_values: 'LESS THAN 5 MIU',
				},
			],
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

	// async componentDidMount() {
	// 	this.setState({loading:true});
	// 	const response = await fetchbloodTests();
	// 	console.log("Data:",response)
	// 	this.setState({ 
	// 		bloodTest: response,
	// 		usersRef:response,
	// 		pagination: response.length,
	// 		loading:false
	// 	});
	// }

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

  onSearch = (value) => {
    const searchedVal = value.toLowerCase();
		const { usersRef } = this.state;
    const filtered = usersRef.filter((item) => {
      // eslint-disable-next-line camelcase
      const { blood_group } = item;

      return (
        this.containsString(blood_group, searchedVal)
      );
    });
		this.setState({ bloodTest: filtered });
  };

  onChangeSearch = (event) => {
    const { usersRef } = this.state;
    if (event.target.value === "") this.setState({ bloodTest: usersRef });
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
			pagination, 
			drawerButton, 
			patientInfo, 
			visible,
			drawerTitle,
			selectedBloodTest, 
			actionType,
			bloodTest,
			loading ,
			pagination1
		} = this.state;
		console.log(pagination,"pagination")
		console.log(pagination1,"pagination1")
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

				{
					pagination1 == 0
					? 
						(		
							<Table 
								// loading={loading}
								dataSource={bloodTest}
								//size={tableSize}
								//scroll={{ y: tableYScroll }}
								columns={columns} 
								//pagination={pagination}
								rowKey={record => record.userID}
								onRow={(record) => {
									return {     
										onDoubleClick: () => {
											this.displayDrawerUpdate(record);
										}
									}
								}}
							/>
						)	
					: 
						(
							<Table 
								// loading={loading}
								dataSource={bloodTest}
								//size={tableSize}
								scroll={{ y: tableYScroll }}
								columns={columns} 
								//pagination={pagination}
								rowKey={record => record.userID}
								onRow={(record) => {
									return {     
										onDoubleClick: () => {
											this.displayDrawerUpdate(record);
										}
									}
								}}
							/>
						)
				}	
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