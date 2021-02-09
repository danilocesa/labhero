import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, InputNumber, Form, Checkbox, Select, Input, Switch } from 'antd';
import errorMessage from 'global_config/error_messages';

const { TextArea } = Input;
const { Option } = Select;

const tmpDropdownOptions = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

const generateDynamicField = (paramObject, isDisabled) => {
    if(paramObject.field_type === 'nu') {
      return <InputNumber style={{ width: 150 }} />
    }
      
    if(paramObject.field_type === 'cb') {
      return (
        <Checkbox.Group style={{ width: '100%' }}>
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
        <Select style={{ width: 150 }} disabled={isDisabled}>
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
        <TextArea rows={4} />
      );
    }

    if(paramObject.field_type === 'rd') {
      return (
        <Switch defaultChecked />
      );
    }
    
    return (
      <Input placeholder="Text" />
    );
}

class HealthInfoDynamicFields extends React.Component {
  render() {
    const { fields, isUpdate } = this.props;
    
    const Fields = fields
      ? fields[0].cust_fld_format.map(item => {
          const isDisabled = (item.field_name === 'blood_type' && isUpdate);

          return (
            <Col key={item.field_name}>
              <Form.Item
                label={item.field_label}
                name={item.field_name}
                rules={[{ required: item.field_is_required, message: errorMessage.required }]}
              >
                {generateDynamicField(item, isDisabled)}
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