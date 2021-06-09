import React from 'react';
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