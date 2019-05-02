import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainLayout from './shared_components/layout';
import Login from './modules/login';
import SearchLabTestResult from './modules/main/search_lab_result';
import PatientInfo from './modules/main/patientinfo';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={MainLayout} />
          <Route  path="/login" component={Login} /> 
          <Route  path="/searchlabresult" component={SearchLabTestResult} /> 
          <Route  path="/patientinfo" component={PatientInfo} /> 
        </Switch>
      </Router>
    );
  }
}

export default App;
