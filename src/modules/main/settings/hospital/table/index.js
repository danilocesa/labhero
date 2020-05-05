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
import HospitalForm from '../form';

const { Search } = Input;
const columns = [
	{
		title: 'HOSPITAL ID',
		dataIndex: 'province_id',
		key: 1,
	},
	{
		title: 'HOSPITAL NAME',
		dataIndex: 'province_name',
		key: 3,
    },
];

class ProvinceTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [
				{
					province_id: '1' ,
                    province_name: 'Taguig' 
				},
				{
                    province_id: '2' ,
                    province_name: 'Taguig' 
				},
				{
                    province_id: '3' ,
                    province_name: 'Taguig' 
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
			drawerTitle: "ADD HOSPITAL",
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
			drawerTitle: "UPDATE HOSPITAL",
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
									<Icon type="plus" /> ADD HOSPITAL
									
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
							<HospitalForm
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


export default ProvinceTable;