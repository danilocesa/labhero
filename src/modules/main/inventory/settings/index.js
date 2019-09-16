import React from 'react';
import { Route, Switch } from 'react-router-dom';


import InventorySupplier from './supplier'
// import SettingsMenu from './settings_menu'
// import UserMaintenance from './user_maintenance'
// import PanelExam from './panel_exam'
// import ProfileExam from './profile_exam';
// import ExamItems from './exam_item_jer';
// import LabExamRequest from './lab_exam_request_jer';

class Inventory extends React.Component {
    render() {
        return(
            <Switch>
                {/* <Route exact path="/settings" component={SettingsMenu} /> */}

                {/* Inventory settings */}
                <Route exact path="/inventory/settings/supplier" component={InventorySupplier} />
            </Switch>
        )
    }
}

export default Inventory;