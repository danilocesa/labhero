import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  TreeSelect,
  Col,
  Card,
  Table,
  Row,
  Button,
  Input,
  InputNumber
} from "antd";
import "./categories.css";

import {
  RegexInput,
  AlphaNumInput,
  NumberInput
} from "shared_components/pattern_input";

const { TreeNode } = TreeSelect;

const { Search } = Input;

const columns = [
  {
    title: "Item",
    value: "0-0",
    dataIndex: "item",
    key: "name",
    render: text => <a>{text}</a>
  },
  {
    title: "Particulars",
    dataIndex: "particulars",
    key: "particulars"
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity"
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount"
  },

  {
    title: "",
    dataIndex: "delete",
    key: "delete"
  }
];

const categories = [
  {
    title: "blood",
    children: [
      {
        type: "red"
      },
      {
        type: "white"
      }
    ]
  },
  {
    title: "flesh"
  },
  {
    title: "chuchu"
  }
];

const treeData = [
  {
    title: "Node1",
    value: "0-0",
    children: [
      {
        title: "Child Node1",
        value: "0-0-1"
      },
      {
        title: "Child Node2",
        value: "0-0-2"
      }
    ]
  },
  {
    title: "Node2",
    value: "0-1"
  }
];

class Categories extends React.Component {
  state = {
    value: undefined,
    data: [
      {
        key: "1",
        item: "CBC",
        particulars: "Description",
        quantity: <NumberInput style={{ width: 50 }} min={1} max={10} defaultValue = "1"/>,
        amount: "P500.00",
        delete: "X"
      },

      {
        key: "2",
        item: "Potassium",
        particulars: "Description",
        quantity: (
          <NumberInput style={{ width: 50 }} min={1} max={10} defaultValue="1" />
        ),
        amount: "P500.00",
        delete: "X"
      },
      {
        key: "3",
        item: "Anti Biotic",
        particulars: "Description",
        quantity: (
          <NumberInput style={{ width: 50 }} min={1} max={10} defaultValue="1" />
        ),
        amount: "P500.00",
        delete: "X"
      }
    ]
  };

  onChange = value => {
    console.log(value);
    this.setState({ value });
  };

  handleAdd = () => {
    const { count, data } = this.state;
    const newData = {
      key: count,
      item: "Potassium",
      particulars: "Description",
      quantity: (
        <NumberInput style={{ width: 50 }} min={1} max={10} defaultValue="1" />
      ),
      amount: "P500.00",
      delete: "X"
    };
    this.setState({
      data: [...data, newData],
      count: count + 1
    });
  };

  render() {
    return (
      <div className="cashier-category-form">
        <div
          className="ant-row-flex ant-row-flex-center"
          style={{ marginBottom: 20 }}
        >
          <h4 className="ant-typography">CATEGORIES</h4>
        </div>
        <div
          className="cashier-category-select-category"
          style={{ width: 400 }}
        >
          <Row>
            <div className="selection">
              <Col span={24}>
                <TreeSelect
                  showSearch
                  style={{
                    width: 250,
                    marginBottom: 10,
                    marginLeft: 10
                  }}
                  value={this.state.value}
                  dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                  placeholder="Please select"
                  allowClear
                  multiple
                  treeDefaultExpandAll
                  onChange={this.onChange}
                  treeData={treeData}
                ></TreeSelect>
              </Col>
            </div>
          </Row>
        </div>

        <Row>
          <div className="cashier-categories-card">
            <Col span={24}>
              <Card>
                {categories.map(item => (
                  <Button className="ant-btn-round" type="primary">
                    {item.title}
                  </Button>
                ))}
              </Card>
            </Col>
          </div>
        </Row>

        <div className="cashier-category-form-card">
          <Row>
            <div className="cashier-categories-card-left">
              <Col span={12}>
                <Card
                  size="small"
                  bordered={true}
                  style={{ alignItems: "center" }}
                >
                  <Search
                    placeholder="input search text"
                    onSearch={value => console.log(value)}
                    style={{ width: 250, marginBottom: 10 }}
                  />
                  <br></br>
                </Card>
                <Card
                  size="small"
                  bordered={true}
                  style={{ alignItems: "center" }}
                >
                  <Search
                    placeholder="input search text"
                    onSearch={value => console.log(value)}
                    style={{ width: 250, marginBottom: 10 }}
                  />
                  <br></br>
                  {/* <Button className="ant-btn-round" type="primary">
                    EXAM 1
                  </Button>
                  <Button className="ant-btn-round" type="primary">
                    EXAM 2
                  </Button>
                  <Button className="ant-btn-round" type="primary">
                    EXAM 3
                  </Button> */}
                </Card>
              </Col>
            </div>
            <div className="cashier-categories-card-table">
              <Col span={12}>
                <Card
                  title="REQUEST ITEMS"
                  size="small"
                  bordered={true}
                  style={{ alignItems: "center" }}
                >
                  <Button
                    onClick={this.handleAdd}
                    type="primary"
                    style={{
                      marginBottom: 16
                    }}
                  >
                    Add a row
                  </Button>
                  <Table
                    columns={columns}
                    dataSource={this.state.data}
                    pagination={false}
                  />
                </Card>
              </Col>
            </div>
            <Col span={24}>
              <div className="button-below">
                <Link to="/cashier/summary">
                  <Button className="ant-btn-round" type="primary">
                    Next
                  </Button>
                </Link>

                <Link to="/cashier">
                  <Button className="ant-btn-round" type="primary">
                    Cancel
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
export default Categories;
