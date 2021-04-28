import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, Checkbox, Select, Input, Switch, InputNumber  } from 'antd';
import { NumberInput } from 'shared_components/pattern_input';
import errorMessage from 'global_config/error_messages';

const { TextArea } = Input;
const { Option } = Select;

const tmpDropdownOptions = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

const generateDynamicField = (paramObject, props) => {
    if(paramObject.field_type === 'nu') {
      return <NumberInput style={{ width: 150 }} {...props} />
    }
      
    if(paramObject.field_type === 'dc') {
      return <InputNumber stringMode style={{ width: 150 }} {...props} />
    }
    
    if(paramObject.field_type === 'cb') {
      return (
        <Checkbox.Group style={{ width: '100%' }} {...props}>
          { 
            paramObject.field_list_values.map(listValue => (
              <Checkbox value={listValue.list_value} key={listValue.list_value}>
                {listValue.list_value}
              </Checkbox>
            ))
          }
        </Checkbox.Group>
      );
    }

    if(paramObject.field_type === 'op') {
      return (
        <Select style={{ width: 150 }} {...props}>
          {tmpDropdownOptions.map(item => (
            <Option value={item} key={item}>{item}</Option>
          ))}
          {/* {paramObject.field_list_values.map(function(listValue){
            return <Option value={listValue.list_id}>{listValue.list_value}</Option>
          })} */}
        </Select>
      );
    }

    if(paramObject.field_type === 'ta') {
      return (
        <TextArea rows={4} {...props} />
      );
    }

    if(paramObject.field_type === 'rd') {
      return (
        <Switch defaultChecked {...props} />
      );
    }
    
    return (
      <Input {...props} />
    );
}

class HealthInfoDynamicFields extends React.Component {

  getMaxLength = (fieldName) => {
    switch(fieldName){
      case 'body_weight':
        return 3;
      case 'pulse_rate':
        return 3;
      case 'blood_pressure':
        return 7;
      case 'temperature':
        return 4;
      default:
        return null;
    }
  }

  getMinLength = (fieldName) => {
    switch(fieldName){
      case 'body_weight':
        return 2;
      case 'pulse_rate':
        return 2;
      case 'blood_pressure':
        return 5;
      case 'temperature':
        return 4;
      default:
        return null;
    }
  }

  render() {
    const { fields, isUpdate } = this.props;
    
    const Fields = fields
      ? fields[0].cust_fld_format.map(item => {
          const isDisabled = (item.field_name === 'blood_type' && isUpdate);
          const minLength = this.getMinLength(item.field_name);
          const maxLength = this.getMaxLength(item.field_name);
          const props = { disabled: isDisabled, minLength, maxLength };

          return (
            <Col key={item.field_name}>
              <Form.Item
                label={item.field_label}
                name={item.field_name}
                // rules={[{ required: item.field_is_required, message: errorMessage.required }]}
              >
                {generateDynamicField(item, props)}
              </Form.Item>
            </Col>
          );
        })
      : null;

    return(
      <Row gutter={24}>
        {Fields}
      </Row>
    );
  }
}


HealthInfoDynamicFields.propTypes = {
  fields: PropTypes.array,
  isUpdate: PropTypes.bool.isRequired
}

export default HealthInfoDynamicFields;