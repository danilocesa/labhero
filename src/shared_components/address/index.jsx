// LIBRARY
import React from "react";
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';

import errorMessage from 'global_config/error_messages';

class houseAddressComponent extends React.Component{
	state = {
		isDisabled: true,
	};

	componentDidUpdate(prevProps){
		const { townValue } = this.props;

		if(prevProps.townValue !== townValue && townValue !== ''){
			// eslint-disable-next-line react/no-did-update-set-state
			this.setState({ isDisabled:false });
		}
	}

	houseUnitfieldRules = () => {
		if(this.props.townValue){
			return [{ required: true, message: errorMessage.required }];
		}
		return [{ required: false, message: errorMessage.required }];
	}

	render(){
		const { form, fieldLabel, fieldName, selectedValue } = this.props;
		const { isDisabled } = this.state;
		const { getFieldDecorator } = form;
		
		const addressInput = (
			getFieldDecorator(fieldName, {
				rules: [
					...this.houseUnitfieldRules(),
					{ min: 2, message: errorMessage.minLength(2) },
					{ max: 254, message: errorMessage.maxLength(254) }
				],
				initialValue: selectedValue,
			})(
				<Input disabled={isDisabled} maxLength={254} />
			)   
		);

		return(
			<Form.Item label={fieldLabel}>
				{addressInput}
			</Form.Item>
		);
	}
}


houseAddressComponent.propTypes = {
	form : PropTypes.object.isRequired,
	fieldLabel : PropTypes.string.isRequired,
	townValue: PropTypes.string,
	selectedValue : PropTypes.string
};

houseAddressComponent.defaultProps = {
	selectedValue: '',
	townValue: ''
};

export default houseAddressComponent;