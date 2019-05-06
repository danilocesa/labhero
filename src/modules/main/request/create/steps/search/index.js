import React from 'react';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';

import Tracker from '../../tracker';
import SearchForm from './form';
import TableHeader from './table_header';
import Table from './table';

class SearchStep extends React.Component {
  render() {
    return (
      <div>
        <Tracker />
        <div style={{ marginTop: 60 }}>
          <SearchForm />
          <TableHeader />
          <Table />
        </div>
        <div style={{ textAlign: 'center', marginTop: 15 }}>
          <Link to="/request/create/step/2">
            <Icon type="plus" /> CREATE REQUEST
          </Link>
        </div>
      </div>
    );
  }
}



export default SearchStep;