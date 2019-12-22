import React from 'react';
import { Collapse } from 'antd';

import SearchForm from './search_form';
import RestockForm from './restock_form';
import SearchResult from './search_result';

const { Panel } = Collapse;

class Restock extends React.Component {
	render() {
		return(
			<Collapse bordered={false}>
				<Panel header="Search" key="1">
					<SearchForm />
				</Panel>
				<Panel header="Restock Items" key="2">
					<RestockForm />
				</Panel>
				<SearchResult />
			</Collapse>
		);
	};
}

export default Restock;