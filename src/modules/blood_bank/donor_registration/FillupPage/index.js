// @ts-nocheck
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Form ,Input, Row , Col,Typography ,DatePicker ,Radio, Divider , Button } from 'antd';
import moment from 'moment';
import { LOGGEDIN_USER_DATA } from 'global_config/constant-global';
import { createDonor, updateDonor } from 'services/blood_bank/donor_registration';
import { NumberInput, RegexInput } from 'shared_components/pattern_input';
import HttpCodeMessage from 'shared_components/message_http_status';
import PageTitle from 'shared_components/page_title';
import ProvinceList from 'shared_components/phase2_province';
import CityList from 'shared_components/phase2_city';
import TownList from 'shared_components/phase2_town';
// import { User as UserImg } from 'images/bloodbank';
import { FIELD_RULES, selectDefaultOptions, formLabels,messagePrompts } from './constant';
import DonorRegSteps from '../DonorRegSteps';

const { Text } = Typography;



class FillUpForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: true,
      updateInitialValues: {},
      selectedFile:{},
    };

    this.formRef = React.createRef();
  }
  
  componentDidMount() {
    const { state } = this.props.location;
    
    this.setState({ 
      updateInitialValues: state,
    });
	}
  
  computeAge = (date) => {
		const years = Math.floor(moment().diff(date, 'years', true));
		const age = years > 0 ? years : '---';
	
		return age;
  }

  initCreateDonor = async (data) => {
    const { history } = this.props;
    const { updateInitialValues } = this.state;
    const createdUserResponse = await createDonor(data);

    if(createdUserResponse.status === 201){
      const httpMessageConfig = {
        message: messagePrompts.successCreateUser,
        status: createdUserResponse.status,	
        duration: 1, 
        onClose: () => history.push('/bloodbank/donor_registration/step/3', { 
          health_info_id: updateInitialValues.health_info_id,
          donor_id: createdUserResponse.data.donor_id
        })
      }
      
      HttpCodeMessage(httpMessageConfig);	
    }	
  }

  initUpdateDonor = async (data) => {
    const { history } = this.props;
    const { updateInitialValues } = this.state;
    const updateUserResponse =  await updateDonor(data);
    // @ts-ignore)
    if(updateUserResponse.status === 200){
      const httpMessageConfig = {
        message: messagePrompts.successUpdateUser,
        // @ts-ignore
        status: updateUserResponse.status,
        duration: 1, 
        onClose: () => history.push('/bloodbank/donor_registration/step/3', { 
          health_info_id: updateInitialValues.health_info_id,
          donor_id: updateInitialValues.donor_id
        })
      }

      HttpCodeMessage(httpMessageConfig);
    }
  }
  
  onFinish = async (formData) => {
    const { history } = this.props;
    const { updateInitialValues, imgprop } = this.state;
    const loggedinUser = JSON.parse(sessionStorage.getItem(LOGGEDIN_USER_DATA));

    const isUnchanged = (
      updateInitialValues.address_line_1 === formData.address_line_1 &&
      updateInitialValues.address_line_2 === formData.address_line_2 &&
      updateInitialValues.barangay === formData.barangay &&
      updateInitialValues.city_id === formData.city &&
      updateInitialValues.province_id === formData.provinces &&
      updateInitialValues.birth_date === formData.birth_date.format('YYYY-MM-DD') &&
      updateInitialValues.donor_id === formData.donor_id &&
      updateInitialValues.first_name === formData.first_name &&
      updateInitialValues.middle_name === formData.middle_name &&
      updateInitialValues.last_name === formData.last_name &&
      updateInitialValues.gender === formData.gender &&
      updateInitialValues.mobile_no === formData.mobile_no &&
      updateInitialValues.suffix === formData.suffix 
    );

    const payload = {
      ...formData,
      // image_location:`images/donor/${imgprop.imageName}`,
      image_location:'/test/',
      birth_date: formData.birth_date.format('YYYY-MM-DD')
    };


    if(formData.donor_id) {
      if(isUnchanged) 
        history.push('/bloodbank/donor_registration/step/3', { 
          health_info_id: updateInitialValues.health_info_id,
          donor_id: updateInitialValues.donor_id
        });   
      else {
        await this.initUpdateDonor({ 
          ...payload, 
          is_active: 1,
          last_updated_by: loggedinUser.userID
        });
      }
      return;
    }
    await this.initCreateDonor({ 
      ...payload,
      created_by: loggedinUser.userID
    });
  }

  onProvinceChange = () => {
    this.formRef.current.setFieldsValue({
			city: null,
			barangay: null,
			address_line_1: null,
      address_line_2: null 
		});
  }

  onCityChange = () => {
		this.formRef.current.setFieldsValue({
			barangay: null,
			address_line_1: null,
      address_line_2: null
		});
	}

  onDateChange = (date) => {
		const { setFieldsValue } = this.formRef.current;
		const age = this.computeAge(date);

    setFieldsValue({ age });
  }

  handleChange = (event) => {
    const time = new Date().getTime()
    const imgprop = {id:time,imageName:event.target.files[0].name}

    this.setState({
      imgprop
    })
  }
 
  render() {
    const { imgprop } =this.state
    const { state } = this.props.location;

    return (
      <div>
        <PageTitle pageTitle="DONOR REGISTRATION"  />
        <DonorRegSteps activeIndex={2} />
        <Form 
          initialValues={{ 
            ...state,
            age: state.birth_date ? this.computeAge(state.birth_date) : null,
            birth_date: state.birth_date ? moment(state.birth_date, 'YYYY-MM-DD') : null,
            // last_extracted: state.last_extracted ? moment(state.last_extracted, 'YYYY-MM-DD') : null,
            provinces: state.province_id,
            city: state.city_id,
          }}
          ref={this.formRef}
          onFinish={this.onFinish}
          className="clr-fillup-form" 
          layout="vertical"
          style={{ marginTop: 10 }}
        > 
          <Row gutter={12}>
            <Col sm={7} md={7}>
              <div className="left-form">
                <Text strong>PERSONAL INFORMATION</Text>
                <Row style={{ marginTop: 10 }}>
                  {/* <img src={imgprop ? require(`images/donor/${imgprop.imageName}`) : require(`images/donor/defaulticon.png`)} alt="logo" name='sample' style={{ height: 140, width: 140 }} /> */}
                  {/* <Form.Item 
                    name="img"
                    rules={FIELD_RULES.firstName}
                  >
                    <input type="file" onChange={this.handleChange} />
                  </Form.Item> */}
                </Row>
                <Form.Item 
                  name="donor_id"
                  style={{ display: 'none' }}
                >
                  <Input />
                </Form.Item>
                <Form.Item 
                  label="FIRST NAME"
                  name="first_name"
                  rules={FIELD_RULES.firstName}
                  style={{ marginTop: 17 }}
                >
                  <RegexInput 
                    regex={/[A-Za-z0-9-. ]/} 
                    maxLength={50} 
                    disabled={state.donor_id}
                  />
                </Form.Item>
                <Form.Item 
                  label="MIDDLE NAME"
                  name="middle_name"
                  rules={FIELD_RULES.middleName}
                >
                  <RegexInput 
										regex={/[A-Za-z0-9-. ]/}   
										maxLength={15} 
                    disabled={state.donor_id && state.gender !== 'F'}
									/>
                </Form.Item>
                <Row gutter={12}>
                  <Col span={18}>
                    <Form.Item 
                    label="LAST NAME"
                    name="last_name"
                    rules={FIELD_RULES.lastName}
                  >
                      <RegexInput 
                        regex={/[A-Za-z0-9-. ]/} 
                        maxLength={50} 
                        disabled={state.donor_id && state.gender !== 'F'}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                  <Form.Item 
                    label="SUFFIX"
                    name="suffix"
                  >
                    <RegexInput 
                      name="nameSuffix"
                      regex={/[A-z0-9 -]/} 
                      maxLength={5} 
                      style={{ marginTop: 1}}
                      disabled={state.donor_id}
                    />
                  </Form.Item>
                  </Col>
                </Row>
              </div>  
            </Col>
            <Col md={1} style={{ textAlign: 'center' }}>
              <Divider className="divider" type="vertical" style={{ height: 400 }} />
            </Col>
            <Col sm={7} md={7}>
              <div className="center-form">
                <Row gutter={12}>
                  <Col span={18}>
                    <Form.Item 
                      name="birth_date" 
                      label={formLabels.dateOfBirth} 
                      rules={FIELD_RULES.dateOfBirth}   
                    >
                      <DatePicker 
                        format="MM-DD-YYYY"
                        onChange={this.onDateChange}
                        style={{ width: '100%' }}
                        disabled={state.donor_id}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item 
                      name="age" 
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
                  label="CONTACT NUMBER" 
                  name="mobile_no"
                  rules={FIELD_RULES.contactNumber}
                  style={{ marginTop: 15 }}
                >
                  <NumberInput addonBefore="+ 63" maxLength={10} />
                </Form.Item> 
                <Form.Item 
                  label="PATIENT'S GENDER"
                  name="gender"
                  rules={FIELD_RULES.gender}
                  style={{ marginTop: 25 }}
                >
                  <Radio.Group 
                    buttonStyle="solid" 
                    disabled={state.donor_id}
                  >
                    <Radio.Button value="M" style={{ width: 100, textAlign: 'center' }}>MALE</Radio.Button>
                    <Radio.Button value="F" style={{ width: 100, textAlign: 'center' }}>FEMALE</Radio.Button>
                  </Radio.Group>
                </Form.Item>
                {/* <div style={{ marginTop: 15 }}>
                  <Form.Item 
                    label="LAST DONATION DATE"
                    name="last_extracted"
                  >
                    <DatePicker 
                      format="MM-DD-YYYY"
                      disabled={state.last_extracted}
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </div> */}
                <div style={{ marginTop: 15 }}>
                  <ProvinceList 
                    form={this.formRef}
                    placeholder={selectDefaultOptions}
                    onChange={this.onProvinceChange}
                    rules={FIELD_RULES.province}
                  />
                </div>
                <div style={{ marginTop: 15 }}>
                  <Form.Item shouldUpdate>
                    {(form) => {
                      return (
                        <CityList 
                          placeholder={selectDefaultOptions}
                          provinceValue={form.getFieldValue('provinces')}
                          onChange={this.onCityChange}
                        />
                      );
                    }}
                  </Form.Item>
                </div>
              </div>
            </Col>
            <Col md={1} style={{ textAlign: 'center' }}>
              <Divider className="divider" type="vertical" style={{ height: 400 }} />
            </Col>
            <Col sm={7} md={7}>
              <div className="right-form">
                <Form.Item shouldUpdate>
                  {(form) => { 
                    return (
                      <TownList 
                        placeholder={selectDefaultOptions}
                        cityValue={form.getFieldValue('city')}
                        fieldName="barangay"
                        initialValue={state.barangay}
                      />
                    );
                  }}
                </Form.Item>
                <Form.Item 
                  label="Address Line 1" 
                  name="address_line_1"
                  rules={FIELD_RULES.addr_line_1}
                >
                  <Input  
                    placeholder="HOUSE NO./UNIT/FLOOR NO. BLDG. NAME"
                    maxLength={100}
                  />
                </Form.Item>
                <Form.Item 
                  label="Address Line 2" 
                  name="address_line_2"
                  style={{ marginTop: 15 }}
                >
                  <Input  
                    placeholder=" Appartment, Unit, Building Floor, etc"
                    maxLength={100}
                  />
                </Form.Item>
              </div>
            </Col>
          </Row>
          <Row justify="end">
            <Form.Item>
              <Button 
                type="primary" 
                shape="round" 
                style={{ marginRight: 90, width: 120 }}
                htmlType="submit"
              >
                NEXT
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </div>
    )
  }
}

export default withRouter(FillUpForm);
