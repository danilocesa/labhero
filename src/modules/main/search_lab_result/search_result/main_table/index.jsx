import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

import ExpandedTable from '../expanded_table';

const columns = [
	{ 
		title: 'PATIENT ID', 
		dataIndex: 'patientID', 
		width: 120,
	},
	{ 
		title: 'HOSPITAL ID', 
		dataIndex: 'hospitalID', 
		width: 150,
	},
	{ 
		title: 'LAST NAME', 
		dataIndex: 'lastName', 
		width: 200,
	},
	{ 
		title: 'FIRST NAME', 
		dataIndex: 'givenName', 
		width: 200,
	},
	{ 
		title: 'DATE OF BIRTH', 
		dataIndex: 'dateOfBirth',
		width: 120,
	},
	{ 
		title: 'GENDER', 
		dataIndex: 'sex', 
		width: 120,
	},
	{ 
		title: 'ADDRESS', 
		dataIndex: 'Address', 
	},
];

class MainTable extends React.Component {
	expandedRowRender = (record) => {
		const { onClickTableRow } = this.props;

		return (
			<ExpandedTable 
				expandedData={record.contents} 
				onClickTableRow={onClickTableRow}
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
				dataSource={labResults}
				rowKey={record => record.patientID}
				size="small"
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
	onClickTableRow: PropTypes.func.isRequired
};

export default MainTable;
