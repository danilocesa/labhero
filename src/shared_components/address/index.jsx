// LIBRARY
import React from "react";
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';

import Messages from 'global_config/error_messages';

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
			return [{ required: true, message: Messages.required }];
		}
		return [{ required: false, message: Messages.required }];
	}

	render(){
		const { form, fieldLabel, selectedValue } = this.props;
		const { isDisabled } = this.state;
		const { getFieldDecorator } = form;
		
		const addressInput = (
			getFieldDecorator(fieldLabel, {
				rules: this.houseUnitfieldRules(),
				initialValue: selectedValue,
			})(
				<Input disabled={isDisabled} />
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