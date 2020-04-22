/* eslint-disable react/prop-types */
// LIBRARY
import React from 'react';
import {  Form, Input, Select,Switch,Button } from 'antd';
import PropTypes from 'prop-types';
import {
	// Exam Item Type Codes
	EITC_ALPHA_NUMERIC,
	EITC_NUMERIC,
	EITC_CHECKBOX,
	EITC_OPTION,
	EITC_TEXT_AREA,
} from 'global_config/constant-global';
import { AlphaNumInput, NumberInput } from 'shared_components/pattern_input';
import { createExamItem } from 'services/settings/examItem';
import getUnitOfMeasures from 'services/settings/unitOfMeasure';
import getInputTypeCode from 'services/settings/inputType';
import DynamicForm from '../dynamic_form';
import { fieldRules } from '../settings';

// import './add_form.css';
const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
  };
const { Option } = Select;
const { TextArea } = Input;
const provinceData = ['WELLNESS', 'DRUGS & VACCINES' , 'GENERAL MEDICAL' ,'LIFE SYTLES'];

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
		
		const { drawerButton} = this.props;
		const { isLoading, selectedRsType, unitOfMeasures, inputTypeCodes } = this.state;
		// eslint-disable-next-line react/prop-types
		const {  form } = this.props;
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
			
			<div>
				<Form onSubmit={this.onSubmit} className="exam-item-add-form" style={{marginTop: -20}}>
          	{this.props.actionType == "update"?
					<Form.Item label="ACTIVE" {...layout} style={{marginLeft:'-95px'}} >
						<Switch />
					</Form.Item>	
					:
					 null
    			  }
					<section style={{ marginBottom: 50 }}>

						<Form.Item label="CATEGORY" style={{marginTop: -20}}>
						<Select>
						{provinceData.map(province => (
							<Option key={province}>{province}</Option>
							))}
						</Select>
						</Form.Item>
						<Form.Item label="QUESTION" style={{marginTop: -20}}>
							<TextArea rows={4} />
						</Form.Item>
						<Form.Item label="ANSWER" style={{marginTop: -20}}>
								<Select onChange={this.onChangeItemTypeCode}>
									{InputTypeCodeOptions}
								</Select>
						</Form.Item>
						{ (selectedRsType === EITC_ALPHA_NUMERIC) && (
							<React.Fragment>
								<Form.Item label="DEFAULT VALUE">
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
								<Form.Item label="DEFAULT VALUE">
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
								<Form.Item label="DEFAULT VALUE">
									{getFieldDecorator('examItemTypeDefault', { 
										rules: fieldRules.examItemTypeDefault,
										// initialValue: 1 
									})(
										<TextArea maxLength={100} />
									)}
								</Form.Item>
							</React.Fragment>	
						)}
					</section>	
				</Form>
				<section className="drawerFooter">
					<Button shape="round" style={{ marginRight: 8, width: 120 }} onClick={this.props.onClose}>
						CANCEL
					</Button>
					<Button type="primary" shape="round" style={{ margin: 10, width: 120 }} htmlType="submit">
						{drawerButton}
					</Button>
				</section>
			</div>
		);
	}
}

AddForm.propTypes = {

	
	drawerButton: PropTypes.string.isRequired,
	onSuccess: PropTypes.func.isRequired,
	selectedSectionId: PropTypes.number,
  	selectedSpecimenId: PropTypes.number,
	actionType: PropTypes.string
};

AddForm.defaultProps = {
	selectedSectionId: null,
	selectedSpecimenId: null,
};

export default Form.create()(AddForm);