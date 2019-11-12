import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Button, Icon, Row, Col } from 'antd';
import TablePager from 'shared_components/table_pager';
import Message from 'shared_components/message';

import ExamTable from './table';
import AddForm from './add_form';
import UpdateForm from './update_form';
import DropDown from '../shared/dropdown';

import { fetchSections, fetchSpecimens, fetchExamitems } from './api_repo';

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
		pageSize: 10,
		examItems: [],
		ddSections: [],
		ddSpecimens: [],
		selectedSectionId: null,
		selectedSpecimenId: null,
		selectedExamItemId: null
	}
	
	async componentDidMount() {
		const sections = await fetchSections();
		const specimens = await fetchSpecimens();
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
			selectedSpecimenId: specimens[0].specimenID ? specimens[0].specimenID : null,
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
		this.setState({ isLoading: true, selectedSectionId: sectionId }, async () => {
			const { selectedSpecimenId: specimenID } = this.state;
			const examItems = await fetchExamitems(sectionId, specimenID);
		
			this.setState({ examItems, isLoading: false });
		});
	}

	onChangeSpecimen = (specimenID) => {
		this.setState({ isLoading: true, selectedSpecimenId: specimenID }, async () => {
			const { selectedSectionId: sectionId } = this.state;
			const examItems = await fetchExamitems(sectionId, specimenID);

			this.setState({ examItems, isLoading: false });
		});
	}

	onDblClickTableRow = (selectedExamItem) => {
		this.setState({ 
			isShowUpdateForm: true,
			selectedExamItemId: selectedExamItem.examItemID
		});
	}

	onExitForm = () => {
		this.setState({ isShowAddForm: false, isShowUpdateForm: false });
	}

	onSuccessCreateExamItem = () => {
		this.setState({ isLoading: true, isShowAddForm: false }, async () => {
			const { selectedSectionId: sectionId, selectedSpecimenId: specimenId } = this.state;
			const examItems = await fetchExamitems(sectionId, specimenId);

			this.setState({ examItems, isLoading: false });
		});

		Message.success({ message: 'Exam item successfully created.' });
	}

	onSuccessUpdateExamItem = () => {
		this.setState({ isLoading: true, isShowUpdateForm: false }, async () => {
			const { selectedSectionId: sectionId, selectedSpecimenId: specimenId } = this.state;
			const examItems = await fetchExamitems(sectionId, specimenId);

			this.setState({ examItems, isLoading: false });
		});

		Message.success({ message: 'Exam item successfully updated.' });
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
			selectedSpecimenId,
			selectedSectionId,
			selectedExamItemId
		} = this.state;

		const leftSection = (
			<>
				<DropDown 
					size="small"
					placeholder="Filter by Specimen"
					disabled={selectedSectionId == null}
					content={ddSpecimens} 
					onChange={this.onChangeSpecimen}
					loading={isInitializing}
					value={selectedSpecimenId}
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
					disabled={selectedSectionId === null}
				>
					<Icon type="plus" /> ADD EXAM ITEMS
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
						value={selectedSectionId}
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
				<AddForm 
					visible={isShowAddForm} 
					onClose={this.onExitForm} 
					onSuccess={this.onSuccessCreateExamItem}
					selectedSectionId={selectedSectionId}
					selectedSpecimenId={selectedSpecimenId}
				/>
				<UpdateForm 
					visible={isShowUpdateForm} 
					onClose={this.onExitForm} 
					onSuccess={this.onSuccessUpdateExamItem}
					selectedSectionId={selectedSectionId}
					selectedSpecimenId={selectedSpecimenId}
					selectedExamItemId={selectedExamItemId}
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