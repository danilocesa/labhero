import React from 'react';
import HospitalTable from './table';
import PageTitle from 'shared_components/page_title';

class Province extends React.Component {
	render() {
		return(
			<div>
				<section style={{ textAlign: 'center', marginTop: 30 }}>
					<PageTitle pageTitle="HOSPITAL" />
				</section>
				
			<div style={{marginTop: -50}}>
				<HospitalTable />
			</div>
			</div>
		);
	} 
}

export default Province;