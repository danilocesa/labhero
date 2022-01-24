import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

const columns = [
	{
		title: 'BLOOD TYPE',
		dataIndex: 'blood_type_name',
		width: 140
	},
	{
		title: 'BAG ID',
		dataIndex: 'blood_bag_id',
		width: 140
	},
	{
		title: 'STORAGE',
		dataIndex: 'storage_name',
		width: 140
	},
	{
		title: 'EXTRACTED DATE',
		dataIndex: 'date_extracted',
		width: 140
	}, 
	{
		title: 'EXPRIRATION DATE',
		dataIndex: 'expiration_date',
		width: 140
	},  
	{
		title: 'STATUS',
		dataIndex: 'status_name',
		width: 140
	}, 
];

class ProductListTable extends React.Component {

	BloodProductDetails = (record) => {
		const { onSubmit, loading } = this.props;
		onSubmit(record);   
	}

	render() {
		const { Data,loading } =  this.props

		return (
			<Table 
				loading={loading}
				columns={columns} 
				dataSource={Data}
				onRow={(record) => ({
					onDoubleClick: () => { 
						this.BloodProductDetails(record);
					},
				})}
			/>
		);
	}
}

ProductListTable.propTypes = {
  Data:PropTypes.array.isRequired,
}

export default ProductListTable;