// @ts-nocheck
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
import { updateExamItem, fetchExamItem } from 'services/settings/examItem';
import getUnitOfMeasures from 'services/settings/unitOfMeasure';
import getInputTypeCode from 'services/settings/inputType';
import { fieldRules, drawerTitle, fieldLabels, buttonNames } from '../settings';
import DynamicForm from '../dynamic_form';

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
			examItemValue: [],
			examItemId: 0
		}

		this.formRef = React.createRef();
		this.dynamicForm = React.createRef();
	}
	
	
	async componentDidMount() {
		const userData = JSON.parse(sessionStorage.LOGGEDIN_USER_DATA);
		const UserDatatype = userData.loginType
		const jsonFormatAccessMatrix = JSON.parse(sessionStorage.ACCESS_MATRIX);
		const settingsUpdateArray =  jsonFormatAccessMatrix.settings.update
		if (settingsUpdateArray.some(data => data === UserDatatype))
		{
			this.setState({
				buttonUpdateVisible:true
			})
		}

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
					const { setFieldsValue } = this.formRef.current;
					const { examItemTypeCode } = examItem;
					const examItemValue = examItem.examItemValue || [];

					// First.
					// Assign value to the dynamic form only if the selected 
					// type code is option or checkbox

					this.setState({ 
						selectedItemTypeCode: examItemTypeCode,
						examItemValue
					}, () => {
						// Second. 
						// Assign value to the fields that is always present on the form
						setFieldsValue({ 
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

						// Fourth
						// Assign examItemId
						this.setState({ examItemId: examItem.examItemID });
					});
				}

				this.setState({ isFetchingData: false });
			});
		}	

	}


	onChangeItemTypeCode = (itemTypeCode) => {
		const { setFieldsValue } = this.formRef.current;

		if(itemTypeCode === EITC_NUMERIC)
			setFieldsValue({ examItemTypeDefault: '' });

		this.setState({ selectedItemTypeCode: itemTypeCode });
	}

	onSubmit = () => {
		const { selectedItemTypeCode, examItemId } = this.state;
		const { onSuccess, selectedSectionId, selectedSpecimenId } = this.props;
		const { getFieldsValue } = this.formRef.current;

		const fields = getFieldsValue();
		// If checkbox or option get default & label in dynamic form
		if(selectedItemTypeCode === EITC_OPTION || selectedItemTypeCode === EITC_CHECKBOX){  
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

		if(selectedItemTypeCode === EITC_ALPHA_NUMERIC || 
			selectedItemTypeCode === EITC_NUMERIC || 
			selectedItemTypeCode === EITC_TEXT_AREA ) {
				if(fields.examItemTypeDefault) {
					fields.examItemValue = [{ 
						examItemValueDefault: 1,
						examItemValueLabel: fields.examItemTypeDefault
					}];
				}
		}

		const payload = { 
			examItemId,
			examItemName: fields.examItemName,
			examItemGeneralName: fields.examItemGeneralName,
			examItemTypeCode: fields.examItemTypeCode,
			examItemIntegrationCode: fields.examItemIntegrationCode,
			examItemUnitCode: fields.examItemUnitCode,
			examItemValue: fields.examItemValue,
			sectionID: selectedSectionId,
			specimenID: selectedSpecimenId
		};
		console.log(payload);
		this.setState({ isLoading: true }, async () => {
			const updatedExamItem = await updateExamItem(payload);
			this.setState({ isLoading: false });
			
			if(updatedExamItem) 
				onSuccess();
		});
		// });
	}

	render() {
		const { 
			isLoading, 
			selectedItemTypeCode, 
			buttonUpdateVisible,
			unitOfMeasures, 
			inputTypeCodes, 
			isFetchingData,
			examItemValue,
			examItemId
		} = this.state;
		
		const { onClose, visible, selectedSectionName, selectedSpecimenName } = this.props;
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

		return (
			<Drawer
				title={`${drawerTitle.update} - ${selectedSectionName} / ${selectedSpecimenName}`.toUpperCase()}
				width="400"
				placement="right"
				closable
				onClose={onClose}
				visible={visible}
			>
				
				<Form 
					ref={this.formRef}
					onFinish={this.onSubmit} 
					className="exam-item-update-form"
					layout="vertical"
				>
					<Spin 
						tip="Loading..."
						spinning={isFetchingData}
					>
						<section style={{ marginBottom: 60 }}>
							<Form.Item 
								name="examItemName" 
								label={fieldLabels.examItemName}
								rules={fieldRules.examItemName}
							>
								<RegexInput 
									regex={/[A-z0-9 -]/} 
									maxLength={200} 
								/>
							</Form.Item>
							<Form.Item 
								name="examItemGeneralName" 
								label={fieldLabels.examItemGeneralName}
								rules={fieldRules.examItemGeneralName}
							>
								<RegexInput 
									regex={/[A-z0-9 -]/} 
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
							{ (selectedItemTypeCode === EITC_ALPHA_NUMERIC) &&  (
								<>
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
								</>
							)}
							{ (selectedItemTypeCode === EITC_NUMERIC) &&  (
								<>
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
								</>
							)}
							{ (selectedItemTypeCode === EITC_CHECKBOX || selectedItemTypeCode === EITC_OPTION) && (
								<Form.Item shouldUpdate>
									{(form) => {
										return (
											<DynamicForm 
												ref={(inst) => this.dynamicForm = inst} 
												form={form}
												examItemValue={examItemValue}
												examId={examItemId}
											/> 
										);
									}}
								</Form.Item>
							)}
							{ selectedItemTypeCode === EITC_TEXT_AREA && (
								<>
									<Form.Item 
										name="examItemTypeDefault"
										label={fieldLabels.examItemTypeDefault}
										rules={fieldRules.examItemTypeDefault}
									>
										<TextArea maxLength={100} />
									</Form.Item>
								</>
							)}
							<Form.Item 
								name="examItemIntegrationCode"
								label={fieldLabels.examItemIntegrationCode}
								rules={fieldRules.integrationCode}
							>
								<Input maxLength={100} />
							</Form.Item>
						</section>
					</Spin>

				{ 
					buttonUpdateVisible === true ? 
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
					: 
						null 
				} 
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

export default UpdateForm;