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
  Tag,
} from "antd";
import {
  tableSize,
  buttonLabels,
  addInventoryList,
  drawerCategoryTitleUpdate,
  drawerCategoryTitleAdd,
  tableYScroll,
} from "modules/inventory/settings/settings";
import TablePager from "shared_components/table_pager";
import ClearFormFields from "shared_components/form_clear_button";
import InventoryListForm from "./search_form";

// CUSTOM MODULES
//  CONSTANTS
// eslint-disable-next-line no-unused-vars
const { Search } = Input;

const columns = [
  {
    title: "LOT CODE",
    dataIndex: "lotCode",
    key: "lotCode",
    width: 150,
    sorter: (a, b) => a.lotCode.localeCompare(b.lotCode),
  },
  {
    title: "ITEM",
    dataIndex: "itemName",
    key: "itemName",
    width: 150,
    sorter: (a, b) => a.item.localeCompare(b.item),
  },
  {
    title: "ON HAND",
    dataIndex: "onHand",
    key: "onHand",
    width: 150,
    sorter: (a, b) => a.onHand.localeCompare(b.onHand),
  },
  {
    title: "QUANTITY",
    dataIndex: "quantity",
    key: "quantity",
    width: 150,
    sorter: (a, b) => a.quantity.localeCompare(b.quantity),
  },
  {
    title: "AMOUNT",
    dataIndex: "amount",
    key: "amount",
    width: 150,
    sorter: (a, b) => a.amount.localeCompare(b.amount),
  },
  {
    title: "EXPIRATION DATE",
    dataIndex: "expiryDate",
    key: "expiryDate",
    width: 150,
    sorter: (a, b) => a.expiryDate.localeCompare(b.expiryDate),
  },
  {
    title: "STORAGE",
    dataIndex: "storage",
    key: "storage",
    width: 150,
    sorter: (a, b) => a.storage.localeCompare(b.storage),
  },
  {
    title: "SUPPLIER",
    dataIndex: "supplier",
    key: "supplier",
    width: 150,
    sorter: (a, b) => a.supplier.localeCompare(b.supplier),
  },
];

class LotsPerInventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          key: "1",
          lotCode: "0001",
          itemName: "Biogesic",
          onHand: "On Hand 1",
          quantity: 1,
          amount: 100,
          expiryDate: "05/05/2020",
          storage: "Storage 1",
          supplier: "Supplier 1",
        },
        {
          key: "2",
          lotCode: "0002",
          itemName: "Diatabs",
          onHand: "On Hand 2",
          quantity: 1,
          amount: 100,
          expiryDate: "05/05/2020",
          storage: "Storage 2",
          supplier: "Supplier 2",
        },
        {
          key: "3",
          lotCode: "0003",
          itemName: "Vitamins",
          onHand: "On Hand 3",
          quantity: 1,
          amount: 100,
          expiryDate: "05/05/2020",
          storage: "Storage 3",
          supplier: "Supplier 3",
        },
      ],
      usersRef: [
        {
          key: "1",
          lotCode: "0001",
          itemName: "Biogesic",
          onHand: "On Hand 1",
          quantity: 1,
          amount: 100,
          expiryDate: "05/05/2020",
          storage: "Storage 1",
          supplier: "Supplier 1",
        },
        {
          key: "2",
          lotCode: "0002",
          itemName: "Diatabs",
          onHand: "On Hand 2",
          quantity: 1,
          amount: 100,
          expiryDate: "05/05/2020",
          storage: "Storage 2",
          supplier: "Supplier 2",
        },
        {
          key: "3",
          lotCode: "0003",
          itemName: "Vitamins",
          onHand: "On Hand 3",
          quantity: 1,
          amount: 100,
          expiryDate: "05/05/2020",
          storage: "Storage 3",
          supplier: "Supplier 3",
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
    const value =
      form.getFieldsValue().searchByLot || form.getFieldsValue().searchByItem;
    console.log(value);
    const searchedVal = value.toLowerCase();

    const filtered = usersRef.filter((item) => {
      // eslint-disable-next-line camelcase
      const { lotCode, itemName } = item;

      // return this.containsString(lotCode, searchedVal);
      return (
        this.containsString(lotCode, searchedVal) ||
        this.containsString(itemName, searchedVal)
      );
    });

    this.setState({ data: filtered });
  };

  onChangeSearch = (event) => {
    const { usersRef } = this.state;
    if (event.target.value === "") this.setState({ data: usersRef });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator, getFieldsValue } = form;
    const { loading } = this.state;
    const { searchByLot, searchByItem } = getFieldsValue();
    const disabled = !(
      (searchByLot && searchByLot.length > 1) ||
      (searchByItem && searchByItem.length > 1)
    );
    console.log(disabled);
    const { actionType } = this.state;

    return (
      <div>
        <div
          className="ant-row-flex ant-row-flex-center"
          style={{ marginBottom: 20 }}
        >
          <h4 style={{ textAlign: "center" }} className="ant-typography">
            LOTS PER INVENTORY
          </h4>
        </div>
        <div className="panel-table-options" style={{ marginTop: 10 }}>
          <AntRow gutter={12} type="flex" justify="center">
            <AntForm onSubmit={this.handleSearch}>
              <AntCol span={6}>
                <AntForm.Item label="LOT CODE">
                  {getFieldDecorator("searchByLot")(
                    <Input
                      allowClear
                      // onSearch={value => this.onSearch(value)}
                      onChange={this.onChangeSearch}
                      style={{ width: 200, marginRight: 10 }}
                      className="panel-table-search-input"
                    />
                  )}
                </AntForm.Item>
              </AntCol>
              <AntCol span={6}>
                <AntForm.Item label="ITEM">
                  {getFieldDecorator("searchByItem")(
                    <Input
                      allowClear
                      // onSearch={value => this.onSearch(value)}
                      onChange={this.onChangeSearch}
                      style={{ width: 200, marginLeft: 10 }}
                      className="panel-table-search-input"
                    />
                  )}
                </AntForm.Item>
              </AntCol>
              <AntCol span={12}>
                <ClearFormFields
                  style={{ width: 120, marginTop: 42, marginLeft: 40 }}
                  form={this.props.form}
                />
                <Button
                  className="form-button"
                  shape="round"
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  style={{ width: 120, marginTop: 42 }}
                  disabled={disabled}
                >
                  SEARCH
                </Button>
              </AntCol>
            </AntForm>
            <AntCol span={24} style={{ textAlign: "right" }}>
              <Button
                type="primary"
                shape="round"
                style={{ marginRight: "15px" }}
                onClick={this.displayDrawerAdd}
              >
                <Icon type="plus" />
                {addInventoryList}
              </Button>
              <TablePager handleChange={this.handleSelectChange} />
            </AntCol>
          </AntRow>
        </div>
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
        <AntCol span={8}>
          <h1 style={{ float: "left" }}>
            TOTAL ON HAND: <br /> 100
          </h1>
        </AntCol>
        <AntCol span={8}>
          <h1 style={{ float: "left" }}>
            TOTAL QUANTITY: <br /> 100
          </h1>
        </AntCol>
        <AntCol span={8}>
          <h1 style={{ float: "left" }}>
            TOTAL AMOUNT: <br /> 100
          </h1>
        </AntCol>
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

const InventoryCategories = AntForm.create()(LotsPerInventory);

export default InventoryCategories;
