import React from 'react';
import { Row, Col, } from 'antd';

import WrappedSearchLabTestForm from './search_form';
import WrapperSearchLabTestResultList from './search_result';

class SearchLabTestResult extends React.Component {
    render() {
      return (
        <Row type="flex" align="middle" justify="center">
          <Col xs={24}>
            <WrappedSearchLabTestForm />
            <WrapperSearchLabTestResultList />
          </Col>
        </Row>
      );
    }
}

export default SearchLabTestResult;