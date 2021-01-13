// LiBRARY
import React from "react";
import {
  Drawer,
  Row,
  Col,
  Form,
  Table,
  Input,
  Button,
} from "antd";
import { PlusOutlined } from '@ant-design/icons';
import {
  tableSize,
  buttonLabels,
  tableYScroll,
  tablePageSize,
} from "modules/inventory/settings/settings";
import SearchPager from "shared_components/search_pager";
import PageTitle from "shared_components/page_title";
import InventoryListForm from "./search_form";

const columns = [
  {
    title: "ITEM NAME",
    dataIndex: "item_name",
    key: "item_name",
    width: 250,
    sorter: (a, b) => a.item.localeCompare(b.item),
  },
  {
    title: "QUANTITY",
    dataIndex: "quantity",
    key: "quantity",
    width: 150,
    sorter: (a, b) => a.quantity.localeCompare(b.quantity),
  },
  {
    title: "THRESHOLD",
    dataIndex: "threshold",
    key: "threshold",
    width: 150,
    sorter: (a, b) => a.threshold.localeCompare(b.threshold),
  },
];

class InventoryList extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      data: [
        {
          key: "1",
          item_name: "Biogesic",
          quantity: "250",
          threshold: "50",
        },
        {
          key: "2",
          item_name: "Diatabs",
          quantity: "500",
          threshold: "50",
        },
        {
          key: "3",
          item_name: "Vitamins",
          quantity: "1250",
          threshold: "50",
        },
      ],
      usersRef: [
        {
          key: "1",
          item_name: "Biogesic",
          quantity: "250",
          threshold: "50",
        },
        {
          key: "2",
          item_name: "Diatabs",
          quantity: "500",
          threshold: "50",
        },
        {
          key: "3",
          item_name: "Vitamins",
          quantity: "1250",
          threshold: "50",
        },
      ],
      actionType: "add",
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // eslint-disable-next-line react/prop-types
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  handleReset = () => {
    // eslint-disable-next-line react/prop-types
    this.props.form.resetFields();
  };

  displayDrawerUpdate = (record) => {
    this.setState({
      isDrawerVisible: true,
      drawerTitle: "UPDATE INVENTORY",
      drawerButton: buttonLabels.update,
      actionType: "update",
      panelInfo: record,
    });
  };

  displayDrawerAdd = (record) => {
    this.setState({
      isDrawerVisible: true,
      drawerTitle: "ADD INVENTORY",
      drawerButton: buttonLabels.create,
      actionType: "add",
      panelInfo: record,
    });
  };

  onClose = () => {
    this.setState({
      isDrawerVisible: false,
    });
  };

  handleSelectChange = (value) => {
    console.log(value);
    const { pagination } = this.state;
    // eslint-disable-next-line radix
    pagination.pageSize = parseInt(value);
    this.setState({ pagination });
  };

  // Private Function
  containsString = (searchFrom, searchedVal) => {
    if (searchFrom === null || searchFrom === "") return false;

    return searchFrom.toString().toLowerCase().includes(searchedVal);
  };

  handleSearch = (evt) => {
    evt.preventDefault();

    const { form } = this.props;
    const { usersRef } = this.state;
    const value = form.getFieldsValue().search;
    console.log(value);
    const searchedVal = value.toLowerCase();

    const filtered = usersRef.filter((item) => {
      // eslint-disable-next-line camelcase
      const { item_name } = item;

      return this.containsString(item_name, searchedVal);
    });

    this.setState({ data: filtered });
  };

  onChangeSearch = (event) => {
    const { usersRef } = this.state;

    if (event.target.value === '') 
      this.setState({ data: usersRef });
  };

  clearSearch = () => {
    this.formRef.current.setFieldsValue({ itemName: '' });
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { actionType } = this.state;
    // const { form } = this.props;
    // const { getFieldDecorator, getFieldsValue } = form;
    // const { search } = getFieldsValue();
    // const disabled = !(search && search.length > 1);
    const disabled = false;

    return (
      <div>
        <PageTitle pageTitle="LIST OF INVENTORIES" align="CENTER" />
        <div className="panel-table-options" style={{ marginTop: 10 }}>
          <Form 
            ref={this.formRef}
            onFinish={this.handleSearch}
          >
            <Row gutter={12} justify="center">
              <Col>
                <Form.Item 
                  name="itemName"
                  label="ITEM NAME"
                >
                  <Input
                    allowClear
                    onChange={this.onChangeSearch}
                    style={{ width: 250, marginRight: 10 }}
                    className="panel-table-search-input"
                  />
                </Form.Item>
              </Col>
              <Col>
                <Button
                  shape="round" 
                  style={{ width: 120 }}
                  onClick={this.clearSearch}
                >
                  CLEAR
                </Button>
                <Button
                  className="form-button"
                  block
                  shape="round"
                  type="primary"
                  htmlType="submit"
                  style={{ width: 120, marginLeft: 10 }}
                  disabled={disabled}
                >
                  SEARCH
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
        <Col span={24}>
          <Button
            type="primary"
            shape="round"
            style={{
              marginLeft: "73%",
              position: "absolute",
              zIndex: 99,
              marginTop: 15,
            }}
            onClick={this.displayDrawerAdd}
          >
            <PlusOutlined />
            ADD INVENTORY
          </Button>

          <SearchPager
            pageSize={tablePageSize}
            pageTotal={this.state.data.length}
            handleChangeSize={this.handleSelectChange}
          />
        </Col>
        <Table
          style={{ textTransform: "uppercase" }}
          className="settings-panel-table"
          size={tableSize}
          dataSource={this.state.data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          scroll={{ y: tableYScroll }}
          columns={columns}
          rowKey={(record) => record.key}
          onRow={(record) => {
            return {
              onDoubleClick: () => {
                this.displayDrawerUpdate(record);
              },
            };
          }}
        />
        <Drawer
          title={this.state.drawerTitle}
          visible={this.state.isDrawerVisible}
          onClose={this.onClose}
          width="30%"
          destroyOnClose
        >
          <InventoryListForm
            // @ts-ignore
            actionType={actionType}
            drawerButton={this.state.drawerButton}
            panelInfo={this.state.panelInfo}
            onCancel={this.onClose}
          />
        </Drawer>
      </div>
    );
  }
}


export default InventoryList;
