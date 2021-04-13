import React from 'react';
import { Row, Col, Spin, Card, Typography, Divider, Form, DatePicker as AntDatePicker, Button, Select, Input } from 'antd';
import PropTypes from 'prop-types';
import { fetchBloodRecipientById } from 'services/blood_bank/blood_recipient';
import { fetchBloodRequestById } from 'services/blood_bank/blood_request';
import { fetchBloodTypes } from 'services/blood_bank/blood_types';
// import { fetchBloodProducts } from 'services/blood_bank/blood_types';
import { AlphaInput, NumberInput } from 'shared_components/pattern_input';
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
      bloodType: []
    };

    this.formRef = React.createRef();

  }

  async componentDidMount() {
    await this.fetchData();
  }

  fetchData = async () => {

    const bloodTypeList = await fetchBloodTypes();

    this.setState({ 
      loading: true, 
      bloodType: bloodTypeList 
    });

  }

   closeDrawer = this.props;



  render(){
    const { recipientDetail, requestDetails, loading, closeDrawer, bloodType } = this.state;

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

    return(
      <Row>
        <Form 
          layout="vertical"
          ref={this.formRef}
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
              <Form.Item label="SUFFIX" name="suffix">
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
                
                >
                <AntDatePicker 
                  allowClear={true}
                  // value={moment(recipientDetail.birth_date).format('MM/DD/YYYY')}
                  // @ts-ignore
                  // defaultValue={moment(recipientDetail.birth_date).format('MM/DD/YYYY')} 
                  onChange={this.handleChangeDate} 
                  disabled = {disableButton}  
                  style={{ width: 200 }}
                />
              </Form.Item>
            </Col>
            <Col span={6}>  
              <Form.Item label="AGE" name="age">
                  <Input 
                    disabled = {disableButton}
                    style={{width:200}}
                    maxLength={5}
                  />
                </Form.Item>
            </Col>
            <Col span={6}> 
              <Form.Item label="GENDER" name="genders">
                <Select
                  style={{width:200}}
                  disabled = {disableButton}
                  value={recipientDetail.gender}
                >
                  <Option value='MALE'>MALE</Option>
                  <Option value='FEMALE'>FEMALE</Option>
                </Select>
                  
                </Form.Item>
            </Col>
            <Col span={6}> 
              <Form.Item label="ADDRESS" name="address">
              < Select 
                  style={{width:200}}
                  disabled = {disableButton}
                  value={recipientDetail.address_line_1}
                />
                </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={6}> 
              <Form.Item label="DIAGNOSIS" name="diagnosis">
                  <Input 
                    style={{width:200}}
                    maxLength={20}
                    disabled = {disableButton}
                  />
                </Form.Item>
            </Col>
            <Col span={6}> 
              <Form.Item label="REQUESTING HOSPITAL" name="requestingHospital">
                <Input 
                    style={{width:200}}
                    disabled = {disableButton}
                    value={recipientDetail.hospital_name}
                 />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={6}> 
              <Form.Item label="PHYSICIAN" name="physician">
                  <Input 
                    style={{width:200}}
                    disabled = {disableButton}
                    value={recipientDetail.physician}
                  />
              </Form.Item>
            </Col>
            <Col span={6}> 
              <Form.Item label="LICENSE NO" name="licenseNo">
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
              <Form.Item label="BLOOD TYPE" name="bloodType">
                <Select
                  style={{width:200}}
                  value={recipientDetail.blood_type_name}
                  disabled = {disableButton}
                >
                  {BloodTypeOptions}
                </Select>
                  
              </Form.Item>
            </Col>
            <Col span={6}> 
              <Form.Item label="PRIORITY" name="priority">
                <Select 
                  style={{width:200}}
                  disabled = {disableButton}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={6}> 
              <Form.Item label="BLOOD PRODUCT" name="bloodProduct">
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
                <Select
                  style={{width:200}}
                  disabled = {disableButton}
                >
                  <Option value='1'>1</Option>
                  <Option value='2'>2</Option>
                  <Option value='3'>3</Option>
                  <Option value='4'>4</Option>
                  <Option value='5'>5</Option>
                </Select>
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
                    loading={loading}
                    style={{ margin: 10, width: 120 }}
                  >
                    {drawerButton}
                  </Button>
                </div>
               )
            }

            {
               drawerButton === 'UPDATE REQUEST' && (
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
                    htmlType="submit"
                    loading={loading}
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
      </Row>
    );
  }
}

// BloodRequestDetails.propTypes = {
//   recipientID: PropTypes.number.isRequired
// };

// BloodRequestDetails.defaultProps = {
//   recipientID: 2,

// };

export default BloodRequestDetails;