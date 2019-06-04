import React from 'react';


import PageTitle from '../../title';
import Tracker from '../../tracker';
import SearchForm from './form';
import TableHeader from './table_header';
import Table from './table';
import ButtonLink from './link';


class SearchStep extends React.Component {
	state = { 
		patients: [],
		pageSize: 10,
		loading: false,
	}
	
	handleChangeSize = (pageSize) => {
		this.setState({pageSize});
	}

	populatePatients = (patients) => {
		this.setState({ patients });
	}

	displayLoading = (isLoading) => {
		this.setState({ loading: isLoading });
	}

	render() {
		const { patients, pageSize, loading } = this.state;

		return (
			<div>
				<PageTitle />
				<Tracker active={0} />
				<div style={{ marginTop: 60 }}>
					<SearchForm 
						populatePatients={this.populatePatients}
						displayLoading={this.displayLoading} 
					/>
					<TableHeader 
						pageSize={pageSize}
						pageTotal={patients.length} 
						handleChangeSize={this.handleChangeSize} 
					/>
					<Table 
						data={patients}
						pageSize={pageSize}
						loading={loading} 
						redirectUrl="/request/create/step/2"
					/>
				</div>
				<ButtonLink dataLength={patients.length} />
			</div>
		);
	}
}

export default SearchStep;
