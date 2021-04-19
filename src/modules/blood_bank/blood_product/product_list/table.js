import React from 'react';
import PropTypes from 'prop-types';
import { GLOBAL_TABLE_SIZE } from 'global_config/constant-global';
import { Table as AntTable, Spin } from 'antd';

// CONSTANTS
const columns = [
	{
		title: 'BLOOD TYPE',
		dataIndex: 'blood_type',
		width: 140
	},
	{
		title: 'BAG ID',
		dataIndex: 'bag_id',
		width: 140
	},
	{
		title: 'STORAGE',
		dataIndex: 'storage',
		width: 140
	},
	{
		title: 'EXTRACTED DATE',
		dataIndex: 'size',
		width: 140
	}, 
	{
		title: 'EXPRIRATION DATE',
		dataIndex: 'expriration_date',
		width: 140
	},  
	{
		title: 'STATUS',
		dataIndex: 'status',
		width: 140
	}, 
];

const sampleData = [
	{
		bag_id: '0001',
		created_date: '01/01/2021',
		best_before: '01/21/2021',
		size: '350ml',
		blood_type: 'O+',
		remarks: 'Anticoagulant: CPDA',
		status: '-'
	}
];

class ProductListTable extends React.Component {

	handleDoubleClick = (record) =>{
		this.props.history.push('/bloodbank/blood_product/detail' );
	}


	render() {
		const { pageSize, loading, handleDoubleClick } = this.props;
    
		return (
			<Spin spinning={loading} tip="Loading...">
				<div>
					<AntTable 
						size={GLOBAL_TABLE_SIZE}
						pagination={{ pageSize, showSizeChanger: false }} 
						columns={columns} 
						dataSource={sampleData} 
						scroll={{ y: 260 }}
						rowKey={record => record.patientID}
						onRow={(record) => {
							return { 
								onDoubleClick: () => { 
									this.handleDoubleClick(record) 
								}
							};
						}}
					/>
				</div>
			</Spin>
		);
	}
}

ProductListTable.propTypes = {
	pageSize: PropTypes.number.isRequired,
	loading: PropTypes.bool.isRequired,
};

export default ProductListTable;