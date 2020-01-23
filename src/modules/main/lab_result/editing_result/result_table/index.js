/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-access-state-in-setstate */
import React from 'react';
import PropTypes from 'prop-types';
import { Table, Form } from 'antd';
import { globalTableSize, globalTableYScroll } from 'global_config/constant-global';
import DynamicInput from './dynamic_input';

import './result_table.css';

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
				render: (text, record) => this.createFormInput({ 
					...record, 
					fieldName: `${record.sampleSpecimenID}-${record.examItemID}`,
				})
			},
			{
				title: 'UNIT CODE',
				width: 100,
				render: (text, record) => {
					if(record.unitOfMesureBase && record.examItemUnitCode)
						return `${record.unitOfMesureBase} - ${record.examItemUnitCode}`;
					
					return '';
				}
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
				{ getFieldDecorator(record.fieldName, { 	
					// rules: [{ required: true, message: errorMessage.required }],
					initialValue: record.releasedResult,
				})(
					<DynamicInput 
						type={record.examItemTypeCode}
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
			<div className="labresult-exam-item-table">
				<Form>
					<Table
						dataSource={examItems}
						columns={this.columns}
						// rowSelection={rowSelection}
						rowKey={item => item.examItemID}
						scroll={{ x: 800, y: globalTableYScroll }}
						size={globalTableSize}
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
