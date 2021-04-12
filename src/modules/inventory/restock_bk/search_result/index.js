// LIBRARY
import React from 'react';
import { Spin, Table } from 'antd';
import {
	GLOBAL_TABLE_SIZE, 
	GLOBAL_TABLE_YSCROLL
} from 'global_config/constant-global';

const columns = [
	{ 
		title: 'DR NO.',
		dataIndex: 'a',
		width: 50
	},
	{ 
		title: 'SUPPLIER',
		dataIndex: 'b',
		width: 150
	},
	{ 
		title: 'LOCATION',
		dataIndex: 'c',
		width: 50
	},
	{ 
		title: 'SECTION',
		dataIndex: 'd',
		width: 50
	},
	{ 
		title: 'ITEM',
		dataIndex: 'e',
		width: 50
	},
	{ 
		title: 'EXPIRATION DATE',
		dataIndex: 'f',
		width: 50
	},
	{ 
		title: 'PRICE',
		dataIndex: 'g',
		width: 50
	},
	{ 
		title: 'QUANTITY',
		dataIndex: 'h',
		width: 50
	}
];


class SearchResultTable extends React.Component {
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


export default SearchResultTable;