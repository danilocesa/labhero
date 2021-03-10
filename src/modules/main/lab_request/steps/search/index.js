// LIBRARY
import React from 'react';
import { withRouter } from 'react-router-dom';

// CUSTOM
import { 
	LR_PERSONAL_INFO, 
	LR_OTHER_INFO, 
	LR_SEL_EXAMS,	
	LR_REQUEST_TYPE,
	LR_STEP_PROGRESS,
	LR_SEL_CONTENTS, 
	LR_SEL_PANEL_CONTENTS,
	LR_IS_EXAM_UPDATED,
} from 'modules/main/lab_request/steps/constants'; 
import PageTitle from 'shared_components/page_title';
import Tracker from 'modules/main/lab_request/tracker';
import { moduleTitles, requestTypes, requestLinks } from 'modules/main/settings/lab_exam_request/settings';
import SearchFormCreate from './form_for_create';
import SearchFormEdit from './form_for_edit';
import TableHeader from './table_header';
import Table from 'shared_components/search_patient_table';
import ButtonLink from './link';
import { tablePageSize } from '../settings';


class SearchStep extends React.Component {
	state = { 
		patients: [],
		pageSize: tablePageSize,
		loading: false,
		actionType: null,
	}
	

	componentDidMount() {
		sessionStorage.removeItem(LR_PERSONAL_INFO);
		sessionStorage.removeItem(LR_OTHER_INFO);
		sessionStorage.removeItem(LR_SEL_EXAMS);
		sessionStorage.removeItem(LR_SEL_CONTENTS);
		sessionStorage.removeItem(LR_SEL_PANEL_CONTENTS);

		
	}

	setActionType = (patientId, patientName) => {

		this.setState({ actionType: patientName ? 'byName' : 'byId' });
	}

	handleChangeSize = (pageSize) => {
		this.setState({pageSize});
	}

	handleTableDoubleClick = (record) => {
		const { history } = this.props;
		const redirectUrl = (sessionStorage.getItem(LR_REQUEST_TYPE) === requestTypes.create)
			? requestLinks.create.step2 
			: requestLinks.edit.step2;

		delete record.dateCreated;
		delete record.addressID;

		// Save personal and other info to session storage
		// for edit module
		if(record.requestHeader) {
			const { requestHeader, ...persoInfo } = record;
			const { userID, requestDateTime, ...otherInfo } = record.requestHeader;

			sessionStorage.setItem(LR_PERSONAL_INFO, JSON.stringify(persoInfo));
			sessionStorage.setItem(LR_OTHER_INFO, JSON.stringify(otherInfo));
		}

		sessionStorage.setItem(LR_IS_EXAM_UPDATED, String(0));
		sessionStorage.setItem(LR_STEP_PROGRESS, String(2));

		history.push(redirectUrl, { record });
	}

	populatePatients = (patients) => {
		this.setState({ patients });
	}

	displayLoading = (isLoading) => {
		this.setState({ loading: isLoading });
	}

	dynamicModuleTitle = () =>{
		// @ts-ignore
		const pageTitle = (sessionStorage.getItem(LR_REQUEST_TYPE) === requestTypes.create ? moduleTitles.create : moduleTitles.edit);
		
		return pageTitle;
	}

	render() {
		const { patients, pageSize, loading, actionType } = this.state;
		const reqType = sessionStorage.getItem(LR_REQUEST_TYPE);

		return (
			<div>
				<PageTitle pageTitle={this.dynamicModuleTitle()} />
				<Tracker 
					active={0} 
					requestType={requestTypes.create}	
				/>
				<div style={{ marginTop: 60 }}>
					{
						reqType === requestTypes.create && (
							<SearchFormCreate 
								populatePatients={this.populatePatients}
								displayLoading={this.displayLoading} 
								storeSearchedVal={this.setActionType}
							/>
						)
					}
					{
						reqType === requestTypes.edit && (
							<SearchFormEdit
								populatePatients={this.populatePatients}
								displayLoading={this.displayLoading} 
							/>
						)
					}
					<TableHeader 
						pageSize={pageSize}
						pageTotal={patients.length} 
						handleChangeSize={this.handleChangeSize} 
					/>
					<Table 
						data={patients}
						pageSize={pageSize}
						loading={loading} 
						handleDoubleClick={this.handleTableDoubleClick}
						{...((actionType === 'byName' && reqType === requestTypes.create) && {
							footer: () => <ButtonLink />
						})}
					/>
				</div>
				{/* { 
					(reqType === requestTypes.create && searchCount > 0) && (
						<ButtonLink dataLength={patients.length} />
					)
				} */}
			</div>
		);
	}
}

export default withRouter(SearchStep);
