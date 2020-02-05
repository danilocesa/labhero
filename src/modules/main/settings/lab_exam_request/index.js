// LIBRARY
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Icon, Input } from 'antd';

// CUSTOM
import TablePager from 'shared_components/search_pager/pager';
import Message from 'shared_components/message';
import PageTitle from 'shared_components/page_title';
import fetchSpecimens from 'services/settings/specimen';
import { fetchExamRequests } from 'services/shared/examRequest';
import fetchSection from 'services/shared/section';
import ExamTable from './search_table';
import AddForm from './add_panel';
import UpdateForm from './update_panel';
import DropDown from '../shared/dropdown';
import { messages, placeHolders, labels, tablePageSize, buttonNames } from './settings';

const { Search } = Input;

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
		selectedSectionId: null,
		selectedSpecimenId: null,
		isInitializing: true,
		isLoading: false,
		pageSize: tablePageSize,
		isShowAddForm: false,
		isShowUpdateForm: false,
		examRequestsRef: [],
		examRequests: [],
		ddSections: [],
		ddSpecimens: [],
		selectedExamRequest: {},
	}

	async componentDidMount() {
		const sections = await fetchSection();
		const specimens = await fetchSpecimens();

		const ddSections = sections.map(section => ({
			label: section.sectionCode,
			value: section.sectionID
		}));

		const ddSpecimens = specimens.map(specimen => ({
			label: specimen.specimenName,
			value: specimen.specimenID
		}));

		this.setState({ 
			ddSections, 
			ddSpecimens, 
			selectedSpecimenId: specimens[0].specimenID ? specimens[0].specimenID : null,
			isInitializing: false 
		});
	}
	
	onSuccessCreateExamReq = () => {
		Message.success({ message: messages.updateSuccess });

		this.setState({ isLoading: true, isShowAddForm: false }, async() => {
			const { selectedSpecimenId: specimenId, selectedSectionId: sectionId } = this.state;
			const examRequests = await fetchExamRequests(sectionId, specimenId);		
			
			this.setState({ 
				examRequests: examRequests || [], 
				examRequestsRef: examRequests || [], 
				isLoading: false
			});
		});
	}

	onSuccessUpdateExamReq = () => {
		Message.success({ message: messages.updateSuccess });

		this.setState({ isLoading: true, isShowUpdateForm: false }, async() => {
			const { selectedSpecimenId: specimenId, selectedSectionId: sectionId } = this.state;
			const examRequests = await fetchExamRequests(sectionId, specimenId);		
			
			this.setState({ 
				examRequests: examRequests || [], 
				examRequestsRef: examRequests || [], 
				isLoading: false
			});
		});
	}

	onChangeSection = async(sectionId) => {
		this.setState({ isLoading: true, selectedSectionId: sectionId }, async() => {
			const { selectedSpecimenId: specimenId } = this.state;
			const examRequests = await fetchExamRequests(sectionId, specimenId);		
			
			this.setState({ 
				examRequests: examRequests || [], 
				examRequestsRef: examRequests || [], 
				selectedSectionId: sectionId,
				isLoading: false
			});
		});
	}

	onChangeSpecimen = (specimenId) => {
		this.setState({ isLoading: true, selectedSpecimenId: specimenId }, async() => {
			const { selectedSectionId: sectionId } = this.state;
			const examRequests = await fetchExamRequests(sectionId, specimenId);
			
			this.setState({ 
				examRequests,
				examRequestsRef: examRequests || [], 
				selectedSpecimenId: specimenId,
				isLoading: false
			});
		});
	}

	onSearch = (value) => {
		const { examRequestsRef } = this.state;
		const searchedVal = value.toLowerCase();

		const filtered = examRequestsRef.filter(item => {
			const { examRequestName, examRequestCode, examRequestIntegrationCode } = item;

			return (
				this.containsString(examRequestName, searchedVal) ||
				this.containsString(examRequestCode, searchedVal) ||
				this.containsString(examRequestIntegrationCode, searchedVal)
			);
		});

		this.setState({ examRequests: filtered });
	}

	onChangeSearch = (event) => {
		const { examRequestsRef } = this.state;

		if(event.target.value === '') 
			this.setState({ examRequests: examRequestsRef });
	}

	onDblClickTableRow = (selectedExamRequest) => {
		this.setState({ selectedExamRequest, isShowUpdateForm: true });
	}

	onClickAdd = () => {
		this.setState({ isShowAddForm: true });
	}

	onChangePager = (pageSize) => {
		this.setState({ pageSize });
	}

	closeForm = () => {
		this.setState({ isShowAddForm: false, isShowUpdateForm: false });
	}

	// Private Function
	containsString = (searchFrom, searchedVal) => {
		if(searchFrom === null || searchFrom === '')
			return false;

		return searchFrom.toString().toLowerCase().includes(searchedVal);
	}

	render() {
		const { 
			pageSize, 
			examRequests,
			ddSpecimens, 
			ddSections, 
			isShowAddForm, 
			isShowUpdateForm,
			isLoading,
			isInitializing,
			selectedSectionId,
			selectedSpecimenId,
			selectedExamRequest
		} = this.state;
		
		const leftSection = (
			<Row gutter={24}>
				<Col span={24}>
					<DropDown 
						size="small"
						placeholder={placeHolders.specimenDropdown}
						content={ddSpecimens} 
						disabled={selectedSectionId == null}
						onChange={this.onChangeSpecimen}
						loading={isInitializing}
						value={selectedSpecimenId}
					/>
					<Search
						allowClear
						onSearch={value => this.onSearch(value)}
						onChange={this.onChangeSearch}
						style={{ width: 200, marginLeft: 15 }}
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
					disabled={selectedSectionId == null}
				>
					<Icon type="plus" />{buttonNames.addExam}
				</Button>
				<TablePager handleChange={this.onChangePager} />
			</>
		);

		return (
			<div>
				<section style={{ textAlign: 'center', marginTop: 30 }}>
					<PageTitle pageTitle="EXAM REQUEST" />
					<Row style={{ marginTop: 50 }}>
						<DropDown 
							label={labels.sectionLabel} 
							placeholder={placeHolders.sectionDropdown}
							content={ddSections} 
							onChange={this.onChangeSection}
							value={selectedSectionId}
							loading={isInitializing}
						/>
					</Row>
				</section>
				<SecondarySection 
					leftContent={leftSection}
					rightContent={rightSection}
				/>
				<ExamTable 
					data={examRequests}
					pageSize={pageSize}
					loading={isLoading}
					onRowDblClick={this.onDblClickTableRow}
				/>
				<AddForm 
					visible={isShowAddForm}
					closeForm={this.closeForm}
					onSuccess={this.onSuccessCreateExamReq}
					sectionId={selectedSectionId}
					specimenId={selectedSpecimenId}
				/>
				<UpdateForm
					examRequest={selectedExamRequest}
					visible={isShowUpdateForm}
					closeForm={this.closeForm}
					onSuccess={this.onSuccessUpdateExamReq}
					sectionId={selectedSectionId}
					specimenId={selectedSpecimenId}
					examRequestId={selectedExamRequest.examRequestID}
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