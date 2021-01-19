import React from 'react';
import fetchInventoryItems from 'services/blood_bank/blood_group';
import BloodGroupTable from './table';

class BloodGroup extends React.Component {
	render() {
		return(
			<div style={{marginTop: -50}}>
				<BloodGroupTable />
			</div>
		);
	} 
}

export default BloodGroup;