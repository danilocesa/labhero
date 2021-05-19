import React from 'react';
import PropTypes from 'prop-types';
import { GLOBAL_TABLE_SIZE } from 'global_config/constant-global';
import { Table } from 'antd';

// CONSTANTS
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

	render() {
    
	const {Data } =  this.props
		return (
			<Table columns={columns} dataSource={Data}/>
		);
	}
}


ProductListTable.propTypes = {
  Data:PropTypes.array.isRequired,
}

export default ProductListTable;