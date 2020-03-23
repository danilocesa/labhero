import React from 'react';

import ItemForm from './item_form';
import SearchForm from './search_form';
import ItemTable from './table';


class ItemSetup extends React.Component {
	render() {
		return(
			<div>
				<ItemForm />
				<SearchForm />
				<ItemTable />
			</div>
		)
	}
}

export default ItemSetup;