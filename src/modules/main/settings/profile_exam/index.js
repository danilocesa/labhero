import React from 'react';
import { Typography, Button, Icon } from 'antd';
import TablePager from 'shared_components/table_pager';
import _ from 'lodash';
import SectionDropdown from './dropdown';
import ExamTable from './table';
import UpdateForm from './update_form';
import AddForm from './add_form'

const { Title } = Typography;

class ProfileExam extends React.Component {
	state = {
		isShowUpdateForm: false,
		isShowAddForm: false,
		selectedData: {},
		pageSize: 5,
		data: [
			{
				code: '1',
				profile: 'PROFILE A',
				status: 'ACTIVE',
				template: 'CHEM_MCU.RPT',
				subcontent: [{ code: '1', exam: 'EXAM A'}],
				active: false
			},
			{
				code: '21',
				profile: 'PROFILE B',
				status: 'ACTIVE',
				template: 'CHEM_MCU.RPT',
				active: false
			},
			{
				code: '3',
				profile: 'PROFILE C',
				status: 'ACTIVE',
				template: 'CHEM_MCU.RPT',
				active: false
			}
		],
		sections: [
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

	onDblClickTableRow = (selectedData) => {
		this.setState({ isShowUpdateForm: true, selectedData });
	}

	updateSelectedRow = (rowIndex) => {
		const { data } = this.state; 
		const newData = data.map((item, index) => ({ ...item, active: index === rowIndex }));

		this.setState({ data: newData });
	} 

	onCloseForm = () => {
		this.setState({ isShowUpdateForm: false, isShowAddForm: false });
	}

	render() {
		const { pageSize, data, sections, isShowUpdateForm, isShowAddForm, selectedData } = this.state;

		return (
			<div>
				<div style={{ textAlign: 'center' }}>
					<Title level={3}>Profile Exam</Title>
					<SectionDropdown sections={sections} />
				</div>
				<div style={{ textAlign: 'right', marginTop: 50 }}>
					<Button 
						shape="round"
						type="primary" 
						style={{ marginRight: 10 }}
						onClick={this.onClickAdd}
					>
						<Icon type="plus" /> Add Profile
					</Button>
					<TablePager handleChange={this.onChangePager} />
				</div>
				<ExamTable 
					data={data}
					pageSize={pageSize}
					loading={false}
					updateSelectedRow={_.debounce(this.updateSelectedRow, 500)}
					onRowDblClick={this.onDblClickTableRow}
				/>
				<UpdateForm 
					data={selectedData}
					visible={isShowUpdateForm}
					onClose={this.onCloseForm}
				/>
				<AddForm 
					visible={isShowAddForm}
					onClose={this.onCloseForm}
				/>
			</div>
		);
	}
}

export default ProfileExam;