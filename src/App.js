import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainLayout from './shared_components/layout';
import Login from './modules/login';
import SearchLabTestResult from './modules/main/search_lab_result';
import PatientInfo from './modules/main/patientinfo';

import ErrorPage from './modules/error_page';
import PleboSearch from './modules/main/plebo';
import Iresults from './modules/main/iresults';

import PleboPatientResult from './modules/main/plebo/plebopatient';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/searchlabresult" component={SearchLabTestResult} />
          <Route path="/patientinfo" component={PatientInfo} />
          <Route path="/" component={MainLayout} />
          <Route path="/errorpage" component={ErrorPage} />
          <Route path="/pleboresult" component={PleboSearch} />
          <Route path="/iresults" component={Iresults} />
          <Route path="/plebopatient" component={PleboPatientResult} />
        </Switch>
      </Router>
    );
  }
}


export default App;
