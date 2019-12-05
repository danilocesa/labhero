import React from 'react';
import { 
	CLR_PERSONAL_INFO, 
	CLR_OTHER_INFO, 
	CLR_SEL_EXAMS	
} from 'modules/main/lab_request/create/steps/constants'; 
import PageTitle from '../../title';
import Tracker from '../../../tracker';
import SearchForm from './form';
import TableHeader from './table_header';
import Table from './table';
import ButtonLink from './link';


class SearchStep extends React.Component {
	state = { 
		searchedPatientName: '',
		searchedPatientID: '',
		patients: [],
		pageSize: 10,
		loading: false,
	}
	

	componentDidMount() {
		sessionStorage.removeItem(CLR_PERSONAL_INFO);
		sessionStorage.removeItem(CLR_OTHER_INFO);
		sessionStorage.removeItem(CLR_SEL_EXAMS);
	}

	updateSearchedValue = (patientId, patientName) => {
		this.setState({
			searchedPatientID: patientId || '',
			searchedPatientName: patientName || ''
		});
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
		const { patients, pageSize, loading, searchedPatientID, searchedPatientName } = this.state;

		return (
			<div>
				<PageTitle />
				<Tracker active={0} />
				<div style={{ marginTop: 60 }}>
					<SearchForm 
						populatePatients={this.populatePatients}
						displayLoading={this.displayLoading} 
						updateSearchedValue={this.updateSearchedValue}
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
						SearchedPatientId={searchedPatientID}
						SearchedPatientName={searchedPatientName}
					/>
				</div>
				<ButtonLink dataLength={patients.length} />
			</div>
		);
	}
}

export default SearchStep;
