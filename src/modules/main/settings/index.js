import React from 'react';
import { Route, Switch } from 'react-router-dom';

import SettingsMenu from './settings_menu';
import UserMaintenance from './user_maintenance';
import PanelExam from './panel_exam';
// import ProfileExam from './profile_exam';
import ExamItems from './exam_item';
import LabExamRequest from './lab_exam_request';
import NormalValues from './normal_values';
import UserRights from './user_rights';
import Address from './address';
import Hospital from './hospital';
import Report from './reports';
 
class Settings extends React.Component {
	render() {
		return(
			<Switch>
				<Route exact path="/settings" component={SettingsMenu} />
				<Route exact path="/settings/user-maintenance" component={UserMaintenance} />
				<Route exact path="/settings/panel-exam" component={PanelExam} />
				{/* <Route exact path="/settings/profile-exam" component={ProfileExam} /> */}
				<Route exact path="/settings/exam-items" component={ExamItems} />
				<Route exact path="/settings/exam-request" component={LabExamRequest} />
				<Route exact path="/settings/normal-values" component={NormalValues} />
				<Route exact path="/settings/user-rights" component={UserRights} />
				<Route exact path="/settings/address" component={Address} />
				<Route exact path="/settings/hospital" component={Hospital} />
				<Route exact path="/settings/reports" component={Report} />
			</Switch>
		)
	}
}

export default Settings;