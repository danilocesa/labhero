/* eslint-disable react/prop-types */
import React from 'react';
import { Form, Input, InputNumber, Button, Select, Switch, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import { fetchAgeBracketList } from 'services/settings/ageBracket';
import { getAllRangeClass } from 'services/settings/ExamItemRangeClass';
import { getAnalyzers } from 'services/settings/examItemRange';
import FIELD_RULES from './constants';
import { UserAccessContext } from 'context/userAccess';
import { fieldLabels, formMode, buttonNames} from '../settings';

import './fillup_form.css';

const { Option } = Select;

class FillupForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
			analyzers: [],
			ageBrackets: [],
			itemRangeClass: []
		}

		this.formRef = React.createRef();
	}

	async componentDidMount() {
		const { moduleType, selectedSectionID } = this.props; 
		const analyzers = await getAnalyzers();
		const filteredAnalyzers = analyzers.filter(i => i.active);

		this.setState({ analyzers: filteredAnalyzers });

		if(moduleType === formMode.update) {
			this.setFieldsValue();
		}

		await this.updateDropdownValues(selectedSectionID);
	}

	async componentDidUpdate(prevProps) {
		const { moduleType, selectedSectionID } = this.props; 

		if(selectedSectionID !== prevProps.selectedSectionID) {
			await this.updateDropdownValues(selectedSectionID);
		}

		if(moduleType === formMode.update) {
			if(this.props.selectedItemRange.examItemRangeID !== prevProps.selectedItemRange.examItemRangeID) {
				this.setFieldsValue();
			}
		}
	}

	onFormSubmit = (fieldValues) => {
		const { onSubmit } = this.props;
		// const { getFieldsValue, validateFieldsAndScroll } = form;

		this.setState({ isLoading: true }, async() => {
			await onSubmit(fieldValues);

			this.setState({ isLoading: false });
		});
	}

	onChangeRelease = (isSelected) => {
		if(!isSelected)
			this.formRef.current.setFieldsValue({ autoRelease: false });
	}

	onBlurRangeLow = () => {
		const { form } = this.props;

		form.validateFieldsAndScroll(['rangeHigh']);
	}

	resetForm = () => {
		// eslint-disable-next-line react/prop-types
		const { resetFields } = this.formRef.current;

		resetFields();
	}

	// Private functions
	validateRangeHigh = () => {
		const { getFieldsValue } = this.formRef.current;
		const { rangeLow, rangeHigh } = getFieldsValue();
		
		if(!rangeLow || !rangeHigh) {
			return Promise.resolve();
		}

		if (parseFloat(rangeLow) >= parseFloat(rangeHigh)) {
			return Promise.reject('Invalid value');
		}

		return Promise.resolve();
	}	

	updateDropdownValues = async (selectedSectionID) => {
		const ageBrackets = await fetchAgeBracketList();
		const itemRangeClass = await getAllRangeClass();

		const filteredAgeBrackets = ageBrackets.filter(item => (item.sectionID === selectedSectionID) && item.active === 1);
		const filteredRangeClass = itemRangeClass.filter(item => (item.sectionID === selectedSectionID) && item.active === 1);

		// eslint-disable-next-line react/no-did-update-set-state
		this.setState({ 
			ageBrackets: filteredAgeBrackets, 
			itemRangeClass: filteredRangeClass 
		});
	}

	setFieldsValue = () => {
		const { selectedItemRange } = this.props;
		const { examItemRangeID, examItemID, analyzerName, ageBracketLabel, rangeClassLabel, ...restItemRange } = selectedItemRange;

		const { setFieldsValue } = this.formRef.current;

		setFieldsValue({
			...restItemRange,
			canRelease: selectedItemRange.canRelease === 1,
			autoRelease: selectedItemRange.autoRelease === 1,
		});
	}

	render() {
		const { isLoading, analyzers, ageBrackets, itemRangeClass } = this.state;
		const { 
			onClose, 
			moduleType,
			examItemName,
			examItemGeneralName,
			examItemUnitCode
		} = this.props;
		
		// const { getFieldDecorator, getFieldsValue } = form;
		const machineOptions = analyzers.map(i => (
			<Option value={i.analyzerID} key={i.analyzerID}>
				{i.analyzerName}
			</Option>
		));

		const ageBracketOptions = ageBrackets.map(item => (
			<Option value={item.ageBracketID} key={item.ageBracketID}>
				{item.ageBracketLabel}
			</Option>
		));

		const itemRangeClassOptions = itemRangeClass.map(item => (
			<Option value={item.rangeClassID} key={item.rangeClassID}>
				{item.rangeClassLabel}
			</Option>
		));

		// const isReleaseSelected = getFieldsValue().canRelease;

		return (
			<Form 
				ref={this.formRef}
				onFinish={this.onFormSubmit} 
				className="normal-values-fillup-form"
				layout="vertical"
			>
				<section style={{ marginBottom: 50 }}>
					<section className="exam-item-info">
						<Row gutter={16}>
							<Col span={9} style={{ marginLeft: 10 }}>
								<Form.Item label={fieldLabels.examItemName}>
									<Input value={examItemName} disabled />
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item label={fieldLabels.examItemGeneralName}>
									<Input value={examItemGeneralName} disabled />
								</Form.Item>
							</Col>
							<Col span={6}>
								<Form.Item label={fieldLabels.examItemUnitCode}>
									<Input value={examItemUnitCode} disabled />
								</Form.Item>
							</Col>
						</Row>
					</section>
					<section className="form-values">
						<Row>
							<Col span={8}>
								<Row align="middle">
									<Col span={12}>
										<Form.Item>
											<span style={{ marginTop: -10, display: 'block' }}>
												{fieldLabels.autoRelease} 
											</span>
										</Form.Item>
									</Col>
									<Col span={12}>
										<Form.Item shouldUpdate>
											{({ getFieldsValue }) => {
												const isReleaseSelected = getFieldsValue().canRelease;

												return (
													<Form.Item 
														name="autoRelease"
														valuePropName="checked"
														labelCol={{ span: 12 }}
														initialValue
													>
														<Switch disabled={!isReleaseSelected} />
													{/* {getFieldDecorator('autoRelease', {
														initialValue: true,
														valuePropName: 'checked'
													})(
														<Switch disabled={!isReleaseSelected} />
													)} */}
													</Form.Item>
												);
											}}
										</Form.Item>
									</Col>
								</Row>
							</Col>
							<Col span={8}>
								<Row align="middle">
									<Col span={10}>
										<Form.Item>
											<span>{fieldLabels.release}</span>
										</Form.Item>
									</Col>
									<Col span={14}>
										<Form.Item 
											name="canRelease"
											valuePropName="checked"
											labelCol={{ span:12 }} 
											wrapperCol={{ span:1 }}
											initialValue
										>
											<Switch onChange={this.onChangeRelease} />
											{/* {getFieldDecorator('canRelease',{
												initialValue: true,
												valuePropName: 'checked'
											})(
												<Switch onChange={this.onChangeRelease} />
											)} */}
										</Form.Item>
									</Col>
								</Row>
							</Col>
						</Row>
						<Row gutter={12} style={{ marginTop: 10 }}>
							<Col span={6}>
								<Form.Item 
									name="sex"
									label={fieldLabels.gender}
									rules={FIELD_RULES.sex}
								>
									<Select>
										<Option value="ALL">ALL</Option>
										<Option value="MALE">MALE</Option>
										<Option value="FEMALE">FEMALE</Option>
									</Select>
									{/* {getFieldDecorator('sex', { rules: FIELD_RULES.sex })(
										<Select>
											<Option value="ALL">ALL</Option>
											<Option value="MALE">MALE</Option>
											<Option value="FEMALE">FEMALE</Option>
										</Select>
									)} */}
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item 
									name="ageBracketID"
									label={fieldLabels.ageBracket}
									rules={FIELD_RULES.ageBracket}
								>
									<Select>
										{ ageBracketOptions }
									</Select>
									{/* {getFieldDecorator('ageBracketID', { rules: FIELD_RULES.ageBracket })(
										<Select>
											{ ageBracketOptions }
										</Select>
									)} */}
								</Form.Item>
							</Col>
						</Row>
						<Row>
							<Col span={14}>
								<Form.Item 
									name="analyzerID"
									label={fieldLabels.machine}
									rules={FIELD_RULES.analyzerID}
								>
									<Select>
										{machineOptions}
									</Select>
									{/* {getFieldDecorator('analyzerID', { rules: FIELD_RULES.analyzerID })(
										<Select>
											{machineOptions}
										</Select>
									)} */}
								</Form.Item>
							</Col>
						</Row>
						<Row>
							<Col span={14}>
								<Form.Item 
									name="rangeClassID"
									label={fieldLabels.labelOfRange}
									rules={FIELD_RULES.rangeLabel}
								>
									<Select>
										{ itemRangeClassOptions }
									</Select>
									{/* {getFieldDecorator('rangeClassID', { rules: FIELD_RULES.rangeLabel })(
										<Select>
											{ itemRangeClassOptions }
										</Select>
									)} */}
								</Form.Item>
							</Col>
						</Row>
						<Row>
							<Col span={14}>							
								<Form.Item 
									name="displayValue"
									label={fieldLabels.displayValue}
									rules={FIELD_RULES.displayValue}
								>
									<Input maxLength={50} />
									{/* {getFieldDecorator('displayValue', { rules: FIELD_RULES.displayValue })(
										<Input maxLength={50} />
									)} */}
								</Form.Item>						
							</Col>
						</Row>
						<Row gutter={8}>
							<Col span={6}>
								<Form.Item 
									name="rangeLow"
									label={fieldLabels.low}
									rules={FIELD_RULES.rangeLow}
									dependencies={['rangeHigh']}
								>
									<InputNumber maxLength={8} style={{ width: '100%' }} />
									{/* {getFieldDecorator('rangeLow', { rules: FIELD_RULES.rangeLow })(
										<InputNumber maxLength={8} onBlur={this.onBlurRangeLow} style={{ width: '100%' }} />
									)} */}
								</Form.Item>
							</Col>
							<Col span={14}>
								<Form.Item 
									name="rangeLowFlagDisplay"
									label={fieldLabels.displayFlag}
									rules={FIELD_RULES.rangeLowFlagDisplay}
								>
									<Input maxLength={50} />
									{/* {getFieldDecorator('rangeLowFlagDisplay', { rules: FIELD_RULES.rangeLowFlagDisplay })(
										<Input maxLength={50} />
									)} */}
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={8}>
							<Col span={6}>
								<Form.Item 
									name="rangeHigh"
									label={fieldLabels.high}
									rules={[
										...FIELD_RULES.rangeHigh,
										{ validator: this.validateRangeHigh }
									]}
									dependencies={['rangeLow']}
								>
									<InputNumber maxLength={8} style={{ width: '100%' }} />
									{/* {getFieldDecorator('rangeHigh', { 
										rules: [
											...FIELD_RULES.rangeHigh,
											{ validator: this.validateRangeHigh }
										]
									})(
										<InputNumber maxLength={8} style={{ width: '100%' }} />
									)} */}
								</Form.Item>
							</Col>
							<Col span={14}>
								<Form.Item 
									name="rangeHighFlagDisplay"
									label={fieldLabels.displayFlag}
									rules={FIELD_RULES.rangeHighFlagDisplay}
								>
									<Input maxLength={50} />
									{/* {getFieldDecorator('rangeHighFlagDisplay', { rules: FIELD_RULES.rangeHighFlagDisplay })(
										<Input maxLength={50} />
									)} */}
								</Form.Item>
							</Col>
						</Row>
					</section>
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
						<UserAccessContext.Consumer>
									{value => value.userAccess.settings.create && (
						<Button 
							shape="round" 
							type="primary" 
							htmlType="submit"
							loading={isLoading}
							style={{ margin: 10, width: 120 }}
						>
							{(moduleType === formMode.add) ?  buttonNames.create : buttonNames.update}
						</Button>
						)}
						</UserAccessContext.Consumer>
					</div>
				</section>
			</Form>
		);
	}
}

FillupForm.propTypes = {
	moduleType: PropTypes.string.isRequired,
	onClose: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	selectedSectionID: PropTypes.number,
	selectedSectionName: PropTypes.string,
	selectedSpecimenName: PropTypes.string,
	examItemName: PropTypes.string,
	examItemGeneralName: PropTypes.string,
	selectedItemRange: PropTypes.shape({
		examItemRangeID: PropTypes.number,
		examItemID: PropTypes.number,
		sex: PropTypes.string,
		analyzerID: PropTypes.number,
		analyzerName: PropTypes.string,
		ageBracketID: PropTypes.number,
		ageBracketLabel: PropTypes.string,
		rangeClassID: PropTypes.number,
		rangeClassLabel: PropTypes.string,
		displayValue: PropTypes.string,
		rangeLow: PropTypes.string,
		rangeHigh: PropTypes.string,
		rangeLowFlagDisplay: PropTypes.string,
		rangeHighFlagDisplay: PropTypes.string,
		canRelease: PropTypes.number,
		autoRelease: PropTypes.number,
	}),
	ageBrackets: PropTypes.arrayOf(PropTypes.shape({
		from: PropTypes.string,
		to: PropTypes.string
	})).isRequired
};

FillupForm.defaultProps = {
	examItemName: null,
	examItemGeneralName: null,
	selectedSectionName: null,
	selectedSpecimenName: null,
	selectedItemRange: {},
	selectedSectionID: null
}


export default FillupForm;