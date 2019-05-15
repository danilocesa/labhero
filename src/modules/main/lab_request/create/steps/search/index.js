import React from 'react';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';

import Tracker from '../../tracker';
import SearchForm from './form';
import TableHeader from './table_header';
import Table from './table';

import data from './dummy_data';

const Navigation = () => {
	if(data.length > 0)
		return null;

	return (
		<div style={{ textAlign: 'center', marginTop: 15 }}>
			<Link to="/request/create/step/2">
				<Icon type="plus" />
				<span style={{ marginLeft: 5 }}>CREATE REQUEST</span>
			</Link>
		</div>
	);
};

class SearchStep extends React.Component {
	state = { 
		patients: [],
		pageSize: 10 
	}
	
	handleChangeSize = (pageSize) => {
		this.setState({pageSize});
	}

	populatePatients = (patients) => {
		this.setState({ patients });
	}

	render() {
		const { patients, pageSize } = this.state;

		return (
			<div>
				<Tracker active={0} />
				<div style={{ marginTop: 60 }}>
					<SearchForm 
						populatePatients={this.populatePatients} 
					/>
					<TableHeader 
						pageSize={pageSize}
						pageTotal={data.length} 
						handleChangeSize={this.handleChangeSize} 
					/>
					<Table 
						patients={patients}
						data={data}
						pageSize={pageSize} 
					/>
				</div>
				<Navigation />
			</div>
		);
	}
}

export default SearchStep;
