import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Table } from 'antd';

const columns = [
	{ 
		title: 'Exam',
		dataIndex: 'examItemName'
	},
];


class SelectionTable extends React.Component {
	
	onSelect = (record, selected) => {
		const { onSelect, onDeselect } = this.props;

		if(selected)
			onSelect(record);
		else
			onDeselect(record);
	};
	
	onSelectAll = (selected, selectedRows) => { 
		const { onSelectAll: updateSelectedExams } = this.props; 
		
		updateSelectedExams(selectedRows);
	};

	render() {
		// const { selectedRowKeys } = this.state;
		const { data, loading = false, selectedRowKeys } = this.props;
		const rowSelectionConfig = {
			selectedRowKeys,
			onSelect: this.onSelect,
			onSelectAll: this.onSelectAll
		};

		console.log(data);

		return (
			<div style={{ marginTop: 20 }}>
				<Spin spinning={loading} tip="Loading...">
					<Table 
						size="small"
						columns={columns} 
						dataSource={data} 
						scroll={{ y: 260 }}
						pagination={false}
						rowKey={record => record.examItemID}
						rowSelection={rowSelectionConfig}
					/>
				</Spin>
			</div>
		);
	}
}


SelectionTable.propTypes = {
	data: PropTypes.arrayOf(PropTypes.shape({
		examItemID: PropTypes.any.isRequired,
		examItemName: PropTypes.string.isRequired,
	})).isRequired,
	loading: PropTypes.bool.isRequired,
	onSelect: PropTypes.func.isRequired,
	onDeselect: PropTypes.func.isRequired,
	onSelectAll: PropTypes.func.isRequired,
	selectedRowKeys: PropTypes.arrayOf(PropTypes.number).isRequired
};

export default SelectionTable;