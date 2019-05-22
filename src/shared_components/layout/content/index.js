// LIBRARY
import React from 'react';
import { Layout } from 'antd';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

// CUSTOM MODULES
import DashboardPage from '../../../modules/main/dashboard';
import CreateRequestPage from '../../../modules/main/lab_request/create';
import SearchLabTestResult from '../../../modules/main/search_lab_result';
import PatientInfo from '../../../modules/main/patientinfo';
import PleboSearch from '../../../modules/main/plebo'
import Iresults from '../../../modules/main/iresults';
import PleboPatientResult from '../../../modules/main/plebo/plebopatient'
import ErrorPage from '../../../modules/error_page';

// CONSTANTS
const { Content: Antcontent } = Layout;
const wrapperStyle = {
  minHeight: 280,
  background: 'white',
  width: '100%',
  padding: 24,
};

const Content = () => (
	<Antcontent style={wrapperStyle}>
		<Switch>
			<Route exact path="/" component={DashboardPage} />
			<Route path="/dashboard" component={DashboardPage} />
			{/* Lab request route */}
			<Route path="/request/create" component={CreateRequestPage} />
			{/* Search lab result route */}
			<PrivateRoute path="/searchlabresult" component={SearchLabTestResult} />
			{/* <Route path="/searchlabresult" component={SearchLabTestResult} /> */}
			<Route path="/patientinfo" component={PatientInfo} />
			<Route path="/iresults" component={Iresults} />
			{/* Plebo route */}
			<Route path="/pleboresult" component={PleboSearch} />
			<Route path="/plebopatient" component={PleboPatientResult} />
			{/* 404 page route */}
			<Route component={ErrorPage} />
			
		</Switch>
	</Antcontent>
);

const checkAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

function PrivateRoute({ component: Component, ...rest }) {
  return (
	<Route
		{...rest}
		render={
			props =>
    	checkAuth.isAuthenticated ? ( <Component {...props} />) 
			: 
			( <Redirect to={{pathname: "/login", state: { from: props.location }}} /> )
  	}
	/>
  );
}

export default withRouter(Content);
