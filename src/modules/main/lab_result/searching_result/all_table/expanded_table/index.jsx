import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'antd';
import { globalTableSize } from 'global_config/constant-global';

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
		const { contents, ...restProps } = expandedData;

		return (
			<Table
		    columns={columns}
		    dataSource={contents}
		    pagination={false}
				size={globalTableSize}
				rowKey={record => `${record.sampleSpecimenID}-${record.specimenID}`}
        onRow={record => {
          return { onClick: () => { 
						onClickTableRow({ 
							examDetails: record, 
							patientInfo: { ...restProps }
						}); 
					}};
        }}
			/>
		);
	}
}

ExpandedTable.propTypes = {
	expandedData: PropTypes.shape({
		contents: PropTypes.array
	}).isRequired,
	onClickTableRow: PropTypes.func.isRequired
};

export default ExpandedTable;
