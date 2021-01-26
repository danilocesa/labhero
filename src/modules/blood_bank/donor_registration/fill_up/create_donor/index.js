import React from 'react';
import { User } from 'images/bloodbank';
import moment from 'moment'
import HouseAddress from '../address'
import CityList from '../city_list'
import TownList from '../town_list'
import ProvinceList from '../province_list'
import { NumberInput } from 'shared_components/pattern_input'
import { FIELD_RULES, selectDefaultOptions, formLabels, messagePrompts } from '../constant'
import { Steps,Form ,Input, Row , Col,Typography ,DatePicker ,Radio, Divider , Button} from "antd";

const { Text } = Typography;
class FillUpDonorCreate extends React.Component {
  constructor(props) {
    super(props);
  this.formRef = React.createRef();
  }

  computeAge = (date) => {
		const years = Math.floor(moment().diff(date, 'years', true));
		const age = years > 0 ? years : '---';
	
		return age;
  }

  onDateChange = (date) => {
		// eslint-disable-next-line react/prop-types
		const { setFieldsValue } = this.formRef.current;
		const Age = this.computeAge(date);

    setFieldsValue({ Age });
  }

  onProvinceChange = () => {
		this.formRef.current.setFieldsValue({
			city: null,
			town: null,
			houseAddress: null 
		});
  }
  
  onCityChange = () => {
		this.formRef.current.setFieldsValue({
			town: null,
			houseAddress: null 
		});
  }

  render() {
    return (
      <div>
        <Form 
          ref={this.formRef}
          className="clr-fillup-form" 
          layout="vertical"
          style={{marginTop:30}}
          onFinish={this.onFinish}
        > 
          <Row gutter={12}>
            <Col sm={7} md={7}>
              <div className="left-form">
              <div style={{ padding: '1px 0px', marginTop:20 }}>
                  <Text strong>PERSONAL INFORMATION</Text>
                  <div style={{marginTop:40}}>
                  <img src={User} alt="logo" style={{ height: 250, width: 300 }} />
                  </div>
              </div>
              </div>  
            </Col>
            <Col sm={7} md={7}>
              <div className="center-form" style={{marginTop:'40px'}}>
                  <Form.Item 
                    name='donor_id'
                    style={{ display: 'none' }}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item 
                    label="FIRST NAME"
                    name='First_name'
                    rules={[{ required: true, message: 'Please input your First Name!' }]}
                  >
                    <Input 
                    
                    />
                  </Form.Item>
                  <Form.Item 
                    label="MIDDLE NAME"
                    name='Middle_name'
                    rules={[{ required: true, message: 'Please input your Middle Name!' }]}
                  >
                    <Input />
                  </Form.Item>
                <Row gutter={12}>
                  <Col span={18}>
                    <Form.Item 
                    label="LAST NAME"
                    name='Last_name'
                    rules={[{ required: true, message: 'Please input your Last Name!' }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                  <Form.Item 
                    label="SUFFIX"
                    name='suffix'
                  >
                    <Input maxLength={1} />
                  </Form.Item>
                  </Col>
                </Row>
                <Row gutter={12}>
                <Col span={18}>
                  <Form.Item 
                    name="dateOfBirth" 
                    label={formLabels.dateOfBirth} 
                    rules={[{ 
                      required: true, 
                      message: 'Please input your Date of Birth!' 
                    }]}   
                  >
                    <DatePicker 
                      format="MM-DD-YYYY"
                      onChange={this.onDateChange}
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </Col>
                  <Col span={6}>
                    <Form.Item 
                        name="Age" 
                        label={formLabels.age}
                        rules={FIELD_RULES.age}
                    >
                      <Input 
                        disabled 
                        style={{ textAlign: 'center' }} 
                      />
                    </Form.Item>
                  </Col>
                </Row> 
                  <Form.Item 
                    label="PATIENT'S GENDER"
                    name='Gender'
                    rules={[{ required: true, message: 'Please input your Gender!' }]}
                  >
                    <Radio.Group buttonStyle="solid">
                      <Radio.Button value="M">MALE</Radio.Button>
                      <Radio.Button value="F">FEMALE</Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                <Form.Item 
                  label="CONTACT NUMBER" 
                  style={{marginTop:'-5px'}}
                  name='mobile_no'
                  rules={[{ required: true, message: 'Please input your Contact Number!' }]}
                >
                  <NumberInput addonBefore="+ 63" />
                </Form.Item> 
              </div>
            </Col>
            <Col md={1} style={{ textAlign: 'center' }}>
              <Divider className="divider" type="vertical" style={{ height: 500 }} />
            </Col>
            <Col sm={7} md={7}>
              <div className="right-form" style={{marginTop:'40px'}}>
                <Form.Item 
                  name='provinces' 
                   rules={[{ 
                    required: true, 
                    message: 'Please input your Town!' 
                  }]}   
                >
                  <ProvinceList 
                    form={this.formRef}
                    placeholder={selectDefaultOptions}
                    onChange={this.onProvinceChange}
                  />
                </Form.Item>
                <Form.Item  
                  rules={[{ 
                    required: true,
                     message: 'Please input your City!' 
                    }]} 
                  shouldUpdate
                >
                  {(form) => {
                    return (
                      <CityList 
                        form={form}
                        placeholder={selectDefaultOptions}
                        provinceValue={form.getFieldValue('provinces')}
                        onChange={this.onCityChange}
                      />
                    );
                  }}
                </Form.Item>
                <Form.Item 
                  rules={[{ 
                    required: true, 
                    message: 'Please input your Town!' 
                  }]} 
                  shouldUpdate
                >
                  {(form) => { 
                    return (
                      <TownList 
                        placeholder={selectDefaultOptions}
                        cityValue={form.getFieldValue('city')}
                        fieldName='city'
                      />
                    );
                  }}
                </Form.Item>
                <Form.Item   
                  rules={[{ 
                    required: true, 
                    message: 'Please input your Address!'
                  }]} 
                  shouldUpdate
                >
                  {(form) => {
                    return (
                      <HouseAddress 
                        form={form}
                        townValue={form.getFieldValue('town')}
                        fieldLabel={formLabels.unitNo.label}
                        fieldName='house'
                      />
                    )
                  }}
                </Form.Item>
                <Form.Item 
                  label="Address Line 2" 
                  style={{marginTop:'-5px'}}
                  name='street_name'
                >
                  <Input  
                    placeholder=" Appartment, Unit, Building Floor, etc"
                  />
                </Form.Item>
              </div>
            </Col>
          </Row>
          <Divider orientation="right">
              <Form.Item>
                <Button type="primary" shape="round" style={{ margin: 10, width: 120 }} htmlType="submit">
                  SUBMIT
                </Button>
              </Form.Item>
          </Divider>
        </Form>
      </div>
    );
  }
}

export default FillUpDonorCreate;