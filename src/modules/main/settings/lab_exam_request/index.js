// LIBRARY
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Input } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import { PlusOutlined } from '@ant-design/icons';
// CUSTOM
import TablePager from 'shared_components/table_pager';
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

import './exam_request.css';

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
		selectedSectionName: null,
		selectedSpecimenName: null,
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
			selectedSpecimenName: specimens[0].specimenName ? specimens[0].specimenName : null,
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

	onChangeSection = async(sectionId, option) => {
		this.setState({ isLoading: true, selectedSectionId: sectionId }, async() => {
			const { selectedSpecimenId: specimenId } = this.state;
			const examRequests = await fetchExamRequests(sectionId, specimenId);		
			
			this.setState({ 
				examRequests: examRequests || [], 
				examRequestsRef: examRequests || [], 
				selectedSectionId: sectionId,
				selectedSectionName: option.props.children, 
				isLoading: false
			});
		});
	}

	onChangeSpecimen = (specimenId, option) => {
		this.setState({ isLoading: true, selectedSpecimenId: specimenId }, async() => {
			const { selectedSectionId: sectionId } = this.state;
			const examRequests = await fetchExamRequests(sectionId, specimenId);
			
			this.setState({ 
				examRequests,
				examRequestsRef: examRequests || [], 
				selectedSpecimenId: specimenId,
				selectedSpecimenName: option.props.children,
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
		this.setState({ 
			isShowAddForm: false, 
			isShowUpdateForm: false,
			selectedExamRequest: {}
		});
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
			selectedExamRequest,
			selectedSectionName,
			selectedSpecimenName
		} = this.state;
		
		const leftSection = (
			// <Row gutter={24}>
			// 	<Col span={24}>
				<>
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
						disabled={selectedSectionId == null}
						className="exam-request-search-input"
					/>
				</>
			// 	</Col>
			// </Row>
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
					<PlusOutlined />{buttonNames.addExam}
				</Button>
				<TablePager handleChange={this.onChangePager} />
			</>
		);
		

		return (
			<div>
				<Row justify="center" style={{ marginTop: 30 }}>
					<Col>
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
					</Col>
				</Row>
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
					selectedSectionName={selectedSectionName}
					selectedSpecimenName={selectedSpecimenName}
				/>
				<UpdateForm
					examRequest={selectedExamRequest}
					visible={isShowUpdateForm}
					closeForm={this.closeForm}
					onSuccess={this.onSuccessUpdateExamReq}
					sectionId={selectedSectionId}
					specimenId={selectedSpecimenId}
					examRequestId={selectedExamRequest.examRequestID}
					selectedSectionName={selectedSectionName}
					selectedSpecimenName={selectedSpecimenName}
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