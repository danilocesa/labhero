/* eslint-disable func-names */
import React from 'react';
import { 
  Steps, 
  Typography,
  Col,
  Row,
  Form,
  Checkbox,
  InputNumber,
  Switch, 
  Select,
  Input, 
  Button 
} from "antd";
import { fetchAdditionalFields,  }  from "services/blood_bank/donor_registration";

import PageTitle from 'shared_components/page_title';


// ICON
// eslint-disable-next-line import/no-extraneous-dependencies
import { SearchOutlined, ContainerOutlined, MedicineBoxOutlined } from '@ant-design/icons';

const { Step } = Steps
const { Option } = Select
const { TextArea } = Input
const { Title  } = Typography


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
      
    Object.keys(additionalFields).forEach(function (key){
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
                    <Form.Item
                     label={key.field_label}
                     name="`"
                    >
                    <InputNumber min={1} max={10} defaultValue={1} style={{width:150, marginLeft:60}} />
                    </Form.Item>
                </Col>
              </Row>) 
            break;
          case 'cb':
            custFieldArray.push(
              <Row>
                <Col>
                    <Form.Item
                     label={key.field_label}
                    >
                      <Checkbox.Group style={{ width: '100%' }}>
                        { key.field_list_values.map(function(listValue){
                          return <Checkbox value={listValue.list_value}>{listValue.list_value}</Checkbox>
                        })
                        }
                      </Checkbox.Group>
                    </Form.Item>
                </Col>
              </Row>
            )
            break;
          case 'op':
            custFieldArray.push(
              <Row>
                <Col>
                    <Form.Item
                     label={key.field_label}
                    >
                    <Select>
                      {key.field_list_values.map(function(listValue){
                        return <Option value={listValue.list_id}>{listValue.list_value}</Option>
                      })}
                    </Select>
                    </Form.Item>
                </Col>
              </Row>
            )
            break;
          case 'ta':
              return custFieldArray.push(
                <Row>
                  <Col>
                    <Form.Item
                     label={key.field_label}
                    >
                     <TextArea rows={4} />
                    </Form.Item>
                  </Col>
                </Row>
              );
          case 'rd':
              return custFieldArray.push(
                <Row>
                  <Col>
                    <Form.Item
                     label={key.field_label}
                    >
                    <Switch defaultChecked />
                    </Form.Item>
                  </Col>
                </Row>
              );
          default:
            custFieldArray.push(
              <Row>
                <Col>
                    <Form.Item
                     label={key.field_label}
                    >
                   <Input placeholder="Text" style={{width:150}} />
                    </Form.Item>
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
            labelPlacement="vertical"
            style={{ marginTop:20, paddingRight:200, paddingLeft:200}}
          >
             <Step title="Search Donor" icon={<SearchOutlined />}  />
            <Step title="Fill Up" icon={<ContainerOutlined />} />
            <Step title="Health Information" icon={<MedicineBoxOutlined />} />
          </Steps>
          <Title level={4} style={{marginLeft:50 , marginTop:40}}>HEALTH INFORMATION</Title>
          <Form
            name="basic"
            layout='vertical'
          >
              <div style={{marginLeft:90}}>
              {this.generateAdditionalFields()}
              </div>
            <div style={{marginTop:40, marginRight:50}}>
              <Button type="primary" style={{float: 'right'}}>
                Submit
              </Button>
              <Button type="link" style={{float: 'right'}}>
                Back
              </Button>
            </div>
          </Form>
      </div>
		)
	}	
}

export default HealthInformation;	