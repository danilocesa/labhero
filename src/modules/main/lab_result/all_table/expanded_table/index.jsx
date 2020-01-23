import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'antd';

const columns = [
	{
		title: 'Section',
		dataIndex: 'sectionName',
		width: 150,
	},
	{ 
		title: 'Sample ID No.', 
		dataIndex: 'sampleSpecimenID', 
		width: 170,
	},
	{ 
		title: 'Specimen', 
		dataIndex: 'specimenName', 
		width: 150,
	},
	{ 
		title: 'Exam Requested', 
		dataIndex: 'examRequestNames', 
	},
	{
		title: '', 
		width: 100,
		render: () => (<Button>Print</Button>)
	}
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
				rowKey={record => `${record.sampleSpecimenID}-${record.specimenID}`}
        onRow={record => {
          return { onClick: () => { onClickTableRow(record); } };
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
