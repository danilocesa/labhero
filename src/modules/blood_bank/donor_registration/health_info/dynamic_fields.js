import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, InputNumber, Form, Checkbox, Select, Input, Switch } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

class HealthInfoDynamicFields extends React.Component {

  generateAdditionalFields = () => {
    const { additionalFields } = this.props;
    let cust_fld_obj = [];
    const custFieldArray = [];
      
    Object.keys(additionalFields).forEach(key => {
      cust_fld_obj = additionalFields[key].cust_fld_format;
    });
    
    if(cust_fld_obj){
      cust_fld_obj.map(function(key){
        switch(key.field_type){
          case 'nu': 
            custFieldArray.push(
              <Col>
                <Form.Item label={key.field_label}>
                  <InputNumber style={{ width: 150 }} />
                </Form.Item>
              </Col>
            ) 
          break;
          case 'cb':
            custFieldArray.push(
              <Col>
                <Form.Item
                  label={key.field_label}
                  name="CB"
                >
                  <Checkbox.Group style={{ width: '100%' }}>
                    { 
                      key.field_list_values.map(listValue => (
                        <Checkbox value={listValue.list_value}>{listValue.list_value}</Checkbox>
                      ))
                    }
                  </Checkbox.Group>
                </Form.Item>
              </Col>
            )
          break;
          case 'op':
            custFieldArray.push(
              <Col>
                <Form.Item
                  label={key.field_label}
                  name="OP"
                >
                <Select>
                  {key.field_list_values.map(function(listValue){
                    return <Option value={listValue.list_id}>{listValue.list_value}</Option>
                  })}
                </Select>
                </Form.Item>
              </Col>
            )
          break;
          case 'ta':
            return custFieldArray.push(
              <Col>
                <Form.Item
                  label={key.field_label}
                  name="TA"
                >
                  <TextArea rows={4} />
                </Form.Item>
              </Col>
            );
          case 'rd':
            return custFieldArray.push(
              <Col>
                <Form.Item
                  label={key.field_label}
                  name="RD"
                >
                  <Switch defaultChecked />
                </Form.Item>
              </Col>
            );
          default:
            custFieldArray.push(
              <Col>
                <Form.Item
                  label={key.field_label}
                  name="text"
                >
                  <Input placeholder="Text" />
                </Form.Item>
              </Col>
            )
          break;
        }
        return true;
      });
    }
    
    return cust_fld_obj ? custFieldArray : null;
  };
  
  render() {
    return(
      <Row gutter={24}>
        {this.generateAdditionalFields()}
      </Row>
    );
  }
}


HealthInfoDynamicFields.propTypes = {
  additionalFields: PropTypes.array.isRequired
}

export default HealthInfoDynamicFields;