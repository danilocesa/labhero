import React from 'react';
import { Row, Col, Input, Icon, Switch, Form, Button, Card as AntCard } from 'antd';

import './dynamic_form.css';

let id = 0;

class DynamicForm extends React.Component {
	state = {
		checkedIndex: 0
	}
	
	componentDidMount = () => {
		this.add();
	}

	setFormValues = (formValues) => {
		console.log(formValues);
	}

	getFormValues = () => {
		const { checkedIndex } = this.state;
		// eslint-disable-next-line react/prop-types
		const { form } = this.props;
		const { getFieldsValue, validateFieldsAndScroll } = form;
		let result;

		validateFieldsAndScroll(async(err) => {	
			const fieldsValue = getFieldsValue();
			const formValues = fieldsValue.keys.map(key => ({
				isDefault: key === checkedIndex,
				label: fieldsValue.names[key]

			}));
			
			result = {
				hasError: err !== null,
				formValues
			};
		});

		return result;
	}

	remove = k => {
  	console.log("TCL: DynamicForm -> k", k)
		const { checkedIndex } = this.state;
    console.log("TCL: DynamicForm -> checkedIndex", checkedIndex)
		const { itemValue, formType } = this.props;
    console.log("TCL: DynamicForm -> formType", formType)
    
    // eslint-disable-next-line react/prop-types
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    console.log("TCL: DynamicForm -> keys", keys)

		if(formType === "add"){
			if (keys.length === 1) {
				return;
			}
			
			if(checkedIndex === k) {
				this.setState({ checkedIndex: keys[0] });
			}
	
			form.setFieldsValue({
				keys: keys.filter(key => key !== k),
			});
		} else {
			if (keys.length === 1) {
				return;
			}
		}

    
  };

  add = () => {
    // eslint-disable-next-line react/prop-types
    const { form } = this.props;
	const keys = form.getFieldValue('keys');
	console.log('keys =>', keys);
		// eslint-disable-next-line no-plusplus
		const nextKeys = keys.concat(id++);
	console.log('nextKeys =>', nextKeys);	
    form.setFieldsValue({
      keys: nextKeys,
    });
	};
	
	onSwitchChange = (checked, index) => {
		if(checked) this.setState({ checkedIndex: index });
	}

	render() {
		// eslint-disable-next-line react/prop-types
		const { getFieldDecorator, getFieldValue } = this.props.form;
		const { itemValue, formType } = this.props;
    console.log("TCL: DynamicForm -> render -> itemValue", itemValue)
		const { checkedIndex } = this.state;
		getFieldDecorator('keys', { initialValue: [] });
		
		const arrayKeys = (keys) => {
			const keyArrays = [];
			for(const key in keys){
				keyArrays.push(key);
        
			}
			console.log("TCL: DynamicForm -> arrayKeys -> keyArrays", keyArrays)
			return keyArrays;
		}

		const keys = (formType === "add") ? itemValue || getFieldValue('keys') : arrayKeys(itemValue);
    console.log("TCL: DynamicForm -> render -> keys", keys)
    const OptionFormItems = keys.map((key, index) => (
      <Form.Item key={index}>
				<AntCard 
					size="small" 
					title={`Option value ${index + 1}`} 
					extra={(
						<>
						<Switch 
							checkedChildren="Default"
							checked={checkedIndex === key || key.examItemValueDefault === 1}
							onChange={(checked) => this.onSwitchChange(checked, key)}	
						/>
						<Icon
							className="dynamic-delete-button"
							type="minus-circle-o"
							onClick={() => this.remove(key)}
						/>
						</>	
					)}
				>
					<Row>
						<Form.Item>
						<Col span={24}>
							{getFieldDecorator(`names[${index}]`, {
								validateTrigger: ['onChange', 'onBlur'],
								rules: [
									{
										required: true,
										whitespace: true,
										message: 'This field is required'
									},
								],
								initialValue: key.examItemValueLabel,
							})(<Input />)}
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
						<Icon type="plus" /> Add field
					</Button>
				</Form.Item>
			</div>	
		);
	}
}


export default Form.create()(DynamicForm);;