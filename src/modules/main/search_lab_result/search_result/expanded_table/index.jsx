import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

const columns = [
	{
		title: 'Section ID',
		dataIndex: 'sectionID',
		width:'20%',
	},
	{
		title: 'Section Name',
		dataIndex: 'sectionName',
	},
	{ 
		title: 'Section Code', 
		dataIndex: 'sectionCode', 
		width:'20%',
	},
	{ 
		title: 'Sample Specimen ID', 
		dataIndex: 'specimenID', 
		width:'20%',
	},
	{ 
		title: 'Specimen Name', 
		dataIndex: 'specimenName', 
		width:'20%',
	},
];

class ExpandedTable extends React.Component {
	render() {
		const { expandedData, onClickTableRow } = this.props;

		return (
			<Table
		    columns={columns}
		    dataSource={expandedData}
		    pagination={false}
				size="small"
				rowKey={record => `${record.sectionID}-${record.specimenID}`}
        onRow={(record, rowIndex) => {
          return { onDoubleClick: onClickTableRow };
        }}
			/>
		);
	}
}

ExpandedTable.propTypes = {
	expandedData: PropTypes.arrayOf(PropTypes.shape({
		sectionID: PropTypes.number,
		sectionName: PropTypes.string,
		sectionCode: PropTypes.string,
		specimenID: PropTypes.number,
		specimenName: PropTypes.string
	})).isRequired,
	onClickTableRow: PropTypes.func.isRequired
};

export default ExpandedTable;
