// LIBRARY
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import IdleTimerComponent from 'shared_components/idle_timer';
// CUSTOM MODULES
import MainLayout from './shared_components/layout';
import Login from './modules/login';

// CSS
import './App.css';

class App extends Component {
	render() {
		return (
			<div>
				<IdleTimerComponent />
				<Router>
					<Switch>
						<Route exact path="/login" component={Login} />
						<Route path="/" component={MainLayout} />
					</Switch>
				</Router>
			</div>
		);
	}
}


export default App;
