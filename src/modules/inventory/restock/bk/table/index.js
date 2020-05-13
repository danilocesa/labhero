// LIBRARY
import React from "react";
import { Spin, Table, Drawer } from "antd";
// import {
// 	tableYScroll
// } from "global_config/constant-global";

import {
  drawerTakeoutUpdate,
  tableSize,
  buttonLabels,
  tableYScroll
} from "modules/inventory/settings/settings";

import TakeoutForm from "../Takeout_form";

const columns = [
	{
	  title: "LOT CODE",
	  dataIndex: "lot_code",
	  width: 150
	},
	{
	  title: "ITEM",
	  dataIndex: "item",
	  width: 250
	},
	{
	  title: "QUANTITY",
	  dataIndex: "quantity",
	  width: 150
	},
	{
	  title: "AMOUNT",
	  dataIndex: "amount",
	  width: 150
	},
	{
	  title: "EXPIRATION DATE",
	  dataIndex: "expiry_date",
	  width: 150
	},
	{
	  title: "STORAGE",
	  dataIndex: "storage",
	  width: 150
	},
	{
	  title: "SUPPLIER",
	  dataIndex: "supplier",
	  width: 150
	}
  ];

class TakeoutTable extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			data: []
		};
	  }

  displayDrawerUpdate = record => {
    this.setState({
      isDrawerVisible: true,
      drawerTitle: drawerTakeoutUpdate,
      drawerButton: buttonLabels.update,
      panelInfo: record
    });
  };

  onChange = value => {
    console.log(value);
    this.setState({ value });
  };

  onClose = () => {
    this.setState({
      isDrawerVisible: false
    });
  };

  render() {
    return (
      <div style={{ marginTop: 20 }} className="settings-exam-item-table">
        <Spin spinning={false} tip="Loading...">
          <Table
            style={{ textTransform: "uppercase" }}
            size={tableSize}
            columns={columns}
            // eslint-disable-next-line react/prop-types
            dataSource={this.state.data}
            scroll={{ y: tableYScroll }}
            rowKey={record => record.examItemID}
            onRow={record => {
              return {
                onDoubleClick: () => {
                  this.displayDrawerUpdate(record);
                }
              };
            }}
          />
        </Spin>
        <Drawer
          title={this.state.drawerTitle}
          visible={this.state.isDrawerVisible}
          onClose={this.onClose}
          width="40%"
          destroyOnClose
        >
          <TakeoutForm
            // @ts-ignore
            drawerButton={this.state.drawerButton}
            panelInfo={this.state.panelInfo}
            onCancel={this.onClose}
          />
        </Drawer>
      </div>
    );
  }
}

export default TakeoutTable;
