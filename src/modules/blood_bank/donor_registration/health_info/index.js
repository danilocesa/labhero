/* eslint-disable func-names */
import React from 'react';
import { Steps, Typography,Col,Row,Collapse,Divider,Checkbox,InputNumber,Switch, Select,Input } from "antd";
import { fetchAdditionalFields,  }  from "services/blood_bank/donor_registration";

import PageTitle from 'shared_components/page_title';

const { Step } = Steps
const { Option } = Select
const { TextArea } = Input
const { Title  } = Typography
const { Panel } = Collapse;


class HealthInformation extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
      super(props);
      // this.generateFieldType = this.generateFieldType.bind(this);
    }
  
    state = {
      // eslint-disable-next-line react/no-unused-state
      categoryData: {},
      additionalFields: {},
    };

    componentDidMount() {
      this.getCategoryData();
    }
    
  getCategoryData = async () => {
    try{
      const additionalFieldsData = await fetchAdditionalFields();
      if(additionalFieldsData.dynamic_fields.length > 0){
        this.setState({ 
          additionalFields: additionalFieldsData.dynamic_fields,
          // eslint-disable-next-line react/no-unused-state
          haveAdditionalFields: (additionalFieldsData.length > 0)
        });
      }
    
    } catch(e){
     console.log("HealthInformation -> getCategoryData -> e", e)
      
    }
   
  };

  generateAdditionalFields = () => {
    const { additionalFields } = this.state;
    console.log("HealthInformation -> generateAdditionalFields -> additionalFields", additionalFields)
    // eslint-disable-next-line camelcase
    let cust_fld_obj = [];
    const custFieldArray = [];
      
    Object.keys(additionalFields).forEach(function (key,val){
      // eslint-disable-next-line camelcase
      cust_fld_obj = additionalFields[key].cust_fld_format;
    });
    // eslint-disable-next-line camelcase
    if(cust_fld_obj){
      cust_fld_obj.map(function(key){
      console.log("HealthInformation -> generateAdditionalFields -> key", key)
        switch(key.field_type){
          case 'nu': 
            custFieldArray.push(
              <Row>
                <Col>
                  <Divider>{key.field_label}</Divider>
                    <InputNumber min={1} max={10} defaultValue={1} />
                </Col>
              </Row>) 
            break;
          case 'cb':
            custFieldArray.push(
              <Row>
                <Col>
                  <Divider>{key.field_label}</Divider>
                    <Checkbox.Group style={{ width: '100%' }}>
                      { key.field_list_values.map(function(listValue){
                        return <Checkbox value={listValue.list_value}>{listValue.list_value}</Checkbox>
                      })
                      }
                    </Checkbox.Group>
                </Col>
              </Row>
            )
            break;
          case 'op':
            custFieldArray.push(
              <Row>
                <Col>
                  <Divider>{key.field_label}</Divider>
                    <Select>
                      {key.field_list_values.map(function(listValue){
                        return <Option value={listValue.list_id}>{listValue.list_value}</Option>
                      })}
                    </Select>
                </Col>
              </Row>
            )
            break;
          case 'ta':
              return custFieldArray.push(
                <Row>
                  <Col>
                    <Divider>{key.field_label}</Divider>
                     <TextArea rows={4} />
                  </Col>
                </Row>
              );
          case 'rd':
              return custFieldArray.push(
                <Row>
                  <Col>
                    <Divider>{key.field_label}</Divider>
                    <Switch defaultChecked />
                  </Col>
                </Row>
              );
          default:
            custFieldArray.push(
              <Row>
                <Col>
                  <Divider>{key.field_label}</Divider>
                   <Input placeholder="Text" />
                </Col>
              </Row>
            )
            break;
        }
        return true;
      });
    }
    // eslint-disable-next-line camelcase
    return cust_fld_obj ? custFieldArray: null;

  };
  
	render() {
		return(
      <div>
        <PageTitle pageTitle="DONOR REGISTRATION"  />
          <Steps 
            size="small" 
            current={2} 
            style={{ marginTop:50, paddingRight:200, paddingLeft:200}}
          >
            <Step title="Search Donor"  />
            <Step title="Fill Up" />
            <Step title="Health Information" />
          </Steps>
          <Title level={4} style={{marginLeft:100 , marginTop:20}}>HEALTH INFORMATION</Title>

          <Collapse defaultActiveKey={['1']}>
            <Panel header="Additional fields" key="1">
              {this.generateAdditionalFields()}
            </Panel>
          </Collapse>
      </div>
		)
	}	
}

export default HealthInformation;	