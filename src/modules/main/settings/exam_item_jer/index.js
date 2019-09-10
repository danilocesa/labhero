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
		isInitializing: true,
		isLoading: false,
		isShowAddForm: false,
		isShowUpdateForm: false,
		pageSize: 5,
		examItems: [],
		ddSections: [],
		ddSpecimens: [],
		selectedExamItem: {},
		selectedSection: null,
		selectedSpecimen: null
	}
	
	async componentDidMount() {
		const sections = await this.fetchSections();
		const specimens = await this.fetchSpecimens();
		const ddSections = sections.map(section => ({
			label: section.sectionCode,
			value: section.sectionID
		}));

		const ddSpecimens = specimens.map(specimen => ({
			label: specimen.specimenName.toUpperCase(),
			value: specimen.specimenID
		}));

		this.setState({ 
			ddSections, 
			ddSpecimens, 
			selectedSpecimen: specimens[0].specimenID ? specimens[0].specimenID : null,
			isInitializing: false, 
		});
	}
	
	onClickAdd = () => {
		this.setState({ isShowAddForm: true });
	}

	onChangePager = (pageSize) => {
		this.setState({ pageSize });
	}

	onChangeSectionCode = (sectionId) => {
		this.setState({ isLoading: true, selectedSection: sectionId }, async () => {
			const examItems = await this.fetchExamitems();

			this.setState({ examItems, isLoading: false });
		});
	}

	onChangeSpecimen = (specimenID) => {
		this.setState({ isLoading: true, selectedSpecimen: specimenID }, async () => {
			const examItems = await this.fetchExamitems();

			this.setState({ examItems, isLoading: false });
		});
	}

	onDblClickTableRow = (selectedExamItem) => {
		
		this.setState({ selectedExamItem, isShowUpdateForm: true });
	}

	onExitForm = () => {
		this.setState({ isShowAddForm: false, isShowUpdateForm: false });
	}

	
	fetchSections = async() => {
		let sections = [];

		try {
			const url = `/Section`;

			const response = await axiosCall({ method: 'GET', url });
			const { data } = await response;

			sections = data;
		} catch (e) {
			Message.error();
		}

		return sections;
	}

	fetchSpecimens = async() => {
		let specimens = [];

		try {
			const url = `/Specimen`;

			const response = await axiosCall({ method: 'GET', url });
			const { data } = await response;

			specimens = data;
		} catch (e) {
			Message.error();
		}

		return specimens;
	}

	fetchExamitems = async() => {
		const { selectedSection: sectionId, selectedSpecimen: specimenId } = this.state;
		let examItems = [];

		try {
			const url = `/ExamItem/Settings/SectionID/${sectionId}/SpecimenID/${specimenId}`; 

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
			ddSpecimens, 
			ddSections,
			isInitializing,
			isShowAddForm, 
			isShowUpdateForm ,
			isLoading,
			selectedExamItem,
			selectedSpecimen,
			selectedSection
		} = this.state;

		const leftSection = (
			<>
				<DropDown 
					size="small"
					placeholder="Filter by Specimen"
					content={ddSpecimens} 
					onChange={this.onChangeSpecimen}
					loading={isInitializing}
					value={selectedSpecimen}
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
					<Icon type="plus" /> Add Exam Items
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
						content={ddSections} 
						onChange={this.onChangeSectionCode}
						loading={isInitializing}
						value={selectedSection}
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
				<UpdateForm 
					examItem={selectedExamItem}
					visible={isShowUpdateForm} 
					onClose={this.onExitForm} 
				/>
			</div>
		);
	}
}

ActionSection.propTypes = {
	leftContent: PropTypes.node.isRequired,
	rightContent: PropTypes.node.isRequired
};

export default ExamItems;