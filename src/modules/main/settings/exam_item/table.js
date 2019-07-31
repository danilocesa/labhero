import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Table } from 'antd';

const columns = [
	{ 
		title: 'RESULT ID',
		dataIndex: 'resultID',
		width: '20%'
	},
	{ 
		title: 'RESULT NAME',
		dataIndex: 'resultName',
		width: '20%'
	},
	{ 
		title: 'RESULT GENERAL NAME',
		dataIndex: 'resultGeneralName',
		width: '20%'
	},
	{ 
		title: 'RESULT TYPE',
		dataIndex: 'resultType',
		width: '20%'
	},
	{ 
		title: 'INTEGRATION CODE',
		dataIndex: 'integrationCode',
		width: '20%'
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
						rowKey={record => record.resultID}
						onRow={() => {
							return {
								onDoubleClick: () => onRowDblClick()
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
		resultID: PropTypes.number.isRequired,
		resultName: PropTypes.string.isRequired,
		resultGeneralName: PropTypes.string.isRequired,
		integrationCode: PropTypes.string.isRequired,
	})).isRequired,
	pageSize: PropTypes.number.isRequired,
	loading: PropTypes.bool.isRequired,
	onRowDblClick: PropTypes.func.isRequired
};

export default ExamTable;