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
        title: 'EXAM',
        dataIndex: 'examItemName',
				width: 220,
				render: (text, record) => (<div style={record.isChild && { marginLeft: 30 }}>{text}</div>)
      },
      {
        title: 'INS. RESULT',
        dataIndex: 'instrumentResult',
        width: 150,
      },
      {
        title: 'RESULT',
        dataIndex: 'releasedResult',
				width: 150,
				render: (text, record) => {
					if(record.releasedResult !== undefined) {
						return this.createFormInput({ 
							...record, 
							fieldName: `${record.sampleSpecimenID}-${record.examItemID}`,
						})
					}
					
					return null;
				}
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
        dataIndex: 'displayValue',
        width: 150,
      },
      {
        title: 'STATUS',
        dataIndex: 'flag',
				width: 120,
				render: (text) => (
					<div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
						{text}
					</div>
				),
      },
    ];
  }

	createFormInput = (record) => {
		const { form } = this.props;
		const { getFieldDecorator } = form;
		// const { examItemOptions, releasedResult } = record;
		// const defaultItemOption = examItemOptions.findIndex(item => item && item.examItemValueDefault === 1);
		// const selectedItemOption = defaultItemOption === -1 ? null : defaultItemOption;
		// const initialValue = examItemOptions.length === 1 
		// 									 ? releasedResult
		// 									 : selectedItemOption;

		return (
			<Form.Item>
				{ getFieldDecorator(record.fieldName, { 	
					initialValue: record.releasedResult,
					// initialValue
				})(
					<DynamicInput 
						type={record.examItemTypeCode}
						isLock={record.examRequestItemLock === 1}
						itemOptions={record.examItemOptions}
						maxLength={record.maxLength}
					/>
				)}
			</Form.Item>
		);
	}

	// This is use to get the values of this form up to its parent 
	// component e.g(update/add form) to cancel the submitting of
	// data once an error validation appears
	getFormValues = () => {
		// eslint-disable-next-line react/prop-types
		const { form, results } = this.props;
		const { getFieldsValue, validateFieldsAndScroll } = form;
		let labResults = null;

		validateFieldsAndScroll(async(err) => {	
			const fieldsValue = getFieldsValue();
			const clonedResults = JSON.parse(JSON.stringify(results));

		

			const combinedResults = clonedResults.map(item => {
				const key = Object.keys(fieldsValue).find(x => x === `${item.sampleSpecimenID}-${item.examItemID}`);
				// const itemOptions = item.examItemOptions;

				// if(item.examItemOptions.length !== 1) {
				// 	itemOptions[fieldsValue[key]].examItemValueDefault = 1
				// }
					
				return { 
					...item, 
					releasedResult: `${fieldsValue[key]}`,
					unitOfMesureBase: item.unitOfMesureBase || "0 0",
					// examItemOptions: itemOptions
				};
			});
			
			labResults = {
				results: combinedResults,
				hasError: err !== null,
			};
		});

		return labResults;
	}

  render() {
		const { formatedResults } = this.props;

    return (
			<div className="labresult-exam-item-table">
				<Form>
					<Table
						dataSource={formatedResults}
						columns={this.columns}
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
	results: PropTypes.array.isRequired,
	formatedResults: PropTypes.array.isRequired,
};

export default Form.create()(EditableTable);
