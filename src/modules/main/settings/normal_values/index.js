import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Input } from 'antd';

import TablePager from 'shared_components/search_pager/pager';
import PageTitle from 'shared_components/page_title';
import HttpCodeMessage from 'shared_components/message_http_status';
import { fetchSections, fetchSpecimens, fetchExamitems } from 'services/settings/examItem';
import ExamTable from '../exam_item/table';
import NormalValuesDrawer from './values_drawer';
import DropDown from '../shared/dropdown';
import { moduleTitle, tablePageSize, messagePrompts } from './settings';

const { Search } = Input;

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

class NormalValues extends React.Component {

	state = {
		isInitializing: true,
		isLoading: false,
		isShowValuesDrawer: false,
		pageSize: tablePageSize,
		examItems: [],
		examItemsRef: [],
		ddSections: [],
		ddSpecimens: [],
		selectedExamItem: {},
		selectedSectionId: null,
		selectedSpecimenId: null,
		selectedSectionName: null,
		selectedSpecimenName: null
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

		const selectedSpecimenId = (specimens && specimens[0].specimenID) 
			? specimens[0].specimenID 
			: null;
		const selectedSpecimenName = (specimens && specimens[0].specimenName) 
			? specimens[0].specimenName 
			: null;

		this.setState({ 
			ddSections, 
			ddSpecimens, 
			selectedSpecimenId,
			selectedSpecimenName,
			isInitializing: false, 
		});
	}

	onChangeSectionCode = (sectionId, option) => {
		this.setState({ isLoading: true, selectedSectionId: sectionId }, async () => {
			const { selectedSpecimenId: specimenID } = this.state;
			const examItems = await fetchExamitems(sectionId, specimenID);
			
			this.setState({ 
				examItems, 
				examItemsRef: examItems,
				isLoading: false, 
				selectedSectionName: option.props.children
			});
		});
	}

	onChangeSpecimen = (specimenID, option) => {
		this.setState({ isLoading: true, selectedSpecimenId: specimenID }, async () => {
			const { selectedSectionId: sectionId } = this.state;
			const examItems = await fetchExamitems(sectionId, specimenID);

			this.setState({ 
				examItems,
				examItemsRef: examItems,
				isLoading: false,
				selectedSpecimenName: option.props.children
			});
		});
	}

	onSearch = (value) => {
		const { examItemsRef } = this.state;
		const searchedVal = value.toLowerCase();

		const filtered = examItemsRef.filter(item => {
			const { examItemName, examItemGeneralName, examItemIntegrationCode } = item;

			return (
				this.containsString(examItemName, searchedVal) ||
				this.containsString(examItemGeneralName, searchedVal) ||
				this.containsString(examItemIntegrationCode, searchedVal)
			);
		});

		this.setState({ examItems: filtered });
	}

	onChangeSearch = (event) => {
		const { examItemsRef } = this.state;

		if(event.target.value === '') 
			this.setState({ examItems: examItemsRef });
	}

	onDblClickTableRow = (selectedExamItem) => {
		this.setState({ 
			selectedExamItem,
			isShowValuesDrawer: true,
		});
	}

	onExitForm = () => {
		this.setState({ isShowValuesDrawer:false });
	}

	onChangePager = (pageSize) => {
		this.setState({ pageSize });
	}

	onSuccessAddNormalValues = () => {
		this.setState({ isLoading: true }, async () => {
			const { selectedSectionId: sectionId, selectedSpecimenId: specimenId } = this.state;
			const examItems = await fetchExamitems(sectionId, specimenId);
			this.setState({ examItems, isLoading: false });
		});

		// @ts-ignore
		HttpCodeMessage({ status: 200, message: messagePrompts.successCreatedNormalValues });
	}

	// Private Function
	containsString = (searchFrom, searchedVal) => {
		if(searchFrom === null || searchFrom === '')
			return false;

		return searchFrom.toString().toLowerCase().includes(searchedVal);
	}

	render() {
		const { 
				ddSections,
				ddSpecimens, 
				isInitializing,
				selectedSectionId,
				selectedSpecimenId,
				examItems,
				pageSize,
				isShowValuesDrawer,
				isLoading,
				selectedExamItem,
				selectedSectionName,
				selectedSpecimenName
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
				<Search
					allowClear
					onSearch={value => this.onSearch(value)}
					onChange={this.onChangeSearch}
					style={{ width: 200, marginLeft: 15 }}
					disabled={selectedSectionId == null}
					className="exam-item-search-input"
				/>
			</>
		);

		const rightSection = (
			<>
				<TablePager handleChange={this.onChangePager} />
			</>
		);

		return(
			<div>
				<section style={{ textAlign: 'center', marginTop: 30 }}>
					<PageTitle pageTitle={moduleTitle} />
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
				<NormalValuesDrawer 
					visible={isShowValuesDrawer}
					onClose={this.onExitForm} 
					onSuccess={this.onSuccessAddNormalValues}
					selectedExamItem={selectedExamItem}
					selectedSectionId={selectedSectionId}
					selectedSpecimenId={selectedSpecimenId}
					selectedSectionName={selectedSectionName}
					selectedSpecimenName={selectedSpecimenName}
				/>
			</div>
		);
	} 
}

ActionSection.propTypes = {
	leftContent: PropTypes.node.isRequired,
	rightContent: PropTypes.node.isRequired
};

export default NormalValues;