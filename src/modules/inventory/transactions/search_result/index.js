// LIBRARY
import React from "react";
import { Spin, Table } from "antd";
import {
  globalTableSize,
  globalTableYScroll,
} from "global_config/constant-global";
import SearchPager from "shared_components/search_pager";
import {
  tableSize,
  tableYScroll,
  tablePageSize,
} from "modules/inventory/settings/settings";
const columns = [
  {
    title: "TRANS DATE",
    dataIndex: "a",
    width: 150,
  },
  {
    title: "DR No.",
    dataIndex: "b",
    width: 100,
  },
  {
    title: "ITEM NAME",
    dataIndex: "c",
    width: 250,
    ellipsis: true,
  },
  {
    title: "SUPPLIER",
    dataIndex: "d",
    width: 150,
  },
  {
    title: "STORAGE",
    dataIndex: "e",
    width: 150,
  },
  {
    title: "SECTION",
    dataIndex: "f",
    width: 150,
  },
  {
    title: "EXPIRATION DATE",
    dataIndex: "g",
    ellipsis: true,
  },
  {
    title: "PRICE",
    dataIndex: "h",
    width: 100,
  },
  {
    title: "QUANTITY",
    dataIndex: "i",
    width: 100,
  },
  {
    title: "TRANSACTION TYPE",
    dataIndex: "j",
    width: 150,
  },
];

const data = [
  {
    a: "04/30/2019",
    b: "ASDF",
    c: "CELL LYSE",
    d: "BIOSITE",
    e: "STORAGE ROOM",
    f: "HEMATOLOGY",
    g: "05/30/2019 2:36:43 AM",
    h: "25,000",
    i: "400",
    j: "RESTOCK",
  },
  {
    a: "04/30/2019",
    b: "ASDF",
    c: "CELL LYSE",
    d: "BIOSITE",
    e: "STORAGE ROOM",
    f: "HEMATOLOGY",
    g: "05/30/2019 2:36:43 AM",
    h: "25,000",
    i: "400",
    j: "RESTOCK",
  },
  {
    a: "04/30/2019",
    b: "ASDF",
    c: "CELL LYSE",
    d: "BIOSITE",
    e: "STORAGE ROOM",
    f: "HEMATOLOGY",
    g: "05/30/2019 2:36:43 AM",
    h: "25,000",
    i: "400",
    j: "RESTOCK",
  },
  {
    a: "04/30/2019",
    b: "ASDF",
    c: "CELL LYSE",
    d: "BIOSITE",
    e: "STORAGE ROOM",
    f: "HEMATOLOGY",
    g: "05/30/2019 2:36:43 AM",
    h: "25,000",
    i: "400",
    j: "RESTOCK",
  },
  {
    a: "04/30/2019",
    b: "ASDF",
    c: "CELL LYSE",
    d: "BIOSITE",
    e: "STORAGE ROOM",
    f: "HEMATOLOGY",
    g: "05/30/2019 2:36:43 AM",
    h: "25,000",
    i: "400",
    j: "RESTOCK",
  },
  {
    a: "04/30/2019",
    b: "ASDF",
    c: "CELL LYSE",
    d: "BIOSITE",
    e: "STORAGE ROOM",
    f: "HEMATOLOGY",
    g: "05/30/2019 2:36:43 AM",
    h: "25,000",
    i: "400",
    j: "RESTOCK",
  },
  {
    a: "04/30/2019",
    b: "ASDF",
    c: "CELL LYSE",
    d: "BIOSITE",
    e: "STORAGE ROOM",
    f: "HEMATOLOGY",
    g: "05/30/2019 2:36:43 AM",
    h: "25,000",
    i: "400",
    j: "RESTOCK",
  },
  {
    a: "04/30/2019",
    b: "ASDF",
    c: "CELL LYSE",
    d: "BIOSITE",
    e: "STORAGE ROOM",
    f: "HEMATOLOGY",
    g: "05/30/2019 2:36:43 AM",
    h: "25,000",
    i: "400",
    j: "RESTOCK",
  },
];

class SearchResultTable extends React.Component {
  handleSelectChange = (value) => {
    console.log(value);
    const { pagination } = this.state;
    // eslint-disable-next-line radix
    pagination.pageSize = parseInt(value);
    this.setState({ pagination });
  };

  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <Spin spinning={false} tip="Loading...">
          <SearchPager
            pageSize={tablePageSize}
            pageTotal={data.length}
            handleChange={this.handleSelectChange}
          />
          <Table
            // @ts-ignore
            size="medium"
            columns={columns}
            dataSource={data}
            scroll={{ x: 1500, y: globalTableYScroll }}
            rowKey={(record) => record.examItemID}
          />
        </Spin>
      </div>
    );
  }
}

export default SearchResultTable;
