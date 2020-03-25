import React from 'react';
import { Collapse } from 'antd';

import PageTitle from 'shared_components/page_title';
import SearchForm from './search_form';
import TakeoutTable from './table';
import TakeoutForm from './Takeout_form';
import Footer from './footer';

const { Panel } = Collapse;

class Takeout extends React.Component {
	render() {
		return(
			<div>
				<PageTitle pageTitle="INVENTORY / TAKEOUT" align="left" />
				<Collapse bordered={false}>
					<Panel header="Search" key="1">
						<SearchForm />
					</Panel>
					<Panel header="Takeout Items" key="2">
						<TakeoutForm />
					</Panel>
					<TakeoutTable />
				</Collapse>
				<Footer />
			</div>
		);
	};
}

export default Takeout;