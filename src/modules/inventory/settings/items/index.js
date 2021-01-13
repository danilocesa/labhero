// @ts-nocheck
/* eslint-disable react/prop-types */
// LiBRARY

import React from "react";
import {
  Drawer,
  Row as AntRow,
  Col as AntCol,
  Button as AntButton,
  Table as AntTable,
  Input
} from "antd";
import { PlusOutlined } from '@ant-design/icons';
// CUSTOM MODULES
import TablePager from "shared_components/table_pager";
import {
  drawerItemsUpdate,
  drawerItemsAdd,
  tableSize,
  buttonLabels,
  addItems
} from "modules/inventory/settings/settings";
import ItemsForm from "./items_form/items_form";

//  CONSTANTS
const { Search } = Input;

const columns = [
  {
    title: "ITEM NAME",
    dataIndex: "item_name",
    key: "item_name"
  },
  {
    title: "CATEGORY",
    dataIndex: "category",
    key: "category"
  },
  {
    title: "SECTION",
    dataIndex: "section",
    key: "section"
  },
  {
    title: "U.O.M",
    dataIndex: "uom",
    key: "uom"
  },
  {
    title: "SKU BARCODE",
    dataIndex: "sku",
    key: "sku"
  }
];



class ItemsTemplate extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          key: "1",
          item_name: "Biogesic",
          category: "Category 1",
          section: "123456",
          uom: "10000100101001",
          sku: "10000100101001"
        },
        {
          key: "2",
          item_name: "Diatabs",
          category: "Category 2",
          section: "123456",
          uom: "10000100101001",
          sku: "10000100101001"
        },
        {
          key: "3",
          item_name: "Vitamins",
          category: "Category 3",
          section: "123456",
          uom: "10000100101001",
          sku: "10000100101001"
        }
      ],
      usersRef: [
        {
          key: "1",
          item_name: "Biogesic",
          category: "Category 1",
          section: "123456",
          uom: "10000100101001",
          sku: "10000100101001"
        },
        {
          key: "2",
          item_name: "Diatabs",
          category: "Category 2",
          section: "123456",
          uom: "10000100101001",
          sku: "10000100101001"
        },
        {
          key: "3",
          item_name: "Vitamins",
          category: "Category 3",
          section: "123456",
          uom: "10000100101001",
          sku: "10000100101001"
        }
      ],
      actionType: "add",
    };
  }


  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  displayDrawerUpdate = record => {
    this.setState({
      isDrawerVisible: true,
      drawerTitle: drawerItemsUpdate,
      drawerButton: buttonLabels.update,
      actionType: "update",
      panelInfo: record
    });
  };

  displayDrawerAdd = record => {
    this.setState({
      isDrawerVisible: true,
      drawerTitle: drawerItemsAdd,
      actionType: "add",
      drawerButton: buttonLabels.create,
      panelInfo: record
    });
  };

  // Private Function
  containsString = (searchFrom, searchedVal) => {
    if (searchFrom === null || searchFrom === "") return false;

    return searchFrom
      .toString()
      .toLowerCase()
      .includes(searchedVal);
  };

  onSearch = value => {
    const searchedVal = value.toLowerCase();
    const { usersRef } = this.state;

    const filtered = usersRef.filter(item => {
      // eslint-disable-next-line camelcase
      const { item_name, category, section, uom, sku } = item;

      return (
        this.containsString(item_name, searchedVal) ||
        this.containsString(category, searchedVal) ||
        this.containsString(section, searchedVal) ||
        this.containsString(uom, searchedVal) ||
        this.containsString(sku, searchedVal)
      );
    });

    this.setState({ data: filtered });
  };

  
  onChangeSearch = event => {
    const { usersRef } = this.state;

    if (event.target.value === "") this.setState({ data: usersRef });
  };

  onClose = () => {
    this.setState({
      isDrawerVisible: false
    });
  };

  handleSelectChange = value => {
    console.log(value);
    const { pagination } = this.state;
    // eslint-disable-next-line radix
    pagination.pageSize = parseInt(value);
    this.setState({ pagination });
  };

  render() {
    const { actionType } = this.state;

    return (
      <div>
        <AntRow>
          <AntCol span={24}>
            <div className="panel-table-options" style={{ marginTop: 10 }}>
              <AntRow>
                <AntCol span={12}>
                  <Search
                    allowClear
                    onSearch={value => this.onSearch(value)}
                    onChange={this.onChangeSearch}
                    style={{ width: 200 }}
                    className="panel-table-search-input"
                  />
                </AntCol>
                <AntCol span={12} style={{ textAlign: "right" }}>
                  <AntButton
                    type="primary"
                    shape="round"
                    style={{ marginRight: "15px" }}
                    onClick={this.displayDrawerAdd}
                  >
                    <PlusOutlined />
                    {addItems}
                  </AntButton>
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
              columns={columns}
              rowKey={record => record.key}
              onRow={record => {
                return {
                  onDoubleClick: () => {
                    this.displayDrawerUpdate(record);
                  }
                };
              }}
            />
            <Drawer
              title={this.state.drawerTitle}
              visible={this.state.isDrawerVisible}
              onClose={this.onClose}
              width="50%"
              destroyOnClose
            >
              <ItemsForm
                actionType={actionType}
                drawerButton={this.state.drawerButton}
                panelInfo={this.state.panelInfo}
                onCancel={this.onClose}
              />
            </Drawer>
          </AntCol>
        </AntRow>
      </div>
    );
  }
}


export default ItemsTemplate;