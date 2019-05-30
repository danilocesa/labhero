// LiBRARY
import React from 'react';
import { Drawer } from 'antd';

// CUSTOM MODULES
import SearchForm from './plebosearch';
import SearchPatientTableHeader from './pleboheader';
import SearchPatientTable from './plebotable';
import PleboPatientResult from './plebopatient';

class Plebo extends React.Component {
	state = { 
		patients: [],
		pageSize: 10,
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

	onClosePleboPatientResultDrawer = () => {
    this.setState({
      showDrawer:false,
    });
  }

  render() {
		const { patients, pageSize, loading, showDrawer, patientInfo } = this.state;
    return ( 
			<div>
				<div style={{ marginTop: 50 }}>
					<SearchForm 
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
							title="Patient information" 
							onClose={this.onClosePleboPatientResultDrawer}
							width="80%"
							visible={showDrawer}
						>
							<PleboPatientResult patientInfo={patientInfo} />
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

export default Plebo;