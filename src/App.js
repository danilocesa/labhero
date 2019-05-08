//LIBRARY
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//CUSTOM MODULES
import MainLayout from './shared_components/layout';
import Login from './modules/login';
import SearchLabTestResult from './modules/main/search_lab_result';
import PatientInfo from './modules/main/patientinfo';
import ErrorPage from './modules/error_page';
import PleboSearch from './modules/main/plebo';
import Iresults from './modules/main/iresults';
import PleboPatientResult from './modules/main/plebo/plebopatient';

//CSS
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" component={MainLayout} />
          <Route path="/login" component={Login} />
          {/* Search lab result route */}
          <Route path="/searchlabresult" component={SearchLabTestResult} />
          <Route path="/patientinfo" component={PatientInfo} />
          <Route path="/iresults" component={Iresults} />
          {/* Plebo route */}
          <Route path="/pleboresult" component={PleboSearch} />
          <Route path="/plebopatient" component={PleboPatientResult} />
          {/* 404 page route */}
          <Route component={ErrorPage} />
        </Switch>
      </Router>
    );
  }
}


export default App;
