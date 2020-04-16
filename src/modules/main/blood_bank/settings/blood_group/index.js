import React from 'react';

import PageTitle from 'shared_components/page_title';
import UserTable from './table';

class UserMaintenance extends React.Component {
	render() {
		return(
			<div>
				<PageTitle pageTitle= ' BLOOD GROUP' />
				<UserTable />
			</div>
		);
	} 
}

export default UserMaintenance;