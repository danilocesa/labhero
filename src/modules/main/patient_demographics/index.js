// @ts-nocheck
// LIBRARY
import React from 'react';
import { Drawer } from 'antd';
import PropTypes from 'prop-types';

// CUSTOM MODULES
import PageTitle from 'shared_components/page_title';
import Search from './search_form';
import SearchPatientTableHeader from './table_header';
import SearchPatientTable from './search_table_results';
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

  render() {
    const { patients, pageSize, loading, showDrawer, patientInfo } = this.state;
    return(
	    <div>
				<div>
					<PageTitle pageTitle={moduleTitle} />
					<Search
						populatePatients={this.populatePatients}
						displayLoading={this.displayLoading} 
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
						redirectUrl=""
						drawer={this.displayDrawer}
					/>
					{
					showDrawer ? (
						<Drawer
							title={drawerUpdateTitle} 
							onClose={this.onClosePatientResultDrawer}
							width="50%"
							visible={showDrawer}
						>
              <UpdatePatientForm patientInfo={patientInfo} onCancel={this.onClosePatientResultDrawer} />
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


SearchPatientTable.propTypes={
  state: PropTypes.bool.isRequired
};

SearchPatientTable.defaultProps={
  state: false
}


export default SearchPatient;