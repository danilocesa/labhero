// LIBRARY
import React from 'react';
// import PropTypes from 'prop-types';
import { Layout } from 'antd';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

// CUSTOM MODULES
import Login from 'modules/login';
import DashboardPage from 'modules/main/dashboard';
import CreateRequestPage from 'modules/main/lab_request/create';
import EditRequestPage from 'modules/main/lab_request/edit';
import EditLabResult from 'modules/main/lab_result/searching_result/result_for_edit';
import PrintLabResult from 'modules/main/lab_result/searching_result/result_for_print';
import PatientInfo from 'modules/main/lab_result/editing_result';
import PhleboSearch from 'modules/main/phlebo'
import Iresults from 'modules/main/iresults';
import PhleboPatientResult from 'modules/main/phlebo/patient_phlebo_info'
import ErrorPage from 'modules/error_page';
import SearchPatient from 'modules/main/patient_demographics';
import Settings from 'modules/main/settings';
import Inventory from 'modules/main/inventory';
import BloodBank from 'modules/main/blood_bank';
import Cashier from 'modules/main/cashier';
import Receipt from 'modules/main/cashier/receipt';
import Transactions from 'modules/main/cashier/transactions';
import auth from 'services/login/auth';

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
				<PrivateRoute path="/request/edit" component={EditRequestPage} />
				{/* Search lab result route */}
				<PrivateRoute path="/lab/result/edit" component={EditLabResult} />
				<PrivateRoute path="/lab/result/print" component={PrintLabResult} />
				<PrivateRoute path="/patientinfo" component={PatientInfo} />
				<PrivateRoute path="/iresults" component={Iresults} />
				{/* Phlebo route */}
				<PrivateRoute path="/phlebo/result" component={PhleboSearch} />
				<PrivateRoute path="/phlebo/patient" component={PhleboPatientResult} />
				{/* Search patients route */}
				<PrivateRoute path="/patient/search" component={SearchPatient} />
				{/* Settings route */}
				<PrivateRoute path="/settings" component={Settings} />
				{/* Inventory route */}
				<PrivateRoute path="/inventory" component={Inventory} />
				{/* 404 page route */}
				<PrivateRoute path="/bloodbank" component={BloodBank} />
				<PrivateRoute path="/cashier" component={Cashier} />
				<PrivateRoute path="/receipt" component={Receipt} />
				<PrivateRoute path="/transactions" component={Transactions} />
				<Route component={ErrorPage} />
			</Switch>
		</Antcontent>
);


// eslint-disable-next-line react/prop-types
function PrivateRoute({ component: Component, ...rest }) {
  return (
		<Switch>
			<Route
				{...rest}
				render={
					props =>
						auth.isAuthenticated 
						? (<Component {...props} />) 
						: (<Redirect to={{pathname: "/login", state: { from: props.location }}} />)
				}
			/>
		</Switch>
  );
}

// PrivateRoute.propTypes = {
// 	location: PropTypes.object
// }

// PrivateRoute.defaultProps = {
// 	location() { return null }
// }



export default withRouter(Content);
