// LiBRARY
import React from "react";
import TablePager from "shared_components/table_pager";
import "./categories.css";
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
  addCategoriesButton,
  drawerCategoryTitleUpdate,
  drawerCategoryTitleAdd,
  tableYScroll
} from "modules/inventory/settings/settings";
import CategoriesForm from "./categories_form/categories_form";

// CUSTOM MODULES
//  CONSTANTS
const { Search } = Input;


const columns = [
  {
    title: "CATEGORY CODE",
    dataIndex: "categories_code",
    key: "categories_code",
    width: 100
  },
  {
    title: "CATEGORY NAME",
    dataIndex: "categories_name",
    key: "categories_name",
    width: 150
  },
  {
    title: "DESCRIPTION",
    dataIndex: "description",
    key: "description",
    width: 250
  }
];

class InventoryCategoriesTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          key: "1",
          categories_code: 1,
          categories_name: "John Brown",
          description: "Description"
        },
        {
          key: "2",
          categories_code: 2,
          categories_name: "Jim Green",
          description: "Description"
        },
        {
          key: "3",
          categories_code: 3,
          categories_name: "Joe Black",
          description: "Description"
        }
      ],
      usersRef: [
        {
          key: "1",
          categories_code: 1,
          categories_name: "John Brown",
          description: "Description"
        },
        {
          key: "2",
          categories_code: 2,
          categories_name: "Jim Green",
          description: "Description"
        },
        {
          key: "3",
          categories_code: 3,
          categories_name: "Joe Black",
          description: "Description"
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

  onSearch = value => {
    const searchedVal = value.toLowerCase();
    const { usersRef } = this.state;

    const filtered = usersRef.filter(item => {
      // eslint-disable-next-line camelcase
      const { categories_code, categories_name, description } = item;

      return (
        this.containsString(categories_code, searchedVal) ||
        this.containsString(categories_name, searchedVal) ||
        this.containsString(description, searchedVal)
      );
    });

    this.setState({ data: filtered });
  };

  onChangeSearch = event => {
    const { usersRef } = this.state;

    if (event.target.value === "") this.setState({ data: usersRef });
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
                  <Button
                    type="primary"
                    shape="round"
                    style={{ marginRight: "15px" }}
                    onClick={this.displayDrawerAdd}
                  >
                    <Icon type="plus" />
                    {addCategoriesButton}
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
              <CategoriesForm
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

const InventoryCategories = AntForm.create()(InventoryCategoriesTemplate);

export default InventoryCategories;
