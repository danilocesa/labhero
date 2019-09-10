import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Table, InputNumber, Form } from 'antd';

import './selected_table.css';

class SelectedTable extends React.Component {
	constructor(props) {
		super(props);
		this.columns = [
			{ 
				title: 'Exam',
				dataIndex: 'examItemName',
				width: '40%'
			},
			{ 
				title: 'Factor',
				dataIndex: 'examRequestItemFormula', 
				width: '20%',
				render: (text, record) => this.createFormInput({
					fieldName: 'examRequestItemFormula', 
					examItemID: record.examItemID, 
					initialValue: record.examRequestItemFormula
				})
			},
			{ 
				title: 'Group',
				dataIndex: 'examRequestItemGroup',
				width: '20%',
				render: (text, record) => this.createFormInput({
					fieldName: 'examRequestItemGroup', 
					examItemID: record.examItemID, 
					initialValue: record.examRequestItemGroup
				})
			},
			{ 
				title: 'Sort',
				dataIndex: 'examRequestItemSort',
				width: '20%',
				render: (text, record) => this.createFormInput({
					fieldName: 'examRequestItemSort', 
					examItemID: record.examItemID, 
					initialValue: record.examRequestItemSort
				})
			}
		];
		
	}

	onChange = (examItemId, examData) => {
		const { onChange } = this.props;

		onChange(examItemId, examData);
	}

	createFormInput = ({ fieldName, examItemID, initialValue }) => {
		// eslint-disable-next-line react/prop-types
		const { onChange, form } = this.props;
		const { getFieldDecorator } = form;

		return (
			<Form.Item className='selected-table'>
				{ getFieldDecorator(`${fieldName}${examItemID}`, { 	
					rules: [{ required: true }],
					initialValue
				})(
					<InputNumber 
						size="small"
						style={{ width: 50 }}
						onChange={(value) => {
							onChange(examItemID, { examRequestItemFormula: value })
						}} 
					/>
				)}
				
			</Form.Item>
		)
	}

	triggerValidation() {
		// eslint-disable-next-line react/prop-types
		const { validateFields } = this.props.form;
		let hasNoError = false;

		validateFields((err) => { console.log(err); hasNoError = err === null });
		
		return hasNoError;
	}

	render() {
		const { data, loading = false } = this.props;

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
	onChange: PropTypes.func.isRequired
};

export default Form.create()(SelectedTable);