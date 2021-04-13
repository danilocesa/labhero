// LIBRARY
import React from 'react';
import { Spin, Table } from 'antd';
import {
	GLOBAL_TABLE_SIZE, 
	// GLOBAL_TABLE_YSCROLL
} from 'global_config/constant-global';

import './table.css';

const columns = [
	{ 
		title: 'ITEM CODE',
		dataIndex: 'a',
		width: 100
	},
	{ 
		title: 'ITEM NAME',
		dataIndex: 'b',
		width: 200
	},
	{ 
		title: 'ITEM DESCRIPTION',
		dataIndex: 'c',
		width: 200
	},
	{ 
		title: 'UNIT',
		dataIndex: 'd',
		width: 150
	},
	{ 
		title: 'DEFAULT PRICE',
		dataIndex: 'e',
		width: 150
	},
	{ 
		title: 'THRESHOLD',
		dataIndex: 'f',
		width: 100
	},
	{ 
		title: 'CATEGORY',
		dataIndex: 'g',
		width: 150
	},
	{ 
		title: 'SECTION',
		dataIndex: 'h',
	}
];

const data = [
	{ a: 1001, b: 'ID STICKERS', c: 'DONATION', d: 'ROLL', e: 1000, f: 1, g: 'SUPPLY', h: 'DONATION' },
	{ a: 1001, b: 'ID STICKERS', c: 'DONATION', d: 'ROLL', e: 1000, f: 1, g: 'SUPPLY', h: 'DONATION' },
	{ a: 1001, b: 'ID STICKERS', c: 'DONATION', d: 'ROLL', e: 1000, f: 1, g: 'SUPPLY', h: 'DONATION' },
	{ a: 1001, b: 'ID STICKERS', c: 'DONATION', d: 'ROLL', e: 1000, f: 1, g: 'SUPPLY', h: 'DONATION' },
	{ a: 1001, b: 'ID STICKERS', c: 'DONATION', d: 'ROLL', e: 1000, f: 1, g: 'SUPPLY', h: 'DONATION' }
];


class ItemTable extends React.Component {
	render() {
		return (
			<div>
				<Spin spinning={false} tip="Loading...">
					<Table 
						className="inv-item-setup-tbl"
						size={GLOBAL_TABLE_SIZE}
						columns={columns} 
						dataSource={data} 
						// scroll={{ y: GLOBAL_TABLE_YSCROLL }}
						rowKey={record => record.examItemID}
					/>
				</Spin>
			</div>
		);
	}
}


export default ItemTable;