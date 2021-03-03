import React from 'react';
import PropTypes from 'prop-types';
import { globalTableSize } from 'global_config/constant-global';
import { Table as AntTable, Spin } from 'antd';


const sampleData = [
	{
		bag_id: '10001',
		product_type: 'Red Cells',
		date_processed: '01/02/2021',
		best_before: '02/11/2021',
		size: '100 ml',
		remarks: 'Anticoagulant: CPD',
		status: '-'
	},
	{
		bag_id: '10002',
		product_type: 'Platelets',
		date_processed: '01/02/2021',
		best_before: '01/02/2021',
		size: '100 ml',
		remarks: '',
		status: 'Expired'
	}
];

class ProductDetailTable extends React.Component {

	render() {
		const { pageSize, loading, handleDoubleClick } = this.props;
    
		// CONSTANTS
		const columns = [
			{
				title: 'PRODUCT BAG ID',
				dataIndex: 'bag_id',
			},
			{
				title: 'PRODUCT TYPE',
				dataIndex: 'product_type',
			},
			{
				title: 'DATE PROCESSED',
				dataIndex: 'date_processed',
			},
			{
				title: 'BEST BEFORE',
				dataIndex: 'best_before',
      }, 
      {
				title: 'SIZE',
				dataIndex: 'size',
      }, 
      {
				title: 'REMARKS',
				dataIndex: 'remarks',
      }, 
      {
				title: 'STATUS',
				dataIndex: 'status',
			}, 
		];

		return (
			<Spin spinning={loading} tip="Loading...">
				<div>
					<AntTable 
						size={globalTableSize}
						pagination={false} 
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

ProductDetailTable.propTypes = {
	pageSize: PropTypes.number.isRequired,
	loading: PropTypes.bool.isRequired,
	handleDoubleClick: PropTypes.func.isRequired
};

export default ProductDetailTable;