import React from 'react';

// CUSTOM MODULES
import PageTitle from 'shared_components/page_title';
import NotificationsSearch from './notifications_search_form';
import NotificationsTable from './notifications_table';

class Notification extends React.Component{

    render(){
        return(
            <div>
                <div>
                    <PageTitle pageTitle="NOTIFICATIONS" />
                    <NotificationsSearch />
                    <NotificationsTable />
                </div>
            </div>
        );
    }
}

export default Notification;