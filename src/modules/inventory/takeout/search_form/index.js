/* eslint-disable no-unused-vars */
// @ts-nocheck
/* eslint-disable react/prop-types */
/* eslint-disable func-names */
// LIBRARY
import React from "react";
import {
  Form,
  Button,
  Row,
  Col,
  DatePicker,
  Select,
  Input,
  Icon,
  Table,
} from "antd";
import { PlusOutlined } from '@ant-design/icons';
import {
  addTakeout,
  tableSize,
  tableYScroll,
} from "modules/inventory/settings/settings";

import './index.css';


const columns = [
  {
    title: "LOT CODE",
    dataIndex: "lot_code",
    width: 150,
  },
  {
    title: "ITEM",
    dataIndex: "item",
    width: 250,
  },
  {
    title: "QUANTITY",
    dataIndex: "quantity",
    width: 150,
  },
  {
    title: "AMOUNT",
    dataIndex: "amount",
    width: 150,
  },
  {
    title: "EXPIRATION DATE",
    dataIndex: "expiry_date",
    width: 150,
  },
  {
    title: "STORAGE",
    dataIndex: "storage",
    width: 150,
  },
  {
    title: "SUPPLIER",
    dataIndex: "supplier",
    width: 150,
  },
];

class SearchPatientForm extends React.Component {
  constructor(props) {
    super(props);

    this.formRef = React.createRef();
    this.state = {
      loading: false,
      // eslint-disable-next-line react/no-unused-state
      value: undefined,
      data: [
        // {
        //   key: "1",
        //   lot_code: "001",
        //   item: "ITEM DESCRIPTION",
        //   quantity: 200,
        //   amount: 150.0,
        //   expiry_date: "05/05/2020",
        //   storage: "STORAGE 1",
        //   supplier: "SUPPLIER 1",
        //   width: 250
        // },
        // {
        //   key: "2",
        //   lot_code: "002",
        //   item: "ITEM DESCRIPTION",
        //   quantity: 100,
        //   amount: 150.0,
        //   expiry_date: "05/05/2020",
        //   storage: "STORAGE 2",
        //   supplier: "SUPPLIER 2",
        //   width: 250
        // },
        // {
        //   key: "3",
        //   lot_code: "003",
        //   item: "ITEM DESCRIPTION",
        //   quantity: 500,
        //   amount: 150.0,
        //   expiry_date: "05/05/2020",
        //   storage: "STORAGE 3",
        //   supplier: "SUPPLIER 3",
        //   width: 250
        // }
      ],
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  onChange = (value) => {
    console.log(value);
    // eslint-disable-next-line react/no-unused-state
    this.setState({ value });
  };

  handleAdd = (fields) => {
    const { count, data } = this.state;

    const newData = {
      lot_code: fields.lotCode,
      item: fields.item,
      quantity: fields.quantity,
      amount: fields.amount,
      expiry_date: fields.expiryDate,
      storage: fields.storage,
      supplier: fields.supplier,
    };
    this.setState({
      data: [...data, newData],
      count: count + 1,
    });
    console.log(newData);
  };

  onChange = (value) => {
    console.log(value);
    // eslint-disable-next-line react/no-unused-state
    this.setState({ value });
  };


  clearSearch = () => {
    this.formRef.current.resetFields();
  }

  render() {
    const { loading } = this.state;
    // const {
    //   tranNo,
    //   lotCode,
    //   item,
    //   quantity,
    //   amount,
    //   supplier,
    //   storage,
    //   expiryDate,
    //   tranDate,
    // } = getFieldsValue();
    // const disabled = !(
    //   (tranNo && tranNo.length > 1) ||
    //   (lotCode && lotCode.length > 1) ||
    //   (item && item.length > 1) ||
    //   (quantity && quantity.length > 1) ||
    //   (amount && amount.length > 1) ||
    //   expiryDate || supplier || storage || tranDate
    // );

    const disabled = false;
    const { Option } = Select;

    return (
      <Form 
        ref={this.formRef}
        labelCol={{ span: 24 }}
        onFinish={this.handleSubmit}
        className="inv-takeout-search-form"
      >
        <Row gutter={12} justify="center">
          <Col span={4}>
            <Form.Item 
              name="tranNo"
              label="TRANSACTION NO."
              className="no-padding"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item 
              name="tranDate"
              label="TRANSACTION DATE"
              className="no-padding"
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item 
              name="lotCode"
              label="LOT CODE"
              className="no-padding"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item 
              name="item"
              label="ITEM"
              className="no-padding"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item 
              name="quantity"
              label="QUANTITY"
              className="no-padding"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item 
              name="amount"
              label="AMOUNT"
              className="no-padding"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item 
              name="expiryDate"
              label="EXPIRY DATE"
              className="no-padding"
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item 
              name="supplier"
              label="SUPPLIER"
              className="no-padding"
            >
              <Select>
                <Option value="SUPPLIER 1">SUPPLIER 1</Option>
                <Option value="SUPPLIER 2">SUPPLIER 2</Option>
                <Option value="SUPPLIER 3">SUPPLIER 3</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item 
              name="storage"
              label="STORAGE"
              className="no-padding"
            >
              <Select>
                <Option value="STORAGE 1">STORAGE 1</Option>
                <Option value="STORAGE 2">STORAGE 2</Option>
                <Option value="STORAGE 3">STORAGE 3</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <div style={{ marginTop: 32 }}>
              <Button
                shape="round" 
                style={{ width: 120 }}
                onClick={this.clearSearch}
              >
                CLEAR
              </Button>
              <Button
                className="form-button"
                shape="round"
                type="primary"
                htmlType="submit"
                loading={loading}
                style={{ width: 120, marginLeft: 15 }}
                disabled
              >
                VOID
              </Button>
              <Button
                type="primary" 
                shape="round"
                style={{ width: 120, marginLeft: 15 }}
                disabled={disabled}
                onClick={this.handleAdd}
              >
                <Icon />
                {addTakeout}
              </Button>
            </div>
          </Col>
          <Table
            style={{ textTransform: "uppercase", marginTop: 30 }}
            size={tableSize}
            columns={columns}
            // eslint-disable-next-line react/prop-types
            dataSource={this.state.data}
            scroll={{ y: tableYScroll }}
            rowKey={(record) => record.examItemID}
            onRow={(record) => {
              return {
                onDoubleClick: () => {
                  this.displayDrawerUpdate(record);
                },
              };
            }}
          />
        </Row>
      </Form>
    );
  }
}

// export default Form.create()(SearchPatientForm);

export default SearchPatientForm;
