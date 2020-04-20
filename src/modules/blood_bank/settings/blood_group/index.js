import React from 'react';

import PageTitle from 'shared_components/page_title';
import BloodGroupTable from './table';

class BloodGroup extends React.Component {
	render() {
		return(
			<div>
				<PageTitle pageTitle="BLOOD GROUP" />
				<BloodGroupTable />
			</div>
		);
	} 
}

export default BloodGroup;