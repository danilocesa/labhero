/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-access-state-in-setstate */
// LIBRARY
import React from 'react';
import PropTypes from 'prop-types';
import { Table, Typography, Card, Empty } from 'antd';
import { EditableFormRow, EditableCell } from './editable_table_component';

import './table.css';

const { Text } = Typography;

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

    this.state = {
      dataSource: [
        {
          key: '5234346',
          examItemName: 'Hemoglobin',
          instrumentResult: '85',
          releasedResult: '85',
          values: '14.0 - 17.5',
          status: <Text type="danger">HIGH</Text>,
        },
        {
          key: '1',
          examItemName: 'Hematocrit',
          instrumentResult: '0.257',
          releasedResult: '0.257',
          values: '41.5 - 50.4',
          status: <Text style={{ color: 'blue' }}>LOW</Text>,
        },
        {
          key: '2',
          examItemName: 'Exam 1',
          instrumentResult: '0.257',
          releasedResult: '0.257',
          values: '41.5 - 50.4',
          status: <Text style={{ color: 'blue' }}>LOW</Text>,
        },
        {
          key: '3',
          examItemName: 'Exam 2',
          instrumentResult: '0.257',
          releasedResult: '0.257',
          values: '41.5 - 50.4',
          status: <Text style={{ color: 'blue' }}>LOW</Text>,
        },
        {
          key: '4',
          examItemName: 'Exam 3',
          instrumentResult: '0.257',
          releasedResult: '0.257',
          values: '41.5 - 50.4',
          status: <Text style={{ color: 'blue' }}>LOW</Text>,
        },
      ],
    };
  }

  handleSave = row => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
  };

  render() {
		const { examItems } = this.props;
    const { dataSource } = this.state;
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
          handleSave: this.handleSave,
        }),
      };
		});
		
    const emptyTableData = <Card><Empty /></Card>

    return (
			<div className="patient-table">
				<Table
					components={components}
					rowClassName={() => 'editable-row'}
					// dataSource={dataSource || emptyTableData}
					dataSource={examItems}
					columns={columns}
					rowSelection={rowSelection}
					scroll={{ x: 800, y: 300 }}
					size="small"
					pagination={false}
				/>
			</div>
    );
  }
}

EditableTable.propTypes = {
	examItems: PropTypes.array.isRequired
};

export default EditableTable;
