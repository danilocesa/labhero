import React from 'react';
import PropTypes from 'prop-types';
import { Table as AntTable } from 'antd';

import './table.css';

const columns = [
  {
    title: 'LAST NAME',
    dataIndex: 'lastname',
    sorter: (a, b) => a.lastname.localeCompare(b.lastname),
  },
  {
    title: 'FIRST NAME',
    dataIndex: 'firstname',
    sorter: (a, b) => a.firstname.localeCompare(b.firstname),
  },
  {
    title: 'MIDDLE NAME',
    dataIndex: 'middlename',
    sorter: (a, b) => a.middlename.localeCompare(b.middlename),
  },
  {
    title: 'DATE OF BIRTH',
    dataIndex: 'birthday',
    sorter: (a, b) => a.birthday.localeCompare(b.birthday),
  },
  {
    title: 'GENDER',
    dataIndex: 'gender',
    sorter: (a, b) => a.gender.localeCompare(b.gender),
  },
  {
    title: 'CITY ADDRESS',
    dataIndex: 'address',
    sorter: (a, b) => a.address.localeCompare(b.address),
  },
];


function onChange(pagination, filters, sorter) {
  console.log('params', pagination, filters, sorter);
}

class Table extends React.Component {
  handleDoubleClick = () => {
    
  }
  
  render() {
    const { data, pageSize } = this.props;

    return (
      <div className="search-patient-table">
        <AntTable 
          pagination={{pageSize}} 
          columns={columns} 
          dataSource={data} 
          onChange={onChange} 
          onRow={(record) => {
            return { 
              onDoubleClick: this.handleDoubleClick
            };
          }}
        />
      </div>
    );
  }
}

Table.propTypes = {
  data: PropTypes.shape({
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    middlename: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired
  }).isRequired,
  pageSize: PropTypes.number.isRequired
};

export default Table;
