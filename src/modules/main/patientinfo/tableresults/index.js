/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-access-state-in-setstate */
// LIBRARY
import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { EditableFormRow, EditableCell } from './editable_table_component';

import './table.css';

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
};

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'EXAM NAME',
        dataIndex: 'examItemName',
        width: 200,
      },
      {
        title: 'INSTRUMENT RESULT',
        dataIndex: 'instrumentResult',
        width: 200,
      },
      {
        title: 'RESULT',
        dataIndex: 'releasedResult',
        editable: true,
        width: 200,
      },
      {
        title: 'NORMAL VALUES',
        dataIndex: 'values',
        width: 200,
      },
      {
        title: 'STATUS',
        dataIndex: 'status',
        width: 200,
      },
    ];
  }

  render() {
		const { examItems, handleSave } = this.props;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
		};
		
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave,
        }),
      };
		});

    return (
			<div className="patient-table">
				<Table
					components={components}
					rowClassName={() => 'editable-row'}
					dataSource={examItems}
					columns={columns}
					rowSelection={rowSelection}
					rowKey={item => item.examItemID}
					scroll={{ x: 800, y: 300 }}
					size="small"
					pagination={false}
				/>
			</div>
    );
  }
}

EditableTable.propTypes = {
	examItems: PropTypes.array.isRequired,
	handleSave: PropTypes.func.isRequired
};

export default EditableTable;
