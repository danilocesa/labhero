import React, { Component } from "react";
import { Input,Col,Card,Table, Row,DatePicker,Select,Button} from 'antd';
import moment from 'moment';
import "./summary.css";

const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}

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
    }
  ];
  
  const data = [
    {
      key: "1",
      item: "CBC",
      particulars: "Description",
      quantity: "1",
      amount: "P500.00"
    },

    {
      key: "2",
      item: "Potassium",
      particulars: "Description",
      quantity: "1",
      amount: "P500.00"
    },
    {
      key: "3",
      item: "Anti Biotic",
      particulars: "Description",
      quantity: "1",
      amount: "P500.00"
    }
  ];

class Summary extends React.Component {
    render() {
        return (
        <div
            className="layout"
            style={{
            display: "flex",
            justifyContent: "center",
            // alignItems: "center",
            // height: "100vh",
            // padding: 70,
            marginTop: 10
            }}
        >
            <Row>
                <Col span={24}>
                    <div>   
                        <h4>SUMMARY</h4>
                    </div>
                </Col>
                <Col span={8}>
                    <div className = "search-input">
                        <label className="label" title="PATIENT NAME">PATIENT NAME</label>
                        <Input placeholder="LAST NAME, FIRST NAME M.I." />
                    </div>
                </Col>
                <Col span={8}>
                    <div className = "search-input">
                        <label className="label" title="GENDER">GENDER</label>
                        <Select defaultValue="" style={{ width: 320 }} onChange={handleChange}>
                            <Option value="MALE">MALE</Option>
                            <Option value="FEMALE">FEMALE</Option>
                        </Select>
                    </div>
                </Col>
                <Col span={8}>
                    <div className = "search-input">
                        <label className="label" title="DATE OF BIRTH">DATE OF BIRTH</label>
                        <DatePicker defaultValue={moment('2020/01/01', dateFormat)} format={dateFormat} 
                        />
                    </div>
                </Col>
                <Col span={24}>
                    <div className = "search-input"
                        style={{marginTop: 10}}
                    >
                            <label className="label" title="ADDRESS">ADDRESS</label>
                            <Input 
                            style={{marginLeft: 30,width: 690}}
                            placeholder="ADDRESS" 
                            />
                    </div>
                </Col>
                <Col span={24}>
                    <Card
                    bordered={true}
                    style={{ width: "100%", marginTop: 30, marginLeft: 10 }}
                    >
                    <Table 
                        columns={columns} 
                        dataSource={data} 
                        style={{marginTop: 10}}
                        pagination={false} 
                        
                    />
                    </Card>
                </Col>
                <Col span={24}>
                    <div span={24}>
                        <h1 className = "h1">
                            TOTAL: 3,500.00
                        </h1>
                    </div>
                </Col>
                <Col span={24}>
                    <div className = "button-below">
                        <Button className="ant-btn-round" type="primary">
                                Print
                        </Button>
                        <Button className="ant-btn-round" type="primary">
                            Back
                        </Button>  
                    </div>
                </Col>
            </Row>
        </div>
        )
    }
}

export default Summary;