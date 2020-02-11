/* eslint-disable react/prop-types */
// LIBRARY
import React from 'react';
import { Drawer, Form, Input, Button, Select, Spin  } from 'antd';
import PropTypes from 'prop-types';
import {
	// Exam Item Type Codes
	EITC_ALPHA_NUMERIC,
	EITC_NUMERIC,
	EITC_CHECKBOX,
	EITC_OPTION,
	EITC_TEXT_AREA,
} from 'global_config/constant-global';
import { AlphaNumInput, RegexInput, NumberInput } from 'shared_components/pattern_input';

import DynamicForm from '../dynamic_form';
import { updateExamItem, getUnitOfMeasures, getInputTypeCode, fetchExamItem } from '../api_repo';
import {fieldRules, drawerTitle, fieldLabels, buttonNames} from '../settings';

// CSS
import './update_form.css';

const { Option } = Select;
const { TextArea } = Input;

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
					if(examItem.examItemTypeCode === EITC_ALPHA_NUMERIC) {
						setFieldsValue({ examItemUnitCode: examItem.examItemUnitCode });
					}

					if(examItem.examItemTypeCode === EITC_ALPHA_NUMERIC 
						|| examItem.examItemTypeCode === EITC_NUMERIC 
						|| examItem.examItemTypeCode === EITC_TEXT_AREA
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
		const { setFieldsValue } = this.props.form;

		if(itemTypeCode === EITC_NUMERIC)
			setFieldsValue({ examItemTypeDefault: '' });

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
			const dynaFormFields = selectedItemTypeCode === EITC_OPTION || selectedItemTypeCode === EITC_CHECKBOX
				// @ts-ignore	
				? this.dynamicForm.getFormValues() 
				: { hasError: false };
				
			if (!err && !dynaFormFields.hasError) {
				const fields = getFieldsValue();
				const examItemValueParam = [];

				if(selectedItemTypeCode === EITC_OPTION || selectedItemTypeCode === EITC_CHECKBOX){  
					dynaFormFields.formValues.map(value=> (
						examItemValueParam.push({
							examItemValueDefault: value.isDefault ? 1 : 0,
							examItemValueLabel: value.label
						})
					));

					fields.examItemValue = examItemValueParam;
				} 

				if(selectedItemTypeCode === EITC_ALPHA_NUMERIC || 
					 selectedItemTypeCode === EITC_NUMERIC || 
					 selectedItemTypeCode === EITC_TEXT_AREA ) {
						fields.examItemValue = null;

						if(fields.examItemTypeDefault) {
							fields.examItemValue = [{ 
								examItemValueDefault: 1,
								examItemValueLabel: fields.examItemTypeDefault
							}];
						}
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
		
		const { onClose, visible, form, selectedSectionName, selectedSpecimenName } = this.props;
		const { getFieldDecorator, getFieldsValue } = form;
		
		const fieldsValue = getFieldsValue();
		
		const UnitMeasureOptions = unitOfMeasures.map(unit => (
			<Option value={unit.unitOfMeasureCode} key={unit.unitOfMeasureCode}>
				{`${unit.unitOfMeasureCode} - ${unit.unitOfMesureBase}`}
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
				title={`${drawerTitle.update} - ${selectedSectionName} / ${selectedSpecimenName}`.toUpperCase()}
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
							<Form.Item label={fieldLabels.examItemName}>
								{getFieldDecorator('examItemName', { rules: fieldRules.examItemName })(
									<RegexInput 
										regex={/[A-z0-9 -]/} 
										maxLength={200} 
									/>
								)}
							</Form.Item>
							<Form.Item label={fieldLabels.examItemGeneralName}>
								{getFieldDecorator('examItemGeneralName', { rules: fieldRules.examItemGeneralName })(
									<RegexInput 
										regex={/[A-z0-9 -]/} 
										maxLength={50} 
									/>
								)}
							</Form.Item>
							<Form.Item label={fieldLabels.examItemTypeCode}>
								{getFieldDecorator('examItemTypeCode', { rules: fieldRules.examItemType })(
									<Select onChange={this.onChangeItemTypeCode}>
										{InputTypeCodeOptions}
									</Select>
								)}
							</Form.Item>
							{ (selectedItemTypeCode === EITC_ALPHA_NUMERIC) &&  (
								<>
									<Form.Item label={fieldLabels.examItemUnitCode}>
										{getFieldDecorator('examItemUnitCode', { rules: fieldRules.unitOfMeasure })(
											<Select>{UnitMeasureOptions}</Select>
										)}
									</Form.Item>
									<Form.Item label={fieldLabels.examItemTypeDefault}>
										{getFieldDecorator('examItemTypeDefault', { rules: fieldRules.examItemTypeDefault })(
											<AlphaNumInput maxLength={254} />
										)}
									</Form.Item>
								</>
							)}
							{ (selectedItemTypeCode === EITC_NUMERIC) &&  (
								<>
									<Form.Item label={fieldLabels.examItemUnitCode}>
										{getFieldDecorator('examItemUnitCode', { rules: fieldRules.unitOfMeasure })(
											<Select>{UnitMeasureOptions}</Select>
										)}
									</Form.Item>
									<Form.Item label={fieldLabels.examItemTypeDefault}>
										{getFieldDecorator('examItemTypeDefault', { rules: fieldRules.examItemTypeDefault })(
											<NumberInput maxLength={254} />
										)}
									</Form.Item>
								</>
							)}
							{ (selectedItemTypeCode === EITC_CHECKBOX || selectedItemTypeCode === EITC_OPTION) && (
									// @ts-ignore
									<DynamicForm 
										wrappedComponentRef={(inst) => this.dynamicForm = inst} 
										examItemValue={examItemValue}
										examId={fieldsValue.examItemId}
									/> 
							)}
							{ selectedItemTypeCode === EITC_TEXT_AREA && (
								<>
									<Form.Item label={fieldLabels.examItemTypeDefault}>
										{getFieldDecorator('examItemTypeDefault', { rules: fieldRules.examItemTypeDefault })(
											<TextArea maxLength={100} />
										)}
									</Form.Item>
								</>
							)}
							<Form.Item label={fieldLabels.examItemIntegrationCode}>
								{getFieldDecorator('examItemIntegrationCode', { rules: fieldRules.integrationCode })(
									<Input maxLength={100} />
								)}
							</Form.Item>
						</section>
					</Spin>
					<section style={styles.footer}>
						<div>
							<Button 
								shape="round" 
								style={{ margin: 10, width: 120 }}
								onClick={onClose}
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

UpdateForm.propTypes = {
	onClose: PropTypes.func.isRequired,
	visible: PropTypes.bool.isRequired,
	onSuccess: PropTypes.func.isRequired,
	selectedSectionId: PropTypes.number,
	selectedSpecimenId: PropTypes.number,
	selectedExamItemId: PropTypes.number,
	selectedSectionName: PropTypes.string,
	selectedSpecimenName: PropTypes.string,
};

UpdateForm.defaultProps = {
	selectedSectionId: null,
	selectedSpecimenId: null,
	selectedExamItemId: null,
	selectedSectionName: null,
	selectedSpecimenName: null
};

export default Form.create()(UpdateForm);