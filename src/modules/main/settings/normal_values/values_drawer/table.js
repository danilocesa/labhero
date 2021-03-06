import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Table } from 'antd';

// CUSTOM
import { tableSize, tableYScroll, tableHeaders } from '../settings';

// CSS
// import './exam_item.css';

class NormalValuesTable extends React.Component {

	render() {
		const { data, pageSize, loading = false, onRowDblClick } = this.props;
		const { normalValues } = tableHeaders;
		const columns = [
			{ 
				title: normalValues.gender.title,
				dataIndex: normalValues.gender.dataIndex,
				width: 150,
				sorter: (a, b) => a.sex.localeCompare(b.sex)
			},
			{ 
				title: normalValues.ageBracket.title,
				dataIndex: normalValues.ageBracket.dataIndex,
				width: 150,
				sorter: (a, b) => a.ageBracketLabel.localeCompare(b.ageBracketLabel)
			},
			{ 
				title: normalValues.machine.title,
				dataIndex: normalValues.machine.dataIndex,
				width: 250,
				sorter: (a, b) => a.analyzerName.localeCompare(b.analyzerName)
			},
			{ 
				title: normalValues.displayValue.title,
				dataIndex: normalValues.displayValue.dataIndex,
				width: 200,
				sorter: (a, b) => a.displayValue.localeCompare(b.displayValue),
				render: (text) => (
					<div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
						{text}
					</div>
				),
			},
			{ 
				title: normalValues.labelOfRange.title,
				dataIndex: normalValues.labelOfRange.dataIndex,
				sorter: (a, b) => a.rangeClassLabel.localeCompare(b.rangeClassLabel)
			}
		];

		return (
			<div style={{ marginTop: 20 }} className="settings-exam-item-table">
				<Spin spinning={loading} tip="Loading...">
					<Table 
						size={tableSize}
						pagination={{ pageSize, showSizeChanger: false }} 
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


NormalValuesTable.propTypes = {
	data: PropTypes.arrayOf(PropTypes.shape({
		examItemRangeID: PropTypes.number.isRequired,
		sex: PropTypes.string.isRequired,
		ageBracketLabel: PropTypes.string.isRequired,
		analyzerName: PropTypes.string.isRequired,
		displayValue: PropTypes.string.isRequired,
	})).isRequired,
	pageSize: PropTypes.number.isRequired,
	loading: PropTypes.bool.isRequired,
	onRowDblClick: PropTypes.func.isRequired
};

export default NormalValuesTable;