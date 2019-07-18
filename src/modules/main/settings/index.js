import React from 'react';
import { Route, Switch } from 'react-router-dom';

import SettingsMenu from './settings_menu'
import UserMaintenance from './user_maintenance'

class Settings extends React.Component {
    render() {
        return(
            <Switch>
                <Route exact path="/settings" component={SettingsMenu} />
                <Route exact path="/settings/user-maintenance" component={UserMaintenance} />
            </Switch>
        )
    }
}

export default Settings;