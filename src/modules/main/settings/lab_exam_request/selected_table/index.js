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

const { labels } = selectedTableConst;

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
				width: 200,
				dataIndex: 'examItemName',
			},
			{ 
				title: labels.groupTitle,
				dataIndex: 'examRequestItemGroup',
				width: 80,
				render: (text, record) => this.createFormInput({
					fieldName: 'examRequestItemGroup', 
					examItemID: record.examItemID, 
					maxLength: 100
				})
			},
			{ 
				title: labels.formulaTitle,
				dataIndex: 'examRequestItemFormula',
				width: 220,
				render: (text, record) => this.createFormInput({
					fieldName: 'examRequestItemFormula', 
					examItemID: record.examItemID, 
					maxLength: 500
				})
			},
			{ 
				title: labels.lockTitle,
				dataIndex: 'examRequestItemLock',
				width: 60,
				render: (text, record) => this.createFormSwitch({
					fieldName: 'examRequestItemLock', 
					examItemID: record.examItemID, 
				})
			},
			{ 
				title: labels.releaseTitle,
				dataIndex: 'examRequestItemPrintable',
				width: 60,
				render: (text, record) => this.createFormSwitch({
					fieldName: 'examRequestItemPrintable', 
					examItemID: record.examItemID, 
				})
			}
		];
		
		this.components = {
			body: {
				row: DragableBodyRow,
			},
		};
	}

	getSelectedExamItems = () => {
		const { data } = this.props;
		const { getFieldsValue } = this.props.form;
		const fieldsValue = getFieldsValue();
		const examItems = [];
		
		// const keys = data.map((item, index) => fieldsValue[`keys_${index}`]);
		const keys = data.map((item, index) => ({ 
			key: item.examItemID,
			sortCount: index + 1
		}));

		keys.forEach(({ key, sortCount }) => {
			examItems.push({
				examItemID: key,
				examRequestItemGroup: fieldsValue[`examRequestItemGroup_${key}`],
				examRequestItemFormula: fieldsValue[`examRequestItemFormula_${key}`],
				examRequestItemLock: fieldsValue[`examRequestItemLock_${key}`] ? 1 : 0,
				examRequestItemPrintable: fieldsValue[`examRequestItemPrintable_${key}`] ? 1 : 0,
				// examRequestItemSort: index + 1
				examRequestItemSort: sortCount
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


	createFormInput = ({ fieldName, examItemID, maxLength }) => {

		return (
			<Form.Item 
				name={`${fieldName}_${examItemID}`}
				className="ser-selected-table-row"
			>
				<Input size="small" maxLength={maxLength || 524288} />
			</Form.Item>
		)
	}

	createFormSwitch = ({ fieldName, examItemID }) => {
		return (
			<Form.Item 
				name={`${fieldName}_${examItemID}`}
				className="ser-selected-table-row"
				valuePropName="checked"
			>
				<Switch />
			</Form.Item>
		)
	}
	
	createInvisibleKey = (examItemID, index) => {
		return (
			<Form.Item 
				name={`keys_${index}`}
				initialValue={examItemID}
			>
				<div className="hide">
					<Input />
				</div>
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
	form: PropTypes.object.isRequired,
	data: PropTypes.arrayOf(PropTypes.shape({
		examItemID: PropTypes.any.isRequired,
		examItemName: PropTypes.string.isRequired,
	})).isRequired,
	loading: PropTypes.bool.isRequired,
	onDragAndDropRow: PropTypes.func.isRequired
};


export default SelectedTable;
