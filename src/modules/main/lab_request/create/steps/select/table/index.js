import React from 'react';
import PropTypes from 'prop-types';
import { Table as AntTable, Button, Tooltip } from 'antd';

import './table.css';

const createColumns = handleRemove => {
	const RemoveBtn = (
		<Tooltip title="Remove all">
			<Button type="primary" size="small" icon="delete" onClick={handleRemove} />
		</Tooltip>
	);

	return [
		{
			title: 'SECTION',
			dataIndex: 'section',
			width: 170,
		},
		{
			title: 'EXAM NAME',
			dataIndex: 'exam',
			width: 170,
		},
		{
			title: 'SPECIMEN',
			dataIndex: 'specimen',
			width: 170,
		},
		{
			title: RemoveBtn,
			dataIndex: 'action',
			width: 170,
		},
	];
};

class SelectTable extends React.Component {
	render() {
		const { tests, removeTest, removeAllTest } = this.props; 
		const TableCols = createColumns(removeAllTest);
		const TableData = tests.map(item => ({ 
			...item, 
			action: (
				<Button 
					type="dashed" 
					icon="close" 
					size="small" 
					style={{ fontSize: 10 }}
					onClick={() => removeTest(item.key)}
				/> 
			)
		}));

		return (
			<div className="select-step-table">
				<AntTable
					columns={TableCols}
					pagination={false}
					dataSource={TableData}
					scroll={{ y: 260 }}
				/>
			</div>
		);
	}
}

SelectTable.propTypes = {
	tests: PropTypes.arrayOf(PropTypes.shape({
		key: PropTypes.string.isRequired,
		section: PropTypes.string.isRequired,
		exam: PropTypes.string.isRequired
	})).isRequired,
	removeTest: PropTypes.func.isRequired,
	removeAllTest: PropTypes.func.isRequired
};

export default SelectTable;
