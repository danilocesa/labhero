// LIBRARY
import React from 'react';
import { Layout } from 'antd';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

// CUSTOM MODULES
import Login from 'modules/login';
import DashboardPage from '../../../modules/main/dashboard';
import CreateRequestPage from '../../../modules/main/lab_request/create';
import SearchLabTestResult from '../../../modules/main/search_lab_result';
import PatientInfo from '../../../modules/main/patientinfo';
import PleboSearch from '../../../modules/main/plebo'
import Iresults from '../../../modules/main/iresults';
import PleboPatientResult from '../../../modules/main/plebo/plebopatient'
import ErrorPage from '../../../modules/error_page';
import SearchPatient from '../../../modules/main/search_patients';
import checkAuth from '../../auth';

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
			{/* Login */}
			<Route path="/login" component={Login} />
			<Route path="/dashboard" component={DashboardPage} />
			{/* Lab request route */}
			<PrivateRoute path="/request/create" component={CreateRequestPage} />
			{/* Search lab result route */}
			<PrivateRoute path="/searchlabresult" component={SearchLabTestResult} />
			{/* <Route path="/searchlabresult" component={SearchLabTestResult} /> */}
			<PrivateRoute path="/patientinfo" component={PatientInfo} />
			<PrivateRoute path="/iresults" component={Iresults} />
			{/* Phlebo route */}
			<PrivateRoute path="/pleboresult" component={PleboSearch} />
			<PrivateRoute path="/plebopatient" component={PleboPatientResult} />
			{/* Search patients route */}
			<PrivateRoute path="/searchpatient" component={SearchPatient} />
			{/* 404 page route */}
			<Route component={ErrorPage} />
		</Switch>
	</Antcontent>
);


// eslint-disable-next-line react/prop-types
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
