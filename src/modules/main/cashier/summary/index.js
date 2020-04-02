import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Input, Col, Card, Table, Row, DatePicker, Select, Button, AutoComplete } from "antd";
import moment from "moment";
import "./summary.css";

const dateFormat = "YYYY/MM/DD";
const monthFormat = "YYYY/MM";
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}

const columns = [
  {
    title: "Item",
    dataIndex: "item",
    key: "name",
    width: 150
  },
  {
    title: "Particulars",
    dataIndex: "particulars",
    key: "particulars",
    width: 150
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
    width: 150
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    width: 150
  }
];

const data = [];
for (let i = 0; i < 30; i++) {
  data.push({
    item: "Alcohol",
    particulars: "Description",
    quantity: "1",
    amount: "P20.00"
  });
}

class Summary extends React.Component {
  render() {
    return (
      <div
        className="layout"
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 10
        }}
      >
        <Row>
          <Col span={24}>
            <div className="cashier-summary-header">
              <h4 className="h4">SUMMARY</h4>
            </div>
          </Col>
          <Col span={8}>
            <div className="search-input">
              <label className="label" title="PATIENT NAME">
                PATIENT NAME
              </label>
              <Input placeholder="LAST NAME, FIRST NAME M.I." />
            </div>
          </Col>
          <Col span={8}>
            <div className="search-input">
              <label className="label" title="GENDER">
                GENDER
              </label>
              <Select
                defaultValue=""
                style={{ width: 320 }}
                onChange={handleChange}
              >
                <Option value="MALE">MALE</Option>
                <Option value="FEMALE">FEMALE</Option>
              </Select>
            </div>
          </Col>
          <Col span={8}>
            <div className="search-input">
              <label className="label" title="DATE OF BIRTH">
                DATE OF BIRTH
              </label>
              <DatePicker defaultValue={moment()} format={dateFormat} />
            </div>
          </Col>
          <Col span={24}>
            <div className="search-input" style={{ marginTop: 10 }}>
              <label className="label" title="ADDRESS">
                ADDRESS
              </label>
              <Input
                style={{ marginLeft: 30, width: 690 }}
                placeholder="ADDRESS"
              />
            </div>
          </Col>
          <Col span={24}>
            <div className="cashier-summary-table" style={{ marginTop: 20 }}>
              <Table
                style={{ textAlign: "center" }}
                columns={columns}
                dataSource={data}
                pagination={false}
                scroll={{ y: 240 }}
              />
            </div>
            <div>
              <h1 className="h1">TOTAL: 3,500.00</h1>
            </div>
          </Col>
          <Col span={24}>
            <div className="button-below">
              {/* <Link to="/cashier/receipt">
                <Button className="ant-btn-round" type="primary">
                  Print
                </Button>
              </Link> */}
              <Button className="ant-btn-round" type="primary">
                  Print
                </Button>
              <Link to="/cashier">
                <Button className="ant-btn-round" type="primary">
                  Back
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Summary;
