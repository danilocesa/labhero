import React, { Component } from "react";
import { TreeSelect,Col,Card,Table, Row,Button} from 'antd';
import image1 from "./image1.png";
import image2 from "./image2.png";
import image3 from "./image3.png";
import "./categories.css";
const { TreeNode } = TreeSelect;

const columns = [
    {
      title: "Item",
      dataIndex: "item",
      key: "name",
      render: text => <a>{text}</a>
    },
    {
      title: "",
      dataIndex: "img",
      key: "img"
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description"
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity"
    },
  
    {
      title: "Price",
      dataIndex: "price",
      key: "price"
    }
  ];
  
  const data = [
    {
      key: "1",
      item: "1",
      img: <img type="primary" className="image1" src={image1} alt="image1" />,
      description: "Consultation",
      quantity: "(x)1",
      price: "P500.00"
    },

    {
      key: "2",
      item: "2",
      img: <img type="primary" className="image2" src={image2} alt="image2" />,
      description: "Anti Biotic",
      quantity: "(x)100",
      price: "P25.00"
    },
    {
      key: "3",
      item: "3",
      img: <img type="primary" className="image3" src={image3} alt="image3" />,
      description: "Professional Fee",
      quantity: "(x)13",
      price: "P2000.00"
    }
  ];

class Categories extends React.Component {

    state = {
        value: undefined,
      };

      onChange = value => {
        console.log(value);
        this.setState({ value });
      };

    render() {
      return (
          <div className = "form">
              <div>
                <h4>CATEGORIES</h4>
                <div className = "select-category"
                style={{width: 400}}
                >
                <Row>
                    <Col span={24}>
                        <TreeSelect
                            showSearch
                            style={{ width: '100%', marginBottom: 10 }}
                            value={this.state.value}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            placeholder="Search"
                            allowClear
                            multiple
                            treeDefaultExpandAll
                            onChange    ={this.onChange}
                        >
                            <TreeNode value="parent 1" title="parent 1">
                            <TreeNode value="parent 1-0" title="parent 1-0">
                                <TreeNode value="leaf1" title="my leaf" />
                                <TreeNode value="leaf2" title="your leaf" />
                            </TreeNode>
                            <TreeNode value="parent 1-1" title="parent 1-1">
                                <TreeNode value="sss" title={<b style={{ color: '#08c' }}>sss</b>} />
                            </TreeNode>
                            </TreeNode>     
                        </TreeSelect>
                    </Col>
                </Row>
                </div>
              </div>
              <div className = "category-top" style={{marginTop: 10}}> 
                    <Row>   
                        <Col span={24}>
                            <Card
                                    bordered={true}
                                    style={{padding: 5}}
                                >
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
                    </Row>
                </div>
              <div className = "form-card">
                  <Row> 
                    <div style={{marginTop: 10}}> 
                        <Col span={12}>
                            <Card
                            
                                    title="Search"
                                    bordered={true}
                                    style = {{alignItems: "center"}}
                                > 
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
                                    title="Search"
                                    bordered={true}
                                > 
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
                    <div style={{marginTop: 10}}> 
                        <Col span={12}>
                            <Card
                                    title="REQUEST ITEMS"
                                    bordered={true}
                                >
                                 <Table columns={columns} dataSource={data}
                                /> 
                            </Card>
                        </Col>
                    </div>
                  </Row>
                </div>
          </div>
      )
    }
}
export default Categories;