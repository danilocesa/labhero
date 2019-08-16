// LIBRARY
import React from 'react';

// CUSTOM MODULES
import PageTitle from 'shared_components/page_title';
import PanelTable from './panel_table'

class PanelExam extends React.Component {
    render() {
        return(
            <div>
                <PageTitle pageTitle="PANEL EXAM" />
                <PanelTable />
            </div>
        );
    }
}

export default PanelExam;