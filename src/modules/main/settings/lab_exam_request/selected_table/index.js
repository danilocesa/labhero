/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Table, Input, Form, Checkbox } from 'antd';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';

import DragableBodyRow from './drag_and_drop';

import './selected_table.css';

class SelectedTable extends React.Component {
	constructor(props) {
		super(props);
		this.columns = [
			{ 
				title: 'Id',
				dataIndex: 'examItemID',
				render: (text, record, index) => this.createInvisibleKey(record.examItemID, index)
			},
			{ 
				title: 'Exam',
				dataIndex: 'examItemName',
				width: '50%'
			},
			{ 
				title: 'Group',
				dataIndex: 'examRequestItemGroup',
				render: (text, record) => this.createFormInput({
					fieldName: 'examRequestItemGroup', 
					examItemID: record.examItemID, 
					initialValue: record.examRequestItemGroup
				})
			},
			{ 
				title: 'Formula',
				dataIndex: 'examRequestItemFormula',
				render: (text, record) => this.createFormInput({
					fieldName: 'examRequestItemFormula', 
					examItemID: record.examItemID, 
					initialValue: record.examRequestItemFormula
				})
			},
			{ 
				title: 'Lock',
				dataIndex: 'examRequestItemLock',
				render: (text, record) => this.createFormInput({
					fieldName: 'examRequestItemLock', 
					examItemID: record.examItemID, 
					initialValue: record.examRequestItemLock
				})
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

		console.log(examItems);
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
		const formField = fieldName === 'examRequestItemLock'
										? <Checkbox />
										: <Input size="small" width="80%" />;

		console.log(initialValue);
		return (
			<Form.Item className='selected-table'>
				{ getFieldDecorator(`${fieldName}[${examItemID}]`, { 	
					rules: [{ required: !(fieldName === 'examRequestItemLock') }],
					initialValue,
					valuePropName: 'checked',
				})(formField)}
			</Form.Item>
		)
	}
	
	createInvisibleKey = (examItemID, index) => {
		const { form } = this.props;
		const { getFieldDecorator } = form;

		return (
			<Form.Item className='selected-table'>
				{ getFieldDecorator(`keys[${index}]`, { initialValue: examItemID })(
					<span>{ examItemID }</span>
				)}
			</Form.Item>
		);
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
							size="small"
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