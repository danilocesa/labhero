import React, { useContext } from 'react';
import { Layout } from 'antd';
import { Route, Switch, withRouter } from 'react-router-dom';

import { UserAccessContext } from 'context/userAccess';
import Login from 'modules/login';
import DashboardPage from 'modules/main/dashboard';
import CreateRequestPage from 'modules/main/lab_request/create';
import EditRequestPage from 'modules/main/lab_request/edit';
import ViewRequestPage from 'modules/main/lab_request/view';
import EditLabResult from 'modules/main/lab_result/searching_result/result_for_edit';
import PrintLabResult from 'modules/main/lab_result/searching_result/result_for_print';
import PatientInfo from 'modules/main/lab_result/editing_result';
import PhleboSearch from 'modules/main/phlebo'
import Iresults from 'modules/main/iresults';
import PhleboPatientResult from 'modules/main/phlebo/patient_phlebo_info'
import ErrorPage from 'modules/error_page';
import SearchPatient from 'modules/main/patient_demographics';
import Settings from 'modules/main/settings';
import Inventory from 'modules/inventory';
import BloodBank from 'modules/blood_bank';
import Cashier from 'modules/main/cashier';
import Receipt from 'modules/main/cashier/receipt';
import Transactions from 'modules/main/cashier/transactions';
import Categories from 'modules/main/cashier/categories';
import Summary from 'modules/main/cashier/summary';
import PrivateRoute from 'shared_components/private_route';

const { Content: Antcontent } = Layout;
const wrapperStyle = {
  minHeight: 280,
  background: 'white',
  width: '100%',
  padding: 24,
};

function Content() {
	const { userAccess } = useContext(UserAccessContext);

	return (
		<Antcontent style={wrapperStyle}>
			<Switch>
				<Route exact path="/" component={DashboardPage} />
				<Route path="/login" component={Login} />
				<Route path="/dashboard" component={DashboardPage} />
				<PrivateRoute 
					path="/request/create" 
					component={userAccess.request.create ? CreateRequestPage : ErrorPage}
				/>
				<PrivateRoute 
					path="/request/edit" 
					component={userAccess.request.update ? EditRequestPage: ErrorPage} 
				/>
				<PrivateRoute 
					path="/request/view" 
					component={userAccess.request.view ? ViewRequestPage : ErrorPage} 
				/> 
				<PrivateRoute path="/lab/result/edit" component={EditLabResult} />
				<PrivateRoute path="/lab/result/print" component={PrintLabResult} />
				<PrivateRoute path="/patientinfo" component={PatientInfo} />
				<PrivateRoute path="/iresults" component={Iresults} />
				<PrivateRoute path="/phlebo/result" component={PhleboSearch} />
				<PrivateRoute path="/phlebo/patient" component={PhleboPatientResult} />
				<PrivateRoute path="/patient/search" component={SearchPatient} />
				<PrivateRoute path="/settings" component={Settings} />
				<PrivateRoute path="/inventory" component={Inventory} />
				<PrivateRoute path="/bloodbank" component={BloodBank} />
				<Route exact path="/cashier" component={Cashier} />
				<Route path="/cashier/receipt" component={Receipt} />
				<Route path="/cashier/transactions" component={Transactions} />
				<Route path="/cashier/categories" component={Categories} />
				<Route path="/cashier/summary" component={Summary} />
				<Route component={ErrorPage} />
			</Switch>
		</Antcontent>
	);
}


export default withRouter(Content);
