// @ts-nocheck
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
import { createExamItem } from 'services/settings/examItem';
import getUnitOfMeasures from 'services/settings/unitOfMeasure';
import getInputTypeCode from 'services/settings/inputType';
import DynamicForm from '../dynamic_form';
import { fieldRules, drawerTitle, fieldLabels, buttonNames } from '../settings';

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

		this.formRef= React.createRef();
		this.dynamicForm = React.createRef();
	}
	
	async componentDidMount() {
		const unitOfMeasures = await getUnitOfMeasures();
		const inputTypeCodes = await getInputTypeCode();
		
		this.setState({ unitOfMeasures, inputTypeCodes });
	}

	onChangeItemTypeCode = (itemTypeCode) => {
		const { setFieldsValue } = this.formRef.current;

		if(itemTypeCode === EITC_NUMERIC)
			setFieldsValue({ examItemTypeDefault: '' });

		this.setState({ selectedRsType: itemTypeCode });
	}

	onSubmit = () => {
		const { selectedRsType } = this.state;
		const { onSuccess, selectedSectionId, selectedSpecimenId } = this.props;
		const { getFieldsValue } = this.formRef.current;

		const fields = getFieldsValue();
		// If checkbox or option get default & label in dynamic form
		if(selectedRsType === EITC_OPTION || selectedRsType === EITC_CHECKBOX){  
			const examItemValueParam = [];
			const checkIndex = this.dynamicForm.getCheckedItemIndex();
			const dynamicFields = this.dynamicForm.getFields();

			dynamicFields.forEach((item) => (
				examItemValueParam.push({
					examItemValueDefault: checkIndex === item.key ? 1 : 0,
					examItemValueLabel: fields[`dynamicInputs_${item.key}`]
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

		const payload = { 
			examItemName: fields.examItemName,
			examItemGeneralName: fields.examItemGeneralName,
			examItemTypeCode: fields.examItemTypeCode,
			examItemIntegrationCode: fields.examItemIntegrationCode,
			examItemUnitCode: fields.examItemUnitCode,
			examItemValue: fields.examItemValue,
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

	resetForm = () => {
		// eslint-disable-next-line react/prop-types
		const { resetFields } = this.formRef.current;

		resetFields();

		this.setState({ selectedRsType: null });
	}

	render() {
		const { isLoading, selectedRsType, unitOfMeasures, inputTypeCodes } = this.state;
		// eslint-disable-next-line react/prop-types
		const { onClose, visible, selectedSectionName, selectedSpecimenName } = this.props;
	
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
				title={`${drawerTitle.add} - ${selectedSectionName} / ${selectedSpecimenName}`.toUpperCase()}
				width="400"
				placement="right"
				closable
				onClose={onClose}
				visible={visible}
			>
				<Form 
					ref={this.formRef}
					onFinish={this.onSubmit} 
					className="exam-item-add-form"
					layout="vertical"
				>
					<section style={{ marginBottom: 50 }}>
						<Form.Item 
							name="examItemName" 
							label={fieldLabels.examItemName} 
							rules={fieldRules.examItemName}
						>
							<RegexInput 
								regex={/[A-Za-z0-9 -]/} 
								maxLength={200} 
							/>
						</Form.Item>
						<Form.Item 
							name="examItemGeneralName"
							label={fieldLabels.examItemGeneralName}
							rules={fieldRules.examItemGeneralName}
						>
							<RegexInput 
								regex={/[A-Za-z0-9 -]/} 
								maxLength={50} 
							/>
						</Form.Item>
						<Form.Item 
							name="examItemTypeCode"
							label={fieldLabels.examItemTypeCode}
							rules={fieldRules.examItemType}
						>
							<Select onChange={this.onChangeItemTypeCode}>
								{InputTypeCodeOptions}
							</Select>
						</Form.Item>
						{ (selectedRsType === EITC_ALPHA_NUMERIC) && (
							<React.Fragment>
								<Form.Item 
									name="examItemUnitCode"
									label={fieldLabels.examItemUnitCode}
									rules={fieldRules.unitOfMeasure}
								>
									<Select>{UnitMeasureOptions}</Select>
								</Form.Item>
								<Form.Item 
									name="examItemTypeDefault"
									label={fieldLabels.examItemTypeDefault}
									rules={fieldRules.examItemTypeDefault}
								>
									<AlphaNumInput maxLength={254} />
								</Form.Item>
							</React.Fragment>
						)}
						{ (selectedRsType === EITC_NUMERIC) && (
							<React.Fragment>
								<Form.Item 
									name="examItemUnitCode"
									label={fieldLabels.examItemUnitCode}
									rules={fieldRules.unitOfMeasure}
								>
									<Select>{UnitMeasureOptions}</Select>
								</Form.Item>
								<Form.Item 
									name="examItemTypeDefault"
									label={fieldLabels.examItemTypeDefault}
									rules={fieldRules.examItemTypeDefault}
								>
									<NumberInput maxLength={254} />
								</Form.Item>
							</React.Fragment>
						)}
						{ (selectedRsType === EITC_CHECKBOX || selectedRsType === EITC_OPTION) && (
							// @ts-ignore
							<DynamicForm ref={(inst) => this.dynamicForm = inst} />
						)}
						{ selectedRsType === EITC_TEXT_AREA && (
							<React.Fragment>
								<Form.Item 
									name="examItemTypeDefault"
									label={fieldLabels.examItemTypeDefault}
									rules={fieldRules.examItemTypeDefault}
								>
									<TextArea maxLength={100} />
								</Form.Item>
							</React.Fragment>	
						)}
						<Form.Item 
							name="examItemIntegrationCode"
							label={fieldLabels.examItemIntegrationCode}
							rules={fieldRules.integrationCode}
						>
							<Input maxLength={100} />
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
	selectedSpecimenId: PropTypes.number,
	selectedSectionName: PropTypes.string,
	selectedSpecimenName: PropTypes.string,
};

AddForm.defaultProps = {
	selectedSectionId: null,
	selectedSpecimenId: null,
	selectedSectionName: null,
	selectedSpecimenName: null
};

export default AddForm;