// LIBRARY
import React from 'react';
import PropTypes from 'prop-types';

// CUSTOM
import { 
	CLR_PERSONAL_INFO, 
	CLR_OTHER_INFO, 
	CLR_SEL_EXAMS	
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
		const pageTitle = (this.props.requestType === 1 ? "CREATE REQUEST" : "EDIT REQUEST")
		return pageTitle || moduleTitle;
	}

	render() {
		const { patients, pageSize, loading, searchedPatientID, searchedPatientName } = this.state;
		const { requestType, moduleProfile } = this.props;
		const redirectUrl = (requestType === 1 ? "/request/create/step/2" : "/request/edit/step/2")
		return (
			<div>
				<PageTitle pageTitle={this.dynamicModuleTitle()} />
				<Tracker active={0} />
				<div style={{ marginTop: 60 }}>
					<SearchForm 
						populatePatients={this.populatePatients}
						displayLoading={this.displayLoading} 
						updateSearchedValue={this.updateSearchedValue}
						requestType={requestType}
						moduleProfile={moduleProfile}
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
				<ButtonLink dataLength={patients.length} />
			</div>
		);
	}
}

SearchStep.propTypes ={
	requestType: PropTypes.number.isRequired,
	moduleProfile: PropTypes.string.isRequired
}

export default SearchStep;
