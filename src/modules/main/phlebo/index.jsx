// LiBRARY
import React from 'react';
import { Drawer as AntDrawer, Tabs as AntTabs} from 'antd';

// CUSTOM MODULES
import PageTitle from 'shared_components/page_title';
import SearchPhleboForm from './phlebosearch';
import SearchPatientTableHeader from './phleboheader';
import SearchPatientTable from './phlebotable';
import PhleboPatientResult from './phlebopatient';

//  CONSTANTS
const { TabPane } = AntTabs;

class Phlebo extends React.Component {
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

	onClosePhleboPatientResultDrawer = () => {
    this.setState({
      showDrawer:false,
    });
  }

  render() {
		const { patients, pageSize, loading, showDrawer, patientInfo } = this.state;
    return ( 
			<div>
				<div>
					<PageTitle pageTitle="PHLEBO" />
					<SearchPhleboForm 
						populatePatients={this.populatePatients}
						displayLoading={this.displayLoading} 
					/>
					<br />
					<AntTabs defaultActiveKey="1">
						<TabPane
							tab={(
								<span>
									For Extraction
								</span>
							)}
							key="1"
						>
					
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
								<AntDrawer
									title="Check-in specimen" 
									onClose={this.onClosePhleboPatientResultDrawer}
									width="90%"
									visible={showDrawer}
								>
									<PhleboPatientResult patientInfo={patientInfo} />
								</AntDrawer>
							)
							:
							null
						}
						</TabPane>
						<TabPane
							tab={(
								<span>
									Extracted
								</span>
							)}
							key="2"
						>
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
									<AntDrawer
										title="Check-in specimen" 
										onClose={this.onClosePhleboPatientResultDrawer}
										width="90%"
										visible={showDrawer}
									>
										<PhleboPatientResult patientInfo={patientInfo} />
									</AntDrawer>
								)
								:
								null
							}
						</TabPane>
					</AntTabs>
					
				</div>
			</div>
    );
  }
}

export default Phlebo;