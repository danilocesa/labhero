import React from 'react';
import PropTypes from 'prop-types';
import {  Form, Input, InputNumber,Button,Select } from 'antd';
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
import { AlphaNumInput, RegexInput, NumberInput } from 'shared_components/pattern_input';

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

	render() {
		const { inputTypeCodes, selectedRsType, unitOfMeasures } =this.state

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

		const { drawerButton} = this.props;
			return (
				<div>
					<Form 
						ref={this.formRef}
						layout="vertical"
						className="exam-item-add-form" 
						style={{marginTop: -20}}
					>
					<div className="form-section">
						<Form.Item 
							label="QUESTION" 
							name='question'
						>
								<TextArea style={{ textTransform: 'uppercase'}} />
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

// export default Form.create()(AddForm);
export default AddForm;