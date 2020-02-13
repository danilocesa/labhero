// @ts-nocheck
// LIBRARY
import React from "react";
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';

import errorMessage from 'global_config/error_messages';

class houseAddressComponent extends React.Component{
	state = {
		isDisabled: true,
	};

	componentDidMount() {
		const { townValue, form, disabled, fieldName, selectedValue } = this.props;
		const { setFieldsValue } = form;

		this.setState({ 
			isDisabled: disabled || townValue === null 
		}, () => {
			setFieldsValue({ [fieldName]: selectedValue });
		});
	}

	componentDidUpdate(prevProps) {
		const { townValue, selectedValue, fieldName, form, disabled } = this.props;
		const { setFieldsValue } = form;

		if(prevProps.townValue !== townValue){
			// eslint-disable-next-line react/no-did-update-set-state
			this.setState({ 
				isDisabled: disabled || townValue === null 
			}, () => {
				setFieldsValue({ [fieldName]: selectedValue });
			});
		}
	}

	houseUnitfieldRules = () => {
		if(this.props.townValue){
			return [{ required: true, message: errorMessage.required }];
		}
		return [{ required: false, message: errorMessage.required }];
	}

	render(){
		const { form, fieldLabel, fieldName } = this.props;
		const { isDisabled } = this.state;
		const { getFieldDecorator } = form;

		return(
			<Form.Item label={fieldLabel}>
				{getFieldDecorator(fieldName, {
					rules: [
						...this.houseUnitfieldRules(),
						{ min: 2, message: errorMessage.minLength(2) },
						{ max: 254, message: errorMessage.maxLength(254) }
					]
				})(
					<Input 
						disabled={isDisabled} 
						maxLength={70} 
						allowClear
					/>
				)}  
			</Form.Item>
		);
	}
}


houseAddressComponent.propTypes = {
	form : PropTypes.object.isRequired,
	fieldLabel : PropTypes.string.isRequired,
	fieldName: PropTypes.string.isRequired,
	townValue: PropTypes.string,
	selectedValue : PropTypes.string,
	disabled: PropTypes.bool
};

houseAddressComponent.defaultProps = {
	selectedValue: '',
	townValue: '',
	disabled: false
};

export default houseAddressComponent;