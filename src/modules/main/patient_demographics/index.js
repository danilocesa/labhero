// @ts-nocheck
// LIBRARY
import React from 'react';
import { Drawer } from 'antd';

// CUSTOM MODULES
import PageTitle from 'shared_components/page_title';
import SearchPatientTable from 'shared_components/search_patient_table';
import Search from './search_form';
import SearchPatientTableHeader from './table_header';
import UpdatePatientForm from './edit_patient_info';
import {moduleTitle, tablePageSize,drawerUpdateTitle} from './settings';



class SearchPatient extends React.Component {
  state = { 
		patients: [], 
		pageSize: tablePageSize,
		loading: false,
		showDrawer:false,
		patientInfo: null,
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

	displayDrawer = (patientRecord) => {
		this.setState({ 
			showDrawer: true,
			patientInfo: patientRecord
		});
	}

	onClosePatientResultDrawer = () => {
    this.setState({
      showDrawer:false,
    });
  }

	
	onSuccessUpdateInfo = () => {
		this.setState({ 
			showDrawer: false, 
			patients: []
		});
	}

  render() {
    const { patients, pageSize, loading, showDrawer, patientInfo } = this.state;
    return(
	    <div>
				<div>
					<PageTitle pageTitle={moduleTitle} />
					<Search
						populatePatients={this.populatePatients}
						displayLoading={this.displayLoading}
						enableRequestDate={false}
					/>
					<SearchPatientTableHeader 
						pageSize={pageSize}
						pageTotal={patients.length} 
						handleChangeSize={this.handleChangeSize} 
					/>
					<SearchPatientTable 
						data={patients}
						pageSize={pageSize}
						loading={loading}
						handleDoubleClick={this.displayDrawer} 
						// redirectUrl=""
						// drawer={this.displayDrawer}
					/>
					{
						showDrawer ? (
							<Drawer
								title={drawerUpdateTitle} 
								onClose={this.onClosePatientResultDrawer}
								width="50%"
								visible={showDrawer}
							>
								<UpdatePatientForm 
									patientInfo={patientInfo} 
									onCancel={this.onClosePatientResultDrawer}
									onSuccess={this.onSuccessUpdateInfo}
								/>
							</Drawer>
						)
						:
						null
					}
				</div>
     </div>
    );
  }
}


export default SearchPatient;