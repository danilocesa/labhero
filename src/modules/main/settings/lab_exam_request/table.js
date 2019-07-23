import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Table } from 'antd';

const columns = [
	{ 
		title: 'REQUEST ID',
		dataIndex: 'requestID',
		width: '10%'
	},
	{ 
		title: 'EXAM REQUEST NAME',
		dataIndex: 'examRequestName',
		width: '25%'
	},
	{ 
		title: 'I. CODE',
		dataIndex: 'iCode',
		width: '10%'
	},
	{ 
		title: 'TYPE',
		dataIndex: 'type',
		width: '10%'
	},
	{ 
		title: 'SPECIMEN',
		dataIndex: 'specimen',
		width: '15%'
	},
	{ 
		title: 'A',
		dataIndex: 'a',
		width: '5%'
	},
	{ 
		title: 'C',
		dataIndex: 'c',
		width: '5%'
	},
	{ 
		title: 'S',
		dataIndex: 's',
		width: '5%'
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
						rowKey={record => record.requestID}
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
		requestID: PropTypes.string.isRequired,
		examRequestName: PropTypes.string.isRequired,
		iCode: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
		specimen: PropTypes.string.isRequired,
		a: PropTypes.string.isRequired,
		s: PropTypes.string.isRequired,
		c: PropTypes.string.isRequired,
	})).isRequired,
	pageSize: PropTypes.number.isRequired,
	loading: PropTypes.bool.isRequired,
	onRowDblClick: PropTypes.func.isRequired
};

export default ExamTable;