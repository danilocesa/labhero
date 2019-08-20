import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Typography, Button, Icon, Input } from 'antd';
import axiosCall from 'services/axiosCall';
import TablePager from 'shared_components/table_pager';
import Message from 'shared_components/message';

import ExamTable from './table';
import AddForm from './add_form';
import UpdateForm from './update_form';
import DropDown from '../shared/dropdown';

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
		selectedSecCode: null,
		isLoading: false,
		pageSize: 5,
		isShowAddForm: false,
		isShowUpdateForm: false,
		examReqSource: [],
		examRequests: [],
		sections: [],
		ddSectionCodes: [],
		ddSpecimenNames: [],
		selectedExamRequest: {}
	}

	async componentDidMount() {
		const ddSpecimenNames = [];
		const sections = await this.fetchSection()
		const ddSectionCodes = sections.map(section => ({
			label: section.sectionCode,
			value: section.sectionID
		}));

		sections.forEach(section => {
			section.specimens.forEach(specimen => {
				const isExisting = ddSpecimenNames.find(specName => specName.value === specimen.specimenID);
				
				if(isExisting) return;
				
				ddSpecimenNames.push({
					label: specimen.specimenName,
					value: specimen.specimenID
				});
			});
		});

		ddSpecimenNames.unshift({ label: 'CLEAR FILTER', value: -1 });

		this.setState({ sections, ddSectionCodes, ddSpecimenNames });
	}
	
	onSuccessCreateExamReq = () => {
		this.setState({ isShowAddForm: false });
		Message.success('Exam request successfully created.');
	}

	onChangeSectionCode = async(sectionId, sectionCode) => {
		this.setState({ isLoading: true, selectedSecCode: sectionCode });

		const apiResponse = await this.fetchExamReqById(sectionId);
		const examRequests = [];
		
		apiResponse.forEach(item => {
			item.perSpecimen.forEach(perSpecimen => {
				perSpecimen.exams.forEach(exam => {
					examRequests.push({ 
						examID: exam.examID,
						examName: exam.examName,
						examCode: exam.examCode
					});
				});
			});
		}); 
		
		this.setState({ 
			examRequests, 
			examReqSource: examRequests,
			isLoading: false
		});
	}

	onChangeSectionName = (sectionID) => {
		const { examReqSource } = this.state;

		console.log(examReqSource);

		if(sectionID === -1) {
			this.setState({ examRequests: [...examReqSource] });
		}
		else {
			const examRequests = examReqSource.filter(examReq => examReq.sectionID === sectionID);
			this.setState({ examRequests });
		}
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

	onCloseForm = () => {
		this.setState({ isShowAddForm: false, isShowUpdateForm: false });
	}

	fetchSection = async() => {
		let sections = [];

		try {
			const url = `/ExamResult`;

			const response = await axiosCall({ method: 'GET', url });
			const { data } = await response;
			console.log(data);
			sections = data;
		} catch (e) {
			Message.error();
		}

		return sections;
	}

	fetchExamReqById = async(ids) => {
		let examRequests = [];

		try {
			const url = `/ExamRequest/ids/${ids}`;

			const response = await axiosCall({ method: 'GET', url });
			const { data } = await response;

			examRequests = data;
		} catch (e) {
			Message.error();
		}

		return examRequests;
	}

	render() {
		const { 
			pageSize, 
			examRequests, 
			ddSpecimenNames, 
			ddSectionCodes, 
			isShowAddForm, 
			isShowUpdateForm,
			isLoading,
			selectedSecCode,
			selectedExamRequest,
			sections
		} = this.state;

		console.log(sections);

		const leftSection = (
			<Row gutter={24}>
				<Col span={14}>
					<Input 
						prefix={<Icon type="search" />}
						placeholder="Search Exam Request Name"
						disabled={selectedSecCode == null}
					/>
				</Col>
				<Col span={10}>
					<DropDown 
						size="small"
						placeholder="Filter by SERUM"
						content={ddSpecimenNames} 
						disabled={selectedSecCode == null}
						onChange={this.onChangeSectionName}
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
					disabled={selectedSecCode == null}
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
							content={ddSectionCodes} 
							onChange={this.onChangeSectionCode}
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
					onClose={this.onCloseForm}
					onSuccess={this.onSuccessCreateExamReq}
				/>
				<UpdateForm
					examRequest={selectedExamRequest}
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