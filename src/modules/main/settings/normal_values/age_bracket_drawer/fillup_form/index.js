/* eslint-disable react/prop-types */
import React from 'react';
import { Form, Button, Select, Row, Col, Input, Switch } from 'antd';
import PropTypes from 'prop-types';
import { UserAccessContext } from 'context/userAccess';
import moment from 'moment';
import { NumberInput } from 'shared_components/pattern_input';
import { fieldLabels, formMode, buttonNames, fieldRules} from '../../settings';

import './fillup_form.css';

const { Option } = Select;

class FillupForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
		}

		this.formRef = React.createRef();
	}

	componentDidMount() {
		const { ageBracket } = this.props;
		const form = this.formRef.current;

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

	componentDidUpdate(prevProps) {
		const { ageBracket } = this.props;
		const form = this.formRef.current;

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
		const { resetFields } = this.formRef.current;

		resetFields();
	}

	onFormSubmit = (fieldValues) => {
		const { onSubmit } = this.props;
		this.setState({ isLoading: true }, async() => {
			await onSubmit({ ...fieldValues, active: fieldValues.active ? 1 : 0 });

			this.setState({ isLoading: false });
		});
	}

	// Private functions
	validateAge = (rule, value, callback) => {
		const { getFieldsValue } = this.formRef.current;
		const { bracketFrom, bracketTo, bracketFromUnit, bracketToUnit } = getFieldsValue();

		// Reference: https://momentjs.com/docs/#/manipulating/add/
		const fromDate = moment().add(bracketFrom, `${bracketFromUnit}`.toLowerCase());
		const toDate = moment().add(bracketTo, `${bracketToUnit}`.toLowerCase());


		if(!bracketFrom || !bracketTo || !bracketFromUnit || !bracketToUnit) {
			return callback();
		}

		// Reference: https://momentjs.com/docs/#/query/is-same-or-before/
		if (moment(toDate).isSameOrBefore(fromDate)) {
			return callback('Invalid age range');
		}

		return callback();
	}

	render() {
		const { isLoading } = this.state;
		const { 
			onClose, 
			moduleType,
			// rangeClass
		} = this.props;

		return (
			<Form 
				ref={this.formRef}
				onFinish={this.onFormSubmit} 
				className="age-bracket-fillup-form"
				layout="vertical"
			>
				<section style={{ marginBottom: 50 }}>
					<section className="form-values">
						{
							(moduleType === formMode.update) && 
							(
								<Row align="middle">
									<Col span={2}>
										ACTIVE:
									</Col>
									<Col span={22}>
										<Form.Item 
											name="active"
											valuePropName="checked"
											initialValue
										>
											<Switch />
										</Form.Item>
									</Col>
								</Row>
							)
						}
						<Row style={{ marginTop: 10 }}>
							<Col span={12}>
								<Form.Item 
									name="ageBracketLabel"
									label={fieldLabels.ageBracketRangeLabel}
									rules={fieldRules.ageBracketRangeLabel}
								>
									<Input maxLength={20} />
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={12}>
							<Col span={4}>
								<Form.Item 
									name="bracketFrom"
									label={fieldLabels.ageBracketFrom}
									rules={fieldRules.ageBracketFrom}
									dependencies={['bracketFrom', 'bracketFromUnit', 'bracketTo', 'bracketToUnit']}
								>
									<NumberInput maxLength={3} />
								</Form.Item>
							</Col>
							<Col span={10}>
								<Form.Item 
									name="bracketFromUnit"
									label={fieldLabels.ageBracketUnit}
									rules={fieldRules.ageBracketUnit}
									dependencies={['bracketFrom', 'bracketFromUnit', 'bracketTo', 'bracketToUnit']}
								>
									<Select>
										<Option value="DAYS">DAYS</Option>
										<Option value="WEEKS">WEEKS</Option>
										<Option value="MONTHS">MONTHS</Option>
										<Option value="YEARS">YEARS</Option>
									</Select>
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={12}>
							<Col span={4}>
								<Form.Item 
									name="bracketTo"
									label={fieldLabels.ageBracketTo}
									rules={[
										...fieldRules.ageBracketTo, 
										{ validator: this.validateAge }
									]}
									dependencies={['bracketFrom', 'bracketFromUnit', 'bracketTo', 'bracketToUnit']}
								>
									<NumberInput maxLength={3} />
								</Form.Item>
							</Col>
							<Col span={10}>
								<Form.Item 
									name="bracketToUnit"
									label={fieldLabels.ageBracketUnit}
									rules={[
										...fieldRules.ageBracketUnit,
										{ validator: this.validateAge }
									]}
									dependencies={['bracketFrom', 'bracketFromUnit', 'bracketTo', 'bracketToUnit']}
								>
									<Select>
										<Option value="DAYS">DAYS</Option>
										<Option value="WEEKS">WEEKS</Option>
										<Option value="MONTHS">MONTHS</Option>
										<Option value="YEARS">YEARS</Option>
									</Select>
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
	ageBracket: PropTypes.shape({
		ageBracketID: PropTypes.number,
		from: PropTypes.string,
		to: PropTypes.string,
		unitFrom: PropTypes.string,
		unitTo: PropTypes.string
	}),
};

FillupForm.defaultProps = {
	ageBracket: {
		ageBracketID: null,
		from: null,
		to: null,
		unitFrom: null,
		unitTo: null
	}
}


export default FillupForm;