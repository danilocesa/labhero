// LIBRARY
import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Table } from 'antd';

// CUSTOM
import {tableSize, tableYScroll} from './settings';

// CSS
import './exam_item.css';

const columns = [
	{ 
		title: 'EXAM ITEM ID',
		dataIndex: 'examItemID',
		width: 200
	},
	{ 
		title: 'EXAM ITEM NAME',
		dataIndex: 'examItemName',
		width: 400
	},
	{ 
		title: 'EXAM ITEM GENERAL NAME',
		dataIndex: 'examItemGeneralName',
		width: 250
	},
	{ 
		title: 'EXAM ITEM TYPE',
		dataIndex: 'examItemTypeCode',
		width: 200
	},
	{ 
		title: 'INTEGRATION CODE',
		dataIndex: 'examItemIntegrationCode',
	}
];


class ExamTable extends React.Component {
	render() {
		const { data, pageSize, loading = false, onRowDblClick } = this.props;

		return (
			<div style={{ marginTop: 20 }} className="settings-exam-item-table">
				<Spin spinning={loading} tip="Loading...">
					<Table 
						size={tableSize}
						pagination={{pageSize}} 
						columns={columns} 
						dataSource={data} 
						scroll={{ y: tableYScroll }}
						rowKey={record => record.examItemID}
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
		examItemID: PropTypes.number.isRequired,
		examItemName: PropTypes.string.isRequired,
		examItemGeneralName: PropTypes.string.isRequired,
		examItemTypeCode: PropTypes.string.isRequired,
		examItemUnitCode: PropTypes.string,
	})).isRequired,
	pageSize: PropTypes.number.isRequired,
	loading: PropTypes.bool.isRequired,
	onRowDblClick: PropTypes.func.isRequired
};

export default ExamTable;