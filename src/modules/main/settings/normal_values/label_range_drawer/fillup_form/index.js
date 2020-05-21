/* eslint-disable react/prop-types */
import React from 'react';
import { Drawer, Form, Button, Row, Col, Switch } from 'antd';
import PropTypes from 'prop-types';
import { RegexInput } from 'shared_components/pattern_input'
import { drawerTitle, fieldLabels, formMode, buttonNames, fieldRules} from '../../settings';

import './fillup_form.css';

class FillupForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
		}
	}

	componentDidMount() {}

	componentDidUpdate(prevProps) {
		const { rangeClass, form } = this.props;

		if(rangeClass.rangeClassID !== prevProps.rangeClass.rangeClassID) {
			const { rangeClassLabel, active } = rangeClass;

			form.setFieldsValue({ rangeClassLabel, active: active === 1 });
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

					await onSubmit({ ...fieldValues, active: fieldValues.active ? 1 : 0 });

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

		const { getFieldDecorator } = form;

		const headerTitle = (moduleType === formMode.add) 
												? drawerTitle.rangeClass.add 
												: drawerTitle.rangeClass.update;

		return (
			<Drawer
				title={`${headerTitle} - ${selectedSectionName}`.toUpperCase()}
				width="700"
				placement="right"
				closable
				onClose={onClose}
				visible={visible}
				className="label-class-drawer"
			>
				<Form onSubmit={this.onFormSubmit} className="label-class-fillup-form">
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
									<Form.Item label={fieldLabels.ageRangeClassLabel}>
										{getFieldDecorator('rangeClassLabel', {rules: fieldRules.ageBracketRangeLabel})(
											<RegexInput maxLength={20} regex={/[A-Za-z0-9 ]/}  />
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
	rangeClass: PropTypes.shape({
		rangeClassID: PropTypes.number,
		rangeClassLabel: PropTypes.string
	}),
	visible: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	selectedSectionName: PropTypes.string,
};

FillupForm.defaultProps = {
	selectedSectionName: null,
	rangeClass: {
		rangeClassID: null,
		rangeClassLabel: null
	},
}


// export default Form.create()(FillupForm);
export default FillupForm;