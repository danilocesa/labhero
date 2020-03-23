// LIBRARY
import React from 'react';

// CUSTOM MODULES
import PageTitle from 'shared_components/page_title';
import PanelTable from './panel_table'
import {moduleTitle} from './settings'

class PanelExam extends React.Component {
	render() {
		return(
			<div>
				<PageTitle pageTitle={moduleTitle} />
				<PanelTable />
			</div>
		);
	}
}

export default PanelExam;