/* eslint-disable react/prop-types */
import React from 'react';
import { Drawer, Form, Button, Select, Row, Col, InputNumber, Input, Switch } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';
import { drawerTitle, fieldLabels, formMode, buttonNames, fieldRules} from '../../settings';

import './fillup_form.css';

const { Option } = Select;

class FillupForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
		}
	}

	componentDidUpdate(prevProps) {
		const { ageBracket, form } = this.props;

		if(ageBracket.ageBracketID !== prevProps.ageBracket.ageBracketID) {
			const { ageBracketLabel, bracketFrom, bracketFromUnit, bracketTo, bracketToUnit, active } = ageBracket;

			form.setFieldsValue({ 
				ageBracketLabel,
				bracketFrom,
				bracketFromUnit,
				bracketTo,
				bracketToUnit,
				active: active === 1
			});
		}
	}

	resetForm= () => {
		const { resetFields } = this.props.form;

		resetFields();
	}

	onFormSubmit = (event) => {
		event.preventDefault();

		const { form, onSubmit } = this.props;
		const { getFieldsValue, validateFieldsAndScroll } = form;

		validateFieldsAndScroll((err) => {
			if (!err) {
				this.setState({ isLoading: true }, async() => {
					const fieldValues = getFieldsValue();

					await onSubmit({ ...fieldValues, active: fieldValues.active ? 1 : 0 });

					this.setState({ isLoading: false });
				});
			}
		});
	}

	onBlurAgeUnits = () => {
		this.props.form.validateFields(['bracketFrom', 'bracketTo']);
	}

	// Private functions
	validateAge = () => {
		const { getFieldsValue } = this.props.form;
		const { bracketFrom, bracketTo, bracketFromUnit, bracketToUnit } = getFieldsValue();

		// Reference: https://momentjs.com/docs/#/manipulating/add/
		const fromDate = moment().add(bracketFrom, `${bracketFromUnit}`.toLowerCase());
		const toDate = moment().add(bracketTo, `${bracketToUnit}`.toLowerCase());


		if(!bracketFrom || !bracketTo) {
			return Promise.resolve();
		}

		// Reference: https://momentjs.com/docs/#/query/is-same-or-before/
		if (moment(toDate).isSameOrBefore(fromDate)) {
			return Promise.reject('Invalid age range');
		}

		return Promise.resolve();
	}

	render() {
		const { isLoading } = this.state;
		const { 
			onClose, 
			visible, 
			form, 
			moduleType,
			selectedSectionName,
			// rangeClass
		} = this.props;

		const { getFieldDecorator } = form;

		const headerTitle = (moduleType === formMode.add) 
												? drawerTitle.ageBracket.add 
												: drawerTitle.ageBracket.update;

		// const rangeClassOptions = rangeClass.map(item => (
		// 	<Option value={item.rangeClassLabel}>{item.rangeClassLabel}</Option>
		// ));

		return (
			<Drawer
				title={`${headerTitle} - ${selectedSectionName}`.toUpperCase()}
				width="700"
				placement="right"
				closable
				onClose={onClose}
				visible={visible}
				className="age-bracket-drawer"
			>
				<Form onSubmit={this.onFormSubmit} className="age-bracket-fillup-form">
					<section style={{ marginBottom: 50 }}>
						<section className="form-values">
							{
								(moduleType === formMode.update) && 
								(
									<Row>
										<Col>
											<Form.Item>
												<span style={{ marginRight: 10 }}>ACTIVE:</span>
												{getFieldDecorator('active', { valuePropName: 'checked' })(
													<Switch />
												)}
											</Form.Item>
										</Col>
									</Row>
								)
							}
							<Row style={{ marginTop: 10 }}>
								<Col span={12}>
									<Form.Item label={fieldLabels.ageBracketRangeLabel}>
										{getFieldDecorator('ageBracketLabel', { 
											rules: fieldRules.ageBracketRangeLabel
										})(
											<Input />
										)}
									</Form.Item>
								</Col>
							</Row>
							<Row>
								<Col span={4}>
									<Form.Item label={fieldLabels.ageBracketFrom}>
										{getFieldDecorator('bracketFrom', {
											rules: [
												...fieldRules.ageBracketFrom,
												{ validator: this.validateAge }
											] 
										})(
											<InputNumber min={1} onBlur={this.onBlurAgeUnits} />
										)}
									</Form.Item>
								</Col>
								<Col span={10}>
									<Form.Item label={fieldLabels.ageBracketUnit}>
										{getFieldDecorator('bracketFromUnit', { 
											rules: fieldRules.ageBracketUnit,
											initialValue: 'YEARS' 
										})(
											<Select onBlur={this.onBlurAgeUnits}>
												<Option value="DAYS">DAYS</Option>
												<Option value="WEEKS">WEEKS</Option>
												<Option value="MONTHS">MONTHS</Option>
												<Option value="YEARS">YEARS</Option>
											</Select>
										)}
									</Form.Item>
								</Col>
							</Row>
							<Row>
								<Col span={4}>
									<Form.Item label={fieldLabels.ageBracketTo}>
										{getFieldDecorator('bracketTo', { 
											rules: [
												...fieldRules.ageBracketTo, 
												{ validator: this.validateAge }
											]
										})(
											<InputNumber min={1} onBlur={this.onBlurAgeUnits} />
										)}
									</Form.Item>
								</Col>
								<Col span={10}>
									<Form.Item label={fieldLabels.ageBracketUnit}>
										{getFieldDecorator('bracketToUnit', { 
											rules: fieldRules.ageBracketUnit,
											initialValue: 'YEARS' 
										})(
											<Select onBlur={this.onBlurAgeUnits}>
												<Option value="DAYS">DAYS</Option>
												<Option value="WEEKS">WEEKS</Option>
												<Option value="MONTHS">MONTHS</Option>
												<Option value="YEARS">YEARS</Option>
											</Select>
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
	selectedSectionName: PropTypes.string,
	ageBracket: PropTypes.shape({
		ageBracketID: PropTypes.number,
		from: PropTypes.string,
		to: PropTypes.string,
		unitFrom: PropTypes.string,
		unitTo: PropTypes.string
	}),
	// rangeClass: PropTypes.arrayOf(PropTypes.shape({
	// 	rangeClassID: PropTypes.number.isRequired,
	// 	rangeClassLabel: PropTypes.string.isRequired,
	// })).isRequired
};

FillupForm.defaultProps = {
	selectedSectionName: null,
	ageBracket: {
		ageBracketID: null,
		from: null,
		to: null,
		unitFrom: null,
		unitTo: null
	}
}


export default Form.create()(FillupForm);