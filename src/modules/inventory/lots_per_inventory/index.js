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
  Form,
} from "antd";
import { PlusOutlined } from '@ant-design/icons';
import {
  tableSize,
  buttonLabels,
  addInventoryList,
  drawerLotInvTitleUpdate,
  drawerLotInvTitleAdd,
  tableYScroll,
  tablePageSize,
} from "modules/inventory/settings/settings";
import SearchPager from "shared_components/search_pager";
import InventoryListForm from "./search_form";

import "./inventory_list.css";

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

const columnsSummary = [
  {
    title: "",
    dataIndex: "",
    key: "",
    width: 150,
  },
  {
    title: "",
    dataIndex: "",
    key: "",
    width: 150,
  },
  {
    title: "TOTAL ON HAND:",
    dataIndex: "onHand",
    key: "onHand",
    width: 150,
  },
  {
    title: "TOTAL QUANTITY:",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "TOTAL AMOUNT:",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "",
    dataIndex: "",
    key: "",
    width: 150,
  },
  {
    title: "",
    dataIndex: "",
    key: "",
    width: 150,
  },
  {
    title: "",
    dataIndex: "",
    key: "",
    width: 150,
  },
];


class LotsPerInventory extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      data: [
        {
          key: "1",
          lotCode: "0001",
          itemName: "Biogesic",
          onHand: "1",
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
          onHand: "2",
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
          onHand: "3",
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
          onHand: "1",
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
          onHand: "2",
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
          onHand: "3",
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


  displayDrawerUpdate = (record) => {
    this.setState({
      isDrawerVisible: true,
      drawerTitle: drawerLotInvTitleUpdate,
      drawerButton: buttonLabels.update,
      actionType: "update",
      panelInfo: record,
    });
  };

  displayDrawerAdd = (record) => {
    this.setState({
      isDrawerVisible: true,
      drawerTitle: drawerLotInvTitleAdd,
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
    // eslint-disable-next-line react/prop-types
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

  clearSearch = () => {
    this.formRef.current.setFieldsValue({ itemName: '' });
  }

  //  summaryData = () => {
  //   let totalOnhand = 0;
  //   let totalQty = 0;
  //   let totalAmount = 0;
  //   console.log(1)
  //   this.state.data.forEach(i => {
  //     totalOnhand += i.onhand;
  //     totalQty += i.qty;
  //     totalAmount += i.amount;
  //     console.log(totalAmount)
  //   });
  //   console.log(totalOnhand)
  //   console.log(totalQty)
  //   console.log(totalAmount)
  //   return  {
  //     onHand: totalOnhand,
  //     quantity: totalQty,
  //     amount: totalAmount
  //   }
  // } 

  render() {

    const { actionType } = this.state;
    // const { searchByItem, searchByLot } = getFieldsValue();
    // const disabled = !(
    //   (searchByItem && searchByItem.length > 1) ||
    //   (searchByLot && searchByLot.length > 1)
    // );

    const disabled = false;

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
        <div className="lot-per-inventory" style={{ marginTop: 10 }}>
          <AntForm 
            ref={this.formRef}
            onFinish={this.handleSearch}
          >
            <AntRow gutter={12} justify="center">
              <AntCol>
                <Form.Item 
                  name="searchByLot"
                  label="LOT"
                  labelCol={{ span: 24 }}
                  className="no-padding"
                >
                  <Input
                    allowClear
                    // onSearch={value => this.onSearch(value)}
                    onChange={this.onChangeSearch}
                    className="panel-table-search-input"
                  />
                </Form.Item>
              </AntCol>
              <AntCol>
                <Form.Item style={{ marginTop: 32 }}>
                  OR
                </Form.Item>
              </AntCol>
              <AntCol>
                <Form.Item 
                  name="searchByItem"
                  label="ITEM"
                  labelCol={{ span: 24 }}
                  className="no-padding"
                >
                  <Input
                    allowClear
                    // onSearch={value => this.onSearch(value)}
                    onChange={this.onChangeSearch}
                  />
                </Form.Item>
              </AntCol>
              <AntCol>
                <div style={{ marginTop: 32 }}>
                  <Button
                    shape="round" 
                    style={{ width: 120 }}
                    onClick={this.clearSearch}
                  >
                    CLEAR
                  </Button>
                </div>
              </AntCol>
              <AntCol>
                <div style={{ marginTop: 32 }}>
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
                </div>
              </AntCol>
            </AntRow>
          </AntForm>
        </div>
        <AntCol span={24}>
          <Button
            type="primary"
            shape="round"
            style={{
              width: 120,
              marginLeft: "75%",
              position: "absolute",
              zIndex: 99,
              marginTop: 18,
            }}
            onClick={this.displayDrawerAdd}
          >
            <PlusOutlined />
            {addInventoryList}
          </Button>
          <SearchPager
            pageSize={tablePageSize}
            pageTotal={this.state.data.length}
            handleChangeSize={this.handleSelectChange}
          />
        </AntCol>
        <AntTable
          style={{ textTransform: "uppercase" }}
          className="settings-panel-table"
          size={tableSize}
          dataSource={this.state.data}
          pagination={false}
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
       
        <AntTable 
          columns={columnsSummary} 
          // dataSource={this.summaryData}
        />
        <Drawer
          title={this.state.drawerTitle}
          visible={this.state.isDrawerVisible}
          onClose={this.onClose}
          width="30%"
          destroyOnClose
        >
          <InventoryListForm
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

export default LotsPerInventory;
