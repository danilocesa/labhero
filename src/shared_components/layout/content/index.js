import React from 'react';
import { Layout } from 'antd';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';

import DashboardPage from '../../../modules/main/dashboard';
import CreateRequestPage from '../../../modules/main/request/create';
import SearchLabTestResult from '../../../modules/main/search_lab_result';
import PatientInfo from '../../../modules/main/patientinfo';
import SearchPleboResult from '../../../modules/main/plebo'

const { Content: Antcontent } = Layout;

const wrapperStyle = {
  minHeight: 280,
  background: 'white',
  width: '100%',
  padding: 24
};

const Content = (props) => (
  <Antcontent style={wrapperStyle}>
    <Switch>
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/request/create" component={CreateRequestPage} />
      <Route path="/searchlabresult" component={SearchLabTestResult} />
      <Route path="/patientinfo" component={PatientInfo} />
      <Route path="/pleboresult" component={SearchPleboResult} />
      <Redirect from="/" to="/dashboard"/>
    </Switch>
  </Antcontent>
);

export default withRouter(Content);
