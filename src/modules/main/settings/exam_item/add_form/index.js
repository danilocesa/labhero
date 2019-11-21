import React from 'react';
import { Drawer, Form, Input, Button, Select } from 'antd';
import PropTypes from 'prop-types';
import DynamicForm from '../dynamic_form';
import { createExamItem, getUnitOfMeasures, getInputTypeCode } from '../api_repo';

import FIELD_RULES from './constant';

import './add_form.css';

const { Option } = Select;
const { TextArea } = Input;

const DD_VAL_ALPHA_NUMERIC = 'an';
const DD_VAL_NUMERIC = 'nu';
const DD_VAL_CHECKBOX = 'cb';
const DD_VAL_OPTION = 'op';
const DD_VAL_TEXT_AREA = 'ta';

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
		this.setState({ selectedRsType: itemTypeCode });
	}

	onSubmit = (event) => {
		event.preventDefault();
		
		const { selectedRsType } = this.state;
		// eslint-disable-next-line react/prop-types
		const { onSuccess, form, selectedSectionId, selectedSpecimenId } = this.props;
		// eslint-disable-next-line react/prop-types
		const { getFieldsValue, validateFieldsAndScroll } = form;

		validateFieldsAndScroll((err) => {
		
			const dynaFormFields = selectedRsType === DD_VAL_OPTION || selectedRsType === DD_VAL_CHECKBOX
				// @ts-ignore	
				? this.dynamicForm.getFormValues() 
				: { hasError: false };
			
			if (!err && !dynaFormFields.hasError) {
				// Define default values
				const examItemValueDefault = [{ examItemValueDefault: 1, examItemValueLabel: "Default" }];
				const fields = { ...getFieldsValue(), examItemValue: examItemValueDefault };
				
				// If checkbox or option get default & label in dynamic form
				if(selectedRsType === DD_VAL_OPTION || selectedRsType === DD_VAL_CHECKBOX){  
					const examItemValueParam = [];
					dynaFormFields.formValues.forEach(value => (
						examItemValueParam.push({
							examItemValueDefault: value.isDefault ? 1 : 0,
							examItemValueLabel: value.label
						})
					));

					fields.examItemValue = examItemValueParam;
				} 

				if(selectedRsType === DD_VAL_ALPHA_NUMERIC || 
					 selectedRsType === DD_VAL_NUMERIC || 
					 selectedRsType === DD_VAL_TEXT_AREA ) {
						fields.examItemValue = [{ 
							examItemValueDefault: 0,
							examItemValueLabel: fields.examItemTypeDefault
						}];
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
				title="ADD EXAM"
				width="400"
				placement="right"
				closable
				onClose={onClose}
				visible={visible}
			>
				<Form onSubmit={this.onSubmit} className="exam-item-add-form">
					<section style={{ marginBottom: 50 }}>
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
						{ (selectedRsType === DD_VAL_ALPHA_NUMERIC || selectedRsType === DD_VAL_NUMERIC) && (
							<React.Fragment>
								<Form.Item label="UNIT OF MEASURES">
									{getFieldDecorator('examItemUnitCode', { rules: FIELD_RULES.unitOfMeasure })(
										<Select>{UnitMeasureOptions}</Select>
									)}
								</Form.Item>
								<Form.Item label="DEFAULT VALUE">
									{getFieldDecorator('examItemTypeDefault', { 
										rules: FIELD_RULES.examItemTypeDefault, 
										initialValue: 1 
									})(
										<Input />
									)}
								</Form.Item>
							</React.Fragment>
						)}
						{ (selectedRsType === DD_VAL_CHECKBOX || selectedRsType === DD_VAL_OPTION) && (
							// @ts-ignore
							<DynamicForm wrappedComponentRef={(inst) => this.dynamicForm = inst} />
						)}
						{ selectedRsType === DD_VAL_TEXT_AREA && (
							<React.Fragment>
								<Form.Item label="DEFAULT VALUE">
									{getFieldDecorator('examItemTypeDefault', { 
										rules: FIELD_RULES.examItemTypeDefault,
										initialValue: 1 
									})(
										<TextArea />
									)}
								</Form.Item>
							</React.Fragment>	
						)}
						<Form.Item label="INTEGRATION CODE">
							{getFieldDecorator('examItemIntegrationCode', { rules: FIELD_RULES.integrationCode })(
								<Input />
							)}
						</Form.Item>
					</section>
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