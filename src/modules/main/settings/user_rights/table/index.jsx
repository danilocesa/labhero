// LIBRARY
import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Table } from 'antd';
import { GLOBAL_TABLE_SIZE } from 'global_config/constant-global';


class UserRightsTable extends React.Component {

	render() {
		const { data, pageSize, loading = false, onRowDblClick } = this.props;

		const columns = [
			{ 
				title: 'USER TYPE',
				dataIndex: 'userType',
				sorter: (a, b) => { return a.userType.localeCompare(b.userType) }
			},
			{ 
				title: 'DESCRIPTION',
				dataIndex: 'typeDescription',
			},
		];

		return (
			<div style={{ marginTop: 20 }} className="settings-exam-item-table">
				<Spin spinning={loading} tip="Loading...">
					<Table 
						size={GLOBAL_TABLE_SIZE}
						pagination={{ pageSize }} 
						columns={columns} 
						dataSource={data} 
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