import React from 'react';
import { Drawer, Form, Input, Row, Col, Button, InputNumber } from 'antd';
import PropTypes from 'prop-types';

import { fetchExamList, createExamRequest } from './api_repo';	 
import SelectionTable from '../selection_table';
import SelectedTable from '../selected_table';
import FIELD_RULES from './constant';

/** @type {{footer: React.CSSProperties, fullWidth: React.CSSProperties}} */
const styles = {
	fullWidth: {
		width: '100%'
	},
	footer: { 
		position: 'absolute', 
		width: '100%', 
		bottom: 0, 
		left: 0,  
		borderTop: '1px solid #e8e8e8',
		backgroundColor: '#fff',
		textAlign: 'right'
	}
};

class AddForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = { 
			isLoading: false, 
			isFetchingData: false,
			examList: [],
			selectedExams: []
		}

		this.selectedTable = React.createRef();
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

		const { selectedExams } = this.state;
		// eslint-disable-next-line react/prop-types
		const { onSuccess, form } = this.props;
		const { resetFields, getFieldsValue, validateFieldsAndScroll } = form;

		validateFieldsAndScroll((err) => {
			// @ts-ignore
			const isSelExamValidated = this.selectedTable.triggerValidation();

			if (!err && isSelExamValidated) {
				// @ts-ignore
				const examItemsGroups = this.selectedTable.getInputFieldValue();
				console.log("TCL: onSubmit -> examItemsGroups", examItemsGroups)
				const fields = getFieldsValue();
				const examItems = [];
				// eslint-disable-next-line func-names
				selectedExams.map(function(value,key){
					console.log(examItemsGroups[`examRequestItemFormula${key+1}`])

					examItems.push({
						"examItemID": value.examItemID,
						"examRequestItemGroup": examItemsGroups[`examRequestItemGroup${key+1}`],
						"examRequestItemFormula": examItemsGroups[`examRequestItemFormula${key+1}`],
						"examRequestItemLock":  examItemsGroups[`examRequestItemLock${key+1}`],
						"examRequestItemSort": examItemsGroups[`examRequestItemSort${key+1}`]
					})
					// eslint-disable-next-line no-unused-expressions
					console.log("TCL: onSubmit -> examItems", examItems)
					return examItems;
				});

				console.log("TCL: onSubmit -> examItems", examItems)
				const payload = Object.assign(fields, {examItems}); 	
				console.log("TCL: onSubmit -> payload", payload);
				
				this.setState({ isLoading: true }, async() => {
					const createdExamRequest = await createExamRequest(payload);
					this.setState({ isLoading: false });

					if(createdExamRequest){
						onSuccess();
						resetFields();
						this.setState({ selectedExams: [] });
					}
				});
				
			}
		});
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
		
	onChangeSelectedTable = (examItemID, examData) => {
		const { selectedExams } = this.state;
    console.log("TCL: onChangeSelectedTable -> selectedExams", selectedExams)
		const updatedSelectedExams = selectedExams.map(item => {
    console.log("TCL: onChangeSelectedTable -> item", item)
			if(item.examItemID === examItemID) 
				return Object.assign(item, examData);
			
			return item;
		});

		this.setState({ selectedExams: updatedSelectedExams })
	}

	closeFormDrawer = () => {
		// eslint-disable-next-line react/prop-types
		const { closeForm, form } = this.props;
		const { resetFields } = form;

		this.setState({ selectedExams: [] });
		resetFields();
		closeForm();
	}

	render() {
		const { isLoading, isFetchingData, examList, selectedExams } = this.state;
		const { sectionId , specimenId} = this.props;
		// eslint-disable-next-line react/prop-types
		const { visible, form } = this.props;
		const { getFieldDecorator } = form;
		

		return (
			<Drawer
				title="Add Exam Request"
				width="70%"
				placement="right"
				closable
				onClose={this.closeFormDrawer}
				visible={visible}
			>
				<Form onSubmit={this.onSubmit}>
					<section style={{ marginBottom: 50 }}>
						<div style={{ margin: '0px 10px' }}>
							<Row gutter={12}>
								<Col span={10}>
									<Form.Item label="NAME">
										{getFieldDecorator('examRequestName', { rules: FIELD_RULES.examName })(
											<Input />
										)}
									</Form.Item>
								</Col>
								<Col span={14}>
									<Form.Item label="CODE">
										{getFieldDecorator('examRequestCode', { rules: FIELD_RULES.examCode })(
											<Input />
										)}
									</Form.Item>
								</Col>
								<Col span={4} className="hide">
									<Form.Item label="SPECIMEN ID">
										{getFieldDecorator('specimenID', { rules: FIELD_RULES.specimenID, initialValue: specimenId })(
											<InputNumber style={styles.fullWidth} />
										)}
									</Form.Item>
								</Col>
								<Col span={4} className="hide">
									<Form.Item label="SECTION ID">
										{getFieldDecorator('sectionID', { rules: FIELD_RULES.sectionID, initialValue: sectionId })(
											<InputNumber style={styles.fullWidth} />
										)}
									</Form.Item>
								</Col>
							</Row>
							<Row gutter={12}>
								<Col span={10}>
									<Form.Item label="LOINC">
										{getFieldDecorator('examRequestLoinc', { rules: FIELD_RULES.loinc })(
											<Input />
										)}
									</Form.Item>
								</Col>
								<Col span={10}>
									<Form.Item label="INTEGRATION CODE">
										{getFieldDecorator('examRequestIntegrationCode', { rules: FIELD_RULES.integrationCode })(
											<Input />
										)}
									</Form.Item>
								</Col>
								<Col span={4}>
									<Form.Item label="EXAM SORT">
										{getFieldDecorator('examRequestSort', { rules: FIELD_RULES.examSort })(
											<Input style={styles.fullWidth} />
										)}
									</Form.Item>
								</Col>
							</Row>
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
										loading={false}
									/>		
								</Col>
							</Row>
						</div>
				
					</section>
					<section style={styles.footer}>
						<div>
							<Button 
								shape="round" 
								style={{ margin: 10 }}
								onClick={this.closeFormDrawer}
							>
								CANCEL
							</Button>
							<Button 
								shape="round" 
								type="primary" 
								htmlType="submit"
								loading={isLoading}
								style={{ margin: 10 }}
							>
								CREATE
							</Button>
						</div>
					</section>
				</Form>
			</Drawer>
		);
	}
}

AddForm.propTypes = {
	sectionId: PropTypes.number, 
	specimenId: PropTypes.number,
	closeForm: PropTypes.func.isRequired,
	visible: PropTypes.bool.isRequired,
	onSuccess: PropTypes.func.isRequired
};

AddForm.defaultProps = {
	sectionId: null,
	specimenId: null
}

export default Form.create()(AddForm);