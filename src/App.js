// LIBRARY
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// CUSTOM MODULES
import MainLayout from './shared_components/layout';
import Login from './modules/login';
import SearchPatients from './modules/main/search_patients'

// CSS
import './App.css';

class App extends Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/login" component={Login} />
					<Route path="/" component={MainLayout} />
					<Route path="/searchpatient" component={SearchPatients} />
				</Switch>
			</Router>
		);
	}
}


export default App;
