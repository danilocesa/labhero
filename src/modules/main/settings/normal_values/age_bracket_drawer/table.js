import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Table } from 'antd';

// CUSTOM
import { tableSize, tableYScroll, tableHeaders } from '../settings';

class AgeBracketTable extends React.Component {

	render() {
		const { data, pageSize, loading = false, onRowDblClick } = this.props;
		const { ageBracket } = tableHeaders;
		const columns = [
			{ 
				title: ageBracket.rangeLabel.title,
				dataIndex: ageBracket.rangeLabel.dataIndex,
				width: 150
			},
			{ 
				title: ageBracket.ageBracket.title,
				dataIndex: ageBracket.ageBracket.dataIndex,
				width: 150
			}
    ];

		return (
			<div style={{ marginTop: 20 }} className="settings-age-bracket-table">
				<Spin spinning={loading} tip="Loading...">
					<Table 
						size={tableSize}
						pagination={{pageSize}} 
						columns={columns} 
						dataSource={data} 
						scroll={{ y: tableYScroll }}
						rowKey={record => record.examItemRangeID}
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


AgeBracketTable.propTypes = {
	data: PropTypes.arrayOf(PropTypes.shape({
		examItemRangeID: PropTypes.number.isRequired,
		sex: PropTypes.string.isRequired,
		ageBracket: PropTypes.string.isRequired,
		analyzerName: PropTypes.string.isRequired,
		displayValue: PropTypes.string.isRequired,
		rangeLabel: PropTypes.string.isRequired,
	})).isRequired,
	pageSize: PropTypes.number.isRequired,
	loading: PropTypes.bool.isRequired,
	onRowDblClick: PropTypes.func.isRequired
};

export default AgeBracketTable;