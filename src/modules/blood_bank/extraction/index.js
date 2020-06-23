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
import PageTitle from 'shared_components/page_title';
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

	NextStep = () => {
    window.location.assign('/bloodbank/extraction/screening/step/1');
  };

  render() {
    return (
      <div>
        <PageTitle pageTitle="EXTRACTION/SCREENING" />
          <Form className="search-patient-form" layout="vertical">
            <Row gutter={10} style={{marginLeft:150, marginTop:30}}>
              <Col span={5}>
                <Form.Item label="DONOR'S ID" style={{ marginRight:10}}>
                    <Input />
                </Form.Item>
              </Col>
              <Text strong style={{marginTop:20}}>OR</Text>
              <Col span={5}>
                <Form.Item label="BLOOD GROUP" style={{marginLeft:10}}>
                    <Input style={{width:300 }} />
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item style={{ marginTop:20 , marginLeft:90}}>
                    <Button shape="round" style={{width:150}}> 
                        CLEAR 
                    </Button>
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item style={{marginTop:20, marginLeft:20 }}>
                  <Button type="primary" shape="round" style={{width:150}}> 
                      SEARCH 
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <Row>
            <Col span={24}>
              <div>
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
                dataSource={this.state.data}
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
