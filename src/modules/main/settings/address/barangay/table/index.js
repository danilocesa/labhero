// @ts-nocheck
// LIBRARY
import React from 'react';
import { Row, Col, Table, Button, Input, Icon, Drawer } from 'antd';
import TablePager from 'shared_components/table_pager';

// CUSTOM
import { 
	tableSize ,
	tableYScroll,
	drawerAdd,
	drawerUpdate
} from '../settings';
import BarangayForm from '../form';

const { Search } = Input;
const columns = [
	{
		title: 'BARANGAY ID',
		dataIndex: 'barangay_id',
		key: 1,
	},
	{
		title: 'BARANGAY CODE',
		dataIndex: 'barangay_code',
		key: 2,	
	},
	{
		title: 'BARANGAY NAME',
		dataIndex: 'barangay_name',
		key: 3,
    }
	
];

class BarangayTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [
				{
					barangay_id: '1' ,
                    barangay_code: '0001' ,
                    barangay_name: 'Taguig' 
				},
				{
                    barangay_id: '2' ,
                    barangay_code: '0002' ,
                    barangay_name: 'Taguig' 
				},
				{
					barangay_id: '2' ,
                    barangay_code: '0002' ,
                    barangay_name: 'Taguig' 
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
			drawerTitle: "ADD BARANGAY",
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
			drawerTitle: "UPDATE BARANGAY",
			drawerButton: drawerUpdate,
			actionType:'update',
			patientInfo: record
		});
	}

	render() {
		const { pagination, drawerButton, patientInfo, visible, drawerTitle, loading,actionType } = this.state;
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
									<Icon type="plus" /> ADD BARANGAY
									
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
							<BarangayForm
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


export default BarangayTable;