/* eslint-disable react/prop-types */
import React from 'react';
import { Drawer, Form, Input, InputNumber, Button, Select, Switch, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import { fetchAgeBracketList } from 'services/settings/ageBracket';
import { getAllRangeClass } from 'services/settings/ExamItemRangeClass';
import { getAnalyzers } from 'services/settings/examItemRange';
import FIELD_RULES from './constants';
import { drawerTitle, fieldLabels, formMode, buttonNames} from '../settings';

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
	}

	async componentDidMount() {
		const analyzers = await getAnalyzers();
		const filteredAnalyzers = analyzers.filter(i => i.active);

		this.setState({ analyzers: filteredAnalyzers });
	}

	async componentDidUpdate(prevProps) {
		const { moduleType, form, selectedItemRange, selectedSectionID } = this.props; 
		const { setFieldsValue } = form;
		const { examItemRangeID, examItemID, analyzerName, ageBracketLabel, rangeClassLabel, ...restItemRange } = selectedItemRange;

		if(selectedSectionID !== prevProps.selectedSectionID) {
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

		if(moduleType === formMode.update) {
			if(this.props.selectedItemRange.examItemRangeID !== prevProps.selectedItemRange.examItemRangeID) {
				
				setFieldsValue({
					...restItemRange,
					canRelease: selectedItemRange.canRelease === 1,
					autoRelease: selectedItemRange.autoRelease === 1,
				});
			}
		}
	}

	onFormSubmit = (event) => {
		event.preventDefault();

		const { form, onSubmit } = this.props;
		const { getFieldsValue, validateFieldsAndScroll } = form;

		validateFieldsAndScroll((err) => {
			if (!err) {
				this.setState({ isLoading: true }, async() => {
					const fieldValues = getFieldsValue();
					
					await onSubmit(fieldValues);

					this.setState({ isLoading: false });
				});
			}
		});
	}

	onChangeRelease = (isSelected) => {
		const { form } = this.props;

		if(!isSelected)
			form.setFieldsValue({ autoRelease: false });
	}

	onBlurRangeLow = () => {
		const { form } = this.props;

		form.validateFieldsAndScroll(['rangeHigh']);
	}

	resetForm = () => {
		// eslint-disable-next-line react/prop-types
		const { resetFields } = this.props.form;

		resetFields();
	}

	// Private functions
	validateRangeHigh = () => {
		const { getFieldsValue } = this.props.form;
		const { rangeLow, rangeHigh } = getFieldsValue();

		if(!rangeLow || !rangeHigh) {
			return Promise.resolve();
		}

		if (parseFloat(rangeLow) >= parseFloat(rangeHigh)) {
			return Promise.reject('Invalid value');
		}

		return Promise.resolve();
	}	

	render() {
		const { isLoading, analyzers, ageBrackets, itemRangeClass } = this.state;
		const { 
			onClose, 
			visible, 
			form, 
			moduleType,
			examItemName,
			examItemGeneralName,
			selectedSectionName,
			selectedSpecimenName,
			examItemUnitCode
		} = this.props;
		
		const { getFieldDecorator, getFieldsValue } = form;
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

		const isReleaseSelected = getFieldsValue().canRelease;
		const headerTitle = (moduleType === formMode.add) 
												? drawerTitle.normalValue.add 
												: drawerTitle.normalValue.update;

		return (
			<Drawer
				title={`${headerTitle} - ${selectedSectionName} / ${selectedSpecimenName}`.toUpperCase()}
				width="700"
				placement="right"
				closable
				onClose={onClose}
				visible={visible}
			>
				<Form onSubmit={this.onFormSubmit} className="normal-values-fillup-form">
					<section style={{ marginBottom: 50 }}>
						<section className="exam-item-info">
							<Row gutter={16}>
								<Col span={9} style={{ marginLeft: 10 }}>
									<Form.Item label={fieldLabels.examItemName}>
										<Input value={examItemName} disabled />
									</Form.Item>
								</Col>
								<Col span={9}>
									<Form.Item label={fieldLabels.examItemGeneralName}>
										<Input value={examItemGeneralName} disabled />
									</Form.Item>
								</Col>
								<Col span={5}>
									<Form.Item label={fieldLabels.examItemUnitCode}>
										<Input value={examItemUnitCode} disabled />
									</Form.Item>
								</Col>
							</Row>
						</section>
						<section className="form-values">
							<Row>
								<Col span={8}>
									<Form.Item label={fieldLabels.autoRelease} labelCol={{ span: 12 }}>
										{getFieldDecorator('autoRelease', {
											initialValue: true,
											valuePropName: 'checked'
										})(
											<Switch disabled={!isReleaseSelected} />
										)}
									</Form.Item>
								</Col>
								<Col span={8}>
									<Form.Item label={fieldLabels.release} labelCol={{ span:12 }} wrapperCol={{ span:1 }}>
										{getFieldDecorator('canRelease',{
											initialValue: true,
											valuePropName: 'checked'
										})(
											<Switch onChange={this.onChangeRelease} />
										)}
									</Form.Item>
								</Col>
							</Row>
							<Row gutter={12} style={{ marginTop: 10 }}>
								<Col span={6}>
									<Form.Item label={fieldLabels.gender}>
										{getFieldDecorator('sex', { rules: FIELD_RULES.sex })(
											<Select>
												<Option value="ALL">ALL</Option>
												<Option value="MALE">MALE</Option>
												<Option value="FEMALE">FEMALE</Option>
											</Select>
										)}
									</Form.Item>
								</Col>
								<Col span={8}>
									<Form.Item label={fieldLabels.ageBracket}>
										{getFieldDecorator('ageBracketID', { rules: FIELD_RULES.ageBracket })(
											<Select>
												{ ageBracketOptions }
											</Select>
										)}
									</Form.Item>
								</Col>
							</Row>
							<Row>
								<Col span={14}>
									<Form.Item label={fieldLabels.machine}>
										{getFieldDecorator('analyzerID', { rules: FIELD_RULES.analyzerID })(
											<Select>
												{machineOptions}
											</Select>
										)}
									</Form.Item>
								</Col>
							</Row>
							<Row>
								<Col span={14}>
									<Form.Item label={fieldLabels.labelOfRange}>
										{getFieldDecorator('rangeClassID', { rules: FIELD_RULES.rangeLabel })(
											<Select>
												{ itemRangeClassOptions }
											</Select>
										)}
									</Form.Item>
								</Col>
							</Row>
							<Row>
								<Col span={14}>							
									<Form.Item label={fieldLabels.displayValue}>
										{getFieldDecorator('displayValue', { rules: FIELD_RULES.displayValue })(
											<Input maxLength={50} />
										)}
									</Form.Item>						
								</Col>
							</Row>
							<Row gutter={8}>
								<Col span={6}>
									<Form.Item label={fieldLabels.low}>
										{getFieldDecorator('rangeLow', { rules: FIELD_RULES.rangeLow })(
											<InputNumber maxLength={5} onBlur={this.onBlurRangeLow} style={{ width: '100%' }} />
										)}
									</Form.Item>
								</Col>
								<Col span={14}>
									<Form.Item label={fieldLabels.displayFlag}>
										{getFieldDecorator('rangeLowFlagDisplay', { rules: FIELD_RULES.rangeLowFlagDisplay })(
											<Input maxLength={50} />
										)}
									</Form.Item>
								</Col>
							</Row>
							<Row gutter={8}>
								<Col span={6}>
									<Form.Item label={fieldLabels.high}>
										{getFieldDecorator('rangeHigh', { 
											rules: [
												...FIELD_RULES.rangeHigh,
												{ validator: this.validateRangeHigh }
											]
										})(
											<InputNumber maxLength={5} style={{ width: '100%' }} />
										)}
									</Form.Item>
								</Col>
								<Col span={14}>
									<Form.Item label={fieldLabels.displayFlag}>
										{getFieldDecorator('rangeHighFlagDisplay', { rules: FIELD_RULES.rangeHighFlagDisplay })(
											<Input maxLength={50} />
										)}
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
							<Button 
								shape="round" 
								type="primary" 
								htmlType="submit"
								loading={isLoading}
								style={{ margin: 10, width: 120 }}
							>
								{(moduleType === formMode.add) ?  buttonNames.create : buttonNames.update}
							</Button>
						</div>
					</section>
				</Form>
			</Drawer>
		);
	}
}

FillupForm.propTypes = {
	moduleType: PropTypes.string.isRequired,
	visible: PropTypes.bool.isRequired,
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


export default Form.create()(FillupForm);