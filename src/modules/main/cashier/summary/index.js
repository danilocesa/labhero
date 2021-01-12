import React from "react";
import { Link } from "react-router-dom";
import {
  Col,
  Table,
  Row,
  DatePicker,
  Select,
  Button,
} from "antd";
import moment from "moment";
import "./summary.css";
import {
  RegexInput,
} from "shared_components/pattern_input";

const dateFormat = "YYYY/MM/DD";

const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}

const columns = [
  {
    title: "Item",
    dataIndex: "item",
    key: "name",
    width: 250
  },
  {
    title: "Particulars",
    dataIndex: "particulars",
    key: "particulars",
    width: 300
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
              <RegexInput
                regex={/[A-z0-9 -]/}
                placeholder="LAST NAME, FIRST NAME M.I."
                maxLength={100}
              />
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
              <RegexInput
                regex={/[A-z0-9 -]/} 
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
                scroll={{ y: 220 }}
              />
            </div>
            <div className="cashier-summary-total">
              <h1 className="h1">TOTAL: 3,500.00</h1>
            </div>
          </Col>
          <Col span={24}>
            <div className="button-below">
              <Button className="ant-btn-round" type="primary">
                Print
              </Button>
              <Link to="/cashier/categories">
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
