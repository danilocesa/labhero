// LIBRARY
import React from "react";
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';

import { globalRequiredMessage } from '../constant-global';

class houseAddressComponent extends React.Component{
	state = {
		isDisabled: true,
	};

	componentDidUpdate(prevProps){
		if(prevProps.townValue !== this.props.townValue){
			// eslint-disable-next-line react/no-did-update-set-state
			this.setState({ isDisabled:false });
		}
	}

	houseUnitfieldRules = () => {
		if(this.props.townValue){
			return [{ required: true, message: globalRequiredMessage }];
		}
		return [{ required: false, message: globalRequiredMessage }];
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
	townValue: PropTypes.string.isRequired,
	fieldLabel : PropTypes.string.isRequired,
	selectedValue : PropTypes.string.isRequired
};

export default houseAddressComponent;