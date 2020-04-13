import React, { Component } from "react";
import { Link } from "react-router-dom";
import { TreeSelect, Col, Card, Table, Row, Button, Input,InputNumber } from "antd";
import FirstLevelSearch from './first_level';


import "./categories.css";

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
    title: "flesh",
    children: []
  },
  {
    title: "chuchu",
    children: []
  }
];

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
  
  onChange = (value) => {
    console.log(value);
    this.setState({ value });
  };

  test = () => {
    categories.forEach(category => {
      if(category.children.length <= 0)
        console.log(`${category.title} has no children`);
      else
        console.log(`${category.title} has children`);
    });
  }

  render() {
    return (
      <div className="cashier-category-form">
        <div
          className="ant-row-flex ant-row-flex-center"
          style={{ marginBottom: 20 }}
        >
          <h4 className="ant-typography">CATEGORIES</h4>
        </div>
        <FirstLevelSearch name={columns} data={['test1', 'test2']} />
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
                  <Button className="ant-btn-round" type="primary" onClick={this.test}>
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
