import React from 'react';
import { TreeSelect, Col, Card, Row, Button } from "antd";

const { TreeNode } = TreeSelect;

class FirstLevelSearch extends React.Component {
  state = {
    value: null
  }

  onChange = value => {
    console.log(value);
    this.setState({ value });
  };
  
  render() {
    return (
      <div className="cashier-category-select-category">
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
      </div>
    );
  }
}

export default FirstLevelSearch;