import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Table } from 'antd';

const columns = [
	{ 
		title: 'ID',
		dataIndex: 'examRequestID',
		width: '10%'
	},
	{ 
		title: 'Exam Request Name',
		dataIndex: 'examRequestName',
		width: '30%',
		sorter: (a, b) => a.examRequestName.localeCompare(b.examRequestName)
	},
	{ 
		title: 'Exam Request Code',
		dataIndex: 'examRequestCode',
		width: '15%',
		sorter: (a, b) => a.examRequestCode.localeCompare(b.examRequestCode)
	},
	{ 
		title: 'Loinc',
		dataIndex: 'examRequestLoinc',
		width: '20%',
		sorter: (a, b) => a.examRequestLoinc.localeCompare(b.examRequestLoinc)
	},
	{ 
		title: 'Integration Code',
		dataIndex: 'examRequestIntegrationCode',
		width: '15%',
		sorter: (a, b) => a.examRequestIntegrationCode.localeCompare(b.examRequestIntegrationCode)
	},
	{ 
		title: 'Sort',
		dataIndex: 'examRequestSort',
		width: '10%'
	}
];


class ExamTable extends React.Component {
	render() {
		const { data, pageSize, loading = false, onRowDblClick } = this.props;

		return (
			<div style={{ marginTop: 20 }}>
				<Spin spinning={loading} tip="Loading...">
					<Table 
						size="small"
						pagination={{pageSize}} 
						columns={columns} 
						dataSource={data} 
						scroll={{ y: 260 }}
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
		examRequestCode: PropTypes.string.isRequired,
		examRequestLoinc: PropTypes.string.isRequired,
		examRequestIntegrationCode: PropTypes.string.isRequired,
		examRequestSort: PropTypes.any.isRequired,
	})).isRequired,
	pageSize: PropTypes.number.isRequired,
	loading: PropTypes.bool.isRequired,
	onRowDblClick: PropTypes.func.isRequired
};

export default ExamTable;