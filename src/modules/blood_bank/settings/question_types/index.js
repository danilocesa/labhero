import React from 'react';
import BloodTypeTable from './table';

class BloodGroup extends React.Component {
	render() {
		return(
			<div style={{marginTop: -50}}>
				<BloodTypeTable />
			</div>
		);
	} 
}

export default BloodGroup;