import React from 'react';
import fetchInventoryItems from 'services/blood_bank/blood_group';
import BloodTestTable from './table';

class BloodGroup extends React.Component {
	render() {
		return(
			<div style={{marginTop: -50}}>
				<BloodTestTable />
			</div>
		);
	} 
}

export default BloodGroup;