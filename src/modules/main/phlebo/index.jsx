// LiBRARY
import React from 'react';
import { Drawer as AntDrawer, Tabs as AntTabs, Badge as AntBadge} from 'antd';

// CUSTOM MODULES
import PageTitle from 'shared_components/page_title';
import SearchPatientTableHeader from 'shared_components/search_patient_table_header';
import SearchPatientHeaderForm from './search_patient/header_input'; // Search form input
import SearchPatientTable from './phlebotable';
import PhleboPatientResult from './phlebopatient';

//  CONSTANTS
const { TabPane } = AntTabs;

class Phlebo extends React.Component {
	state = {   
		extractedPatients: [], 
		forExtractionPatients: [], 
		pageSize: 10,   
		loading: false,
		showDrawer:false,
		patientInfo: null,
	}

	handleChangeSize = (pageSize) => {
		this.setState({pageSize});
	}

	populateExtractedPatients = (extractedPatients) => {
		this.setState({ extractedPatients });
	}

	populateForExtractionPatients = (forExtractionPatients) => {
		this.setState({ forExtractionPatients });
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

	onClosePhleboPatientResultDrawer = () => {
    this.setState({
      showDrawer:false,
    });
  }

  render() {
		const { extractedPatients, forExtractionPatients, pageSize, loading, showDrawer, patientInfo } = this.state;
		const forExtrationPatientLength = (forExtractionPatients == undefined || forExtractionPatients.length == 0 ? 0 : forExtractionPatients.length );
		const extractedPatientLength = (extractedPatients == undefined || extractedPatients.length == 0 ? 0 : extractedPatients.length );
		const patientDrawer = (
			<div>
				<AntDrawer
					title="Specimen Check-In" 
					onClose={this.onClosePhleboPatientResultDrawer}
					width="95%"
					visible={showDrawer}
				>
					<PhleboPatientResult patientInfo={patientInfo} />
				</AntDrawer>
			</div>
		);

    return ( 
			<div>
				<div>
					<PageTitle pageTitle="PHLEBO" />
					<SearchPatientHeaderForm 
						populateExtractedPatients={this.populateExtractedPatients}
						populateForExtractionPatients={this.populateForExtractionPatients}
						displayLoading={this.displayLoading} 
					/>
					<br />
					<AntTabs defaultActiveKey="1">
						<TabPane
							tab={(
								<span>
									For Extraction
									<AntBadge count={forExtrationPatientLength} />
								</span>
								
							)}
							key="1"
						>
					
						<SearchPatientTableHeader 
							pageSize={pageSize}
							pageTotal={forExtrationPatientLength} 
							handleChangeSize={this.handleChangeSize} 
						/>

						<SearchPatientTable 
							data={forExtractionPatients}
							pageSize={pageSize}
							loading={loading} 
							redirectUrl=""
							drawer={this.displayDrawer}
						/>
						{
							showDrawer ? ( patientDrawer ) : null
						}
						</TabPane>
						<TabPane
							tab={(
								<span>
									Extracted
									<AntBadge count={extractedPatientLength} />
								</span>
							)}
							key="2"
						>
							<SearchPatientTableHeader 
								pageSize={pageSize}
								pageTotal={extractedPatientLength} 
								handleChangeSize={this.handleChangeSize} 
							/>

							<SearchPatientTable 
								data={extractedPatients}
								pageSize={pageSize}
								loading={loading} 
								redirectUrl=""
								drawer={this.displayDrawer}
							/>
							{
								showDrawer ? ( patientDrawer ) : null
							}
						</TabPane>
					</AntTabs>
					
				</div>
			</div>
    );
  }
}

export default Phlebo;