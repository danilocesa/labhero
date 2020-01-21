/* eslint-disable react/prop-types */
// LIBRARY
import React from 'react';
import { Drawer, Form, Input, Button, Select } from 'antd';
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
import { createExamItem, getUnitOfMeasures, getInputTypeCode } from '../api_repo';
import {fieldRules, drawerTitle, fieldLabels, buttonNames} from '../settings';

import './add_form.css';

const { Option } = Select;
const { TextArea } = Input;

class AddForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
			selectedRsType: null,
			unitOfMeasures: [],
			inputTypeCodes: []
		}

		this.dynamicForm = React.createRef();
	}
	
	async componentDidMount() {
		const unitOfMeasures = await getUnitOfMeasures();
		const inputTypeCodes = await getInputTypeCode();
		
		this.setState({ unitOfMeasures, inputTypeCodes });
	}

	onChangeItemTypeCode = (itemTypeCode) => {
		const { setFieldsValue } = this.props.form;

		if(itemTypeCode === EITC_NUMERIC)
			setFieldsValue({ examItemTypeDefault: '' });

		this.setState({ selectedRsType: itemTypeCode });
	}

	onSubmit = (event) => {
		event.preventDefault();
		
		const { selectedRsType } = this.state;
		const { onSuccess, form, selectedSectionId, selectedSpecimenId } = this.props;
		const { getFieldsValue, validateFieldsAndScroll } = form;

		validateFieldsAndScroll((err) => {
			const dynaFormFields = selectedRsType === EITC_OPTION || selectedRsType === EITC_CHECKBOX
				// @ts-ignore	
				? this.dynamicForm.getFormValues() 
				: { hasError: false };
			
			if (!err && !dynaFormFields.hasError) {
				const fields = getFieldsValue();
				
				// If checkbox or option get default & label in dynamic form
				if(selectedRsType === EITC_OPTION || selectedRsType === EITC_CHECKBOX){  
					const examItemValueParam = [];
					dynaFormFields.formValues.forEach(value => (
						examItemValueParam.push({
							examItemValueDefault: value.isDefault ? 1 : 0,
							examItemValueLabel: value.label
						})
					));

					fields.examItemValue = examItemValueParam;
				} 

				if(selectedRsType === EITC_ALPHA_NUMERIC || 
					 selectedRsType === EITC_NUMERIC || 
					 selectedRsType === EITC_TEXT_AREA ) {
						if(fields.examItemTypeDefault) {
							fields.examItemValue = [{ 
								examItemValueDefault: 1,
								examItemValueLabel: fields.examItemTypeDefault
							}];
						}
				}

				delete fields.examItemTypeDefault; // We don't need it

				const payload = { 
					...fields, 
					examItemTypeItems: dynaFormFields.formValues, 
					sectionID: selectedSectionId,
					specimenID: selectedSpecimenId
				};
				
				this.setState({ isLoading: true }, async () => {
					const createdExamItem = await createExamItem(payload);
					this.setState({ isLoading: false });
					
					if(createdExamItem) {
						onSuccess();
						this.resetForm();
					}
				});

			}
		});
	}

	resetForm = () => {
		// eslint-disable-next-line react/prop-types
		const { resetFields } = this.props.form;

		resetFields();

		this.setState({ selectedRsType: null });
	}

	render() {
		const { isLoading, selectedRsType, unitOfMeasures, inputTypeCodes } = this.state;
		// eslint-disable-next-line react/prop-types
		const { onClose, visible, form } = this.props;
		// eslint-disable-next-line react/prop-types
		const { getFieldDecorator } = form;
	
		const UnitMeasureOptions = unitOfMeasures.map(unit => {
			return (
				<Option value={unit.unitOfMeasureCode} key={unit.unitOfMeasureCode}>
					{`${unit.unitOfMeasureCode} - ${unit.unitOfMesureBase}`}
				</Option>
			);
		});

		const InputTypeCodeOptions = inputTypeCodes.map(typeCode => (
			<Option value={typeCode.inputTypeCode} key={typeCode.inputTypeCode}>
				{typeCode.inputTypeName}
			</Option>
		));
		

		return (
			<Drawer
				title={drawerTitle.add}
				width="400"
				placement="right"
				closable
				onClose={onClose}
				visible={visible}
			>
				<Form onSubmit={this.onSubmit} className="exam-item-add-form">
					<section style={{ marginBottom: 50 }}>
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
						{ (selectedRsType === EITC_ALPHA_NUMERIC) && (
							<React.Fragment>
								<Form.Item label={fieldLabels.examItemUnitCode}>
									{getFieldDecorator('examItemUnitCode', { rules: fieldRules.unitOfMeasure })(
										<Select>{UnitMeasureOptions}</Select>
									)}
								</Form.Item>
								<Form.Item label={fieldLabels.examItemTypeDefault}>
									{getFieldDecorator('examItemTypeDefault', { 
										rules: fieldRules.examItemTypeDefault, 
										// initialValue: 1 
									})(
										<AlphaNumInput maxLength={254} />
									)}
								</Form.Item>
							</React.Fragment>
						)}
						{ (selectedRsType === EITC_NUMERIC) && (
							<React.Fragment>
								<Form.Item label={fieldLabels.examItemUnitCode}>
									{getFieldDecorator('examItemUnitCode', { rules: fieldRules.unitOfMeasure })(
										<Select>{UnitMeasureOptions}</Select>
									)}
								</Form.Item>
								<Form.Item label={fieldLabels.examItemTypeDefault}>
									{getFieldDecorator('examItemTypeDefault', { 
										rules: fieldRules.examItemTypeDefault, 
										// initialValue: 1 
									})(
										<NumberInput maxLength={254} />
									)}
								</Form.Item>
							</React.Fragment>
						)}
						{ (selectedRsType === EITC_CHECKBOX || selectedRsType === EITC_OPTION) && (
							// @ts-ignore
							<DynamicForm wrappedComponentRef={(inst) => this.dynamicForm = inst} />
						)}
						{ selectedRsType === EITC_TEXT_AREA && (
							<React.Fragment>
								<Form.Item label={fieldLabels.examItemTypeDefault}>
									{getFieldDecorator('examItemTypeDefault', { 
										rules: fieldRules.examItemTypeDefault,
										// initialValue: 1 
									})(
										<TextArea maxLength={100} />
									)}
								</Form.Item>
							</React.Fragment>	
						)}
						<Form.Item label={fieldLabels.examItemIntegrationCode}>
							{getFieldDecorator('examItemIntegrationCode', { rules: fieldRules.integrationCode })(
								<Input maxLength={100} />
							)}
						</Form.Item>
					</section>
					<section className="drawerFooter">
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
								{buttonNames.create}
							</Button>
						</div>
					</section>
				</Form>
			</Drawer>
		);
	}
}

AddForm.propTypes = {
	onClose: PropTypes.func.isRequired,
	visible: PropTypes.bool.isRequired,
	onSuccess: PropTypes.func.isRequired,
	selectedSectionId: PropTypes.number,
	selectedSpecimenId: PropTypes.number
};

AddForm.defaultProps = {
	selectedSectionId: null,
	selectedSpecimenId: null
};

export default Form.create()(AddForm);