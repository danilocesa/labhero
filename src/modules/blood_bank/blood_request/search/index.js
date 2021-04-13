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
import { PlusOutlined } from '@ant-design/icons';
// CUSTOM MODULES
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
    title: 'REQUEST ID',
    dataIndex: 'recipient_id',
    key:'recipient_id'
  },
  {
    title: 'LAST NAME',
    dataIndex: 'last_name',
    key:'last_name'
  },
  {
    title: 'FIRST NAME',
    dataIndex: 'first_name',
    key:'first_name'
  },
  {
    title: 'MIDDLE NAME', 
    dataIndex: 'middle_name',
    key:'middle_name'
  },
  {
    title: 'BLOOD TYPE', 
    dataIndex: 'blood_type_name',
    key:'blood_type_name'
  },
  {
    title: 'REQUEST DATE',
    dataIndex: 'requested_date',
    key:'requested_date'
  },
  {
    title: 'PRIORITY ',
    dataIndex: 'priority',
    key:'priority'
  },
  {
    title: 'STATUS ',
    dataIndex: 'status',
    key:'status'
  }
]

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
      bloodType: []
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
      data: patients
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

  displayDrawerAdd = () => {
    this.setState({ 
      displayDrawer: true, 
      drawerTitle: 'ADD REQUEST',
      drawerButton: 'ADD',
      disableButton: false,
      selectedRequest: []
    });
  };

  displayDrawerUpdate= (record) => {

    const title = 'REQUEST DETAILS';
    const button = 'UPDATE REQUEST';

    this.setState({ 
      displayDrawer: true, 
      drawerTitle: title,
      drawerButton: button,
      disableButton: true,
      selectedRequest: record 
    });
  };

  render() {
    const { data, loading, pageSize, displayDrawer, selectedRequest, drawerTitle, drawerButton, disableButton, bloodType } = this.state

    const BloodTypeOptions = bloodType.map(item => (
      <Option key={item.blood_type_id} value={item.blood_type}>
        {item.blood_type}
      </Option>
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
                  placeholder="Donor's ID"
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
                  placeholder="Donor's Name"
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
            <Button
              className="form-button"
              shape="round" 
              type="primary" 
              onClick={this.displayDrawerAdd}
              style={{
                marginLeft: "79%",
                position: "absolute",
                zIndex: 99,
                marginTop: 15,
              }}
            >
              ADD REQUEST
            </Button>
            <SearchPager 
              handleChangeSize={this.handleChangeSize}
              pageTotal={data.length}
              pageSize={pageSize}
            />
          </Col>
            
        <Table
          style={{ textTransform: "uppercase" }}
          dataSource={data}
          pagination={{ pageSize }}
          loading={this.state.loading}
          columns={columns}
          rowKey={record => record.recipient_id}
          onRow={(record) => {
            return {     
              onDoubleClick: () => {
                this.displayDrawerUpdate(record)
              }
            }
          }}
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
