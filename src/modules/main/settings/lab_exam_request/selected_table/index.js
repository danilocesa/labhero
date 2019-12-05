/* eslint-disable react/prop-types */
// LIBRARY
import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Table, Input, Form, Switch } from 'antd';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';

// CUSTOM
import { selectedTableConst, tableSize } from '../settings';
import DragableBodyRow from './drag_and_drop';

// CSS
import './selected_table.css';

const {labels} = selectedTableConst;

class SelectedTable extends React.Component {
	
	constructor(props) {
		super(props);
		this.columns = [
			{ 
				title: '',
				dataIndex: 'examItemID',
				width: 10,
				render: (text, record, index) => this.createInvisibleKey(record.examItemID, index)
			},
			{ 
				title: 'Exam',
				dataIndex: 'examItemName',
				width: 240,
			},
			{ 
				title: labels.groupTitle,
				dataIndex: 'examRequestItemGroup',
				width: 70,
				render: (text, record) => this.createFormInput({
					fieldName: 'examRequestItemGroup', 
					examItemID: record.examItemID, 
					initialValue: record.examRequestItemGroup
				})
			},
			{ 
				title: labels.formulaTitle,
				dataIndex: 'examRequestItemFormula',
				width: 260,
				render: (text, record) => this.createFormInput({
					fieldName: 'examRequestItemFormula', 
					examItemID: record.examItemID, 
					initialValue: record.examRequestItemFormula
				})
			},
			{ 
				title: labels.lockTitle,
				dataIndex: 'examRequestItemLock',
				width: 60,
				render: (text, record) => this.createFormSwitch({
					fieldName: 'examRequestItemLock', 
					examItemID: record.examItemID, 
					initialValue: record.examRequestItemLock
				})
			},
			{ 
				title: 'Sort',
				render: (text, record, index) => {
					return <Input size="small" disabled value={index + 1} style={{ textAlign: 'center' }} />;
				}
			},
		];
		
		this.components = {
			body: {
				row: DragableBodyRow,
			},
		};
	}

	getSelectedExamItems = () => {
		const { getFieldsValue } = this.props.form;
		const fieldsValue = getFieldsValue();
		const { examRequestItemGroup, examRequestItemFormula, examRequestItemLock } = fieldsValue;
		const examItems = [];

		fieldsValue.keys.forEach((key, index) => {
			examItems.push({
				examItemID: key,
				examRequestItemGroup: examRequestItemGroup[key],
				examRequestItemFormula: examRequestItemFormula[key],
				examRequestItemLock: examRequestItemLock[key] ? 1 : 0,
				examRequestItemSort: index + 1
			});
		});

		return examItems;
	}

	moveRow = (dragIndex, hoverIndex) => {
		const { onDragAndDropRow, data } = this.props;
    const dragRow = data[dragIndex];

		const updatedData = update(this.props, {
			data: { $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]] }
		})

		onDragAndDropRow(updatedData.data);
  };

	createFormInput = ({ fieldName, examItemID, initialValue }) => {
		const { form } = this.props;
		const { getFieldDecorator } = form;

		return (
			<Form.Item className='ser-selected-table-row'>
				{ getFieldDecorator(`${fieldName}[${examItemID}]`, { 	
					rules: [{ required: true }],
					initialValue,
				})(
					<Input size="small" />
				)}
			</Form.Item>
		)
	}

	createFormSwitch = ({ fieldName, examItemID, initialValue }) => {
		const { form } = this.props;
		const { getFieldDecorator } = form;

		return (
			<Form.Item className='ser-selected-table-row'>
				{ getFieldDecorator(`${fieldName}[${examItemID}]`, { 	
					initialValue:  initialValue === 1,
					valuePropName: 'checked',
				})(
					<Switch />
				)}
			</Form.Item>
		)
	}
	
	createInvisibleKey = (examItemID, index) => {
		const { form } = this.props;
		const { getFieldDecorator } = form;

		getFieldDecorator(`keys[${index}]`, { initialValue: examItemID });

		return '';
	}

	triggerValidation() {
		const { validateFields } = this.props.form;
		let hasNoError = false;

		validateFields((err) => { hasNoError = err === null });
		
		return hasNoError;
	}

	render() {
		const { data, loading = false } = this.props;

		return (
			<div style={{ marginTop: 20 }}>
				<Spin spinning={loading} tip="Loading...">
					<DndProvider backend={HTML5Backend}>
						<Table 
							className="ser-selected-table"
							size={tableSize}
							columns={this.columns} 
							dataSource={data}   
							components={this.components}
							onRow={(record, index) => ({
								index,
								moveRow: this.moveRow,
							})}
							scroll={{ y: 260 }}
							rowKey={record => record.examItemID}
							pagination={false}
						/>
					</DndProvider>
				</Spin>
			</div>
		);
	}
}

SelectedTable.propTypes = {
	data: PropTypes.arrayOf(PropTypes.shape({
		examItemID: PropTypes.any.isRequired,
		examItemName: PropTypes.string.isRequired,
	})).isRequired,
	loading: PropTypes.bool.isRequired,
	onDragAndDropRow: PropTypes.func.isRequired
};

export default Form.create()(SelectedTable);


