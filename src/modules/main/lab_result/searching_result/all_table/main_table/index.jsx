import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { globalTableSize } from 'global_config/constant-global';

import ExpandedTable from '../expanded_table';

const columns = [
	{
		title: 'REQUEST DATE', 
		dataIndex: 'requestDateTime', 
		width: 110,
		render: (text) => text.replace(/\//g, '-') 
	},
	{ 
		title: 'REQUEST ID', 
		dataIndex: 'requestID', 
		width: 120,
	},
	{ 
		title: 'LAST NAME', 
		dataIndex: 'lastName', 
		width: 200,
	},
	{ 
		title: 'FIRST NAME', 
		dataIndex: 'givenName', 
		width: 150,
	},
	{ 
		title: 'DATE OF BIRTH', 
		dataIndex: 'dateOfBirth',
		width: 120
	},
	{ 
		title: 'GENDER', 
		dataIndex: 'sex', 
		width: 120,
	},
	{ 
		title: 'HOSPITAL ID', 
		dataIndex: 'hospitalID', 
		width: 150,
	},
	{ 
		title: 'ADDRESS', 
		render: (text, record) => `${record.address || ''} ${record.townName || ''} ${record.cityMunicipalityName || ''} ${record.provinceName || ''}`.toUpperCase()
	},
];

class MainTable extends React.Component {
	expandedRowRender = (record) => {
		const { onClickTableRow, onClickPrint } = this.props;
		
		return (
			<ExpandedTable 
				expandedData={record} 
				onClickTableRow={onClickTableRow}
				onClickPrint={onClickPrint}
			/>
		);
	};
	
	render() {
		const { labResults, isLoading, pageSize } = this.props;

		return (
			<Table
				className="test-results-table"
				columns={columns}
				pagination={{ pageSize }} 
				expandedRowRender={this.expandedRowRender}
				defaultExpandAllRows
				dataSource={labResults}
				rowKey={record => record.requestID}
				size={globalTableSize}
				scroll={{ y: 300 }}
				loading={isLoading}
			/>
		);
	}
}

MainTable.propTypes = {
	isLoading: PropTypes.bool.isRequired,
	labResults: PropTypes.array.isRequired,
	pageSize: PropTypes.number.isRequired,
	onClickTableRow: PropTypes.func.isRequired,
	onClickPrint: PropTypes.func.isRequired
};

export default MainTable;
