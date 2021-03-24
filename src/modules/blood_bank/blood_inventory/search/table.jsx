import React, { useState } from 'react';
import { Table } from 'antd';

const columns = [
  {
    title: "BAG ID",
    dataIndex: "blood_bag",
    key: "blood_bag",
  },
  {
    title: "BLOOD TYPE",
    dataIndex: "blood_type_name",
    key: "blood_type_name",
  },
  {
    title: "STORAGE",
    dataIndex: "storage_name",
    key: "storage_name",
  },
  {
    title: "DATE EXTRACTED",
    dataIndex: "created_date",
    key: "created_date",
  },
  {
    title: "EXPIRATION DATE",
    dataIndex: "expiration_date",
    key: "expiration_date",
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
      rowKey={(record) => record.blood_bag}
      onRow={(record) => {
        return {
          onDoubleClick: () => {
            displayDrawerUpdate(record.blood_inventory_id);
          },
        };
      }}
    />
  );
}

export default SearchTable;