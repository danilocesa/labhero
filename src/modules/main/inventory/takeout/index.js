import React from 'react';

import PageTitle from 'shared_components/page_title';
import SearchForm from './search_form';
import TakeoutTable from './table';
import Footer from './footer';

class Takeout extends React.Component {
	render() {
		return(
			<div>
				<PageTitle pageTitle="INVENTORY / TAKEOUT" align="left" />
				<SearchForm />
				<TakeoutTable />
				<Footer />
			</div>
		);
	};
}

export default Takeout;