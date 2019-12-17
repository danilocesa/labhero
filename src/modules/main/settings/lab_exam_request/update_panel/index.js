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
				});
			});
		}
	}
	
	onSubmit = (event) => {
		event.preventDefault();

		const { onSuccess, examRequest } = this.props;
		const { examRequestID, examRequestActive } = examRequest;

		// @ts-ignore
		const isFormFieldsValidated = this.formFields.triggerValidation();

		if(isFormFieldsValidated) {
			// @ts-ignore
			const isSelExamValidated = this.selectedTable.triggerValidation();

			if(isSelExamValidated) {
				// @ts-ignore
				const selectedExamItems = this.selectedTable.getSelectedExamItems();
				// @ts-ignore
				const formFieldValues = this.formFields.getFormValues();
				const payload = { 
					examRequestID,
					examRequestActive,
					...formFieldValues,  
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
		}
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

		closeForm();
	}

	render() {
		const { isLoading, isFetchingData, examList, selectedExams } = this.state;
		// eslint-disable-next-line react/prop-types
		const { visible, sectionId, specimenId, examRequest } = this.props;

		return ( 
			<Drawer
				title={drawerTitle.update}
				width="80%"
				placement="right"
				closable
				onClose={this.closeFormDrawer}
				visible={visible}
			>
				<Form onSubmit={this.onSubmit}>
					<section style={{ marginBottom: 50 }}>
						<div style={{ margin: '0px 10px' }}>
							<InputForm 
								wrappedComponentRef={(inst) => this.formFields = inst}
								sectionId={sectionId}
								specimenId={specimenId}
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
										selectedRowKeys={selectedExams.map(exam => exam ? exam.examItemID : null )}
									/>		
								</Col>
								<Col span={17}>
									<SelectedTable 
										wrappedComponentRef={(inst) => this.selectedTable = inst}
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
								style={{ margin: 10, width: 100 }}
								onClick={this.closeFormDrawer}
							>
								{buttonNames.cancel}
							</Button>
							<Button 
								shape="round" 
								type="primary" 
								htmlType="submit"
								loading={isLoading}
								style={{ margin: 10, width: 100 }}
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
	}).isRequired
};

UpdatePanel.defaultProps = {
	sectionId: null,
	specimenId: null,
	examRequestId: null
}

export default UpdatePanel;