import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Table } from 'antd';

const columns = [
	{ 
		title: 'CODE',
		dataIndex: 'code',
	},
	{ 
		title: 'EXAM',
		dataIndex: 'profile',
	},
	{ 
		title: 'INTRUMENT EXAM',
		dataIndex: 'instExam',
	},
	{ 
		title: 'EXAM CODE',
		dataIndex: 'examCode',
	},
	{ 
		title: 'RESULT CODE',
		dataIndex: 'resultCode',
	},
	{ 
		title: 'ACTIVE',
		dataIndex: 'active',
	},
	{ 
		title: 'DIFF',
		dataIndex: 'diff',
	}
];


class ExamTable extends React.Component {
	render() {
		const { data, pageSize, loading = false, onRowDblClick } = this.props;

		return (
			<div style={{ marginTop: 20 }}>
				<Spin spinning={loading} tip="Loading...">
					<Table 
						pagination={{pageSize}} 
						columns={columns} 
						dataSource={data} 
						scroll={{ y: 260 }}
						rowKey={record => record.code}
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
		code: PropTypes.string.isRequired,
		profile: PropTypes.string.isRequired,
		status: PropTypes.string.isRequired,
		template: PropTypes.string.isRequired,
	})).isRequired,
	pageSize: PropTypes.number.isRequired,
	loading: PropTypes.bool.isRequired,
	onRowDblClick: PropTypes.func.isRequired
};

export default ExamTable;