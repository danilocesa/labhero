import React, { Component } from 'react';
import {
    Table as AntTable
  } from "antd";

  import {
    tableSize,
    tableYScroll
  } from "modules/inventory/settings/settings";

  const columns = [
    {
      title: "ITEM",
      dataIndex: "item",
      key: "item",
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

export class InventoryListTable extends Component {
    constructor(props) {
    super(props);
    this.state = {
        data: [
          {
            key: "1",
            quantity: 1,
            threshold: "John Brown",
            item: "New York No. 1 Lake Park"
          },
          {
            key: "2",
            quantity: 2,
            threshold: "Jim Green",
            item: "London No. 1 Lake Park"
          },
          {
            key: "3",
            quantity: 3,
            threshold: "Joe Black",
            item: "Sidney No. 1 Lake Park"
          }
        ]
      };
    }

    render() {
        return (
            <AntTable
              className="settings-panel-table"
              size={tableSize}
              scroll={{ y: tableYScroll }}
              dataSource={this.state.data}
              pagination={this.state.pagination}
              loading={this.state.loading}
              columns={columns}
              style={{ textTransform: "uppercase" }}
            />
        )
    }
}

export default InventoryListTable
