

import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Checkbox, Radio   } from 'antd';
import errorMessage from 'global_config/error_messages';
import { 
	EITC_ALPHA_NUMERIC,
	EITC_NUMERIC,
	EITC_CHECKBOX,
	EITC_OPTION,
	EITC_TEXT_AREA 
} from 'global_config/constant-global';


const FormItem = Form.Item;
const { TextArea } = Input;

const FormField = React.forwardRef((props, innerRef) => {
		if(props.type === EITC_ALPHA_NUMERIC) {
			return <Input ref={innerRef} {...props} />;
		}
			
		if(props.type ===  EITC_NUMERIC) {
			return <Input ref={innerRef} {...props} />;
		}
			
		if(props.type === EITC_CHECKBOX) {
			const options = props.itemOptions.map(itemOption => ({ 
				label: itemOption.examItemValueLabel, 
				value: itemOption.examItemValueLabel
			}));

			const defaultValue = props.itemOptions.filter(itemOption => itemOption.examItemValueDefault === 1);

			return (
				<Checkbox.Group 
					// ref={innerRef} 
					options={options}
					defaultValue={defaultValue}
					{...props} 
				/>
			);
		}

		if(props.type === EITC_OPTION) {
			return <Radio ref={innerRef} {...props} />;
		}

		if(props.type === EITC_TEXT_AREA) {
			return <TextArea ref={innerRef} {...props} />;
		}
			
		return <Input ref={innerRef} {...props} />;
});


class DynamicInput extends React.Component {
	render() {
		const { form, value, onSave, fieldName, innerRef, typeCode, itemOptions } = this.props;

		return (
			<FormItem style={{ margin: 0 }}>
				{form.getFieldDecorator(fieldName, {
					rules: [
						{
							required: true,
							message: errorMessage.required,
						},
					],
					initialValue: value,
				})(
					<FormField 
						ref={innerRef} 
						type={typeCode}
						itemOptions={itemOptions || []}
						onPressEnter={onSave} 
						onBlur={onSave} 
					/>
				)}
			</FormItem>
		)
	}
}

DynamicInput.propTypes = {
	typeCode: PropTypes.string.isRequired,
	unitCode: PropTypes.string.isRequired,
	isLock: PropTypes.bool.isRequired,
	itemOptions: PropTypes.array.isRequired,
	value: PropTypes.string.isRequired,
	form: PropTypes.any.isRequired,
	onSave: PropTypes.func.isRequired,
	fieldName: PropTypes.string.isRequired,
	innerRef: PropTypes.any.isRequired
};

export default React.forwardRef((props, ref) => <DynamicInput innerRef={ref} {...props} />);