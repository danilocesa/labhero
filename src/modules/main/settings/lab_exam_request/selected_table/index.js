import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Table, Input, Form, Switch } from 'antd';

import './selected_table.css';
import { selectedTableConst } from '../settings';

const {labels} = selectedTableConst;

class SelectedTable extends React.Component {
	constructor(props) {
		super(props);
		this.columns = [
			{ 
				title: labels.examTitle,
				dataIndex: 'examItemName',
				width: '30%'
			},
			{ 
				title: labels.groupTitle,
				dataIndex: 'examRequestItemGroup',
				width: '17.5%',
				render: (text, record) => this.createFormInput({
       
					fieldName: 'examRequestItemGroup', 
					examItemID: record.examItemID, 
					initialValue: record.examRequestItemGroup
				})
			},
			{ 
				title: labels.formulaTitle,
				dataIndex: 'examRequestItemFormula',
				width: '17.5%',
				render: (text, record) => this.createFormInput({
					fieldName: 'examRequestItemFormula', 
					examItemID: record.examItemID, 
					initialValue: record.examRequestItemFormula
				})
			},
			{ 
				title: labels.lockTitle,
				dataIndex: 'examRequestItemLock',
				width: '17.5%',
				render: (text, record) => this.createFormInput({
					fieldName: 'examRequestItemLock', 
					examItemID: record.examItemID, 
					initialValue: record.examRequestItemLock
				})
			},
			{ 
				title: labels.sortTitle,
				dataIndex: 'examRequestItemSort',
				width: '17.5%',
				render: (text, record) => this.createFormInput({
					fieldName: 'examRequestItemSort', 
					examItemID: record.examItemID, 
					initialValue: record.examRequestItemSort
				})
			}
		];
		
	}

	// onChange = (examItemId, examData) => {
	// 	const { onChange } = this.props;

	// 	onChange(examItemId, examData);
	// }

	getInputFieldValue() {
		const { getFieldsValue } = this.props.form;
		const fieldsValue = getFieldsValue();
		return fieldsValue;
	}

	createFormInput = ({ fieldName, examItemID, initialValue }) => {
		
		// eslint-disable-next-line react/prop-types
		const { form } = this.props;
		const { getFieldDecorator } = form;
		const field = fieldName.toUpperCase();
		let fdProps = {};	
		let fieldResponse = null;

		if(field.indexOf(labels.lockTitle) < 0){
			fdProps = {initialValue};
			fieldResponse = (
				<Input
					size="small"
					style={{ width: 100 }}
				/>
			);
		}else{
			fieldResponse = (
				<Switch defaultChecked />
			);
		}
		
		return (
			<Form.Item className='selected-table'>
				{ getFieldDecorator(`${fieldName}${examItemID}`, 
					fdProps
				)(
					fieldResponse
				)}
				
			</Form.Item>
		)
	}
	
	triggerValidation() {
		// eslint-disable-next-line react/prop-types
		const { validateFields } = this.props.form;
		let hasNoError = false;

		validateFields((err) => { hasNoError = err === null });
		
		return hasNoError;
	}

	

	

	render() {
		const { data, loading = false } = this.props;
		console.log('TCL -> selected_table ->', data);
		return (
			<div style={{ marginTop: 20 }}>
				<Spin spinning={loading} tip="Loading...">
					<Table 
						size="small"
						columns={this.columns} 
						dataSource={data} 
						scroll={{ y: 260 }}
						rowKey={record => record.examItemID}
						pagination={false}
					/>
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
	// onChange: PropTypes.func.isRequired
};

export default Form.create()(SelectedTable);