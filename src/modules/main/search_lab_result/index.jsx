import React from 'react';
import { Row, Col, } from 'antd';

import SearchLabTestForm from './search_form';
import SearchLabTestResultList from './search_result';

class SearchLabTestResult extends React.Component {
    render() {
      return (
        <Row type="flex" align="center">
          <Col span={20}>
            <SearchLabTestForm />
            <SearchLabTestResultList />
          </Col>
        </Row>
      );
    }
}

export default SearchLabTestResult;