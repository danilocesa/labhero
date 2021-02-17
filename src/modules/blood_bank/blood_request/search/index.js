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
  Drawer
} from "antd";
import { PlusOutlined } from '@ant-design/icons';
// CUSTOM MODULES
import { RegexInput } from 'shared_components/pattern_input';
import fetchRequest from 'services/blood_bank/blood_recipient';
import PageTitle from 'shared_components/page_title';
import Message from 'shared_components/message';
import SearchPager from 'shared_components/search_pager';
import BloodRequestDetails from '../detail';
import { GLOBAL_TABLE_PAGE_SIZE } from 'global_config/constant-global';

const { Text, Link } = Typography

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
    title: 'DATE REQUESTED',
    dataIndex: 'requested_date',
    key:'requested_date'
  },
  {
    title: 'DATE NEEDED',
    dataIndex: 'date_needed',
    key:'date_needed'
  }
]

class BloodRequestSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
      displayDrawer: false,
      pageSize: GLOBAL_TABLE_PAGE_SIZE
    };
    this.formRef = React.createRef();
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

  onRowDoubleClick = (record) => {
    this.setState({ displayDrawer: true });
  } 

  onCloseDrawer = () => {
    this.setState({ displayDrawer: false });
  }

  redirect = () => {
    this.props.history.push('/bloodbank/blood_request/create');
  }

  render() {
    const { data, loading, pageSize, displayDrawer } = this.state

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
                  placeholder="Donor's ID"
                />
              </Form.Item>
            </Col>
            <Col>
              <div style={{ marginTop: 15 }}>
                <Form.Item shouldUpdate> 
                  {({ getFieldsValue }) => {
                    const { patientID, patientName } = getFieldsValue();
                    const disabled = !(patientID || (patientName && patientName.length > 0));

                    return (
                      <Row>
                        <Button 
                          className="form-button"
                          shape="round" 
                          style={{ width: 120, marginLeft: 10 }}
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
                          style={{ width: 120 }}
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
            
            
        <SearchPager 
          handleChangeSize={this.handleChangeSize}
          pageTotal={data.length}
          pageSize={pageSize}
        />
            
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
                this.onRowDoubleClick(record)
              }
            }
          }}
        />  
        
        <Row justify="center" style={{ marginTop: 30 }}>
          <Link onClick={this.redirect}>
            <PlusOutlined />
            <span style={{ marginLeft: 5 }}>CREATE REQUEST</span>
          </Link>
        </Row>

        <Drawer
          title="REQUEST INFORMATION"
          width="500"
          visible={displayDrawer}
          onClose={this.onCloseDrawer}
          destroyOnClose
        >
          <BloodRequestDetails onClose={this.onCloseDrawer} />
        </Drawer>
      </div>
    );
  }
}

export default BloodRequestSearch;
