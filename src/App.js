import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainLayout from './shared_components/layout';
<<<<<<< HEAD
=======
import Login from './modules/login';
import PatientInfo from './modules/main/patientinfo';
>>>>>>> 7291d3b3b1f501a7766f7fa8af8e75b294d7107e

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={MainLayout} />
          <Route  path="/login" component={Login} /> 
          <Route  path="/patientinfo" component={PatientInfo} /> 
        </Switch>
      </Router>
    );
  }
}

export default App;
