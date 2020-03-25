import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom';
import moment from 'moment';
import image1 from "./image1.png";
import image2 from "./image2.png";
import image3 from "./image3.png";
import {
  Layout,
  Table,
  Menu,
  Card,
  Row,
  Col,
  Collapse,
  DatePicker
} from "antd";

import "./breakdown.css";
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;
const { Panel } = Collapse;
const styles = {
  rootContainer: {
    backgroundColor: "#1A1A1D",
    height: "100%"
  },
  content: {
    height: "65%",
    padding: "1%"
  },
  header: {
    height: "30%",
    backgroundColor: "transparent",
    marginTop: "5%"
  },
  card: {
    maxHeight: "100%",
    height: 500,
    marginLeft: 1,
    width: 300
  },
  cardBody: {
    maxHeight: 300,
    overflow: "auto"
  }
};
const columns = [
  {
    title: "Item",
    dataIndex: "item",
    key: "name",
    render: text => <a>{text}</a>
  },
  {
    title: "Request ID",
    dataIndex: "request_id",
    key: "request_id"
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date"
  }
];

const data = [
  {
    key: "1",
    item: "1",
    request_id: "1000000000001",
    date: "March 20, 2020"
  },
  {
    key: "2",
    item: "2",
    request_id: "1000000000001",
    date: "March 20, 2020"
  },
  {
    key: "3",
    item: "3",
    request_id: "1000000000001",
    date: "March 20, 2020"
  },
  {
    key: "4",
    item: "4",
    request_id: "1000000000001",
    date: "March 20, 2020"
  },
  {
    key: "5",
    item: "5",
    request_id: "1000000000001",
    date: "March 20, 2020"
  }
];
class Transactions extends React.Component {
  render() {
    return (
      <Layout
        className="layout"
        style={{
          display: "flex",
          justifyContent: "center",
          // alignItems: "center",
          height: "100vh",
          padding: 70,
          marginTop: 10
        }}
      >
        <Row>
          <Col span={18}>
            <Card
              title="LIST OF REQUEST ID"
              bordered={true}
              style={{ width: 1000, marginTop: 2, height: 550, marginLeft: 10 }}
            >
              <DatePicker defaultValue={moment('2020/01/01', dateFormat)} format={dateFormat} 
              style={{width: 300, alignItems: "right"}}
              />
              <Table columns={columns} dataSource={data} style={{marginTop: 10}}/>
              <div span={18}></div>
            </Card>
          </Col>
        </Row>
      </Layout>
    );
  }
}
export default Transactions;
