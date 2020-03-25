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
};

FillupForm.defaultProps = {
	selectedSectionName: null,
}


export default Form.create()(FillupForm);