import React from 'react';
import { Row, Col, Input, Icon, Switch, Form, Button, Card as AntCard } from 'antd';

import './dynamic_form.css';

let id = 0;

class DynamicForm extends React.Component {
	state = {
		checkedIndex: 0,
		addItem: false
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
			const formValues = fieldsValue.names.map(data => ({
				isDefault: data.key === checkedIndex,
				label: data
			}));

			
			result = {
				hasError: err !== null,
				formValues
			};
		});

		return result;
	}

	remove = (k, index) => {
		const { checkedIndex } = this.state;
		const { itemValue, formType } = this.props;

		// eslint-disable-next-line react/prop-types
		const { form } = this.props;
		const keys = form.getFieldValue('keys');
    
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
			this.props.onCancelItemVal(index);
		}

    
  };

  add = () => {
		// eslint-disable-next-line react/prop-types
		const { form, formType, itemValue } = this.props;
		const keys = form.getFieldValue('keys');
		// const { addItem } = this.state;

		// eslint-disable-next-line no-plusplus
		const nextKeys = keys.concat(id++);
		form.setFieldsValue({
			keys: nextKeys,
		});

		// if(formType ==="update"){
		// 	console.log("TCL: dynamicForm -> form",form.getFieldValue('keys'));
		// 	this.props.addExamItem();
		// }else{

		// }

		console.log('TCL: => dynamicForm -> add -> form', form);
		console.log('TCL: => dynamicForm -> add -> keys', keys);
		console.log('TCL: => dynamicForm -> add -> itemValue', itemValue);
	};
	
	onSwitchChange = (checked, index) => {
		// console.log('checked, index', checked+'=>'+index);
		if(checked) this.setState({ checkedIndex: index });
	}

	render() {
		// eslint-disable-next-line react/prop-types
		const { getFieldDecorator, getFieldValue } = this.props.form;
		const { itemValue, formType } = this.props;
		const { checkedIndex } = this.state;
		getFieldDecorator('keys', { initialValue: [] });
		console.log('TCL: => getFieldValue =>', getFieldValue('keys'));
		console.log("TCL: itemValue:",itemValue);
		
		const arrayKeys = (keys) => {
			const keyArrays = [];
			for(const key in keys){
				keyArrays.push(key);
        
			}
			return keyArrays;
		}

		const keys = (formType === "add") ? itemValue || getFieldValue('keys') : itemValue;
		console.log('dynamicForm -> Keys ->',keys);
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
							onChange={(checked) => this.onSwitchChange(checked, index)}	
						/>
						<Icon
							className="dynamic-delete-button"
							type="minus-circle-o"
							onClick={() => this.remove(key, index)}
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