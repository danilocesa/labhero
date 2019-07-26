import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Button, Icon, Row, Col } from 'antd';
import TablePager from 'shared_components/table_pager';
import DropDown from './dropdown';
import ExamTable from './table';
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

class ExamRequest extends React.Component {
	state = {
		isShowAddForm: false,
		isShowUpdateForm: false,
		pageSize: 5,
		tableData: [],
		dropDownContent: [
			{ label: 'CHEM', value: 'CHEM' },
			{ label: 'HEMA', value: 'HEMA' },
			{ label: 'IMMU', value: 'IMMU' },
			{ label: 'MCBRO', value: 'MCBRO' },
			{ label: 'MCRO', value: 'MCRO' },
			{ label: 'RECEP', value: 'RECEP' },
		]
	}
	
	onClickAdd = () => {
		this.setState({ isShowAddForm: true });
	}

	onChangePager = (pageSize) => {
		this.setState({ pageSize });
	}

	onDblClickTableRow = () => {
		this.setState({ isShowUpdateForm: true });
	}

	onCloseForm = () => {
		this.setState({ isShowAddForm: false, isShowUpdateForm: false });
	}

	render() {
		const { pageSize, tableData, dropDownContent, filterContent, isShowAddForm, isShowUpdateForm } = this.state;

		const leftSection = (
			<>
				<DropDown 
					size="small"
					placeholder="Filter by SERUM"
					content={filterContent} 
					disabled 
				/>
			</>
			
		);

		const rightSection = (
			<>
				<Button 
					shape="round"
					type="primary" 
					style={{ marginRight: 10 }}
					onClick={this.onClickAdd}
				>
					<Icon type="plus" /> Add Profile
				</Button>
				<TablePager handleChange={this.onChangePager} />
			</>
		);

		return (
			<div>
				<section style={{ textAlign: 'center', marginTop: 30 }}>
					<Title level={3}>Lab Exam</Title>
					<Row style={{ marginTop: 50 }}>
						<DropDown 
							label="TEMPLATE" 
							placeholder="Select Template"
							content={dropDownContent} 
						/>
						<div style={{ display: 'inline-block', marginLeft: 30 }} />
						<DropDown 
							label="INSTRUMENT" 
							placeholder="Select Intrument"
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
				<AddForm visible={isShowAddForm} onClose={this.onCloseForm} />
				<UpdateForm visible={isShowUpdateForm} onClose={this.onCloseForm} />
			</div>
		);
	}
}


SecondarySection.propTypes = {
	leftContent: PropTypes.node.isRequired,
	rightContent: PropTypes.node.isRequired
};

export default ExamRequest;