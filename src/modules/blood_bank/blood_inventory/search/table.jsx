import React, { useState } from 'react';
import { Table } from 'antd';

const columns = [
  {
    title: "BAG ID",
    dataIndex: "bag_id",
    key: "bag_id",
  },
  {
    title: "BLOOD TYPE",
    dataIndex: "blood_type",
    key: "blood_type",
  },
  {
    title: "STORAGE",
    dataIndex: "storage",
    key: "storage",
  },
  {
    title: "DATE EXTRACTED",
    dataIndex: "date_extracted",
    key: "date_extracted",
  },
  {
    title: "EXPIRATION DATE",
    dataIndex: "expiry_date",
    key: "expiry_date",
  },
];

function SearchTable(props){
  const { data, pageSize, loading, displayDrawerUpdate } = props;

  return (
    <Table
      style={{ textTransform: "uppercase" }}
      dataSource={data}
      pagination={{ pageSize }}
      loading={loading}
      columns={columns}
      rowKey={(record) => record.userID}
      onRow={(record) => {
        return {
          onDoubleClick: () => {
            displayDrawerUpdate(record);
          },
        };
      }}
    />
  );
}

export default SearchTable;