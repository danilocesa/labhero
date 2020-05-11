// @ts-nocheck
// LIBRARY
import React from 'react';
import { Row, Col, Table, Button, Input, Icon, Drawer } from 'antd';
import TablePager from 'shared_components/table_pager';

// CUSTOM
import QuestionTable from '../form'
import { 
	tableSize ,
} from '../settings';

const { Search } = Input;
const columns = [
	{
		title: 'ID',
		dataIndex: 'id',
		key: 1,
	},
	{
		title: 'CATEGORY',
		dataIndex: 'category',
		key: 2,	
    },
    {
		title: 'QUESTION',
		dataIndex: 'question',
		key: 2,	
	},
	{
		title: 'ANSWER',
		dataIndex: 'description',
		key: 3,
	},
];

class BloodBank extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [
				{
					id: '1',
					blood_group: 32,
					description: 'New York No. 1 Lake Park',
				},
				{
					id: '2',
					blood_group: 'Jim Green',
					description: 'London No. 1 Lake Park',
				},
				{
					id: '3',
					blood_group: 'Joe Black',
					description: 'Sidney No. 1 Lake Park',
				},
				],
			actionType:'add',
			drawerTitle: '',
		}
	}
	
	showDrawer = () => {
		this.setState({
			visible: true,
			drawerTitle: "ADD QUESTION",
			drawerButton: "ADD",
			actionType : 'add',
		});
	};

	onClose = () => {
		this.setState({
			visible: false,
		});
	};

	displayDrawerUpdate = () => {
		this.setState({
			visible: true,
			drawerTitle: "UPDATE QUESTION",
			drawerButton: "UPDATE",
			actionType:'update',
            
		});
    };


	render() {
		const { pagination, visible, drawerTitle, loading,actionType,drawerButton } = this.state;
			return(
				<div>
					<div className="settings-user-table-action">
						<Row>
							<Col span={12}>
							<Search
								placeholder="input search text"
								onSearch={value => console.log(value)}
								style={{ width: 200 }}
							/>
							</Col>
							<Col span={12} style={{ textAlign: 'right' }}>
								<Button 
									type="primary" 
									shape="round" 
									style={{ marginRight: '15px' }} 
									onClick={this.showDrawer}
								>
									<Icon type="plus" /> ADD QUESTION
								</Button>
								<TablePager handleChange={this.handleSelectChange} />
							</Col>
						</Row>
					</div>
					<div className="settings-user-table">
						<Table 
							dataSource={this.state.data}
							loading={loading}
							size={tableSize}
							columns={columns} 
							pagination={pagination}
							rowKey={record => record.userID}
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
							width="30%"
							visible={visible}
							onClose={this.onClose}
							destroyOnClose
						> 
							<QuestionTable 
							actionType={actionType}
							drawerButton={drawerButton} 
							/>	
						</Drawer>
				</div>
			)
	}
}


export default BloodBank;