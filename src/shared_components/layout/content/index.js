// LIBRARY
import React from 'react';
import { Layout } from 'antd';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

// CUSTOM MODULES
import Login from 'modules/login';
import DashboardPage from 'modules/main/dashboard';
import CreateRequestPage from 'modules/main/lab_request/create';
import SearchLabTestResult from 'modules/main/search_lab_result';
import PatientInfo from 'modules/main/patientinfo';
import PhleboSearch from 'modules/main/phlebo'
import Iresults from 'modules/main/iresults';
import PhleboPatientResult from 'modules/main/phlebo/phlebopatient'
import ErrorPage from 'modules/error_page';
import SearchPatient from 'modules/main/search_patients';
import Settings from 'modules/main/settings';
import Notifications from 'modules/main/inventory/notifications';
import auth from 'services/auth';

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
			<PrivateRoute path="/phleboresult" component={PhleboSearch} />
			<PrivateRoute path="/phlebopatient" component={PhleboPatientResult} />
			{/* Search patients route */}
			<PrivateRoute path="/searchpatient" component={SearchPatient} />
			<PrivateRoute path="/settings" component={Settings} />
			<PrivateRoute path="/inventory/notifications" component={Notifications} />
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
    	auth.isAuthenticated ? ( <Component {...props} />) 
			: 
			( <Redirect to={{pathname: "/login", state: { from: props.location }}} /> )
  	}
	/>
  );
}

export default withRouter(Content);
