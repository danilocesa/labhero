import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Typography, Button, Icon } from 'antd';
import TablePager from 'shared_components/table_pager';
import Message from 'shared_components/message';

import ExamTable from './table';
import AddForm from './add_form';
import UpdateForm from './update_form';
import DropDown from '../shared/dropdown';

import { fetchSection, fetchSpecimens, fetchExamRequest } from './api_repo';

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
		selectedSectionId: null,
		selectedSpecimenId: null,
		isInitializing: true,
		isLoading: false,
		pageSize: 5,
		isShowAddForm: false,
		isShowUpdateForm: false,
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
		this.setState({ isShowAddForm: false });
		Message.success('Exam request successfully created.');
	}

	onSuccessUpdateExamReq = () => {
		this.setState({ isShowUpdateForm: false });
		Message.success('Exam request successfully updated.');
	}

	onChangeSection = async(sectionId) => {
		this.setState({ isLoading: true, selectedSectionId: sectionId }, async() => {
			const { selectedSpecimenId: specimenId } = this.state;
			const examRequests = await fetchExamRequest(sectionId, specimenId);		
			
			this.setState({ 
				examRequests: examRequests || [], 
				selectedSectionId: sectionId,
				isLoading: false
			});
		});
	}

	onChangeSpecimen = (specimenId) => {
		this.setState({ isLoading: true, selectedSpecimenId: specimenId }, async() => {
			const { selectedSectionId: sectionId } = this.state;
			const examRequests = await fetchExamRequest(sectionId, specimenId);
			
			this.setState({ 
				examRequests,
				selectedSpecimenId: specimenId,
				isLoading: false
			});
		});
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
				<Col span={10}>
					<DropDown 
						size="small"
						placeholder="Filter by Specimen"
						content={ddSpecimens} 
						disabled={selectedSectionId == null}
						onChange={this.onChangeSpecimen}
						loading={isInitializing}
						value={selectedSpecimenId}
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
					<Icon type="plus" /> Add Exam Request
				</Button>
				<TablePager handleChange={this.onChangePager} />
			</>
		);

		return (
			<div>
				<section style={{ textAlign: 'center', marginTop: 30 }}>
					<Title level={3}>Exam Request</Title>
					<Row style={{ marginTop: 50 }}>
						<DropDown 
							label="SECTION" 
							placeholder="Select Section"
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