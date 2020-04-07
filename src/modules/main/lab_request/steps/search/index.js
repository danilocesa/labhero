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
import Tracker from 'modules/main/lab_request/tracker';
import { 
	moduleTitles, 
	requestTypes, 
	requestLinks 
} from 'modules/main/settings/lab_exam_request/settings';
import SearchForm from './form';
import TableHeader from './table_header';
import Table from './table';
import ButtonLink from './link';
import { tablePageSize } from '../settings';


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
		const pageTitle = (sessionStorage.getItem('REQUEST_TYPE') === requestTypes.create ? moduleTitles.create : moduleTitles.edit)
		return pageTitle;
	}

	render() {
		const { patients, pageSize, loading, searchedPatientID, searchedPatientName } = this.state;
	
		const redirectUrl = (sessionStorage.getItem('REQUEST_TYPE') === requestTypes.create ? requestLinks.create.step2 : requestLinks.edit.step2)
		
		return (
			<div>
				<PageTitle pageTitle={this.dynamicModuleTitle()} />
				<Tracker 
					active={0} 
					requestType={requestTypes.create}	
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
				sessionStorage.getItem('REQUEST_TYPE') === requestTypes.create ? (
					<ButtonLink dataLength={patients.length} />
				) : null
				}
				
			</div>
		);
	}
}

export default SearchStep;
