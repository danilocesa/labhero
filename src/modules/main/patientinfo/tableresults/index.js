/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-access-state-in-setstate */
import React from 'react';
import PropTypes from 'prop-types';
import { Table, Form, Input } from 'antd';
import DynamicInput from './dynamic_input';

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
				width: 200,
				render: (text, record, index) => this.createFormInput({ 
					...record, 
					fieldName: 'test',
					examItemID: index
				})
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

	createFormInput = (record) => {
		const { form } = this.props;
		const { getFieldDecorator } = form;

		return (
			<Form.Item>
				{ getFieldDecorator(`${record.fieldName}[${record.examItemID}]`, { 	
					rules: [{ required: true }],
					initialValue: record.releasedResult,
				})(
					<DynamicInput 
						type={record.examItemTypeCode}
						unitCode={record.examItemUnitCode}
						isLock={record.examRequestItemLock === 1}
						itemOptions={record.examItemOptions}
						maxLength={record.maxLength}
					/>
				)}
			</Form.Item>
		)
	}

  render() {
		const { examItems } = this.props;
   
    return (
			<div className="patient-table">
				<Form>
					<Table
						dataSource={examItems}
						columns={this.columns}
						// rowSelection={rowSelection}
						rowKey={item => item.examItemID}
						scroll={{ x: 800, y: 300 }}
						size="small"
						pagination={false}
					/>
				</Form>
			</div>
    );
  }
}

EditableTable.propTypes = {
	examItems: PropTypes.array.isRequired,
};

export default Form.create()(EditableTable);
