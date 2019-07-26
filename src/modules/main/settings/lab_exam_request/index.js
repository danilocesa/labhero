import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Typography, Button, Icon, Input } from 'antd';
import TablePager from 'shared_components/table_pager';
import ExamTable from './table';
import DropDown from './dropdown';
import AddForm from './add_form';
import UpdateForm from './update_form';

const { Title } = Typography;

const SecondarySection = (props) => (
	<Row style={{ marginTop: 50 }}>
		<Col span={12} style={{ textAlign: 'left' }}>
			{props.leftContent}
		</Col>
		<Col span={12} style={{ textAlign: 'right' }}>
			{props.rightContent}
		</Col>
	</Row>
);

class LabExamRequest extends React.Component {
	state = {
		pageSize: 5,
		isShowAddForm: false,
		isShowUpdateForm: false,
		tableData: [
			{
				requestID: '1',
				examRequestName: 'ALBUMIN CODE 1',
				iCode: '1',
				type: 'T',
				specimen: 'SERUM',
				a: 'TRUE',
				c: 'TRUE',
				s: '1'
			},
			{
				requestID: '2',
				examRequestName: 'ALBUMIN CODE 2',
				iCode: '2',
				type: 'T',
				specimen: 'SERUM',
				a: 'TRUE',
				c: 'TRUE',
				s: '1'
			},
			{
				requestID: '3',
				examRequestName: 'ALBUMIN CODE 3',
				iCode: '3',
				type: 'T',
				specimen: 'SERUM',
				a: 'TRUE',
				c: 'TRUE',
				s: '1'
			},
		],
		dropDownContent: [
			{ label: 'CHEM', value: 'CHEM' },
			{ label: 'HEMA', value: 'HEMA' },
			{ label: 'IMMU', value: 'IMMU' },
			{ label: 'MCBRO', value: 'MCBRO' },
			{ label: 'MCRO', value: 'MCRO' },
			{ label: 'RECEP', value: 'RECEP' },
		]
	}
	
	onDblClickTableRow = () => {
		this.setState({ isShowUpdateForm: true });
	}

	onClickAdd = () => {
		this.setState({ isShowAddForm: true });
	}

	onChangePager = (pageSize) => {
		this.setState({ pageSize });
	}

	onCloseForm = () => {
		this.setState({ isShowAddForm: false, isShowUpdateForm: false });
	}

	render() {
		const { pageSize, tableData, dropDownContent, isShowAddForm, isShowUpdateForm } = this.state;

		const leftSection = (
			<Row gutter={24}>
				<Col span={14}>
					<Input 
						prefix={<Icon type="search" />}
						placeholder="Search Exam Request Name"
					/>
				</Col>
				<Col span={10}>
					<DropDown 
						size="small"
						placeholder="Filter by SERUM"
						content={dropDownContent} 
					/>
				</Col>
			</Row>
			
		);

		const rightSection = (
			<>
				<Button 
					shape="round"
					type="primary" 
					style={{ marginRight: 10 }}
					onClick={this.onClickAdd}
				>
					<Icon type="plus" /> Add Exam Request
				</Button>
				<TablePager handleChange={this.onChangePager} />
			</>
		);

		return (
			<div>
				<section style={{ textAlign: 'center', marginTop: 30 }}>
					<Title level={3}>Lab Exam Request</Title>
					<Row style={{ marginTop: 50 }}>
						<DropDown 
							label="INSTRUMENT" 
							placeholder="Select Template"
							content={dropDownContent} 
						/>
					</Row>
				</section>
				<SecondarySection 
					leftContent={leftSection}
					rightContent={rightSection}
				/>
				<ExamTable 
					data={tableData}
					pageSize={pageSize}
					loading={false}
					onRowDblClick={this.onDblClickTableRow}
				/>
				<AddForm 
					visible={isShowAddForm}
					onClose={this.onCloseForm}
				/>
				<UpdateForm
					visible={isShowUpdateForm}
					onClose={this.onCloseForm}
				/>
			</div>
		);
	}
}

SecondarySection.propTypes = {
	leftContent: PropTypes.node.isRequired,
	rightContent: PropTypes.node.isRequired
};


export default LabExamRequest;