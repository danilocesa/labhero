
import React, { Component } from 'react';
import { Router, Route, Switch  } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Installer from 'modules/installer';
import PrintPreview from 'modules/main/lab_result/print_result/raw';
import IdleTimerComponent from 'shared_components/idle_timer';
import PrivateRoute from 'shared_components/private_route';
import MainLayout from './shared_components/layout';

// CSS
import './App.css';

const history = createBrowserHistory({ basename: process.env.PUBLIC_URL });

class App extends Component {
	render() {
		return (
			<div>
				<IdleTimerComponent />
				<Router history={history}>
					<Switch>
						<Route path="/installer" component={Installer} />
						<PrivateRoute exact path="/lab/result/print/:requestID/:sampleID" component={PrintPreview} />
						<Route path="/" component={MainLayout} />
					</Switch>
				</Router>
			</div>
		);
	}
}


export default App;
