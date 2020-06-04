/* eslint-disable react/prop-types */
// LIBRARY
import React from 'react';
import { Drawer, Form, Row, Col, Button } from 'antd';
import PropTypes from 'prop-types';

// CUSTOM
import { fetchSelectedExamList, updateExamRequest } from 'services/shared/examRequest';
import fetchExamList from 'services/settings/examItem';
import InputForm from '../form/update_form';
import SelectionTable from '../selection_table';
import SelectedTable from '../selected_table';
import { drawerTitle, buttonNames } from '../settings';

class UpdatePanel extends React.Component {
	constructor(props) {
		super(props);

		this.state = { 
			isLoading: false, 
			isFetchingData: false,
			examList: [],
			selectedExams: []
		}
		
		this.formRef = React.createRef();
		this.selectedTable = React.createRef();
		this.formFields = React.createRef();
	}
	
	async componentDidUpdate(prevProps) {
		const { 
			sectionId: secId, 
			specimenId: specId,
			examRequestId: erId 
		} = this.props;

		const { 
			sectionId: prevSecId, 
			specimenId: prevSpecId,
			examRequestId: prevErId 
		} = prevProps;

		const propsHasChanged = secId !== prevSecId || specId !== prevSpecId || erId !== prevErId;
		const propsIsNotNull = secId !== null && specId !== null && erId !== null;
		
		if (propsHasChanged && propsIsNotNull) {
			// eslint-disable-next-line react/no-did-update-set-state
			this.setState({ isFetchingData: true }, async () => {
				const { sectionId, specimenId, examRequestId } = this.props;
				const selectedExams = await fetchSelectedExamList(sectionId, specimenId, examRequestId);
				const examList = await fetchExamList(sectionId, specimenId);
				

				this.setState({ 
					examList: examList || [],
					selectedExams,
					isFetchingData: false
				}, () => {
					// Set fields value of selected table
					const fieldsValue = {};

					selectedExams.forEach((item, index) => {
						fieldsValue[`keys_${index}`] = item.examItemID;
						fieldsValue[`examRequestItemGroup_${item.examItemID}`] = item.examRequestItemGroup;
						fieldsValue[`examRequestItemFormula_${item.examItemID}`] = item.examRequestItemFormula;
						fieldsValue[`examRequestItemLock_${item.examItemID}`] = item.examRequestItemLock ? 1 : 0;
						fieldsValue[`examRequestItemPrintable_${item.examItemID}`] = item.examRequestItemPrintable ? 1 : 0;
						fieldsValue[`examRequestItemSort_${item.examItemID}`] = item.examRequestItemSort;
					});

					this.formRef.current.setFieldsValue(fieldsValue);
				});
			});
		}
	}
	
	onSubmit = () => {
		const { onSuccess, examRequest } = this.props;
		const { examRequestID, examRequestActive } = examRequest;

		const selectedExamItems = this.selectedTable.current.getSelectedExamItems();
	
		const formFieldValues = this.formRef.current.getFieldsValue();
		const payload = { 
			examRequestID,
			examRequestActive,
			sectionID: formFieldValues.sectionID,
			specimenID: formFieldValues.specimenID,
			examRequestCode: formFieldValues.examRequestCode,
			examRequestIntegrationCode: formFieldValues.examRequestIntegrationCode,
			examRequestLoinc: formFieldValues.examRequestLoinc,
			examRequestName: formFieldValues.examRequestName,
			examRequestSort: formFieldValues.examRequestSort,
			examItems: selectedExamItems 
		}; 


		this.setState({ isLoading: true }, async() => {
			const updatedExamRequest = await updateExamRequest(payload);
			this.setState({ isLoading: false });

			if(updatedExamRequest){
				onSuccess();
			}
		});
		
	}
	
	onDragAndDropRow = (selectedExams) => {
		this.setState({ selectedExams });
	}	

	onSelectSelectionTable = (selectedExam) => {
		const { selectedExams } = this.state;
		const newSelectedExams = [ ...selectedExams, selectedExam ];

		this.setState({ selectedExams: newSelectedExams });
	}

	onDeselectSelectionTable = (selectedExam) => {
		const { selectedExams } = this.state;
		const newSelectedExams = selectedExams.filter(exam => exam.examItemID !== selectedExam.examItemID);

		this.setState({ selectedExams: newSelectedExams });
	}

	onSelectAllSelectionTable = (selectedExams) => {
		this.setState({ selectedExams });
	}

	onChangeSelectedTable = (examItemID, examData) => {
		const { selectedExams } = this.state;
		const updatedSelectedExams = selectedExams.map(item => {
			if(item.examItemID === examItemID) 
				return Object.assign(item, examData);
			
			return item;
		});

		this.setState({ selectedExams: updatedSelectedExams })
	}

	closeFormDrawer = () => {
		const { closeForm } = this.props;

		this.setState({ examList: [], selectedExams: [] }, () => {
			this.formRef.current.resetFields();
		});
		
		closeForm();
	}

	render() {
		const { isLoading, isFetchingData, examList, selectedExams } = this.state;
		// eslint-disable-next-line react/prop-types
		const { 
			visible, 
			examRequest, 
			selectedSectionName, 
			selectedSpecimenName 
		} = this.props;

		const selectedRowKeys = selectedExams.map(exam => exam ? exam.examItemID : null );
		
		return ( 
			<Drawer
				title={`${drawerTitle.update} - ${selectedSectionName} / ${selectedSpecimenName}`.toUpperCase()}
				width="90%"
				placement="right"
				closable
				onClose={this.closeFormDrawer}
				visible={visible}
			>
				<Form 
					ref={this.formRef}
					onFinish={this.onSubmit}
					layout="vertical"
					fields={[
						{
							name: 'examRequestName',
							value: examRequest.examRequestName
						},
						{
							name: 'examRequestCode',
							value: examRequest.examRequestCode
						},
						{
							name: 'specimenID',
							value: examRequest.specimenID
						},
						{
							name: 'sectionID',
							value: examRequest.sectionID
						},
						{
							name: 'examRequestLoinc',
							value: examRequest.examRequestLoinc
						},
						{
							name: 'examRequestIntegrationCode',
							value: examRequest.examRequestIntegrationCode
						},
						{
							name: 'examRequestSort',
							value: examRequest.examRequestSort
						}
					]}
				>
					<section style={{ marginBottom: 50 }}>
						<div style={{ margin: '0px 10px' }}>
							<InputForm 
								wrappedComponentRef={(inst) => this.formFields = inst}
								examRequest={examRequest}
							/>
							<Row gutter={12}>
								<Col span={7}>
									<SelectionTable 
										data={examList}
										loading={isFetchingData} 
										onSelect={this.onSelectSelectionTable}
										onDeselect={this.onDeselectSelectionTable}
										onSelectAll={this.onSelectAllSelectionTable}
										selectedRowKeys={selectedRowKeys}
									/>		
								</Col>
								<Col span={17}>
									<SelectedTable 
										form={this.formRef.current || {}}
										ref={this.selectedTable}
										data={selectedExams}
										onDragAndDropRow={this.onDragAndDropRow}
										loading={false}
									/>
								</Col>
							</Row>
						</div>					
					</section>
					<section className="drawerFooter">
						<div>
							<Button 
								shape="round" 
								style={{ margin: 10, width: 120 }}
								onClick={this.closeFormDrawer}
							>
								{buttonNames.cancel}
							</Button>
							<Button 
								shape="round" 
								type="primary" 
								htmlType="submit"
								loading={isLoading}
								style={{ margin: 10, width: 120 }}
							>
								{buttonNames.update}
							</Button>
						</div>
					</section>
				</Form>
			</Drawer>
		);
	}
}

UpdatePanel.propTypes = {
	sectionId: PropTypes.number, 
	specimenId: PropTypes.number,
	examRequestId: PropTypes.number,
	closeForm: PropTypes.func.isRequired,
	onSuccess: PropTypes.func.isRequired,
	visible: PropTypes.bool.isRequired,
	examRequest: PropTypes.shape({
		examRequestID: PropTypes.number,
		examRequestName: PropTypes.string,
		examRequestCode: PropTypes.string,
		examRequestLoinc: PropTypes.string,
		examRequestIntegrationCode: PropTypes.string,
		examRequestSort: PropTypes.number,
		sectionID: PropTypes.number,
		specimenID: PropTypes.number,
	}).isRequired,
	selectedSectionName: PropTypes.string,
	selectedSpecimenName: PropTypes.string,
};

UpdatePanel.defaultProps = {
	sectionId: null,
	specimenId: null,
	examRequestId: null,
	selectedSectionName: null,
	selectedSpecimenName: null
}

export default UpdatePanel;