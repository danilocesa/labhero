// LiBRARY
import React from "react";
import TablePager from "shared_components/table_pager";
import "./categories.css";
import {
  Drawer,
  Row as AntRow,
  Col as AntCol,
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
  tableYScroll,
  tablePageSize,
} from "modules/inventory/settings/settings";

import {getInventoryItems} from "services/inventory/inventoryCategory";
import { withRouter } from 'react-router-dom';
import CategoriesForm from "./categories_form/categories_form";


//  CONSTANTS
const { Search } = Input;

const columns = [
  {
    title: "CATEGORY CODE",
    dataIndex: "category_code",
    key: "category_code",
    width: 100,
    sorter: (a, b) => a.category_code.localeCompare(b.category_code)
  },
  {
    title: "CATEGORY NAME",
    dataIndex: "category_name",
    key: "category_name",
    width: 150,
    sorter: (a, b) => a.category_name.localeCompare(b.category_name)
  },
  {
    title: "DESCRIPTION",
    dataIndex: "category_desc",
    key: "category_desc",
    width: 250,
    sorter: (a, b) => a.category_desc.localeCompare(b.category_desc)
  },
];


class InventoryCategoriesTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      panelInfo: null,
      selectedRowKey: null,
      usersRef: [],
      loading: false,
      actionType: "add",
      pagination: {
				pageSize: tablePageSize,
			},
    };
  }

  async componentDidMount() {
    this.setState({loading:true});
    const response = await getInventoryItems();

    this.setState({ data: response.results, usersRef: response.results, loading:false });

    console.log(response);
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

  onSearch = (value) => {
    const searchedVal = value.toLowerCase();
    const { usersRef } = this.state;

    const filtered = usersRef.filter((item) => {
      // eslint-disable-next-line camelcase
      const { category_name } = item;

      return (
        this.containsString(category_name, searchedVal)
      );
    });

    this.setState({ data: filtered });
  };

  onChangeSearch = (event) => {
    const { usersRef } = this.state;

    if (event.target.value === "") this.setState({ data: usersRef });
  };

  render() {
    const { actionType, pagination } = this.state;
    return (
      <div>
        <AntRow>
          <AntCol span={24}>
            <div className="panel-table-options" style={{ marginTop: 10 }}>
              <AntRow>
                <AntCol span={12}>
                  <Search
                    allowClear
                    onSearch={(value) => this.onSearch(value)}
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
              pagination={pagination}
              loading={this.state.loading}
              scroll={{ y: tableYScroll }}
              columns={columns}
              rowKey={(record) => record.key}
              onRow={(record) => {
                return {
                  onDoubleClick: () => {
                    this.displayDrawerUpdate(record);
                    this.setState({
                      selectedRowKey: record.key,
                      actionType: "update",
                    });
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
              <CategoriesForm
                // @ts-ignore
                selectedID={this.state.selectedRowKey}
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

// InventoryCategoriesTemplate.propTypes = {
// 	handleSubmit: PropTypes.func.isRequired,
// 	location: ReactRouterPropTypes.location.isRequired,
// 	isLoading: PropTypes.bool.isRequired
// };

// const InventoryCategories = AntForm.create()(InventoryCategoriesTemplate);

export default withRouter(InventoryCategoriesTemplate);
