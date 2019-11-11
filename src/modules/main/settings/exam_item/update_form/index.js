/* eslint-disable react/prop-types */
import React from 'react';
import { Drawer, Form, Input, Button, Select, InputNumber, Spin  } from 'antd';
import PropTypes from 'prop-types';
import DynamicForm from '../dynamic_form';
import { updateExamItem, getUnitOfMeasures, getInputTypeCode, fetchExamItem } from '../api_repo';

import FIELD_RULES from './constant';

import './update_form.css';

const { Option } = Select;
const { TextArea } = Input;

const DD_VAL_ALPHA_NUMERIC = 'an';
const DD_VAL_NUMERIC = 'nu';
const DD_VAL_CHECKBOX = 'cb';
const DD_VAL_OPTION = 'op';
const DD_VAL_TEXT_AREA = 'ta';

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
			selectedItemTypeCode: null,
			unitOfMeasures: [],
			inputTypeCodes: [],
			examItemValue: []
		}

		this.dynamicForm = React.createRef();
	}
	
	
	async componentDidMount() {
		const unitOfMeasures = await getUnitOfMeasures();
		const inputTypeCodes = await getInputTypeCode();
		
		this.setState({ unitOfMeasures, inputTypeCodes });
	}

	async componentDidUpdate(prevProps) {
		const { 
			selectedSectionId: secId, 
			selectedSpecimenId: specId,
			selectedExamItemId: examItemId, 
		} = this.props;

		const { 
			selectedSectionId: prevSecId, 
			selectedSpecimenId: prevSpecId,
			selectedExamItemId: prevExamItemId 
		} = prevProps;
		
		const propsHasChanged = secId !== prevSecId || specId !== prevSpecId || examItemId !== prevExamItemId;
		const propsIsNotNull = secId !== null && specId !== null && examItemId !== null;
		
		// Note. This will run only when a prop has changed 
		// for preventing an infinite rendering
		if(propsHasChanged && propsIsNotNull) {
			// eslint-disable-next-line react/no-did-update-set-state
			this.setState({ isFetchingData: true }, async() => {
				const examItem = await fetchExamItem(secId, specId, examItemId);
				
				if(examItem) {
					const { setFieldsValue } = this.props.form;
					const { examItemTypeCode } = examItem;
					// const isOptnOrChbox = examItemTypeCode === DD_VAL_OPTION || examItemTypeCode === DD_VAL_CHECKBOX
					// const examItemValue = isOptnOrChbox ? examItem.examItemValue : [];
					const examItemValue = examItem.examItemValue || [];

					// First.
					// Assign value to the dynamic form only if the selected 
					// type code is option or checkbox
					this.setState({ 
						selectedItemTypeCode: examItemTypeCode,
						examItemValue
					});
					
					// Second. 
					// Assign value to the fields that is always present on the form
					setFieldsValue({ 
						examItemId: examItem.examItemID,
						examItemName: examItem.examItemName,
						examItemGeneralName: examItem.examItemGeneralName,
						examItemTypeCode,
						examItemIntegrationCode: examItem.examItemIntegrationCode
					});

					// Third. 
					// Assign value to the fields that correspond to the selected
					// item type code. E.g Alpha numeric, textarea, etc.
					if(examItem.examItemTypeCode === DD_VAL_ALPHA_NUMERIC) {
						setFieldsValue({ examItemUnitCode: examItem.examItemUnitCode });
					}

					console.log(examItemValue);
					if(examItem.examItemTypeCode === DD_VAL_ALPHA_NUMERIC 
						|| examItem.examItemTypeCode === DD_VAL_NUMERIC 
						|| examItem.examItemTypeCode === DD_VAL_TEXT_AREA
					){
						const defaultVal = examItemValue.length > 0 ? examItemValue[0].examItemValueLabel : null;
						setFieldsValue({ examItemTypeDefault: defaultVal });
					}

				}

				this.setState({ isFetchingData: false });
			});
		}	

	}


	onChangeItemTypeCode = (itemTypeCode) => {
		this.setState({ selectedItemTypeCode: itemTypeCode });
	}

	onSubmit = (event) => {
		event.preventDefault();
		
		const { selectedItemTypeCode } = this.state;
		// eslint-disable-next-line react/prop-types
		const { onSuccess, form, selectedSectionId, selectedSpecimenId } = this.props;
		// eslint-disable-next-line react/prop-types
		const { getFieldsValue, validateFieldsAndScroll } = form;

		validateFieldsAndScroll((err) => {
			const dynaFormFields = selectedItemTypeCode === DD_VAL_OPTION || selectedItemTypeCode === DD_VAL_CHECKBOX
				// @ts-ignore	
				? this.dynamicForm.getFormValues() 
				: { hasError: false };
				
			if (!err && !dynaFormFields.hasError) {
				const fields = getFieldsValue();
				const examItemValueParam = [];

				if(selectedItemTypeCode === DD_VAL_OPTION || selectedItemTypeCode === DD_VAL_CHECKBOX){  
					dynaFormFields.formValues.map(value=> (
						examItemValueParam.push({
							examItemValueDefault: value.isDefault ? 1 : 0,
							examItemValueLabel: value.label
						})
					));

					fields.examItemValue = examItemValueParam;
				} 

				if(selectedItemTypeCode === DD_VAL_ALPHA_NUMERIC || 
					 selectedItemTypeCode === DD_VAL_NUMERIC || 
					 selectedItemTypeCode === DD_VAL_TEXT_AREA ) {
					 fields.examItemValue = [{ 
						 examItemValueDefault: 0,
						 examItemValueLabel: fields.examItemTypeDefault
					 }];
			 	}

				const payload = { 
					...fields, 
					sectionID: selectedSectionId,
					specimenID: selectedSpecimenId
				};

				this.setState({ isLoading: true }, async () => {
					const updatedExamItem = await updateExamItem(payload);
					this.setState({ isLoading: false });
					
					if(updatedExamItem) 
						onSuccess();
				});
			}
		});
	}

	render() {
		const { 
			isLoading, 
			selectedItemTypeCode, 
			unitOfMeasures, 
			inputTypeCodes, 
			isFetchingData,
			examItemValue
		} = this.state;
	
		const { onClose, visible, form } = this.props;
		const { getFieldDecorator, getFieldsValue } = form;
		
		const fieldsValue = getFieldsValue();
		
		const UnitMeasureOptions = unitOfMeasures.map(unit => (
			<Option value={unit.unitOfMeasureCode} key={unit.unitOfMeasureCode}>
				{unit.unitOfMesureBase}
			</Option>
		));

		const InputTypeCodeOptions = inputTypeCodes.map(typeCode => (
			<Option value={typeCode.inputTypeCode} key={typeCode.inputTypeCode}>
				{typeCode.inputTypeName}
			</Option>
		));

		getFieldDecorator('examItemId', { initialValue: 0 });

		return (
			<Drawer
				title="UPDATE EXAM"
				width="400"
				placement="right"
				closable
				onClose={onClose}
				visible={visible}
			>
				
				<Form onSubmit={this.onSubmit} className="exam-item-update-form">
					<Spin 
						tip="Loading..."
						spinning={isFetchingData}
					>
						<section style={{ marginBottom: 60 }}>
						<Form.Item label="EXAM ITEM NAME">
							{getFieldDecorator('examItemName', { rules: FIELD_RULES.examItemName })(
								<Input />
							)}
						</Form.Item>
						<Form.Item label="EXAM ITEM GENERAL NAME">
							{getFieldDecorator('examItemGeneralName', { rules: FIELD_RULES.examItemGeneralName })(
								<Input />
							)}
						</Form.Item>
						<Form.Item label="EXAM ITEM TYPE">
							{getFieldDecorator('examItemTypeCode', { rules: FIELD_RULES.examItemType })(
								<Select onChange={this.onChangeItemTypeCode}>
									{InputTypeCodeOptions}
								</Select>
							)}
						</Form.Item>
						{ selectedItemTypeCode === DD_VAL_ALPHA_NUMERIC && (
							<>
								<Form.Item label="UNIT OF MEASURES">
									{getFieldDecorator('examItemUnitCode', { rules: FIELD_RULES.unitOfMeasure })(
										<Select>{UnitMeasureOptions}</Select>
									)}
								</Form.Item>
								<Form.Item label="DEFAULT VALUE">
									{getFieldDecorator('examItemTypeDefault', { rules: FIELD_RULES.examItemTypeDefault })(
										<Input />
									)}
								</Form.Item>
							</>
						)}
						{ (selectedItemTypeCode === DD_VAL_NUMERIC) && (
							<>
								<Form.Item label="DEFAULT VALUE">
									{getFieldDecorator('examItemTypeDefault', { rules: FIELD_RULES.examItemTypeDefault })(
										<InputNumber style={styles.fullWidth} />
									)}
								</Form.Item>
							</>	
						)}
						{ (selectedItemTypeCode === DD_VAL_CHECKBOX || selectedItemTypeCode === DD_VAL_OPTION) && (
								// @ts-ignore
								<DynamicForm 
									wrappedComponentRef={(inst) => this.dynamicForm = inst} 
									examItemValue={examItemValue}
									examId={fieldsValue.examItemId}
								/> 
						)}
						{ selectedItemTypeCode === DD_VAL_TEXT_AREA && (
							<>
								<Form.Item label="DEFAULT VALUE">
									{getFieldDecorator('examItemTypeDefault', { rules: FIELD_RULES.examItemTypeDefault })(
										<TextArea />
									)}
								</Form.Item>
							</>
						)}
						<Form.Item label="INTEGRATION CODE">
							{getFieldDecorator('examItemIntegrationCode', { rules: FIELD_RULES.integrationCode })(
								<Input />
							)}
						</Form.Item>
      </section>
					</Spin>
					<section style={styles.footer}>
						<div>
							<Button 
								shape="round" 
								style={{ margin: 10 }}
								onClick={onClose}
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
								UPDATE
							</Button>
						</div>
					</section>
				</Form>
			</Drawer>
		);
	}
}

UpdateForm.propTypes = {
	onClose: PropTypes.func.isRequired,
	visible: PropTypes.bool.isRequired,
	onSuccess: PropTypes.func.isRequired,
	selectedSectionId: PropTypes.number,
	selectedSpecimenId: PropTypes.number,
	selectedExamItemId: PropTypes.number
};

UpdateForm.defaultProps = {
	selectedSectionId: null,
	selectedSpecimenId: null,
	selectedExamItemId: null
};

export default Form.create()(UpdateForm);