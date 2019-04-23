import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainLayout from './modules/main/layout';
import Login from './modules/login';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={MainLayout} />
          <Route  path="/login" component={Login} /> 
        </Switch>
      </Router>
    );
  }
}

export default App;
