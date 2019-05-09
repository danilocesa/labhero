import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Table as AntTable } from 'antd';

import './table.css';

const columns = [
  {
    title: 'LAST NAME',
    dataIndex: 'lastname',
    sorter: (a, b) => a.lastname.localeCompare(b.lastname),
    width: '15%'
  },
  {
    title: 'FIRST NAME',
    dataIndex: 'firstname',
    sorter: (a, b) => a.firstname.localeCompare(b.firstname),
    width: '15%'
  },
  {
    title: 'MIDDLE NAME',
    dataIndex: 'middlename',
    sorter: (a, b) => a.middlename.localeCompare(b.middlename),
    width: '12%'
  },
  {
    title: 'DATE OF BIRTH',
    dataIndex: 'birthday',
    sorter: (a, b) => a.birthday.localeCompare(b.birthday),
    width: '15%'
  },
  {
    title: 'GENDER',
    dataIndex: 'gender',
    sorter: (a, b) => a.gender.localeCompare(b.gender),
    width: '8%'
  },
  {
    title: 'CITY ADDRESS',
    dataIndex: 'address',
    sorter: (a, b) => a.address.localeCompare(b.address),
  },
];


class Table extends React.Component {
  handleDoubleClick = (record) => {
    const { history } = this.props;

    history.push('/request/create/step/2', { record });
  }
  
  render() {
    const { data, pageSize } = this.props;

    return (
      <div className="search-patient-table">
        <AntTable 
          pagination={{pageSize}} 
          columns={columns} 
          dataSource={data} 
          scroll={{ y: 260 }}
          onRow={(record) => {
            return { 
              onDoubleClick: () => this.handleDoubleClick(record)
            };
          }}
        />
      </div>
    );
  }
}

Table.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    middlename: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired
  })).isRequired,
  pageSize: PropTypes.number.isRequired
};

export default withRouter(Table);
