import React from 'react';

import PageTitle from 'shared_components/page_title';
import UserTable from './user_table';

class UserMaintenance extends React.Component {
    render() {
        return(
            <div>
                <PageTitle pageTitle="USER MAINTENANCE" />
                <UserTable />
            </div>
        );
    } 
}

export default UserMaintenance;