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
				dataIndex: 'ageBracketLabel',
				width: 150,
				sorter: (a, b) => a.ageBracketLabel.localeCompare(b.ageBracketLabel)
			},
			{ 
				title: ageBracket.ageBracket.title,
				render: (text, record) => `
					${record.bracketFrom} ${record.bracketFromUnit} - ${record.bracketTo} ${record.bracketToUnit} 
				`,
				width: 150,
				sorter: (a, b) => a.ageBracketLabel.localeCompare(b.ageBracketLabel)
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
						rowKey={record => record.ageBracketID}
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
		bracketFrom: PropTypes.number.isRequired,
		bracketFromUnit: PropTypes.string.isRequired,
		bracketTo: PropTypes.number.isRequired,
		bracketToUnit: PropTypes.string.isRequired,
		ageBracketLabel: PropTypes.string.isRequired,
	})).isRequired,
	pageSize: PropTypes.number.isRequired,
	loading: PropTypes.bool.isRequired,
	onRowDblClick: PropTypes.func.isRequired
};

export default AgeBracketTable;