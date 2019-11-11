import React from 'react';

import PageTitle from 'shared_components/page_title';
import UserTable from './user_table';
import { moduleTitle } from './settings';

class UserMaintenance extends React.Component {
    render() {
        return(
            <div>
                <PageTitle pageTitle={ moduleTitle } />
                <UserTable />
            </div>
        );
    } 
}

export default UserMaintenance;