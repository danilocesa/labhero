import React from 'react';
import { Route, Switch } from 'react-router-dom';

import SettingsMenu from './settings_menu'
import UserMaintenance from './user_maintenance'
import PanelExam from './panel_exam'
import ProfileExam from './profile_exam';
import ExamItems from './exam_item';
import LabExamRequest from './lab_exam_request';

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
            </Switch>
        )
    }
}

export default Settings;