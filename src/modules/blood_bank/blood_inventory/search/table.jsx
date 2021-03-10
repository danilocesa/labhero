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
      rowKey={(record) => record.blood_bag}
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