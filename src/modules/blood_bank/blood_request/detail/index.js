import React from 'react';
import { Row, Col, Typography, Form, Button, Select, Input, Drawer, InputNumber } from 'antd';
import PropTypes from 'prop-types';
import BloodRequestDetailsForm from '../detail';
import { fetchBloodTypes } from 'services/blood_bank/blood_types';
import { getHospitalList } from 'services/blood_bank/hospital'
import { LOGGEDIN_USER_DATA } from 'global_config/constant-global';
import { createBloodRecipient } from 'services/blood_recipient/blood_recipient'
// import { fetchBloodProducts } from 'services/blood_bank/blood_types';
import { AlphaInput, NumberInput } from 'shared_components/pattern_input';
import HttpCodeMessage from 'shared_components/message_http_status'
import { messagePrompts } from './settings'
import moment from 'moment';
const { Text } = Typography;

const { Option } = Select;


class BloodRequestDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      loading: false,
      recipientDetail: {},
      requestDetails: [],
      enableButton: true,
      bloodType: [],
      getHospitallist:[],
      showUpdateButton:false
    }; 
    this.formRef = React.createRef();
  }

  async componentDidMount() {
    await this.fetchData();
    const response =  await getHospitalList();
    this.setState({
      getHospitallist:response
    })
  }

  onCloseDrawer = () => {
    this.setState({ displayDrawer: false });
  }

  fetchData = async () => {
    const bloodTypeList = await fetchBloodTypes();
    this.setState({ 
      loading: true, 
      bloodType: bloodTypeList 
    });
  }

  computeAge = (date) => {
		const years = Math.floor(moment().diff(date, 'years', true));
		const age = years > 0 ? years : '---';
	
		return age;
  }

  onUpdate= ()=>{
    this.setState({
      showUpdateButton:true
    })
  }
  
  onCancel = () => {
    this.setState({
      showUpdateButton:false
    })
  } 

  onSubmit = async(value) => {
    const loggedinUser = JSON.parse(sessionStorage.getItem(LOGGEDIN_USER_DATA));
    const { selectedRequest } = this.props;
    const payload = {
      blood_product:selectedRequest.blood_product_id,
      recipient:selectedRequest.recipient_id,
      quantity:value.quantity,
      priority:value.priority_id,
      status:selectedRequest.status_id,
      diagnosis:value.diagnosis,
      physician:selectedRequest.license_no,
      hospital:selectedRequest.hospital_id,
      blood_unit: 0,
      purpose: "string",
      created_by: loggedinUser.userID,
    }
    console.log("🚀 ~ file: index.js ~ line 89 ~ BloodRequestDetails ~ onSubmit=async ~ payload", payload)
    const createAPIresponse = await createBloodRecipient(payload);
     // @ts-ignore
    if(createAPIresponse.status === 201){
      const httpMessageConfig = {
        message: messagePrompts.successCreateUser,
        // @ts-ignore
        status: createAPIresponse.status,	
        duration: 3, 
        onClose: () => window.location.reload() 
      }
      HttpCodeMessage(httpMessageConfig);	
    }	
  } 


  closeDrawer = this.props;

  render(){
    const { 
      recipientDetail, 
      requestDetails, 
      closeDrawer, 
      bloodType, 
      drawerTitle, 
      displayDrawer, 
      getHospitallist,
      showUpdateButton
     } = this.state;

    const { selectedRequest, drawerButton, disableButton } = this.props;
  
    const ProductList = requestDetails.map(item => (
      <Row key={item.blood_product_id}>
        <Col span={10}>
          {item.blood_product_id}
        </Col>
        <Col span={14}>
          <div style={{ textAlign: 'right' }}>
            {item.quantity}
          </div>
        </Col>
      </Row>
    ));

    const BloodTypeOptions = bloodType.map(item => (
      <Option key={item.blood_type_id} value={item.blood_type}>
        {item.blood_type}
      </Option>
    ));

    const HospitalOptions = getHospitallist.map(item => (
      <Option key={item.hospital_id} value={item.hospital_name}>
        {item.hospital_name}
      </Option>
    ));

    return(
      <Row>
        <Form 
          layout="vertical"
          ref={this.formRef}
          onFinish={this.onSubmit}
          >
          <Row gutter={24}>
            <Col span={6}>
              <Form.Item 
                label="FIRST NAME" 
                name="first_name"
                initialValue={selectedRequest.first_name}
                >
                  <Input
                    style={{width:200}}
                    placeholder="First Name"
                    disabled = {disableButton}
                  />
                </Form.Item>
            </Col>
            <Col span={6}> 
              <Form.Item 
                label="MIDDLE NAME" 
                name="middleName"
                initialValue={selectedRequest.middle_name}
                >
                  <Input 
                    style={{width:200}}
                    maxLength={1}
                    disabled = {disableButton}
                    placeholder="Middle Name"
                  />
                </Form.Item>
            </Col>
            <Col span={6}> 
              <Form.Item 
                label="LAST NAME" 
                name="lastName"
                initialValue={selectedRequest.last_name}
                >
                  <Input 
                    style={{width:200}}
                    disabled = {disableButton}
                    maxLength={20}
                    placeholder="Last Name"
                  />
                </Form.Item>
            </Col>
            <Col span={6}>  
              <Form.Item 
                label="SUFFIX" 
                name="suffix"
                initialValue={selectedRequest.suffix}
              >
                  <Input 
                    style={{width:100}}
                    maxLength={5}
                    disabled = {disableButton}
                    placeholder="SUFFIX"
                  />
                </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={6}>
              <Form.Item 
                label="DATE OF BIRTH"
                name="birth_date"
                initialValue={selectedRequest.birth_date}
                >
                <Input 
                  style={{width:200}}
                  maxLength={5}
                  disabled = {disableButton}
                />
              </Form.Item>
            </Col>
            <Col span={6}>  
              <Form.Item 
                label="AGE" 
                name="age" 
                initialValue={this.computeAge(selectedRequest.birth_date)}
              >
                  <Input 
                    disabled = {disableButton}
                    style={{width:200}}
                    maxLength={5}
                  />
                </Form.Item>
            </Col>
            <Col span={6}> 
              <Form.Item 
                label="GENDER" 
                name="genders" 
                initialValue={selectedRequest.gender}
              >
                <Input 
                  disabled = {disableButton}
                  style={{width:200}}
                  maxLength={5}
                />
              </Form.Item>
            </Col>
            <Col span={6}> 
              <Form.Item 
                label="ADDRESS" 
                name="address" 
                initialValue={selectedRequest.city_name}
              >
                <Select 
                  style={{width:200}}
                  disabled = {disableButton}
                  value={recipientDetail.address_line_1}
                />
                </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={6}> 
              <Form.Item 
                label="DIAGNOSIS" 
                name="diagnosis"
              >
                  <Input 
                    style={{width:200}}
                    maxLength={20}
                    disabled = {disableButton}
                  />
                </Form.Item>
            </Col>
            <Col span={6}> 
              <Form.Item 
                label="REQUESTING HOSPITAL" 
                name="requestingHospital" 
                initialValue={selectedRequest.hospital_name}
              >
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Hospital"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {HospitalOptions}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={6}> 
              <Form.Item 
                label="PHYSICIAN" 
                name="physician" 
                initialValue={selectedRequest.physician_name}
              >
                  <Input 
                    style={{width:200}}
                    disabled = {disableButton}
                    value={recipientDetail.physician}
                  />
              </Form.Item>
            </Col>
            <Col span={6}> 
              <Form.Item 
                label="LICENSE NO" 
                name="licenseNo" 
                initialValue={selectedRequest.license_no}
              >
                  <Input 
                    style={{width:200}}
                    maxLength={20}
                    value={recipientDetail.license_no}
                    disabled = {disableButton}
                  />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={6}> 
              <Form.Item 
                label="BLOOD TYPE" 
                name="bloodType" 
                initialValue={selectedRequest.blood_type}
              >
                <Select
                  style={{width:200}}
                  value={recipientDetail.blood_type}
                  disabled = {disableButton}
                >
                  {BloodTypeOptions}
                </Select>
                  
              </Form.Item>
            </Col>
            <Col span={6}> 
              <Form.Item 
                label="PRIORITY" 
                name="priority"
                initialValue={selectedRequest.priority_name}
              >
                <Select 
                  style={{width:200}}
                  disabled = {disableButton}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={6}> 
              <Form.Item 
                label="BLOOD PRODUCT" 
                name="bloodProduct" 
                initialValue={selectedRequest.blood_product_name}
              >
                <Select
                  style={{width:200}}
                  disabled
                  defaultValue='BLOOD PRODUCT'
                >
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}> 
              <Form.Item label="QUANTITY" name="quantity">
                <InputNumber min={0} max={10} defaultValue={0} style={{width:200}}/>
              </Form.Item>
            </Col>
          </Row>
          <section className="drawerFooter">
            {
              drawerButton === 'ADD' && (
                <div>
                  <Button
                    shape="round"
                    style={{ marginRight: 10, width: 120 }}
                    onClick={closeDrawer}
                  >
                    CANCEL
                  </Button>
                  <Button
                    type="primary"
                    shape="round"
                    htmlType="submit"
                    style={{ margin: 10, width: 120 }}
                  >
                    {drawerButton}
                  </Button>
                </div>
              )
            }
            {
              drawerButton === 'UPDATE REQUEST' && ( 
                  showUpdateButton == true ?
                  (		
                    <>
                      <Button
                        shape="round"
                        style={{ marginRight: 10, width: 150 }}
                        onClick={this.onCancel}
                      >
                        CANCEL
                      </Button>
                      <Button
                        shape="round"
                        style={{ margin: 10, width: 150 }}
                      >
                        UPDATE
                      </Button>
                      </>
                  )	
                  :
                    <div>
                      <Button
                        shape="round"
                        style={{ marginRight: 10, width: 150 }}
                        onClick={closeDrawer}
                      >
                        CANCEL REQUEST
                      </Button>
                      <Button
                        // type="primary"
                        shape="round"
                        onClick={this.onUpdate}
                        // htmlType="submit"
                        // loading={loading}
                        style={{ margin: 10, width: 150 }}
                      >
                        {drawerButton}
                      </Button>
                      <Button
                        shape="round"
                        style={{ marginRight: 10, width: 150 }}
                        onClick={closeDrawer}
                      >
                        PROCESS REQUEST
                      </Button>
                      <Button
                        shape="round"
                        style={{ marginRight: 10, width: 150 }}
                        onClick={closeDrawer}
                      >
                        PRINT
                      </Button>
                  </div>
                
              )
            }
          </section>
        </Form>
        <Drawer
          title={drawerTitle}
          width="60%"
          visible={displayDrawer}
          onClose={this.onCloseDrawer}
          destroyOnClose
        >
          <BloodRequestDetailsForm 
            selectedRequest={selectedRequest}
            onClose={this.onCloseDrawer} 
            drawerButton='ADD'
            disableButton={disableButton}
          />
        </Drawer>
      </Row>
    );
  }
}

BloodRequestDetails.propTypes = {
  selectedRequest: PropTypes.object
};


export default BloodRequestDetails;