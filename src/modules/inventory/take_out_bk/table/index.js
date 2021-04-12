// LIBRARY
import React from 'react';
import { Spin, Table } from 'antd';
import {
	GLOBAL_TABLE_SIZE, 
	GLOBAL_TABLE_YSCROLL
} from 'global_config/constant-global';

const columns = [
	{ 
		title: 'ITEM NAME',
		dataIndex: 'a',
		width: 200
	},
	{ 
		title: 'CURRENT QTY',
		dataIndex: 'b',
		width: 200
	},
	{ 
		title: 'TAKEOUT QTY',
		dataIndex: 'c',
		width: 200
	},
	{ 
		title: 'EXP DATE',
		dataIndex: 'd',
		width: 200
	},
	{ 
		title: 'SECTION',
		dataIndex: 'e',
		width: 200
	},
	{ 
		title: 'LOCATION',
		dataIndex: 'f',
	},
];


class TakeoutTable extends React.Component {
	render() {
		return (
			<div style={{ marginTop: 20 }} className="settings-exam-item-table">
				<Spin spinning={false} tip="Loading...">
					<Table 
						size={GLOBAL_TABLE_SIZE}
						columns={columns} 
						dataSource={[]} 
						scroll={{ y: GLOBAL_TABLE_YSCROLL }}
						rowKey={record => record.examItemID}
					/>
				</Spin>
			</div>
		);
	}
}


export default TakeoutTable;