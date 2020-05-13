// @ts-nocheck
/* eslint-disable react/prop-types */
// LiBRARY

import React from "react";
import {
  Drawer,
  Row as AntRow,
  Col as AntCol,
  Form as AntForm,
  Button as AntButton,
  Table as AntTable,
  Input,
  Icon
} from "antd";

// CUSTOM MODULES
import TablePager from "shared_components/table_pager";
import {
  drawerSupplierUpdate,
  drawerSupplierAdd,
  tableSize,
  buttonLabels,
  addSupplierButton
} from "modules/inventory/settings/settings";
import SupplierForm from "./supplier_form/supplier_form";

//  CONSTANTS
const { Search } = Input;

const columns = [
  {
    title: "SUPPLIER NAME",
    dataIndex: "supplier_name",
    key: "supplier_name"
  },
  {
    title: "CONTACT PERSON",
    dataIndex: "contact_person",
    key: "contact_person"
  },
  {
    title: "CONTACT NUMBER",
    dataIndex: "contact_number",
    key: "contact_number"
  },
  {
    title: "TIN NO.",
    dataIndex: "tin",
    key: "tin"
  }
];

const columns2 = [
  {
    title: "ADDRESS",
    dataIndex: "address",
    key: "address",
    width: 250
  },
  {
    title: "DESCRIPTION",
    dataIndex: "description",
    key: "description",
    width: 250
  },
  {
    title: "EMAIL ADDRESS",
    dataIndex: "email_address",
    key: "email_address",
    width: 150
  }
];

const data1 = [
  {
    key: "1",
    address: "Makati City",
    description: "NCR",
    email_address: "juandelacruz@myherohub.com",
    width: 250
  },
  {
    key: "2",
    address: "Taguig City",
    description: "NCR",
    email_address: "juandelacruz@myherohub.com",
    width: 250
  },
  {
    key: "3",
    address: "Pasay City",
    description: "NCR",
    email_address: "juandelacruz@myherohub.com",
    width: 150
  }
];

const data2 = [
  {
    key: "1",
    address: "Makati City",
    description: "NCR",
    email_address: "juandelacruz@myherohub.com",
    width: 250
  },
  {
    key: "2",
    address: "Taguig City",
    description: "NCR",
    email_address: "juandelacruz@myherohub.com",
    width: 250
  },
  {
    key: "3",
    address: "Pasay City",
    description: "NCR",
    email_address: "juandelacruz@myherohub.com",
    width: 150
  }
];

const expandedRow = row => {
  console.log(row);
  // eslint-disable-next-line prefer-const
  // eslint-disable-next-line no-nested-ternary
  const inTable = row.key === 1 ? data1 : row.key === 2 ? data2 : data1;
  return <AntTable columns={columns2} dataSource={inTable} pagination={false} />;
};

class InventorySupplierTemplate extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          key: "1",
          supplier_name: "Supplier 1",
          contact_person: "John Brown",
          contact_number: "123456",
          tin: "10000100101001"
        },
        {
          key: "2",
          supplier_name: "Supplier 2",
          contact_person: "Mc Kinley",
          contact_number: "123456",
          tin: "10000100101001"
        },
        {
          key: "3",
          supplier_name: "Supplier 3",
          contact_person: "King Chow",
          contact_number: "123456",
          tin: "10000100101001"
        }
      ],
      usersRef: [
        {
          key: "1",
          supplier_name: "Supplier 1",
          contact_person: "John Brown",
          contact_number: "123456",
          tin: "10000100101001"
        },
        {
          key: "2",
          supplier_name: "Supplier 2",
          contact_person: "Mc Kinley",
          contact_number: "123456",
          tin: "10000100101001"
        },
        {
          key: "3",
          supplier_name: "Supplier 3",
          contact_person: "King Chow",
          contact_number: "123456",
          tin: "10000100101001"
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
      drawerTitle: drawerSupplierUpdate,
      drawerButton: buttonLabels.update,
      actionType: "update",
      panelInfo: record
    });
  };

  displayDrawerAdd = record => {
    this.setState({
      isDrawerVisible: true,
      drawerTitle: drawerSupplierAdd,
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
      const { supplier_name, contact_person, contact_number } = item;

      return (
        this.containsString(supplier_name, searchedVal) ||
        this.containsString(contact_person, searchedVal) ||
        this.containsString(contact_number, searchedVal)
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
                    <Icon type="plus" />
                    {addSupplierButton}
                  </AntButton>
                  <TablePager handleChange={this.handleSelectChange} />
                </AntCol>
              </AntRow>
            </div>
            <AntTable
              expandedRowRender={expandedRow}
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
              width="70%"
              destroyOnClose
            >
              <SupplierForm
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

const InventorySupplier = AntForm.create()(InventorySupplierTemplate);

export default InventorySupplier;
