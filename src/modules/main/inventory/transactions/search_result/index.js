// LIBRARY
import React from 'react';
import { Spin, Table } from 'antd';
import {
	globalTableSize, 
	globalTableYScroll
} from 'shared_components/constant-global';

const columns = [
	{ 
		title: 'TRANS DATE',
		dataIndex: 'a',
		fixed: 'left',
		width: 150
	},
	{ 
		title: 'DR No.',
		dataIndex: 'b',
		fixed: 'left',
		width: 100
	},
	{ 
		title: 'ITEM NAME',
		dataIndex: 'c',
		fixed: 'left',
		width: 250
	},
	{ 
		title: 'SUPPLIER',
		dataIndex: 'd',
		width: 150
	},
	{ 
		title: 'LOCATION',
		dataIndex: 'e',
		width: 150
	},
	{ 
		title: 'SECTION',
		dataIndex: 'f',
		width: 150
	},
	{ 
		title: 'EXP DATE',
		dataIndex: 'g',
	},
	{ 
		title: 'PRICE',
		dataIndex: 'h',
		fixed: 'right',
		width: 100
	},
	{ 
		title: 'QTY',
		dataIndex: 'i',
		fixed: 'right',
		width: 100
	},
	{ 
		title: 'TRANS TYPE',
		fixed: 'right',
		dataIndex: 'j',
		width: 150
	},
];

const data = [
	{
		a: '04/30/2019',
		b: 'ASDF',
		c: 'CELL LYSE',
		d: 'BIOSITE',
		e: 'STORAGE ROOM',
		f: 'HEMATOLOGY',
		g: '05/30/2019 2:36:43 AM',
		h: '25,000',
		i: '400',
		j: 'RESTOCK'
	},
	{
		a: '04/30/2019',
		b: 'ASDF',
		c: 'CELL LYSE',
		d: 'BIOSITE',
		e: 'STORAGE ROOM',
		f: 'HEMATOLOGY',
		g: '05/30/2019 2:36:43 AM',
		h: '25,000',
		i: '400',
		j: 'RESTOCK'
	},
	{
		a: '04/30/2019',
		b: 'ASDF',
		c: 'CELL LYSE',
		d: 'BIOSITE',
		e: 'STORAGE ROOM',
		f: 'HEMATOLOGY',
		g: '05/30/2019 2:36:43 AM',
		h: '25,000',
		i: '400',
		j: 'RESTOCK'
	},
	{
		a: '04/30/2019',
		b: 'ASDF',
		c: 'CELL LYSE',
		d: 'BIOSITE',
		e: 'STORAGE ROOM',
		f: 'HEMATOLOGY',
		g: '05/30/2019 2:36:43 AM',
		h: '25,000',
		i: '400',
		j: 'RESTOCK'
	},
	{
		a: '04/30/2019',
		b: 'ASDF',
		c: 'CELL LYSE',
		d: 'BIOSITE',
		e: 'STORAGE ROOM',
		f: 'HEMATOLOGY',
		g: '05/30/2019 2:36:43 AM',
		h: '25,000',
		i: '400',
		j: 'RESTOCK'
	},
	{
		a: '04/30/2019',
		b: 'ASDF',
		c: 'CELL LYSE',
		d: 'BIOSITE',
		e: 'STORAGE ROOM',
		f: 'HEMATOLOGY',
		g: '05/30/2019 2:36:43 AM',
		h: '25,000',
		i: '400',
		j: 'RESTOCK'
	},
	{
		a: '04/30/2019',
		b: 'ASDF',
		c: 'CELL LYSE',
		d: 'BIOSITE',
		e: 'STORAGE ROOM',
		f: 'HEMATOLOGY',
		g: '05/30/2019 2:36:43 AM',
		h: '25,000',
		i: '400',
		j: 'RESTOCK'
	}
];

class SearchResultTable extends React.Component {
	render() {
		return (
			<div style={{ marginTop: 20 }}>
				<Spin spinning={false} tip="Loading...">
					<Table 
						size={globalTableSize}
						columns={columns} 
						dataSource={data} 
						scroll={{ x: 1500, y: globalTableYScroll }}
						rowKey={record => record.examItemID}
					/>
				</Spin>
			</div>
		);
	}
}


export default SearchResultTable;