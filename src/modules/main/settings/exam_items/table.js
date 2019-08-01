import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Table } from 'antd';

const columns = [
	{ 
<<<<<<< HEAD:src/modules/main/settings/exam_item_jer/table.js
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
=======
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
>>>>>>> 257cf40d03ee51ae45fc5e76cf255df74ab7f556:src/modules/main/settings/exam_items/table.js
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
<<<<<<< HEAD:src/modules/main/settings/exam_item_jer/table.js
						rowKey={record => record.resultID}
=======
						rowKey={record => record.code}
>>>>>>> 257cf40d03ee51ae45fc5e76cf255df74ab7f556:src/modules/main/settings/exam_items/table.js
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
<<<<<<< HEAD:src/modules/main/settings/exam_item_jer/table.js
		resultID: PropTypes.number.isRequired,
		resultName: PropTypes.string.isRequired,
		resultGeneralName: PropTypes.string.isRequired,
		integrationCode: PropTypes.string.isRequired,
=======
		code: PropTypes.string.isRequired,
		profile: PropTypes.string.isRequired,
		status: PropTypes.string.isRequired,
		template: PropTypes.string.isRequired,
>>>>>>> 257cf40d03ee51ae45fc5e76cf255df74ab7f556:src/modules/main/settings/exam_items/table.js
	})).isRequired,
	pageSize: PropTypes.number.isRequired,
	loading: PropTypes.bool.isRequired,
	onRowDblClick: PropTypes.func.isRequired
};

export default ExamTable;