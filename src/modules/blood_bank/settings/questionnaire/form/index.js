import React from 'react';
import PropTypes from 'prop-types';
import {  Form, Input, Button, Select } from 'antd';
import DynamicForm from '../dynamic_form'
import {
	// Exam Item Type Codes
	EITC_ALPHA_NUMERIC,
	EITC_NUMERIC,
	EITC_CHECKBOX,
	EITC_OPTION,
	EITC_TEXT_AREA,
} from 'global_config/constant-global';

import getInputTypeCode from 'services/settings/inputType';
import { messagePrompts } from '../settings'
import { LOGGEDIN_USER_DATA } from 'global_config/constant-global';
import HttpCodeMessage from 'shared_components/message_http_status'
import { AlphaNumInput, NumberInput } from 'shared_components/pattern_input';
import { createData, updateData } from 'services/blood_bank/question_type';


const { TextArea } = Input;
const { Option } = Select;

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
		const inputTypeCodes = await getInputTypeCode();
		
		this.setState({  inputTypeCodes });
	}

	onChangeItemTypeCode = (itemTypeCode) => {
		const { setFieldsValue } = this.formRef.current;

		if(itemTypeCode === EITC_NUMERIC)
			setFieldsValue({ examItemTypeDefault: '' });

		this.setState({ selectedRsType: itemTypeCode });
	}

	onFinish = async (values) => {
		const loggedinUser = JSON.parse(sessionStorage.getItem(LOGGEDIN_USER_DATA));
		const { drawerButton, selectQuestionType , selectedCategories } = this.props;
		const payload = {
			question_order : 1,
			question :values.question,
			ques_type: selectQuestionType,
			custom_fields :[],
			created_by: loggedinUser.userID,	
		};
    if(drawerButton === "ADD"){
			const createdBloodGroupResponse = await createData(payload);
			// @ts-ignore
			if(createdBloodGroupResponse.status === 201){
				const httpMessageConfig = {
					message: messagePrompts.successCreateUser,
					// @ts-ignore
					status: createdBloodGroupResponse.status,	
					duration: 3, 
					onClose: () => window.location.reload() 
				}
				HttpCodeMessage(httpMessageConfig);	
			}	
		}
		else {
			payload.questionnare_id = selectedCategories.questionnare_id;
			const updateBloodGroupResponse =  await updateData(payload)
			// @ts-ignore)
			if(updateBloodGroupResponse.status === 200){
				const httpMessageConfig = {
					message: messagePrompts.successUpdateUser,
					// @ts-ignore
					status: updateBloodGroupResponse.status,
					duration: 3, 
					onClose: () => window.location.reload() 
				}
				HttpCodeMessage(httpMessageConfig);
			}
		}
	};

	render() {
		const { 
			inputTypeCodes, 
			selectedRsType, 
			unitOfMeasures 
		} = this.state

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

		const { drawerButton } = this.props;
			return (
				<div>
					<Form 
						onFinish={this.onFinish} 
						ref={this.formRef}
						layout="vertical"
						className="exam-item-add-form" 
					>
					<div className="form-section">
						<Form.Item 
							label="QUESTION" 
							name='question'
						>
								<TextArea 
									style={{ textTransform: 'uppercase'}} 
								/>
						</Form.Item>
						<Form.Item 
							name="examItemTypeCode"
							label="QUESTION TYPE"
							// rules={fieldRules.examItemType}
						>
							<Select onChange={this.onChangeItemTypeCode}>
								{InputTypeCodeOptions}
							</Select>
						</Form.Item>
						{ (selectedRsType === EITC_ALPHA_NUMERIC) && (
							<React.Fragment>
								<Form.Item 
									name="examItemUnitCode"
									label='SELECT'
									// rules={fieldRules.unitOfMeasure}
								>
									<Select>{UnitMeasureOptions}</Select>
								</Form.Item>
								<Form.Item 
									name="examItemTypeDefault"
									label='ALPHANUM INPUT'
									// rules={fieldRules.examItemTypeDefault}
								>
									<AlphaNumInput maxLength={254} />
								</Form.Item>
							</React.Fragment>
						)}
						{ (selectedRsType === EITC_NUMERIC) && (
							<React.Fragment>
								<Form.Item 
									name="examItemUnitCode"
									label='SELECT'
									// rules={fieldRules.unitOfMeasure}
								>
									<Select>{UnitMeasureOptions}</Select>
								</Form.Item>
								<Form.Item 
									name="examItemTypeDefault"
									label='NUMBER INPUT'
									// rules={fieldRules.examItemTypeDefault}
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
									label='TEXT AREA'
									// rules={fieldRules.examItemTypeDefault}
								>
									<TextArea maxLength={100} />
								</Form.Item>
							</React.Fragment>	
						)}
					</div>			
						<section className="drawerFooter">
							<Button shape="round" style={{ marginRight: 8, width: 120 }} onClick={this.props.onClose}>
								CANCEL
							</Button>
							<Button type="primary" shape="round" style={{ margin: 10, width: 120 }} htmlType="submit">
								{drawerButton}
							</Button>
						</section>
					</Form>
				</div>
			);
	}
}

AddForm.propTypes = {
	drawerButton: PropTypes.string,
	onSuccess: PropTypes.func,
	selectedSectionId: PropTypes.number,
  selectedSpecimenId: PropTypes.number,
	actionType: PropTypes.string
};

AddForm.defaultProps = {
	selectedSectionId: null,
	selectedSpecimenId: null,
};

// export default Form.create()(AddForm);
export default AddForm;