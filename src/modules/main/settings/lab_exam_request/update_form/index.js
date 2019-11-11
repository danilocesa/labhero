import React from 'react';
import { Drawer, Form, Input, Row, Col, Button, InputNumber } from 'antd';
import PropTypes from 'prop-types';

import { fetchExamList, fetchSelectedExamList, updateExamRequest } from './api_repo';
import SelectionTable from '../selection_table';
import SelectedTable from '../selected_table';

import { FIELD_RULES, FIELD_LABELS } from './constant';

/** @type {{footer: React.CSSProperties, fullWidth: React.CSSProperties }} */
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

class UpdateForm extends React.Component {
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

		const { selectedExams } = this.state;
		// eslint-disable-next-line react/prop-types
		const { examRequest, form, onSuccess } = this.props;
		const { getFieldsValue, validateFieldsAndScroll } = form;
		const { examRequestID, examRequestActive } = examRequest;

		validateFieldsAndScroll((err) => {
			// @ts-ignore
			const isSelExamValidated = this.selectedTable.triggerValidation();
			console.log(isSelExamValidated);
			if(!err && isSelExamValidated) {
				this.setState({ isLoading: true}, async() => {
					const updatedExamRequest = await updateExamRequest({ 
						examRequestID,
						examRequestActive,
						...getFieldsValue(),
						examItems: selectedExams
					});
					
					this.setState({ isLoading: false });

					if(updatedExamRequest) {
						onSuccess();
					}
				});
			}
		});
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

		this.setState({ selectedExams: [] });
		closeForm();
	}

	render() {
		const { isLoading, isFetchingData, examList, selectedExams } = this.state;
		// eslint-disable-next-line react/prop-types
		const { visible, form  } = this.props;
		const { getFieldDecorator } = form;

		return (
			<Drawer
				title="Update Exam Request"
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
									<Form.Item label={FIELD_LABELS.examName}>
										{getFieldDecorator('examRequestName', { rules: FIELD_RULES.examName })(
											<Input />
										)}
									</Form.Item>
								</Col>
								<Col span={14}>
									<Form.Item label={FIELD_LABELS.examCode}>
										{getFieldDecorator('examRequestCode', { rules: FIELD_RULES.examCode })(
											<Input />
										)}
									</Form.Item>
								</Col>
								<Col span={4} className="hide">
									<Form.Item label={FIELD_LABELS.specimenID}>
										{getFieldDecorator('specimenID', { rules: FIELD_RULES.specimenID})(
											<InputNumber style={styles.fullWidth} />
										)}
									</Form.Item>
								</Col>
								<Col span={4} className="hide">
									<Form.Item label={FIELD_LABELS.sectionID}>
										{getFieldDecorator('sectionID', { rules: FIELD_RULES.sectionID })(
											<InputNumber style={styles.fullWidth} />
										)}
									</Form.Item>
								</Col>
							</Row>
							<Row gutter={12}>
								<Col span={10}>
									<Form.Item label={FIELD_LABELS.loinc}>
										{getFieldDecorator('examRequestLoinc', { rules: FIELD_RULES.loinc })(
											<Input />
										)}
									</Form.Item>
								</Col>
								<Col span={10}>
									<Form.Item label={FIELD_LABELS.integrationCode}>
										{getFieldDecorator('examRequestIntegrationCode', { rules: FIELD_RULES.integrationCode })(
											<Input />
										)}
									</Form.Item>
								</Col>
								<Col span={4}>
									<Form.Item label={FIELD_LABELS.examSort}>
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
										selectedRowKeys={selectedExams.map(exam => exam ? exam.examItemID : null )}
									/>		
								</Col>
								<Col span={17}>
									<SelectedTable 
										wrappedComponentRef={(inst) => this.selectedTable = inst}
										data={selectedExams}
										loading={false}
										// onChange={this.onChangeSelectedTable}
									/>		
								</Col>
							</Row>
						</div>					
					</section>
					<section style={styles.footer}>
						<div>
							<Button 
								shape="round" 
								style={{ margin: 10, width: 100 }}
								onClick={this.closeFormDrawer}
							>
								CANCEL
							</Button>
							<Button 
								shape="round" 
								type="primary" 
								htmlType="submit"
								loading={isLoading}
								style={{ margin: 10, width: 100 }}
							>
								SAVE
							</Button>
						</div>
					</section>
				</Form>
			</Drawer>
		);
	}
}

UpdateForm.propTypes = {
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

UpdateForm.defaultProps = {
	sectionId: null,
	specimenId: null,
	examRequestId: null
}

export default Form.create({
	mapPropsToFields(props) {
    return {
			// @ts-ignore
			examRequestName: Form.createFormField({ value: props.examRequest.examRequestName }),
			// @ts-ignore
			examRequestCode: Form.createFormField({ value: props.examRequest.examRequestCode }),
			// @ts-ignore
			examRequestLoinc: Form.createFormField({ value: props.examRequest.examRequestLoinc }),
			// @ts-ignore
			examRequestIntegrationCode: Form.createFormField({ value: props.examRequest.examRequestIntegrationCode }),
			// @ts-ignore
			examRequestSort: Form.createFormField({ value: props.examRequest.examRequestSort }),
			// @ts-ignore
			sectionID: Form.createFormField({ value: props.examRequest.sectionID }),
			// @ts-ignore
			specimenID: Form.createFormField({ value: props.examRequest.specimenID })
    };
  },
})(UpdateForm);