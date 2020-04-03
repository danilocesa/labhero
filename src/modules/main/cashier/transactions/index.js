import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
import moment from "moment";
import {
  Layout,
  Table,
  Menu,
  Card,
  Row,
  Col,
  Collapse,
  DatePicker,
  Button,
  Form,
  Select
} from "antd";

import { RegexInput, AlphaNumInput } from "shared_components/pattern_input";

import "./breakdown.css";

const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";
const monthFormat = "YYYY/MM";
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];
const { SubMenu } = Menu;
const { Panel } = Collapse;

const columns = [
  {
    title: "Request ID",
    dataIndex: "request_id",
    key: "request_id"
  },
  {
    title: "PATIENT ID",
    dataIndex: "patient_id",
    key: "patient_id"
  },
  {
    title: "PATIENT NAME",
    dataIndex: "patient_name",
    key: "patient_name"
  },
  {
    title: "DATE",
    dataIndex: "date",
    key: "date"
  }
];

const data = [
  {
    key: "1",
    request_id: "1000000000001",
    patient_id: "0001-0001",
    patient_name: "Dela Cruz, Juan I",
    date: "March 20, 2020"
  },
  {
    key: "2",
    request_id: "1000000000002",
    patient_id: "0001-0002",
    patient_name: "Dela Cruz, John A",
    date: "March 20, 2020"
  },
  {
    key: "3",
    request_id: "1000000000003",
    patient_id: "0001-0003",
    patient_name: "Doe, John ",
    date: "March 20, 2020"
  },
  {
    key: "4",
    request_id: "1000000000004",
    patient_id: "0001-0004",
    patient_name: "Doe, Mary",
    date: "March 20, 2020"
  },
  {
    key: "5",
    request_id: "1000000000005",
    patient_id: "0001-0005",
    patient_name: "Enrile, Juan Ponce",
    date: "March 20, 2020"
  }
];

class Transactions extends React.Component {

  RedirectToReceipt(){
    // @ts-ignore
    window.location = "/cashier/summary";
  }

  render() {
    return (
      <Layout
        className="layout"
        style={{
          display: "flex",
          justifyContent: "center"
        }}
      >
        <div
          className="ant-row-flex ant-row-flex-center"
          style={{ marginBottom: 20 }}
        >
          <h4 className="ant-typography">TRANSACTIONS</h4>
        </div>
        <Row gutter={12} type="flex" justify="center">
          <Col xs={24} sm={24} md={6} lg={4}>
            <Form.Item label="PATIENT ID">
              <AlphaNumInput maxLength={20} />
            </Form.Item>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={1}
            lg={1}
            style={{ textAlign: "center", marginTop: 30 }}
          >
            OR
          </Col>
          <Col xs={24} sm={24} md={12} lg={7}>
            <Form.Item label="PATIENT NAME">
              <RegexInput
                regex={/[A-z0-9 -]/}
                name="patientName"
                placeholder="Lastname, Firstname, Middle Initial"
                maxLength={100}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={6} lg={4}>
            <Form.Item label="SELECT DATE">
              <DatePicker
                allowClear={false}
                // @ts-ignore
                defaultValue={moment()}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={6} lg={6}>
            <Form.Item style={{ marginTop: 40 }}>
              <Row>
                <Button
                  className="form-button"
                  block
                  shape="round"
                  style={{ width: 120 }}
                  // onClick={this.clearItems}
                >
                  CLEAR
                </Button>
                <Button
                  className="form-button"
                  block
                  shape="round"
                  type="primary"
                  htmlType="submit"
                  style={{ width: 120, marginLeft: 10 }}
                >
                  SEARCH
                </Button>
              </Row>
            </Form.Item>
          </Col>
        </Row>
        <Col span={24}>
          <div
            style={{
              textAlign: "center"
            }}
          >
            {/* <Text>Display per page</Text>
							<Select 
								size="small"
								defaultValue={tablePageSize} 
								style={{ marginLeft: 10 }} 
								onChange={this.handleSelectChange}
							>
								<Option value="5">5</Option>
								<Option value="10">10</Option>
								<Option value="15">15</Option>
								<Option value="20">20</Option>
							</Select> */}

            <Table
              className="cashier-transactions-table"
              columns={columns}
              dataSource={data}
              style={{ marginTop: 30 }}
              onRow={record => {
                return {
                  onDoubleClick: () => {
                    this.RedirectToReceipt();
                  }
                };
              }}
            />
          </div>
        </Col>
      </Layout>
    );
  }
}
export default Transactions;
