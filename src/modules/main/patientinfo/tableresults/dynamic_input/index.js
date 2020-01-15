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
	switch(props.type) {
		case EITC_ALPHA_NUMERIC:
			return <Input ref={innerRef} {...props} />;
		case EITC_NUMERIC:
			return <Input ref={innerRef} {...props} />;
		case EITC_CHECKBOX:
			return <Checkbox ref={innerRef} {...props} />;
		case EITC_OPTION:
			return <Radio ref={innerRef} {...props} />;
		case EITC_TEXT_AREA:
			return <TextArea ref={innerRef} {...props} />;
		default:
			return <Input ref={innerRef} {...props} />;
	} 
});


class DynamicInput extends React.Component {
	render() {
		const { form, value, onSave, fieldName, innerRef, typeCode } = this.props;

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
	value: PropTypes.string.isRequired,
	form: PropTypes.any.isRequired,
	onSave: PropTypes.func.isRequired,
	fieldName: PropTypes.string.isRequired,
	innerRef: PropTypes.any.isRequired
};

export default React.forwardRef((props, ref) => <DynamicInput innerRef={ref} {...props} />);