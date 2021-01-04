/* eslint-disable react/prop-types */

// LIBRARY
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Icon, Switch, Form, Button, Card as AntCard } from 'antd';
import { RegexInput } from 'shared_components/pattern_input';
import errorMessage from 'global_config/error_messages';

let id = 0;

class DynamicForm extends React.Component {
	state = {
		checkedKey: 0,
	}
	
	componentDidMount() {
		this.add();
	}

	componentDidUpdate(prevProps) {
		const { examId, examItemValue, form } = this.props;
		
		// This will run only when the user select in update form.
		// This will be disregarded in add form.
		if(examId !== prevProps.examId && examItemValue) {
			const fieldKeys = examItemValue.map((item, index) => ({ key: index }));
			const fieldValues = examItemValue.map((item) => item.examItemValueLabel);
			const selectedIndex = examItemValue.findIndex(item => item.examItemValueDefault === 1);

			// Render fields
			form.setFieldsValue({ fields: fieldKeys }, () => {
				// Assign field Values
				form.setFieldsValue({ names: fieldValues });

				// Assign checked switch
				this.setState({ checkedKey: selectedIndex });

				// Update counter
				id = examItemValue.length;
			});
		}
	}

	// This is use to get the values of this form up to its parent 
	// component e.g(update/add form) to cancel the submitting of
	// data once an error validation appears
	getFormValues = () => {
		const { checkedKey } = this.state;
		// eslint-disable-next-line react/prop-types
		const { form } = this.props;
		const { getFieldsValue, validateFieldsAndScroll } = form;
		let result = null;

		validateFieldsAndScroll(async(err) => {	
			const fieldsValue = getFieldsValue();
			const formValues = fieldsValue.names.map((data, index) => { 
				return {
					isDefault: index === checkedKey,
					label: data
				};
			});

			result = {
				hasError: err !== null,
				formValues
			};
		});

		return result;
	}

	// This is use to remove dynamic field which corresponds
	// to given index parameters
	remove = (k) => {
		const { checkedKey } = this.state;
		const { form } = this.props;
		const { getFieldValue } = form;
		
		const fields = getFieldValue('fields');
    
		if (fields.length === 1) {
			return;
		}
		
		if(checkedKey === k) {
			this.setState({ checkedKey: fields[0].key });
		}

		form.setFieldsValue({
			fields: fields.filter(field => field.key !== k),
		});
  };


	// This is use to add a dynamic field
  add = () => {
		const { form } = this.props;
		const fields = form.getFieldValue('fields');

		// eslint-disable-next-line no-plusplus
		const nextFields = fields.concat({ key: id++ });
		form.setFieldsValue({ fields: nextFields });
	};
	
	onSwitchChange = (checked, index) => {
		if(checked) 
			this.setState({ checkedKey: index });
		else
			this.setState({ checkedKey: -1 });
	}

	render() {
		// eslint-disable-next-line react/prop-types
		const { getFieldDecorator, getFieldValue } = this.props.form;
		const { checkedKey } = this.state;

		getFieldDecorator('fields', { initialValue: [] });

		const fields = getFieldValue('fields');
    const OptionFormItems = fields.map((field, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Form.Item key={field.key}>
				<AntCard 
					size="small" 
					title={`Option value ${index + 1}`} 
					extra={(
						<>
							<Switch 
								checkedChildren="Default"
								unCheckedChildren="Default"
								checked={checkedKey === field.key || field.examItemValueDefault === 1}
								onChange={(checked) => this.onSwitchChange(checked, field.key)}	
							/>
							<Icon
								className="dynamic-delete-button"
								type="minus-circle-o"
								onClick={() => this.remove(field.key)}
							/>
						</>	
					)}
				>
					<Row>
						<Form.Item>
							<Col span={24}>
								{getFieldDecorator(`names[${field.key}]`, {
									validateTrigger: ['onChange', 'onBlur'],
									rules: [
										{
											required: true,
											whitespace: true,
											message: errorMessage.required
										},
										{
											max: 254,
											message: errorMessage.maxLength(254)
										}
									],
								})(<RegexInput regex={/[A-Za-z0-9 -]/} maxLength={254} />)}
							</Col>
						</Form.Item>
					</Row>
				</AntCard>
      </Form.Item>
		));
    
		
		return (
			<div className="exam-item-dyna-form">
				{ OptionFormItems }
				<Form.Item>
					<Button type="dashed" onClick={this.add} style={{ width: '100%' }}>
						<Icon type="plus" />
					</Button>
				</Form.Item>
			</div>	
		);
	}
}

DynamicForm.propTypes = {
	examId: PropTypes.number,
	examItemValue: PropTypes.arrayOf(PropTypes.shape({
		examItemValueDefault: PropTypes.number.isRequired,
		examItemValueLabel: PropTypes.string.isRequired
	}))
};

DynamicForm.defaultProps = {
	examId: null,
	examItemValue: []
}

// export default Form.create()(DynamicForm);
export default DynamicForm;