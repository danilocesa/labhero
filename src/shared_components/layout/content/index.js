import React from 'react';
import { Layout } from 'antd';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';

import DashboardPage from '../../../modules/main/dashboard';
import CreateRequestPage from '../../../modules/main/request/create';
import SearchLabTestResult from '../../../modules/main/search_lab_result';
import PatientInfo from '../../../modules/main/patientinfo';
import PleboSearch from '../../../modules/main/plebo'
import Iresults from '../../../modules/main/iresults';
import PleboPatientResult from '../../../modules/main/plebo/plebopatient'

const { Content: Antcontent } = Layout;

const wrapperStyle = {
  minHeight: 280,
  background: 'white',
  width: '100%',
  padding: 24,
};

const Content = () => (
  <Antcontent style={wrapperStyle}>
    <Switch>
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/request/create" component={CreateRequestPage} />
      <Route path="/searchlabresult" component={SearchLabTestResult} />
      <Route path="/patientinfo" component={PatientInfo} />
<<<<<<< HEAD
      <Route path="/pleboresult" component={SearchPleboResult} />
      <Route  path="/iresults" component={Iresults} />
      <Redirect from="/" to="/dashboard"/>
=======
      <Route path="/pleboresult" component={PleboSearch} />
      <Route path="/iresults" component={Iresults} />
      <Route path="/plebopatient" component={PleboPatientResult} />
      <Redirect from="/" to="/dashboard" />
>>>>>>> pleboresult
    </Switch>
  </Antcontent>
);

export default withRouter(Content);
