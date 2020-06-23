// @ts-nocheck
/* eslint-disable react/prop-types */
// LiBRARY
import React from "react";
import {
  Row ,
  Col ,
  Table,
  Input,
  Button,
  Typography,
  Form
} from "antd";

// CUSTOM MODULES
import { RegexInput } from 'shared_components/pattern_input';
import { fetchBloodGroupItems } from 'services/blood_bank/extraction'
import PageTitle from 'shared_components/page_title'
import Message from 'shared_components/message'
import TablePager from "shared_components/table_pager"

const { Text } = Typography

const columns = [
  {
    title: "DONOR'S ID",
    dataIndex: "donor_id",
    key: "donor_id"
  },
  {
    title: "LAST NAME",
    dataIndex: "last_name",
    key: "last_name"
  },
  {
    title: "FIRST NAME",
    dataIndex: "first_name",
    key: "first_name"
  },
  {
    title: "MIDDLE NAME",
    dataIndex: 'middle_name',
    key: 'middle_name'
  },
  {
    title: "GENDER",
    dataIndex: "gender",
    key: "gender"
  },
  {
    title: "DATE OF BIRTH",
    dataIndex: 'date_of_birth',
    key: 'date_of__birth'
  },
  {
    title: "BLOOD TYPE",
    dataIndex: 'blood_type',
    key: 'blood_type'
  }
];

const columns2 = [
  {
    title: "CONTACT NUMBER",
    dataIndex: "contact_number",
    key: "contact_number",
    width: 150
  },
  {
    title: "ADDRESS",
    dataIndex: "address",
    key: "address",
    width: 250
  },
];

const expandedRow = row => {
  console.log(row);
  return <Table columns={columns2} pagination={false} />;
};

class Extraction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Item: [],
      loading: false,
    };
  }
	
	NextStep = () => {
    window.location.assign('/bloodbank/extraction/screening/step/1');
  };

  render() {
    const { Item,loading } = this.state
    return (
      <div>
       <PageTitle pageTitle="DONOR REGISTRATION"  />
        <Row>
          <Col span={24}>
            <div>
              <Row>
                <Col span={12} style={{ textAlign: "center", marginTop:50, marginLeft:300}}>
                <Form 
                  className="search-patient-form" 
                  onFinish={this.handleSubmit} 
                  ref={this.formRef}
                  layout="vertical"
                >
                  <Row justify="center">
                    <Col span={10}>
                  <Row>
                    <Col span={12}>
                      <Form.Item label="PATIENT NAME" name="patientName">
                        <RegexInput 
                          regex={/[A-Za-z0-9, -]/} 
                          maxLength={100}
                          onFocus={this.handleFocus}
                          placeholder="Lastname, Firstname"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="PATIENT NAME" name="patientName">
                        <RegexInput 
                          regex={/[A-Za-z0-9, -]/} 
                          maxLength={100}
                          onFocus={this.handleFocus}
                          placeholder="Lastname, Firstname"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                    </Col>
                    {/* Buttons */}
                    <Col span={11} style={{marginTop:20}}>
                      <Form.Item>
                        <Row>
                          <Button 
                            className="form-button"
                            shape="round" 
                            style={{ width: 120, marginLeft:10 }}
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
                          >
                            SEARCH
                          </Button>
                        </Row>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
                </Col>
              </Row>
              <Row style={{marginTop:-80}}>
                <Col span={12} style={{ textAlign: "Left", marginTop:100 }}>
                  <div className="table-title">
                    <div>
                      <Text strong>SEARCH RESULTS</Text>
                    </div>
                      <div className="left">
                        <Text>Showing  items out of results</Text>
                      </div>
                  </div>
                </Col>
                <Col span={12} style={{ textAlign: "right", marginTop:140 }}>
                  <TablePager handleChange={this.handleSelectChange} />
                </Col>
              </Row>
            </div> 

           
            <Table
                expandedRowRender={expandedRow}
                style={{ textTransform: "uppercase" }}
                dataSource={Item}
                pagination={this.state.pagination}
                loading={this.state.loading}
                columns={columns}
                onRow={() => {
                  return {     
                    onDoubleClick: () => {
                      this.NextStep();
                    }
                  }
                }}
              />    
          </Col>
        </Row>
      </div>
    );
  }
}

export default Extraction;
