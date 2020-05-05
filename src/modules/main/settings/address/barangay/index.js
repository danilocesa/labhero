import React from 'react';
import BarangayTable from './table';

class Barangay extends React.Component {
	render() {
		return(
			<div style={{marginTop: -50}}>
				<BarangayTable />
			</div>
        ); 
        
	} 
}

export default Barangay;