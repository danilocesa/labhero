import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Table } from 'antd';

// CUSTOM
import { tableSize, tableYScroll, tableHeaders } from '../settings';

class LabelRangeTable extends React.Component {

	render() {
		const { data, pageSize, loading = false, onRowDblClick } = this.props;
		const { rangeLabelClass } = tableHeaders;
		const columns = [
			{ 
				title: rangeLabelClass.label.title,
				dataIndex: rangeLabelClass.label.dataIndex,
				width: 150,
				sorter: (a, b) => a.rangeClassLabel.localeCompare(b.rangeClassLabel)
			}
    ];

		return (
			<div style={{ marginTop: 20 }} className="settings-class-range-table">
				<Spin spinning={loading} tip="Loading...">
					<Table 
						size={tableSize}
						pagination={{pageSize}} 
						columns={columns} 
						dataSource={data} 
						scroll={{ y: tableYScroll }}
						rowKey={record => record.rangeClassID}
						onRow={(record) => {
							return {
								onDoubleClick: () => onRowDblClick(record)
							};
						}}
					/>
				</Spin>
			</div>
		);
	}
}


LabelRangeTable.propTypes = {
	data: PropTypes.arrayOf(PropTypes.shape({
		rangeClassID: PropTypes.number.isRequired,
		rangeClassLabel: PropTypes.string.isRequired
	})).isRequired,
	pageSize: PropTypes.number.isRequired,
	loading: PropTypes.bool.isRequired,
	onRowDblClick: PropTypes.func.isRequired
};

export default LabelRangeTable;