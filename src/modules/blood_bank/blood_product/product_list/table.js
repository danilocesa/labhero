import React from 'react';
import PropTypes from 'prop-types';
import { GLOBAL_TABLE_SIZE } from 'global_config/constant-global';
import { Table as AntTable, Spin } from 'antd';


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

	render() {
		const { pageSize, loading, handleDoubleClick } = this.props;
    
		// CONSTANTS
		const columns = [
			{
				title: 'BAG ID',
				dataIndex: 'bag_id',
				width: 140
			},
			{
				title: 'DATE EXTRACTED',
				dataIndex: 'created_date',
				width: 140
			},
			{
				title: 'BEST BEFORE',
				dataIndex: 'best_before',
				width: 140
			},
			{
				title: 'SIZE',
				dataIndex: 'size',
				width: 140
      }, 
      {
				title: 'BLOOD TYPE',
				dataIndex: 'blood_type',
				width: 140
      }, 
      {
				title: 'REMARK',
				dataIndex: 'remarks',
      }, 
      {
				title: 'STATUS',
				dataIndex: 'status',
				width: 140
			}, 
		];

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
								onDoubleClick: () => { handleDoubleClick(record) }
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
	handleDoubleClick: PropTypes.func.isRequired
};

export default ProductListTable;