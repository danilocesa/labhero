import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainLayout from './shared_components/layout';
import Login from './modules/login';
import SearchLabTestResult from './modules/main/search_lab_result';
import PatientInfo from './modules/main/patientinfo';
<<<<<<< HEAD
import ErrorPage from './modules/error_page';
import SearchPleboResult from './modules/main/plebo';
=======
import Iresults from './modules/main/iresults';
>>>>>>> 821d2e54775dc37fa91482c6c85a902bd941bc25

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
          <Route path="/pleboresult" component={SearchPleboResult} />
        </Switch>
      </Router>
    );
  }
}


export default App;
