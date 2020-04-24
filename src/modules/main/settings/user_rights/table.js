// LIBRARY
import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Table } from 'antd';

// CUSTOM
import {tableSize, tableYScroll} from './settings';


class UserRightsTable extends React.Component {

	render() {
		const { data, pageSize, loading = false, onRowDblClick } = this.props;
		
		const getSorter = (myDataSource, columnName) => {
			if(myDataSource.length > 0) {
				const columnSorter = (a, b) => {
					if(a[columnName] !== null) {
						return a[columnName].localeCompare(b[columnName])
					}
					return 1;
				};
				
				return columnSorter;
			} 
			return false;
		};

		const columns = [
			{ 
				title: 'USER TYPE',
				dataIndex: 'userType',
				sorter: getSorter(data, 'userType'),
			},
			{ 
				title: 'DATE CREATED',
				dataIndex: 'dateCreated',
			},
		];

		return (
			<div style={{ marginTop: 20 }} className="settings-exam-item-table">
				<Spin spinning={loading} tip="Loading...">
					<Table 
						size={tableSize}
						pagination={{pageSize}} 
						columns={columns} 
						dataSource={data} 
						scroll={{ y: tableYScroll }}
						rowKey={record => record.userTypeID}
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


UserRightsTable.propTypes = {
	data: PropTypes.arrayOf(PropTypes.shape({
		userTypeID: PropTypes.number,
		userType: PropTypes.string,
		dateCreated: PropTypes.string
	})).isRequired,
	pageSize: PropTypes.number.isRequired,
	loading: PropTypes.bool.isRequired,
	onRowDblClick: PropTypes.func.isRequired
};

export default UserRightsTable;