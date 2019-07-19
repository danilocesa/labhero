import React from 'react';
import { Route, Switch } from 'react-router-dom';

import SettingsMenu from './settings_menu'
import UserMaintenance from './user_maintenance'
import PanelExam from './panel_exam'

class Settings extends React.Component {
    render() {
        return(
            <Switch>
                <Route exact path="/settings" component={SettingsMenu} />
                <Route exact path="/settings/user-maintenance" component={UserMaintenance} />
                <Route exact path="/settings/panel-exam" component={PanelExam} />
            </Switch>
        )
    }
}

export default Settings;