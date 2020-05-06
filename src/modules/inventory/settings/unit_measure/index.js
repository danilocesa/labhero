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
  drawerUnitUpdate,
  drawerUnitAdd,
  tableSize,
  buttonLabels,
  addUnitMeasure,
  tableYScroll
} from "modules/inventory/settings/settings";
import UnitForm from "./unit_form/unit_form";

// CUSTOM MODULES


//  CONSTANTS
const { Search } = Input;



const columns = [
  {
    title: "UNIT NAME",
    dataIndex: "unit_name",
    key: "unit_name",
    width: 250,
    sorter: (a, b) => a.unit_name.localeCompare(b.unit_name)
  },
  {
    title: "UNIT SYMBOL",
    dataIndex: "symbol",
    key: "symbol",
    width: 150,
    sorter: (a, b) => a.symbol.localeCompare(b.symbol)
  }
];

class UnitofMeasureTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          key: "1",
          unit_name: "Liter",
          symbol: "Symbol 1"
        },
        {
          key: "2",
          unit_name: "Galon",
          symbol: "Symbol 2"
        },
        {
          key: "3",
          unit_name: "Box",
          symbol: "Symbol 3"
        }
      ],
      usersRef: [
        {
          key: "1",
          unit_name: "Liter",
          symbol: "Symbol 1"
        },
        {
          key: "2",
          unit_name: "Galon",
          symbol: "Symbol 2"
        },
        {
          key: "3",
          unit_name: "Box",
          symbol: "Symbol 3"
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
      drawerTitle: drawerUnitUpdate,
      drawerButton: buttonLabels.update,
      actionType: "update",
      panelInfo: record
    });
  };

  displayDrawerAdd = record => {
    this.setState({
      isDrawerVisible: true,
      drawerTitle: drawerUnitAdd,
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
      const { unit_name, symbol } = item;

      return (
        this.containsString(unit_name, searchedVal) ||
        this.containsString(symbol, searchedVal) 
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
                    {addUnitMeasure}
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
              <UnitForm
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

const UnitofMeasure = AntForm.create()(UnitofMeasureTemplate);

export default UnitofMeasure;
