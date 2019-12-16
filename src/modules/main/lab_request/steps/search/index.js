// LIBRARY
import React from 'react';

// CUSTOM
import { 
	CLR_PERSONAL_INFO, 
	CLR_OTHER_INFO, 
	CLR_SEL_EXAMS,	
	REQUEST_TYPE,
	MODULE_PROFILE
} from 'modules/main/lab_request/steps/constants'; 
import PageTitle from 'shared_components/page_title';
import Tracker from '../../tracker';
import SearchForm from './form';
import TableHeader from './table_header';
import Table from './table';
import ButtonLink from './link';
import {moduleTitle, tablePageSize} from '../settings';

class SearchStep extends React.Component {
	state = { 
		searchedPatientName: '',
		searchedPatientID: '',
		patients: [],
		pageSize: tablePageSize,
		loading: false,
	}
	

	componentDidMount() {
		sessionStorage.removeItem(CLR_PERSONAL_INFO);
		sessionStorage.removeItem(CLR_OTHER_INFO);
		sessionStorage.removeItem(CLR_SEL_EXAMS);
		sessionStorage.removeItem(REQUEST_TYPE);
		sessionStorage.removeItem(MODULE_PROFILE);
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

	dynamicModuleTitle = () =>{
		// @ts-ignore
		const pageTitle = (sessionStorage.getItem('REQUEST_TYPE') === 'create' ? "CREATE REQUEST" : "EDIT REQUEST")
		return pageTitle || moduleTitle;
	}

	render() {
		const { patients, pageSize, loading, searchedPatientID, searchedPatientName } = this.state;
		// @ts-ignore
		const redirectUrl = (sessionStorage.getItem('REQUEST_TYPE') === 'create' ? "/request/create/step/2" : "/request/edit/step/2")
		return (
			<div>
				<PageTitle pageTitle={this.dynamicModuleTitle()} />
				<Tracker 
					active={0}	
				/>
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
						redirectUrl={redirectUrl}
						SearchedPatientId={searchedPatientID}
						SearchedPatientName={searchedPatientName}
					/>
				</div>
				{ 
				// @ts-ignore
				sessionStorage.getItem('REQUEST_TYPE') === 'create' ? (
					<ButtonLink dataLength={patients.length} />
				) : null
				}
				
			</div>
		);
	}
}

export default SearchStep;
