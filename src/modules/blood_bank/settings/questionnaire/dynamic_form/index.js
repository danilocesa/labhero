/* eslint-disable react/prop-types */

// LIBRARY
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Switch, Form, Button, Card as AntCard } from 'antd';
import { RegexInput } from 'shared_components/pattern_input';
import errorMessage from 'global_config/error_messages';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { buttonNames } from '../settings';

let id = 0;

class DynamicForm extends React.Component {
	state = {
		checkedKey: 0,
		fields: []
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
			const selectedIndex = examItemValue.findIndex(item => item.examItemValueDefault === 1);
			const dynamicFields = {};
			examItemValue.forEach((item, index) => {
				dynamicFields[`dynamicInputs_${index}`] = item.examItemValueLabel;
			});

			// eslint-disable-next-line react/no-did-update-set-state
			this.setState({ fields: fieldKeys }, () => {
				// Assign field Values
				form.setFieldsValue(dynamicFields);

				// Assign checked switch
				this.setState({ checkedKey: selectedIndex });

				// Update counter
				id = examItemValue.length;
			});
		}
	}

	getCheckedItemIndex = () => {
		return this.state.checkedKey;
	}

	getFields = () => {
		return this.state.fields;
	}

	// This is use to remove dynamic field which corresponds
	// to given index parameters
	remove = (k) => {
		const { checkedKey, fields } = this.state;
    
		if (fields.length === 1) {
			return;
		}
		
		if(checkedKey === k) {
			this.setState({ checkedKey: fields[0].key });
		}

		this.setState({ fields: fields.filter(field => field.key !== k) });
  };


	// This is use to add a dynamic field
  add = () => {
		const { fields } = this.state;
		
		// eslint-disable-next-line no-plusplus
		const nextFields = fields.concat({ key: id++ });
		
		this.setState({ fields: nextFields });
	};
	
	onSwitchChange = (checked, index) => {
		if(checked) 
			this.setState({ checkedKey: index });
		else
			this.setState({ checkedKey: -1 });
	}

	render() {
		const { checkedKey, fields } = this.state;
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
							<MinusCircleOutlined
								className="dynamic-delete-button"
								onClick={() => this.remove(field.key)}
							/>
						</>	
					)}
				>
					<Row>
						<Col span={24}>
							<Form.Item 
								name={`dynamicInputs_${field.key}`}
								validateTrigger={['onChange', 'onBlur']}
								rules={[
									{
										required: true,
										whitespace: true,
										message: errorMessage.required
									},
									{
										max: 254,
										message: errorMessage.maxLength(254)
									}
								]}
							>
								<RegexInput regex={/[A-Za-z0-9 -]/} maxLength={254} />
							</Form.Item>
						</Col>
					</Row>
				</AntCard>
      </Form.Item>
		));
    
		
		return (
			<div className="exam-item-dyna-form">
				{ OptionFormItems }
				<Form.Item>
					<Button type="dashed" onClick={this.add} style={{ width: '100%' }}>
						<PlusOutlined /> {buttonNames.addField}
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
	})),
	form: PropTypes.object
};

DynamicForm.defaultProps = {
	examId: null,
	examItemValue: [],
	form: {}
}

export default DynamicForm;