// @ts-nocheck
// LIBRARY
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Table, Button, Input, Icon, Drawer } from 'antd';
import TablePager from 'shared_components/table_pager';

// CUSTOM
import { 
	tableSize ,
	tableYScroll,
	drawerAdd,
	drawerUpdate
} from '../settings';
import UserAccountForm from '../add_form';

const { Search } = Input;
const columns = [
	{
		title: 'ID',
		dataIndex: 'id',
		key: 1,
		width: 200
	},
	{
		title: 'BLOOD GROUP',
		dataIndex: 'item_name',
		key: 2,	
		width: 300
	},
	{
		title: 'DESCRIPTION',
		dataIndex: 'description',
		key: 3,
	},
];

class BloodGroupTable extends React.Component {
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
			drawerButton: '',
		}
	}
	
	showDrawer = () => {
		this.setState({
			visible: true,
			drawerTitle: "ADD BLOOD GROUP",
			drawerButton: drawerAdd,
			actionType : 'add',
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
			drawerTitle: "UPDATE BLOOD GROUP",
			drawerButton: drawerUpdate,
			actionType:'update',
			patientInfo: record
		});
	}

	render() {
		const { pagination, drawerButton, patientInfo, visible, drawerTitle, loading,actionType } = this.state;
		const { data } = this.props;

		console.log('bloodgroup table', data);

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
								<Icon type="plus" /> ADD BLOOD GROUP
								
							</Button>
							<TablePager handleChange={this.handleSelectChange} />
						</Col>
					</Row>
				</div>
				<div className="settings-user-table">
					<Table 
						// dataSource={this.state.data}
						dataSource={data}
						loading={loading}
						size={tableSize}
						scroll={{ y: tableYScroll }}
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
						<UserAccountForm
							actionType={actionType}
							drawerButton={drawerButton} 
							patientInfo={patientInfo}
							onClose={this.onClose}
						/>
					</Drawer>
			</div>
		)
	}
}

BloodGroupTable.propTypes = {
	data: PropTypes.array.isRequired
};

export default BloodGroupTable;