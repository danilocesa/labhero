// LIBRARY
import React from 'react';
import { Spin, Table } from 'antd';
import {
	globalTableSize, 
	globalTableYScroll
} from 'shared_components/constant-global';

const columns = [
	{ 
		title: 'DR NO.',
		dataIndex: 'examItemID',
		width: 50
	},
	{ 
		title: 'SUPPLIER',
		dataIndex: 'examItemName',
		width: 150
	},
	{ 
		title: 'LOCATION',
		dataIndex: 'examItemGeneralName',
		width: 50
	},
	{ 
		title: 'SECTION',
		dataIndex: 'examItemTypeCode',
		width: 50
	},
	{ 
		title: 'ITEM',
		dataIndex: 'examItemIntegrationCode',
		width: 50
	},
	{ 
		title: 'EXPIRATION DATE',
		dataIndex: 'examItemIntegrationCode',
		width: 50
	},
	{ 
		title: 'PRICE',
		dataIndex: 'examItemIntegrationCode',
		width: 50
	},
	{ 
		title: 'QUANTITY',
		dataIndex: 'examItemIntegrationCode',
		width: 50
	}
];


class ExamTable extends React.Component {
	render() {
		return (
			<div style={{ marginTop: 20 }} className="settings-exam-item-table">
				<Spin spinning={false} tip="Loading...">
					<Table 
						size={globalTableSize}
						columns={columns} 
						dataSource={[]} 
						scroll={{ y: globalTableYScroll }}
						rowKey={record => record.examItemID}
					/>
				</Spin>
			</div>
		);
	}
}


export default ExamTable;