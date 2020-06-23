// LIBRARY
import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Table } from 'antd';

// CUSTOM
import { tableYScroll, tableSize } from '../settings';

// CSS
import './search_table.css';

class ExamTable extends React.Component {
	render() {
		const { data, pageSize, loading = false, onRowDblClick } = this.props;
		const columns = [
			{ 
				title: 'ID',
				dataIndex: 'examRequestID',
				width: 70
			},
			{ 
				title: 'EXAM REQUEST NAME',
				dataIndex: 'examRequestName',
				width: 300,
				sorter: (a, b) => {
					const prev = a.examRequestName || '';
					const next = b.examRequestName || '';
		
					return prev.localeCompare(next);
				},
			},
			{ 
				title: 'EXAM REQUEST CODE',
				dataIndex: 'examRequestCode',
				width: 300,
				sorter: (a, b) => {
					const prev = a.examRequestCode || '';
					const next = b.examRequestCode || '';
		
					return prev.localeCompare(next);
				}
			},
			{ 
				title: 'Loinc',
				dataIndex: 'examRequestLoinc',
				width: 250,
				sorter: (a, b) => {
					const prev = a.examRequestLoinc || '';
					const next = b.examRequestLoinc || '';
		
					return prev.localeCompare(next);
				}
			},
			{ 
				title: 'INTEGRATION CODE',
				dataIndex: 'examRequestIntegrationCode',
				width: 220,
				sorter: (a, b) => {
					const prev = a.examRequestIntegrationCode || '';
					const next = b.examRequestIntegrationCode || '';
		
					return prev.localeCompare(next);
				}
			},
			{ 
				title: 'SORT',
				dataIndex: 'examRequestSort',
			}
		];

		return (
			<div style={{ marginTop: 20 }}>
				<Spin spinning={loading} tip="Loading...">
					<Table 
						className="ser-search-table"
						size={tableSize}
						pagination={{ pageSize, showSizeChanger: false }} 
						columns={columns} 
						dataSource={data} 
						scroll={{ y: tableYScroll }}
						rowKey={record => record.examRequestID}
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


ExamTable.propTypes = {
	data: PropTypes.arrayOf(PropTypes.shape({
		examRequestID: PropTypes.any.isRequired,
		examRequestName: PropTypes.string.isRequired,
		examRequestCode: PropTypes.string,
		examRequestLoinc: PropTypes.string,
		examRequestIntegrationCode: PropTypes.string,
		examRequestSort: PropTypes.any.isRequired,
	})).isRequired,
	pageSize: PropTypes.number.isRequired,
	loading: PropTypes.bool.isRequired,
	onRowDblClick: PropTypes.func.isRequired
};

export default ExamTable;