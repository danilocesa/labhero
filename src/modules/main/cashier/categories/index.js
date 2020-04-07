import React, { Component } from "react";
import { Link } from "react-router-dom";
import { TreeSelect, Col, Card, Table, Row, Button, Input,InputNumber } from "antd";
import "./categories.css";

const { TreeNode } = TreeSelect;

const { Search } = Input;

const columns = [
  {
    title: "Item",
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

const data = [
  {
    key: "1",
    item: "CBC",
    particulars: "Description",
    quantity: <InputNumber style = {{width: 50}} min={1} max={10} defaultValue={1} />,
    amount: "P500.00",
    delete: "X"
  },

  {
    key: "2",
    item: "Potassium",
    particulars: "Description",
    quantity: <InputNumber style = {{width: 50}} min={1} max={10} defaultValue={1} />,
    amount: "P500.00",
    delete: "X"
  },
  {
    key: "3",
    item: "Anti Biotic",
    particulars: "Description",
    quantity: <InputNumber style = {{width: 50}} min={1} max={10} defaultValue={1} />,
    amount: "P500.00",
    delete: "X"
  }
];

class Categories extends React.Component {
  state = {
    value: undefined
  };

  onChange = value => {
    console.log(value);
    this.setState({ value });
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
          <Row >
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
                  placeholder="Search"
                  allowClear
                  multiple
                  treeDefaultExpandAll
                  onChange={this.onChange}
                >
                  <TreeNode value="parent 1" title="parent 1">
                    <TreeNode value="parent 1-0" title="parent 1-0">
                      <TreeNode value="leaf1" title="my leaf" />
                      <TreeNode value="leaf2" title="your leaf" />
                    </TreeNode>
                    <TreeNode value="parent 1-1" title="parent 1-1">
                      <TreeNode
                        value="sss"
                        title={<b style={{ color: "#08c" }}>sss</b>}
                      />
                    </TreeNode>
                  </TreeNode>
                </TreeSelect>
              </Col>
            </div>
          </Row>
        </div>

        <Row>
          <div className="cashier-categories-card">
            <Col span={24}>
              <Card>
                <Button className="ant-btn-round" type="primary">
                  Panel
                </Button>
                <Button className="ant-btn-round" type="primary">
                  Hematology
                </Button>
                <Button className="ant-btn-round" type="primary">
                  Chemistry
                </Button>
                <Button className="ant-btn-round" type="primary">
                  Immunology
                </Button>
                <Button className="ant-btn-round" type="primary">
                  Microscopy
                </Button>
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
                    style={{ width: 250, marginBottom: 10}}
                  />
                  <br></br>
                  <Button className="ant-btn-round" type="primary">
                    Panel
                  </Button>
                  <Button className="ant-btn-round" type="primary">
                    Hematology
                  </Button>
                  <Button className="ant-btn-round" type="primary">
                    Chemistry
                  </Button>
                  <Button className="ant-btn-round" type="primary">
                    Immunology
                  </Button>
                  <Button className="ant-btn-round" type="primary">
                    Microscopy
                  </Button>
                </Card>
                <Card
                  size="small"
                  bordered={true}
                  style={{ alignItems: "center" }}
                >
                  <Search
                    placeholder="input search text"
                    onSearch={value => console.log(value)}
                    style={{ width: 250, marginBottom: 10}}
                  />
                  <br></br>
                  <Button className="ant-btn-round" type="primary">
                    EXAM 1
                  </Button>
                  <Button className="ant-btn-round" type="primary">
                    EXAM 2
                  </Button>
                  <Button className="ant-btn-round" type="primary">
                    EXAM 3
                  </Button>
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
                  <Table
                    columns={columns}
                    dataSource={data}
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
