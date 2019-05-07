import React from 'react';
import { Table as AntTable } from 'antd';

import './table.css';

const columns = [
  {
    title: 'LAST NAME',
    dataIndex: 'lastname',
    sorter: (a, b) => a.lastname.length - b.lastname.length,
  },
  {
    title: 'FIRST NAME',
    dataIndex: 'firstname',
    sorter: (a, b) => a.firstname.length - b.firstname.length,
  },
  {
    title: 'MIDDLE NAME',
    dataIndex: 'middlename',
    sorter: (a, b) => a.middlename.length - b.middlename.length,
  },
  {
    title: 'DATE OF BIRTH',
    dataIndex: 'birthday',
    sorter: (a, b) => a.birthday.length - b.birthday.length,
  },
  {
    title: 'GENDER',
    dataIndex: 'gender',
    sorter: (a, b) => a.gender.length - b.gender.length,
  },
  {
    title: 'CITY ADDRESS',
    dataIndex: 'address',
    sorter: (a, b) => a.address.length - b.address.length,
  },
];

const data = [
  // {
  //   key: '1',
  //   lastname: 'Ramos',
  //   firstname: 'Juana',
  //   middlename: 'D',
  //   birthday: '10-08-1973',
  //   gender: 'FEMALE',
  //   address: '3656 calle de argumosa cartagena asturias'
  // },
  // {
  //   key: '2',
  //   lastname: 'Hedal',
  //   firstname: 'Rolf',
  //   middlename: 'G',
  //   birthday: '11-12-1975',
  //   gender: 'MALE',
  //   address: 'ljan terrasse 346 vear rogaland'
  // },
  // {
  //   key: '3',
  //   lastname: 'Johnson',
  //   firstname: 'Karl',
  //   middlename: 'S',
  //   birthday: '12-25-1989',
  //   gender: 'MALE',
  //   address: '6057 avondale ave new orleans new york'
  // }
];

function onChange(pagination, filters, sorter) {
  console.log('params', pagination, filters, sorter);
}

class Table extends React.Component {
  render() {
    return (
      <div className="search-patient-table">
        <AntTable columns={columns} dataSource={data} onChange={onChange} />
      </div>
    );
  }
}

export default Table;
