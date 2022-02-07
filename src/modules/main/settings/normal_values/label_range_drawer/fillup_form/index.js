/* eslint-disable react/prop-types */
import React from 'react';
import { Form, Button, Row, Col, Switch } from 'antd';
import PropTypes from 'prop-types';
import { RegexInput } from 'shared_components/pattern_input'
import { UserAccessContext } from 'context/userAccess';
import { fieldLabels, formMode, buttonNames, fieldRules} from '../../settings';

import './fillup_form.css';

class FillupForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
		}

		this.formRef = React.createRef();
	}

	componentDidMount() {
		const { rangeClassLabel, active } = this.props.rangeClass;

		this.formRef.current.setFieldsValue({ rangeClassLabel, active: active === 1 });
	}

	componentDidUpdate(prevProps) {
		const { rangeClass,  } = this.props;

		if(rangeClass.rangeClassID !== prevProps.rangeClass.rangeClassID) {
			const { rangeClassLabel, active } = rangeClass;

			this.formRef.current.setFieldsValue({ rangeClassLabel, active: active === 1 });
		}
	}

	onFormSubmit = (fieldValues) => {
		const { onSubmit } = this.props;

		this.setState({ isLoading: true }, async() => {
			await onSubmit({ ...fieldValues, active: fieldValues.active ? 1 : 0 });

			this.setState({ isLoading: false });
		});
	}

	onChangeRelease = (isSelected) => {
		const { form } = this.props;

		if(!isSelected)
			form.setFieldsValue({ autoRelease: false });
	}

	resetForm = () => {
		// eslint-disable-next-line react/prop-types
		const { resetFields } = this.formRef.current;

		resetFields();
	}

	render() {
		const { isLoading } = this.state;
		const { 
			onClose, 
			moduleType,
		} = this.props;

		return (
			<Form 
				ref={this.formRef}
				onFinish={this.onFormSubmit} 
				className="label-class-fillup-form"
				layout="vertical"
			>
				<section style={{ marginBottom: 50 }}>
					<section className="form-values">
						{
							(moduleType === formMode.update) && 
							(
								<Row align="middle">
									<Col span={22}>
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
									name="rangeClassLabel"
									label={fieldLabels.ageRangeClassLabel}
									rules={fieldRules.ageBracketRangeLabel}
								>
									<RegexInput maxLength={20} regex={/[A-Za-z0-9 ]/}  />
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
	rangeClass: PropTypes.shape({
		rangeClassID: PropTypes.number,
		rangeClassLabel: PropTypes.string
	}),
	onClose: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
};

FillupForm.defaultProps = {
	rangeClass: {
		rangeClassID: null,
		rangeClassLabel: null
	},
}


export default FillupForm;