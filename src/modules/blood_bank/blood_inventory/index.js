// @ts-nocheck
/* eslint-disable react/prop-types */
// LiBRARY
import React from "react";
import { Row, Col, Table, Input, Button, Typography, Form, Select, Drawer } from "antd";

// CUSTOM MODULES
import { NumberInput } from "shared_components/pattern_input";
import { fetchPatients } from "services/blood_bank/extraction";
import PageTitle from "shared_components/page_title";
import Message from "shared_components/message";
import TablePager from "shared_components/table_pager";

import BloodInventoryDetailsForm from "./item_detail";

import {
  tableSize,
  buttonLabels,
  drawerBloodInventoryDetails,
  drawerbloodUpdate,
  tableYScroll,
  tablePageSize,
} from "modules/blood_bank/blood_inventory/settings";

const { Text } = Typography;
const { Option } = Select;
const columns = [
  {
    title: "BAG ID",
    dataIndex: "bag_id",
    key: "bag_id",
  },
  {
    title: "BLOOD TYPE",
    dataIndex: "blood_type",
    key: "blood_type",
  },
  {
    title: "STORAGE",
    dataIndex: "storage",
    key: "storage",
  },
  {
    title: "DATE EXTRACTED",
    dataIndex: "date_extracted",
    key: "date_extracted",
  },
  {
    title: "EXPIRATION DATE",
    dataIndex: "expiry_date",
    key: "expiry_date",
  },
];

const details = [
  {
    title: "BAG ID",
    dataIndex: "bag_id",
    key: "bag_id",
    width: 150,
  },
  {
    title: "ADDRESS",
    dataIndex: "address",
    key: "address",
    width: 250,
  },
];

const expandedRow = (row) => {
  console.log(row);
  return <Table columns={details} pagination={false} />;
};

class Extraction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Item: [
        {
          key: "1",
          bag_id: "00000001",
          blood_type: "AB",
          storage: "Storage1",
          date_extracted: "05/05/2020",
          expiry_date: "05/05/2020",
        },
      ],
      loading: false,
    };
    this.formRef = React.createRef();
  }

  handleSubmit = async () => {
    const { getFieldsValue } = this.formRef.current;
    const { bagID, patientName } = getFieldsValue();
    let patients = [];
    this.setState({ loading: true });
    // patients = await fetchPatients(patientName, bagID);

    this.setState({
      loading: false,
      Item: patients,
    });

    if (patients.length <= 0) Message.info("No results found");
  };

  handleChangeSize = (pageSize) => {
    this.setState({ pageSize });
  };

  clearSearch = () => {
    this.formRef.current.setFieldsValue({ bagID: "" });
  };

  displayDrawerUpdate = (record) => {
    this.setState({
      isDrawerVisible: true,
      drawerTitle: drawerBloodInventoryDetails,
      drawerButton: buttonLabels.update,
      actionType: "update",
      panelInfo: record,
    });
  };

  onClose = () => {
    this.setState({
      isDrawerVisible: false,
    });
  };

  render() {
    const { Item, loading, pageSize } = this.state;
    const items = Item.length > pageSize ? pageSize : Item.length;
    return (
      <div>
        <PageTitle pageTitle="BLOOD INVENTORY" />
        <Row>
          <Col span={24}>
            <Col style={{ textAlign: "center", marginTop: 30, marginLeft: 50 }}>
              <Form
                className="search-patient-form"
                onFinish={this.handleSubmit}
                ref={this.formRef}
                layout="vertical"
              >
                <Row gutter={12} justify="center">
                  {/* Search Input */}
                  <Col>
                    <Row>
                      <Col>
                        <Form.Item
                          label="BAG ID"
                          name="bagID"
                          style={{ marginRight: 10 }}
                        >
                          <NumberInput
                            style={{ width: 100 }}
                            maxLength={10}
                            onFocus={this.handleFocus}
                            placeholder="BAG ID"
                          />
                        </Form.Item>
                      </Col>
                      {/* <Text strong style={{marginTop:20, marginLeft:10}}>OR</Text> */}
                      <Col>
                        <Form.Item
                          name="bloodType"
                          label="BLOOD TYPE"
                          className="no-padding"
                        >
                          <Select style={{ width: 100, marginRight: 10 }}>
                            <Option value="bloodType1">A</Option>
                            <Option value="bloodType2">B</Option>
                            <Option value="bloodType3">AB</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col>
                        <Form.Item
                          name="storage"
                          label="STORAGE"
                          className="no-padding"
                        >
                          <Select style={{ width: 200 }}>
                            <Option value="Storage1">Storage 1</Option>
                            <Option value="Storage2">Storage 2</Option>
                            <Option value="Storage3">Storage 3</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                  {/* Buttons */}
                  <Col style={{ marginTop: 18 }}>
                    <Form.Item shouldUpdate>
                      {({ getFieldsValue }) => {
                        const { bagID, patientName } = getFieldsValue();
                        const disabled = !(
                          bagID ||
                          (patientName && patientName.length > 1)
                        );
                        return (
                          <Row>
                            <Button
                              className="form-button"
                              shape="round"
                              style={{ width: 120, marginLeft: 10 }}
                              onClick={this.clearSearch}
                            >
                              CLEAR
                            </Button>
                            <Button
                              loading={loading}
                              className="form-button"
                              shape="round"
                              type="primary"
                              htmlType="submit"
                              style={{ width: 120 }}
                              disabled={disabled}
                            >
                              SEARCH
                            </Button>
                          </Row>
                        );
                      }}
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Col>
            {/* Table Header */}
            <Row style={{ marginTop: -80 }}>
              <Col span={12} style={{ textAlign: "Left", marginTop: 100 }}>
                <div className="table-title">
                  <div>
                    <Text strong>SEARCH RESULTS</Text>
                  </div>
                  <div className="left">
                    <Text>
                      Showing {pageSize} items out of results {Item.length}{" "}
                    </Text>
                  </div>
                </div>
              </Col>
              <Col span={12} style={{ textAlign: "right", marginTop: 140 }}>
                <TablePager handleChange={this.handleChangeSize} />
              </Col>
            </Row>
            {/* Table */}
            <Table
              // expandedRowRender={expandedRow}
              style={{ textTransform: "uppercase" }}
              dataSource={Item}
              pagination={{ pageSize }}
              loading={this.state.loading}
              columns={columns}
              rowKey={(record) => record.userID}
              onRow={(record) => {
                return {
                  onDoubleClick: () => {
                    this.displayDrawerUpdate(record);
                  },
                };
              }}
            />
          </Col>
        </Row>
        <Drawer
          title={this.state.drawerTitle}
          visible={this.state.isDrawerVisible}
          onClose={this.onClose}
          width="30%"
          destroyOnClose
        >
          <BloodInventoryDetailsForm
            // actionType={actionType}
            drawerButton={this.state.drawerButton}
            panelInfo={this.state.panelInfo}
            onCancel={this.onClose}
          />
        </Drawer>
      </div>
    );
  }
}

export default Extraction;
