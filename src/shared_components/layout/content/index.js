import React from 'react';
import { Layout } from 'antd';
import { Route, withRouter } from 'react-router-dom';

import DashboardPage from '../../../modules/main/dashboard';
import CreateRequestPage from '../../../modules/main/request/create';

const { Content: Antcontent } = Layout;

const wrapperStyle = {
  minHeight: 280,
  background: 'white',
  width: '100%',
  padding: 24
};

const Content = (props) => (
  <Antcontent style={wrapperStyle}>
    <Route path="/dashboard" component={DashboardPage} />
    <Route path="/request/create" component={CreateRequestPage} />
  </Antcontent>
);

export default withRouter(Content);
