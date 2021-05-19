// @ts-nocheck
/* eslint-disable react/prop-types */
// LiBRARY
import React from "react";
import {
  Row ,
  Col ,
  Table,
  Button,
  Typography,
  Form,
  Drawer,
  DatePicker as AntDatePicker,
  Select
} from "antd";
// CUSTOM MODULES
import Expandtable from './expandtable'
import { RegexInput } from 'shared_components/pattern_input';
import fetchRequest from 'services/blood_bank/blood_recipient';
import PageTitle from 'shared_components/page_title';
import Message from 'shared_components/message';
import SearchPager from 'shared_components/search_pager';
import BloodRequestDetails from '../detail';
import { fetchBloodTypes } from 'services/blood_bank/blood_types';
import { GLOBAL_TABLE_PAGE_SIZE } from 'global_config/constant-global';

import moment from 'moment';

const { Text  } = Typography
const { Option } = Select;



const columns = [
  {
    title: "PATIENT'S ID",
    dataIndex: "donor_id",
  },
  {
    title: "LAST NAME",
    dataIndex: "last_name",
  },
  {
    title: "FIRST NAME",
    dataIndex: "first_name",
  },
  {
    title: "MIDDLE NAME",
    dataIndex: 'middle_name',
  },
  {
    title: "GENDER",
    dataIndex: "gender",
  },
  {
    title: "DATE OF BIRTH",
    dataIndex: 'birth_date',
  },
  {
    title: "ADDRESS",
    render: record => (
      `${record.address_line_1} ${record.address_line_2} ${record.barangay_name} ${record.city_name} ${record.province_name}`
    )
  },
  {
    title: "BLOOD TYPE",
    dataIndex: 'blood_type',
  },
];

class BloodRequestSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
      displayDrawer: false,
      pageSize: GLOBAL_TABLE_PAGE_SIZE,
      selectedDateValue: moment().format("YYYYMMDD"),
      selectedRequest: [],
      drawerTitle: '',
      drawerButton: '',
      disableButton: false,
      bloodType: [],
      actionType: null,
    };
    this.formRef = React.createRef();
  }

  async componentDidMount() {

    const bloodTypeList = await fetchBloodTypes();

    console.log(bloodTypeList)
    this.setState({ 
      // loading: true, 
      bloodType: bloodTypeList 
    });

  }
  
  handleSubmit = async () => {  
		const { getFieldsValue } = this.formRef.current;
    const { patientID, patientName } = getFieldsValue();

    this.setState({ loading: true });

    const patients = await fetchRequest(patientName, patientID);
    
    this.setState({ 
      loading: false,
      data: patients,
      actionType: (patientName === '') ? 'byID' : 'byName'
    });

    if(patients.length <= 0) 
      Message.info('No results found');
  }

  handleChangeSize = (pageSize) => {
		this.setState({pageSize});
	}  

  onCloseDrawer = () => {
    this.setState({ displayDrawer: false });
  }

  redirect = () => {
    this.props.history.push('/bloodbank/blood_request/create');
  }

  displayDrawerAdd = (record) => {
    this.setState({ 
      displayDrawer: true, 
      drawerTitle: 'ADD REQUEST',
      drawerButton: 'ADD',
      disableButton: false,
      selectedRequest: record
    });
  };

  displayDrawerUpdate= (record) => {
    this.setState({ 
      displayDrawer: true, 
      drawerTitle: 'REQUEST DETAILS',
      drawerButton: 'UPDATE REQUEST',
      disableButton: true,
      selectedRequest: record 
    });
  };

  

  render() {
    const { 
      data, 
      loading, 
      pageSize, 
      displayDrawer, 
      selectedRequest, 
      drawerTitle, 
      drawerButton, 
      disableButton, 
      bloodType ,
      actionType
    } = this.state
      console.log("file: index.js ~ line 194 ~ BloodRequestSearch ~ render ~ data", data)

    const BloodTypeOptions = bloodType.map(item => (
      <Option key={item.blood_type_id} value={item.blood_type}>
        {item.blood_type}
      </Option>
    ));

    const TableFooter = (
      <Row justify="center">
        <Button 
          onClick={this.onClickRegister}
          type="link"
          htmlType="submit" 
          style={{ width: 120 }}
        >
          REGISTER
        </Button>
      </Row>
    );

    
    const TableData = data.map((currElement, index,array ) => (
      {
        address_line_1: currElement.address_line_1,
        address_line_2:currElement.address_line_2,
        barangay:currElement.barangay,
        barangay_name:currElement.barangay_name,
        birth_date:currElement.birth_date,
        blood_type:currElement.blood_type,
        blood_type_name:currElement.blood_type_name,
        city_name:currElement.city_name,
        contact_details:currElement.contact_details,
        email_address:currElement.email_address,
        first_name:currElement.first_name,
        gender:currElement.gender,
        is_active:currElement.is_active,
        last_name:currElement.last_name,
        middle_name:currElement.middle_name,
        mobile_no:currElement.mobile_no,
        province_name:currElement.province_name,
        recipient_id:currElement.recipient_id,
        requested_date:currElement.requested_date,
        key:index
      } 
    ));

    return (
      <div> 
        <PageTitle pageTitle="BLOOD REQUEST"/>
        <Form 
          className="search-patient-form" 
          onFinish={this.handleSubmit} 
          ref={this.formRef}
          layout="vertical"
          style={{ marginTop: 30 }}
        >
          <Row gutter={12} align="middle" justify="center">
            <Col>
              <Form.Item label="ID" name="patientID">
                <RegexInput 
                  style={{width:200}}
                  regex={/[A-Za-z0-9, -]/} 
                  maxLength={100}
                  onFocus={this.handleFocus}
                  placeholder="Patient's ID"
                />
              </Form.Item>
            </Col>
            <Col>
              <div style={{ marginTop: 15 }}>
                <Text strong>OR</Text>
              </div>
            </Col>
            <Col>
              <Form.Item label="NAME" name="patientName">
                <RegexInput 
                  style={{ width: 300 }}
                  regex={/[A-Za-z0-9, -]/} 
                  maxLength={100}
                  onFocus={this.handleFocus}
                  placeholder="Patient's Name"
                />
              </Form.Item>
            </Col>
            <Col>
						<Form.Item label="SELECT DATE">
							<AntDatePicker 
								allowClear={false}
								// @ts-ignore
								defaultValue={moment()} 
								onChange={this.handleChangeDate} 
								style={{ width: 300 }}
							/>
						</Form.Item>
					</Col>
          </Row>  
          <Row gutter={12} align="middle" justify="center">
            <Col>
                <div style={{ marginTop: 20 }}>
                  <Form.Item shouldUpdate> 
                    {({ getFieldsValue }) => {
                      const { patientID, patientName } = getFieldsValue();
                      const disabled = !(patientID || (patientName && patientName.length > 0));
                      return (
                        <Row>
                          <Col>
                            <Form.Item
                              name="blood_type"
                              label="BLOOD TYPE"
                            >
                              <Select style={{ width: 190, marginRight: 10 }} onChange={this.fetchData}>
                                {BloodTypeOptions}
                              </Select>
                            </Form.Item>
                          </Col>
                          <Col>
                            <Form.Item
                              name="status"
                              label="STATUS"
                            >
                              <Select style={{ width: 180, marginRight: 10 }}>
                                {}
                              </Select>
                            </Form.Item>
                          </Col>
                          <Col>
                            <Form.Item
                              name="priority"
                              label="PRIORITY"
                            >
                              <Select style={{ width: 190, marginRight: 10 }}>
                                {}
                              </Select>
                            </Form.Item>
                          </Col>
                          <Button 
                            className="form-button"
                            shape="round" 
                            style={{ width: 120, marginLeft: 10, marginTop: 15 }}
                            onClick={this.clearInputs} 
                          >
                            CLEAR
                          </Button>
                          <Button 
                            loading={loading}
                            className="form-button"
                            shape="round" 
                            type="primary" 
                            htmlType="submit" 
                            style={{ width: 120, marginTop: 15 }}
                            disabled={disabled}
                          >
                            SEARCH
                          </Button>
                        </Row>
                      )
                    }}
                  </Form.Item>
                </div>
            </Col>
          </Row>
        </Form>     
        <Col span={24}>
          <SearchPager 
            handleChangeSize={this.handleChangeSize}
            pageTotal={data.length}
            pageSize={pageSize}
          />
        </Col>
        <Table
          style={{ textTransform: "uppercase" }}
          dataSource={TableData}
          pagination={{ pageSize }}
          loading={loading}
          columns={columns}
          expandable={{
            expandedRowRender: record => <Expandtable record={record}/>
          }}  
          onRow={(record) => {
            return {     
              onDoubleClick: () => {
                this.displayDrawerAdd(record)
              }
            }
          }}
          {...(actionType === 'byName' && {footer: () => TableFooter})}
        />  
        <Drawer
          title={drawerTitle}
          width="60%"
          visible={displayDrawer}
          onClose={this.onCloseDrawer}
          destroyOnClose
        >
          <BloodRequestDetails 
            selectedRequest={selectedRequest}
            onClose={this.onCloseDrawer} 
            drawerButton={drawerButton}
            disableButton={disableButton}
          />
        </Drawer>
      </div>
    );
  }
}

export default BloodRequestSearch;
