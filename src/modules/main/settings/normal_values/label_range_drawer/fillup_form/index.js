/* eslint-disable react/prop-types */
import React from 'react';
import { Drawer, Form, Input, Button, Select, Row, Col, InputNumber } from 'antd';
import PropTypes from 'prop-types';
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

	componentDidMount() {}

	componentDidUpdate(prevProps) {
		const { moduleType, form, selectedItemRange } = this.props; 
		const { setFieldsValue } = form;
		// const { examItemRangeID, examItemID, analyzerName, ...restItemRange } = selectedItemRange;

		if(moduleType === formMode.update) {
			if(this.props.selectedItemRange.examItemRangeID !== prevProps.selectedItemRange.examItemRangeID) {
				setFieldsValue({
					// ...restItemRange,
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
          console.log("FillupForm -> onFormSubmit -> fieldValues", fieldValues)

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

	resetForm = () => {
		// eslint-disable-next-line react/prop-types
		const { resetFields } = this.props.form;

		resetFields();
	}

	render() {
		const { isLoading } = this.state;
		const { 
			onClose, 
			visible, 
			form, 
			moduleType,
			selectedSectionName
		} = this.props;

		const { getFieldDecorator, getFieldsValue } = form;

		const headerTitle = (moduleType === formMode.add) ? drawerTitle.add : drawerTitle.update;

		const ageBracketUnitOptions = (
			<Select>
				<Option value="DAYS">DAYS</Option>
				<Option value="WEEKS">WEEKS</Option>
				<Option value="MONTHS">MONTHS</Option>
				<Option value="YEARS">YEARS</Option>
			</Select>
		)

		return (
			<Drawer
				title={`${headerTitle} - ${selectedSectionName}`.toUpperCase()}
				width="700"
				placement="right"
				closable
				onClose={onClose}
				visible={visible}
			>
				<Form onSubmit={this.onFormSubmit} className="age-bracket-fillup-form">
					<section style={{ marginBottom: 50 }}>
						<section className="form-values">
							<Row style={{ marginTop: 10 }}>
								<Col span={12}>
									<Form.Item label={fieldLabels.ageBracketRangeLabel}>
										{getFieldDecorator('ageBracketRangeLabel', {rules: fieldRules.ageBracketRangeLabel})(
											<Input />
										)}
									</Form.Item>
								</Col>
							</Row>
							<Row>
								<Col span={4}>
									<Form.Item label={fieldLabels.ageBracketFrom}>
										{getFieldDecorator('ageBracketFrom', {rules: fieldRules.ageBracketFrom})(
											<InputNumber min={0} />
										)}
									</Form.Item>
								</Col>
								<Col span={10}>
									<Form.Item label={fieldLabels.ageBracketUnit}>
										{getFieldDecorator('ageBracketUnitFrom', { rules: fieldRules.ageBracketUnit })(
											ageBracketUnitOptions
										)}
									</Form.Item>
								</Col>
							</Row>
							<Row>
								<Col span={4}>
									<Form.Item label={fieldLabels.ageBracketTo}>
										{getFieldDecorator('ageBracketTo', {rules: fieldRules.ageBracketTo})(
											<InputNumber min={0} />
										)}
									</Form.Item>
								</Col>
								<Col span={10}>
									<Form.Item label={fieldLabels.ageBracketUnit}>
										{getFieldDecorator('ageBracketUnitTo', { rules: fieldRules.ageBracketUnit })(
											ageBracketUnitOptions
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
	ageBrackets: PropTypes.arrayOf(PropTypes.shape({
		from: PropTypes.string,
		to: PropTypes.string,
		unitFrom: PropTypes.string,
		unitTo: PropTypes.string
	})).isRequired
};

FillupForm.defaultProps = {
	selectedSectionName: null,
}


export default Form.create()(FillupForm);