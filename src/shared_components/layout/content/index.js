import React from 'react';
import { Layout } from 'antd';
import { Route, withRouter } from 'react-router-dom';

import Dashboard from '../../../modules/main/dashboard';
import SearchLabTestResult from '../../../modules/main/search_lab_result';

const { Content: Antcontent } = Layout;

const wrapperStyle = {
  minHeight: 280,
  background: 'white',
  width: '100%',
  padding: 24
};

const Content = (props) => (
  <Antcontent style={wrapperStyle}>
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/searchlabresult" component={SearchLabTestResult} />
  </Antcontent>
);

export default withRouter(Content);
