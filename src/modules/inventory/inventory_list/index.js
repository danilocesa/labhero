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
  Icon
} from "antd";
import {
  tableSize,
  buttonLabels,
  addInventoryList,
  drawerCategoryTitleUpdate,
  drawerCategoryTitleAdd,
  tableYScroll
} from "modules/inventory/settings/settings";
import TablePager from "shared_components/table_pager";
import InventoryListForm from "./search_form";

// CUSTOM MODULES
//  CONSTANTS
const { Search } = Input;

const columns = [
  {
    title: "ITEM NAME",
    dataIndex: "item_name",
    key: "item_name",
    width: 250,
    sorter: (a, b) => a.item.localeCompare(b.item)
  },
  {
    title: "QUANTITY",
    dataIndex: "quantity",
    key: "quantity",
    width: 150,
    sorter: (a, b) => a.quantity.localeCompare(b.quantity)
  },
  {
    title: "THRESHOLD",
    dataIndex: "threshold",
    key: "threshold",
    width: 150,
    sorter: (a, b) => a.threshold.localeCompare(b.threshold)
  }
];

class InventoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          key: "1",
          item_name: "Chicken Joy",
          quantity: "250",
          threshold: "50"
        },
        {
          key: "2",
          item_name: "Burger Mcdo",
          quantity: "500",
          threshold: "50"
        },
        {
          key: "3",
          item_name: "Mc Cafe",
          quantity: "1250",
          threshold: "50"
        }
      ],
      usersRef: [
        {
          key: "1",
          item_name: "Chicken Joy",
          quantity: "250",
          threshold: "50"
        },
        {
          key: "2",
          item_name: "Burger Mcdo",
          quantity: "500",
          threshold: "50"
        },
        {
          key: "3",
          item_name: "Mc Cafe",
          quantity: "1250",
          threshold: "50"
        }
      ],
      actionType: "add"
    };
  }

  handleSubmit = e => {
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

  displayDrawerUpdate = record => {
    this.setState({
      isDrawerVisible: true,
      drawerTitle: drawerCategoryTitleUpdate,
      drawerButton: buttonLabels.update,
      actionType: "update",
      panelInfo: record
    });
  };

  displayDrawerAdd = record => {
    this.setState({
      isDrawerVisible: true,
      drawerTitle: drawerCategoryTitleAdd,
      drawerButton: buttonLabels.create,
      actionType: "add",
      panelInfo: record
    });
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

  // Private Function
  containsString = (searchFrom, searchedVal) => {
    if (searchFrom === null || searchFrom === "") return false;

    return searchFrom
      .toString()
      .toLowerCase()
      .includes(searchedVal);
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

    const filtered = usersRef.filter(item => {
      // eslint-disable-next-line camelcase
      const { item_name } = item;

      return this.containsString(item_name, searchedVal);
    });

    this.setState({ data: filtered });
  };

  onChangeSearch = event => {
    const { usersRef } = this.state;
    if (event.target.value === "") this.setState({ data: usersRef });
  };

  render() {
    // eslint-disable-next-line react/prop-types
    const { form } = this.props;
    const { actionType } = this.state;
    // eslint-disable-next-line react/prop-types
    const { getFieldDecorator } = form;

    return (
      <div>
        <AntRow>
          <AntCol span={24}>
            <div className="panel-table-options" style={{ marginTop: 10 }}>
              <AntRow>
                <AntCol span={24} style={{ textAlign: "right" }}>
                  <AntForm onSubmit={this.handleSearch}>
                    {getFieldDecorator('search')(
                      <Input
                        allowClear
                        // onSearch={value => this.onSearch(value)}
                        // onChange={this.onChangeSearch}
                        style={{ width: 200 }}
                        className="panel-table-search-input"
                      />
                    )}
                    
                    <Button
                      className="form-button"
                      // block
                      shape="round"
                      type="primary"
                      htmlType="submit"
                      style={{ width: 120, marginLeft: 10, marginRight: 150 }}
                      // onSearch={value => this.onSearch(value)}
                    >
                      SEARCH
                    </Button>
                    <Button
                      type="primary"
                      shape="round"
                      style={{ marginRight: "15px" }}
                      onClick={this.displayDrawerAdd}
                    >
                      <Icon type="plus" />
                      {addInventoryList}
                    </Button>
                  </AntForm>
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
          </AntCol>
        </AntRow>
      </div>
    );
  }
}

const InventoryCategories = AntForm.create()(InventoryList);

export default InventoryCategories;
