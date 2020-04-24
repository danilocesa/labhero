import React from 'react';
import { Collapse } from 'antd';
import PageTitle from 'shared_components/page_title';
import ItemForm from './item_form';
import SearchForm from './search_form';
import ItemTable from './table';


const { Panel } = Collapse;
class ItemSetup extends React.Component {
	render() {
		return(
			<div>
				<PageTitle pageTitle="INVENTORY / RESTOCK" align="left" />
				<Collapse bordered={false}>
					<Panel header="Item" key="1">
					<ItemForm />
					</Panel>
					<Panel header="Search" key="2">
					<SearchForm />
					</Panel>
					<ItemTable />
				</Collapse>
			</div>
		
		)
	}
}

export default ItemSetup;