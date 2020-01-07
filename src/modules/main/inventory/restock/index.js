import React from 'react';
import { Collapse } from 'antd';

import PageTitle from 'shared_components/page_title';
import SearchForm from './search_form';
import RestockForm from './restock_form';
import SearchResult from './search_result';

const { Panel } = Collapse;

class Restock extends React.Component {
	render() {
		return(
			<div>
				<PageTitle pageTitle="INVENTORY / RESTOCK" align="left" />
				<Collapse bordered={false}>
					<Panel header="Search" key="1">
						<SearchForm />
					</Panel>
					<Panel header="Restock Items" key="2">
						<RestockForm />
					</Panel>
					<SearchResult />
				</Collapse>
			</div>
		);
	};
}

export default Restock;