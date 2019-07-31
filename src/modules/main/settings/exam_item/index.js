import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Button, Icon, Row, Col } from 'antd';
import TablePager from 'shared_components/table_pager';
import Message from 'shared_components/message';
import axiosCall from 'services/axiosCall';

import ExamTable from './table';
import AddForm from './add_form';
import UpdateForm from './update_form';
import DropDown from '../shared/dropdown';

const { Title } = Typography;

const ActionSection = (props) => (
	<Row style={{ marginTop: 50 }}>
		<Col span={12} style={{ textAlign: 'left' }}>
			{props.leftContent}
		</Col>
		<Col span={12} style={{ textAlign: 'right' }}>
			{props.rightContent}
		</Col>
	</Row>
);

class ExamItems extends React.Component {
	state = {
		isLoading: false,
		isShowAddForm: false,
		isShowUpdateForm: false,
		pageSize: 5,
		examItemsSource: [],
		examItems: [],
		sections: [],
		ddSectionCodes: [],
		ddSectionNames: []
	}
	
	async componentDidMount() {
		const sections = await this.fetchSection()
		const ddSectionCodes = sections.map(section => ({
			label: section.sectionCode,
			value: section.sectionID
		}));

		const ddSectionNames = sections.map(section => ({
			label: section.sectionName,
			value: section.sectionID
		}));

		ddSectionNames.unshift({ label: 'CLEAR FILTER', value: -1 });

		this.setState({ sections, ddSectionCodes, ddSectionNames });
	}
	
	onClickAdd = () => {
		this.setState({ isShowAddForm: true });
	}

	onChangePager = (pageSize) => {
		this.setState({ pageSize });
	}

	onChangeSectionCode = async(sectionId) => {
		this.setState({ isLoading: true });

		const apiResponse = await this.fetchExamitemsById(sectionId);
		const examItems = [];

		apiResponse.specimens.forEach(specimen => {
			specimen.results.forEach(result => {
				examItems.push({ ...result, sectionID: apiResponse.sectionID });
			});
		}); 
		
		this.setState({ 
			examItems, 
			examItemsSource: examItems,
			isLoading: false
		});
	}

	onChangeSectionName = (sectionID) => {
		const { examItemsSource } = this.state;

		const examItems = examItemsSource.filter(examItem => examItem.sectionID === sectionID);

		this.setState({ examItems });
	}

	onDblClickTableRow = () => {
		this.setState({ isShowUpdateForm: true });
	}

	onExitForm = () => {
		this.setState({ isShowAddForm: false, isShowUpdateForm: false });
	}

	
	fetchSection = async() => {
		let sections = [];

		try {
			const url = `/ExamResult`;

			const response = await axiosCall({ method: 'GET', url });
			const { data } = await response;

			sections = data;
		} catch (e) {
			Message.error();
		}

		return sections;
	}

	fetchExamitemsById = async(id) => {
		let examItems = [];

		try {
			const url = `/ExamResult/id/${id}`;

			const response = await axiosCall({ method: 'GET', url });
			const { data } = await response;

			examItems = data;
		} catch (e) {
			Message.error();
		}

		return examItems;
	}

	render() {
		const { 
			pageSize, 
			examItems, 
			ddSectionNames, 
			ddSectionCodes,
			isShowAddForm, 
			isShowUpdateForm ,
			sections,
			isLoading
		} = this.state;

		const leftSection = (
			<>
				<DropDown 
					size="small"
					placeholder="Filter by SERUM"
					content={ddSectionNames} 
					onChange={this.onChangeSectionName}
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
					<Title level={3}>Exam Items</Title>
					<Row style={{ marginTop: 50 }}>
					<DropDown 
						label="SECTION"
						placeholder="Select Section"
						content={ddSectionCodes} 
						onChange={this.onChangeSectionCode}
					/>
					</Row>
				</section>
				<ActionSection 
					leftContent={leftSection}
					rightContent={rightSection}
				/>
				<ExamTable 
					data={examItems}
					pageSize={pageSize}
					loading={isLoading}
					onRowDblClick={this.onDblClickTableRow}
				/>
				<AddForm visible={isShowAddForm} onClose={this.onExitForm} />
				<UpdateForm visible={isShowUpdateForm} onClose={this.onExitForm} />
			</div>
		);
	}
}

ActionSection.propTypes = {
	leftContent: PropTypes.node.isRequired,
	rightContent: PropTypes.node.isRequired
};

export default ExamItems;