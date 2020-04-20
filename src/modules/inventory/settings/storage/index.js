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
import TablePager from "shared_components/table_pager";
import {
  drawerStorageTitleUpdate,
  drawerStorageTitleAdd,
  tableSize,
  buttonLabels,
  addStorageButton,
  tableYScroll
} from "modules/inventory/settings/settings";
import StorageForm from "./storage_form/storage_form";

// CUSTOM MODULES


//  CONSTANTS
const { Search } = Input;



const columns = [
  {
    title: "STORAGE NAME",
    dataIndex: "storage_name",
    key: "storage_name",
    width: 250,
    sorter: (a, b) => a.storage_name.localeCompare(b.storage_name)
  },
  {
    title: "DESCRIPTION",
    dataIndex: "storage_description",
    key: "storage_description",
    width: 250,
    sorter: (a, b) => a.storage_description.localeCompare(b.storage_description)
  }
];

class InventoryStorageTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          key: "1",
          storage_id: 1,
          storage_name: "John Brown",
          storage_description: "New York No. 1 Lake Park"
        },
        {
          key: "2",
          storage_id: 2,
          storage_name: "Jim Green",
          storage_description: "London No. 1 Lake Park"
        },
        {
          key: "3",
          storage_id: 3,
          storage_name: "Joe Black",
          storage_description: "Sidney No. 1 Lake Park"
        }
      ],
      usersRef: [
        {
          key: "1",
          storage_id: 1,
          storage_name: "John Brown",
          storage_description: "New York No. 1 Lake Park"
        },
        {
          key: "2",
          storage_id: 2,
          storage_name: "Jim Green",
          storage_description: "London No. 1 Lake Park"
        },
        {
          key: "3",
          storage_id: 3,
          storage_name: "Joe Black",
          storage_description: "Sidney No. 1 Lake Park"
        }
      ],
      actionType:'add'
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
      drawerTitle: drawerStorageTitleUpdate,
      drawerButton: buttonLabels.update,
      actionType: "update",
      panelInfo: record
    });
  };

  displayDrawerAdd = record => {
    this.setState({
      isDrawerVisible: true,
      drawerTitle: drawerStorageTitleAdd,
      actionType: "add",
      drawerButton: buttonLabels.create,
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
      const { storage_id, storage_name, storage_description } = item;

      return (
        this.containsString(storage_id, searchedVal) ||
        this.containsString(storage_name, searchedVal) ||
        this.containsString(storage_description, searchedVal)
      );
    });

    this.setState({ data: filtered });
  };

  onChangeSearch = event => {
    const { usersRef } = this.state;

    if (event.target.value === "") this.setState({ data: usersRef });
  };

  render() {
    const {actionType} = this.state
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
                    {addStorageButton}
                  </Button>
                  <TablePager handleChange={this.handleSelectChange} />
                </AntCol>
              </AntRow>
            </div>
            <AntTable
              className="settings-panel-table"
              size={tableSize}
              scroll={{ y: tableYScroll }}
              dataSource={this.state.data}
              pagination={this.state.pagination}
              loading={this.state.loading}
              columns={columns}
              style={{ textTransform: "uppercase" }}
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
              <StorageForm
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

const InventoryStorage = AntForm.create()(InventoryStorageTemplate);

export default InventoryStorage;
