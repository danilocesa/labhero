import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Table } from 'antd';

const columns = [
	{ 
		title: 'CODE',
		dataIndex: 'code',
	},
	{ 
		title: 'EXAM NAME',
		dataIndex: 'examName',
	},
	{ 
		title: 'INST. EXAM NAME',
		dataIndex: 'instExamName',
	},
	{ 
		title: 'FACTOR',
		dataIndex: 'factor',
	},
	{ 
		title: 'DATAFORM',
		dataIndex: 'factor',
	},
	{ 
		title: 'GROUP',
		dataIndex: 'group',
	},
	{ 
		title: 'GROUP ORDER',
		dataIndex: 'order',
	}
];


class ExamTable extends React.Component {
	render() {
		const { data, pageSize, loading = false } = this.props;

		return (
			<div style={{ marginTop: 20 }}>
				<Spin spinning={loading} tip="Loading...">
					<Table 
						size="small"
						pagination={false} 
						columns={columns} 
						dataSource={data} 
						scroll={{ y: 260 }}
						rowKey={record => record.code}
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
	loading: PropTypes.bool.isRequired
};

export default ExamTable;