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
		const { townValue, disabled } = this.props;

		this.setState({ 
			isDisabled: disabled || townValue === null || townValue === ''
		});
	}

	componentDidUpdate(prevProps) {
		const { townValue, disabled } = this.props;

		if(prevProps.townValue !== townValue){
			// eslint-disable-next-line react/no-did-update-set-state
			this.setState({ 
				isDisabled: disabled || townValue === null  || townValue === ''
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
		const { fieldLabel, fieldName } = this.props;
		const { isDisabled } = this.state;
		// const { getFieldDecorator } = form;

		return(
			<Form.Item 
				name={fieldName}
				label={fieldLabel} 
				rules={[
					...this.houseUnitfieldRules(),
					{ min: 2, message: errorMessage.minLength(2) },
					{ max: 70, message: errorMessage.maxLength(70) }
				]}
			>
				<Input 
					disabled={isDisabled} 
					maxLength={70} 
					allowClear
				/>
			</Form.Item>
		);
	}
}


houseAddressComponent.propTypes = {
	fieldLabel : PropTypes.string.isRequired,
	fieldName: PropTypes.string.isRequired,
	townValue: PropTypes.string,
	disabled: PropTypes.bool
};

houseAddressComponent.defaultProps = {
	townValue: '',
	disabled: false
};

export default houseAddressComponent;