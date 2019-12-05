// LIBRARY
import React from "react";
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';

class houseAddressComponent extends React.Component{
    state = {
        isDisabled: true,
    };

    componentDidUpdate(prevProps){
        if(prevProps.townValue !== this.props.townValue){
            this.setState({ isDisabled:false });
        }
    }

    render(){
        const { form, fieldLabel, fieldRules, selectedValue } = this.props;
        const { isDisabled } = this.state;
        const { getFieldDecorator } = form;
        
        const addressInput = (
            getFieldDecorator(fieldLabel, {
                rules:fieldRules,
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
    selectedValue : PropTypes.string.isRequired,
    fieldRules : PropTypes.array.isRequired,
};

export default houseAddressComponent;