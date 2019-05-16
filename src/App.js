// LIBRARY
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// CUSTOM MODULES
import MainLayout from './shared_components/layout';
import Login from './modules/login';

// CSS
import './App.css';

class App extends Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route path="/login" component={Login} />
					<Route path="/" component={MainLayout} />
				</Switch>
			</Router>
		);
	}
}


export default App;
