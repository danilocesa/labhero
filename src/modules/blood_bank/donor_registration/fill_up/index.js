import React from "react"
import { Steps,Form ,Input, Row , Col,Typography ,DatePicker ,Radio, Divider , Button} from "antd";
import HttpCodeMessage from 'shared_components/message_http_status'
import PageTitle from 'shared_components/page_title'
import moment from 'moment'
import { NumberInput } from 'shared_components/pattern_input'
import { createDonor,updateDonor } from 'services/blood_bank/donor_registration'
import CityList from './city_list'
import TownList from './town_list'
import ProvinceList from './province_list'
import HouseAddress from './address'
import { FIELD_RULES, selectDefaultOptions, formLabels,messagePrompts } from './constant'

const { Step } = Steps
const { Text } = Typography;



class FillUpForm extends React.Component {

  constructor(props) {
		super(props);
    this.state = {
      ButtonName:"",
      record:[]
    };
  this.formRef = React.createRef();
  }
  
  componentDidMount() {
    const {label} = this.props.location.state
    const {data } = this.props.location.state
    
    this.setState({ 
      ButtonName: label,
      record:data
    });
	}
  
  computeAge = (date) => {
		const years = Math.floor(moment().diff(date, 'years', true));
		const age = years > 0 ? years : '---';
	
		return age;
  }

  NextStep = () => {
    window.location.assign('/donor_registration/step/3');
  } 

  onFinish = async values => {
    const { ButtonName } = this.state;
    const dateFormat = values.dateOfBirth.format('YYYY-MM-DD')
    const Data = {
      donor_id :values.donor_id,
      first_name :values.First_name,
      Middle_name :values.Middle_name,
      last_name:values.Last_name,
      Suffix:values.suffix,
      birth_date:dateFormat,
      age:values.Age,
      gender:values.Gender,
      street_name:values.street_name,   
      barangay:values.town,
      unit_house_no:values.house,
      mobile_no:values.mobile_no,
      created_by:1,
    };
    if(ButtonName === 'SUBMIT'){
    const createdUserResponse = await createDonor(Data);
			// @ts-ignore
			if(createdUserResponse.status === 201){
				const httpMessageConfig = {
					message: messagePrompts.successCreateUser,
					// @ts-ignore
					status: createdUserResponse.status,	
					duration: 3, 
					onClose: () => window.location.reload() 
				}
				HttpCodeMessage(httpMessageConfig);	
      }	
    }
      else {
        Data.donor_id = values.donor_id;
				const updateUserResponse =  await updateDonor(Data).catch(reason => console.log('TCL->', reason));
				// @ts-ignore)
				if(updateUserResponse.status === 200){
					const httpMessageConfig = {
						message: messagePrompts.successUpdateUser,
						// @ts-ignore
						status: updateUserResponse.status,
						duration: 3, 
						onClose: () => window.location.reload() 
					}
					HttpCodeMessage(httpMessageConfig);
				}
      }
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
  
  onDateChange = (date) => {
		// eslint-disable-next-line react/prop-types
		const { setFieldsValue } = this.formRef.current;
		const Age = this.computeAge(date);

		setFieldsValue({ Age });
  }
  
  disabledDate = (current) => {
		// Prevent select days after today and today
		return current && current > moment().endOf('day');
  }
 
  render() {
      const { ButtonName, record } = this.state
      console.log("FillUpForm -> render -> record", record)
      let newRecord = null;
      if(record != null){
       newRecord = record
       console.log("FillUpForm -> render -> newRecord", newRecord)
       console.log("FillUpForm -> render -> record", record.gender)
      }
    return (
      <div>
        <PageTitle pageTitle="DONOR REGISTRATION"  />
          <Steps size="small" current={1} style={{marginTop:20,paddingRight:200,paddingLeft:200}}>
            <Step status="finish" title="Search Donor" />
            <Step title="Fill Up" />
            <Step title="Health Information" />
          </Steps>
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
              </div>
              </div>
            </Col>
            <Col sm={7} md={7}>
              <div className="center-form" style={{marginTop:'40px'}}>
                  <Form.Item 
                    name='donor_id'
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item 
                    label="FIRST NAME"
                    name='First_name'
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item 
                    label="MIDDLE NAME"
                    name='Middle_name'
                  >
                    <Input />
                  </Form.Item>
                <Row gutter={12}>
                  <Col span={18}>
                    <Form.Item 
                    label="LAST NAME"
                    name='Last_name'
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
                      rules={FIELD_RULES.dateOfBirth}
                    >
                      <DatePicker 
                        format="YYYY-MM-DD"
                        disabledDate={this.disabledDate}
                        style={{ width: '100%' }}
                        onChange={this.onDateChange}
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
                >
                  <Radio.Group buttonStyle="solid">
                    <Radio.Button value="MALE">MALE</Radio.Button>
                    <Radio.Button value="FEMALE">FEMALE</Radio.Button>
                  </Radio.Group>
                </Form.Item>  
                <Form.Item 
                  label="CONTACT NUMBER" 
                  style={{marginTop:'-5px'}}
                  name='mobile_no'
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
                <Form.Item name='province'>
                <ProvinceList 
                  form={this.formRef}
                  placeholder={selectDefaultOptions}
                  onChange={this.onProvinceChange}
                />
                </Form.Item>
                <Form.Item shouldUpdate>
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
                <Form.Item shouldUpdate>
                  {(form) => { 
                    return (
                      <TownList 
                        placeholder={selectDefaultOptions}
                        cityValue={form.getFieldValue('city')}
                      />
                    );
                  }}
                </Form.Item>
                <Form.Item shouldUpdate>
                  {(form) => {
                    return (
                      <HouseAddress 
                        form={form}
                        townValue={form.getFieldValue('town')}
                        fieldLabel={formLabels.unitNo.label}
                        fieldName={formLabels.unitNo.fieldName}
                      />
                    )
                  }}
                </Form.Item>
                <Form.Item 
                  label="STREET NAME" 
                  style={{marginTop:'-5px'}}
                  name='street_name'
                >
                  <Input />
                </Form.Item>
              </div>
            </Col>
          </Row>
          <Divider orientation="right">
              <Form.Item>
                <Button type="primary" shape="round" style={{ margin: 10, width: 120 }} htmlType="submit">
                  {ButtonName}
                </Button>
              </Form.Item>
          </Divider>
        </Form>
      </div>
    )
  }
}

export default FillUpForm;