import React from 'react';
import BloodGroupTable from './table'

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