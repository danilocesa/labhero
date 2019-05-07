import React from 'react';
import { Row, Col } from 'antd';

import WrappedSearchLabTestForm from './search_form';
import SearchLabTestResultList from './search_result';

class SearchLabTestResult extends React.Component {
  render() {
    return (
      <Row type="flex" align="middle" justify="center">
        <Col xs={22}>
          <WrappedSearchLabTestForm />
          <SearchLabTestResultList />
        </Col>
      </Row>
    );
  }
}

export default SearchLabTestResult;
