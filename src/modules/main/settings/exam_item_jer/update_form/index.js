import React from 'react';
import { Drawer, Form, Input, Button, Select, InputNumber  } from 'antd';
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
			inputTypeCodes: []
		}

		this.dynamicForm = React.createRef();
	}
	
	
	async componentDidMount() {
		const unitOfMeasures = await getUnitOfMeasures();
		const inputTypeCodes = await getInputTypeCode();
		
		this.setState({ unitOfMeasures, inputTypeCodes });
	}

	async componentDidUpdate(prevProps) {
		const { selectedItemTypeCode } = this.state;
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
		
		if(propsHasChanged && propsIsNotNull) {
			// eslint-disable-next-line react/no-did-update-set-state
			this.setState({ isFetchingData: true }, async() => {
				// eslint-disable-next-line react/prop-types
				const { setFieldsValue } = this.props.form;
				const examItem = await fetchExamItem(secId, specId, examItemId);
				
				if(examItem) {
					setFieldsValue({ 
						examItemId: examItem.examItemID,
						examItemName: examItem.examItemName,
						examItemGeneralName: examItem.examItemGeneralName,
						examItemTypeCode: examItem.examItemTypeCode,
						examItemIntegrationCode: examItem.examItemIntegrationCode
					}, () => {
						if(selectedItemTypeCode !== examItem.examItemTypeCode) {
							this.setState({ selectedItemTypeCode: examItem.examItemTypeCode }, () => {
								if(examItem.examItemTypeCode === DD_VAL_ALPHA_NUMERIC) 
									setFieldsValue({ examItemUnitCode: examItem.examItemUnitCode });
								
								if(examItem.examItemTypeCode === DD_VAL_ALPHA_NUMERIC || 
									selectedItemTypeCode === DD_VAL_NUMERIC || 
									selectedItemTypeCode === DD_VAL_TEXT_AREA)	
									setFieldsValue({ examItemTypeDefault: examItem.examItemUnitCode });
							});
						}
					});
				}
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
		const { getFieldsValue, validateFieldsAndScroll } = form;

		validateFieldsAndScroll((err) => {
			const dynaFormFields = selectedItemTypeCode === DD_VAL_OPTION || selectedItemTypeCode === DD_VAL_CHECKBOX
				// @ts-ignore	
				? this.dynamicForm.getFormValues() 
				: { hasError: false };

			if (!err && !dynaFormFields.hasError) {
				const fields = getFieldsValue();
				const payload = { 
					...fields, 
					examItemTypeItems: dynaFormFields.formValues, 
					sectionID: selectedSectionId,
					specimenID: selectedSpecimenId
				};

				this.setState({ isLoading: true }, async () => {
					const createdExamItem = await updateExamItem(payload);
					this.setState({ isLoading: false });
					
					if(createdExamItem) {
						onSuccess();
					}
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
			isFetchingData 
		} = this.state;

		// eslint-disable-next-line react/prop-types
		const { onClose, visible, form } = this.props;
		const { getFieldDecorator } = form;
	
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
				title="Update Exam"
				width="400"
				placement="right"
				closable
				onClose={onClose}
				visible={visible}
			>
				<Form onSubmit={this.onSubmit} className="exam-item-update-form">
					<section style={{ marginBottom: 50 }}>
						<Form.Item label="Exam Item Name">
							{getFieldDecorator('examItemName', { rules: FIELD_RULES.examItemName })(
								<Input />
							)}
						</Form.Item>
						<Form.Item label="Exam Item General Name">
							{getFieldDecorator('examItemGeneralName', { rules: FIELD_RULES.examItemGeneralName })(
								<Input />
							)}
						</Form.Item>
						<Form.Item label="Exam Item Type">
							{getFieldDecorator('examItemTypeCode', { rules: FIELD_RULES.examItemType })(
								<Select onChange={this.onChangeItemTypeCode}>
									{InputTypeCodeOptions}
								</Select>
							)}
						</Form.Item>
						{ selectedItemTypeCode === DD_VAL_ALPHA_NUMERIC && (
							<>
								<Form.Item label="Unit of Measures">
									{getFieldDecorator('examItemUnitCode', { rules: FIELD_RULES.unitOfMeasure })(
										<Select>{UnitMeasureOptions}</Select>
									)}
								</Form.Item>
								<Form.Item label="Default Value">
									{getFieldDecorator('examItemTypeDefault', { rules: FIELD_RULES.examItemTypeDefault })(
										<Input />
									)}
								</Form.Item>
							</>
						)}
						{ (selectedItemTypeCode === DD_VAL_NUMERIC) && (
							<Form.Item label="Default Value">
								{getFieldDecorator('examItemTypeDefault', { rules: FIELD_RULES.examItemTypeDefault })(
									<InputNumber style={styles.fullWidth} />
								)}
							</Form.Item>
						)}
						{ (selectedItemTypeCode === DD_VAL_CHECKBOX || selectedItemTypeCode === DD_VAL_OPTION) && (
							<DynamicForm 
								wrappedComponentRef={(inst) => this.dynamicForm = inst}
							/> 
						)}
						{ selectedItemTypeCode === DD_VAL_TEXT_AREA && (
							<Form.Item label="Default Value">
								{getFieldDecorator('examItemTypeDefault', { rules: FIELD_RULES.examItemTypeDefault })(
									<TextArea />
								)}
							</Form.Item>
						)}
						<Form.Item label="Integration Code">
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