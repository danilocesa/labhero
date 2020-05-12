// LiBRARY
import React from "react";
import {
  Drawer,
  Row as AntRow,
  Col as AntCol,
  Form as AntForm,
  Table as AntTable,
  Input,
  Button,
  Icon,
} from "antd";
import {
  tableSize,
  buttonLabels,
  addInventoryList,
  drawerCategoryTitleUpdate,
  drawerCategoryTitleAdd,
  tableYScroll,
  tablePageSize,
} from "modules/inventory/settings/settings";
// import TablePager from "shared_components/table_pager";
import ClearFormFields from "shared_components/form_clear_button";
import SearchPager from "shared_components/search_pager";
import InventoryListForm from "./search_form";

// CUSTOM MODULES
//  CONSTANTS
// @ts-ignore
// eslint-disable-next-line no-unused-vars
const { Search } = Input;

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
      drawerTitle: drawerCategoryTitleUpdate,
      drawerButton: buttonLabels.update,
      actionType: "update",
      panelInfo: record,
    });
  };

  displayDrawerAdd = (record) => {
    this.setState({
      isDrawerVisible: true,
      drawerTitle: drawerCategoryTitleAdd,
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

    // eslint-disable-next-line react/prop-types
    const { form } = this.props;
    const { usersRef } = this.state;
    // eslint-disable-next-line react/prop-types
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
    if (event.target.value === "") this.setState({ data: usersRef });
  };

  render() {
    // eslint-disable-next-line react/prop-types
    const { form } = this.props;
    const { actionType } = this.state;
    const { getFieldDecorator, getFieldsValue } = form;
    const { search } = getFieldsValue();
    const disabled = !(search && search.length > 1);
    console.log(disabled);

    return (
      <div>
        <div
          className="ant-row-flex ant-row-flex-center"
          style={{ marginBottom: 20 }}
        >
          <h4 className="ant-typography" justify="center">
            LIST OF INVENTORIES
          </h4>
        </div>
        <div className="panel-table-options" style={{ marginTop: 10 }}>
          <AntRow gutter={12} type="flex" justify="center">
            <AntForm onSubmit={this.handleSearch}>
              <AntCol span={24}>
                <AntForm.Item label="ITEM NAME">
                  {getFieldDecorator("search")(
                    <Input
                      allowClear
                      // onSearch={value => this.onSearch(value)}
                      onChange={this.onChangeSearch}
                      style={{ width: 200, marginRight: 10 }}
                      className="panel-table-search-input"
                    />
                  )}
                  <ClearFormFields
                    onClick={this.onChangeSearch}
                    form={this.props.form}
                  />
                  <Button
                    className="form-button"
                    block
                    shape="round"
                    type="primary"
                    htmlType="submit"
                    style={{ width: 120 }}
                    disabled={disabled}
                  >
                    SEARCH
                  </Button>
                </AntForm.Item>
              </AntCol>
            </AntForm>
          </AntRow>
        </div>
        <AntCol span={24}>
          <Button
            type="primary"
            shape="round"
            style={{
              marginLeft: "73%",
              position: "absolute",
              zIndex: 99,
              marginTop: 36,
            }}
            onClick={this.displayDrawerAdd}
          >
            <Icon type="plus" />
            {addInventoryList}
          </Button>
          <SearchPager
            pageSize={tablePageSize}
            pageTotal={this.state.data.length}
            handleChange={this.handleSelectChange}
          />
        </AntCol>
        <AntTable
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

const InventoryCategories = AntForm.create()(InventoryList);

export default InventoryCategories;
