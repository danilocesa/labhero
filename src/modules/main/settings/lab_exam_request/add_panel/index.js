/* eslint-disable react/prop-types */
// LIBRARY
import React from 'react';
import { Drawer, Form, Row, Col, Button } from 'antd';
import PropTypes from 'prop-types';

// CUSTOM
import { createExamRequest } from 'services/shared/examRequest';
import fetchExamList from 'services/settings/examItem'; 
import InputForm from '../form/insert_form';
import SelectionTable from '../selection_table';
import SelectedTable from '../selected_table';
import { drawerTitle, buttonNames } from '../settings';

class AddPanel extends React.Component {
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
		const { sectionId: currentSectionId, specimenId: currentSpecimenId } = this.props;
		const { sectionId: prevSectionId, specimenId: prevSpecimenId } = prevProps;


		if ((currentSectionId !== prevSectionId || currentSpecimenId !== prevSpecimenId) &&
			(currentSectionId !== null && currentSpecimenId !== null)) {

			// eslint-disable-next-line react/no-did-update-set-state
			this.setState({ isFetchingData: true }, async () => {
				const { sectionId, specimenId } = this.props;
				const examList = await fetchExamList(sectionId, specimenId);
				
				this.setState({ 
					examList: examList || [],
					selectedExams: [],
					isFetchingData: false
				});
			});
		}
	}

	onSubmit = (event) => {
		event.preventDefault();

		const { onSuccess } = this.props;

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
				const payload = { ...formFieldValues,  examItems: selectedExamItems }; 

				this.setState({ isLoading: true }, async() => {
					const createdExamRequest = await createExamRequest(payload);
					this.setState({ isLoading: false });

					if(createdExamRequest){
						onSuccess();
						// @ts-ignore
						this.formFields.resetForm();
						this.setState({ selectedExams: [] });
					}
				});
			}
		}
	}

	onSelectSelectionTable = (selectedExam) => {
		this.setState((state) => {
			const { selectedExams } = state;
			const newSelectedExams = [ ...selectedExams, selectedExam ];

			return { selectedExams: newSelectedExams };
		});
	}

	onSelectAllSelectionTable = (selectedExams) => {
		this.setState({ selectedExams });
	}

	onDeselectSelectionTable = (selectedExam) => {
		this.setState((state) => {
			const { selectedExams } = state;
			const newSelectedExams = selectedExams.filter(exam => exam.examItemID !== selectedExam.examItemID);

			this.setState({ selectedExams: newSelectedExams });
		});
	}
	
	onDragAndDropRow = (selectedExams) => {
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
		// eslint-disable-next-line react/prop-types
		const { closeForm } = this.props;

		this.setState({ selectedExams: [] });
		// @ts-ignore
		this.formFields.resetForm();
		closeForm();
	}

	render() {
		const { isLoading, isFetchingData, examList, selectedExams } = this.state;
		const { sectionId , specimenId} = this.props;
		// eslint-disable-next-line react/prop-types
		const { visible } = this.props;

		return (
			<Drawer
				title={drawerTitle.add}
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
							/>
							<Row gutter={12}>
								<Col span={7}>
									<SelectionTable 
										data={examList}
										loading={isFetchingData} 
										onSelect={this.onSelectSelectionTable}
										onDeselect={this.onDeselectSelectionTable}
										onSelectAll={this.onSelectAllSelectionTable}
										selectedRowKeys={selectedExams.map(exam => exam.examItemID)}
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
								style={{ margin: 10 }}
								onClick={this.closeFormDrawer}
							>
								{buttonNames.cancel}
							</Button>
							<Button 
								shape="round" 
								type="primary" 
								htmlType="submit"
								loading={isLoading}
								style={{ margin: 10 }}
							>
								{buttonNames.create}
							</Button>
						</div>
					</section>
				</Form>
			</Drawer>
		);
	}
}

AddPanel.propTypes = {
	sectionId: PropTypes.number, 
	specimenId: PropTypes.number,
	closeForm: PropTypes.func.isRequired,
	visible: PropTypes.bool.isRequired,
	onSuccess: PropTypes.func.isRequired
};

AddPanel.defaultProps = {
	sectionId: null,
	specimenId: null
}

export default AddPanel;