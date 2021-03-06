// LiBRARY
import React from 'react';
import { Drawer as AntDrawer, Tabs as AntTabs, Badge as AntBadge} from 'antd';

// CUSTOM MODULES
import PageTitle from 'shared_components/page_title';
import SearchPatientTableHeader from 'shared_components/search_pager';
import SearchPatientHeaderForm from './search_form/search_input';
import SearchPatientTable from './phlebo_result_table';
import PhleboPatientResult from './patient_phlebo_info';
import {moduleTitle, tablePageSize, drawerTitle, tabNames} from './settings';

//  CONSTANTS
const { TabPane } = AntTabs;

class Phlebo extends React.Component {
	constructor(props) {
		super(props);

		this.state = {   
			extractedPatients: [], 
			forExtractionPatients: [], 
			pageSize: tablePageSize,   
			loading: false,
			showDrawer:false,
			patientInfo: null,
		}

		this.searchForm = React.createRef();
	}

	handleChangeSize = (pageSize) => {
		this.setState({pageSize});
	}

	clearPatients  = () => {
		this.setState({ 
			extractedPatients: [],
			forExtractionPatients: []
		})
	}

	populateExtractedPatients = (extractedPatients) => {
		this.setState({ extractedPatients });
	}

	populateForExtractionPatients = (forExtractionPatients) => {
		this.setState({ forExtractionPatients });
	}

	displayDrawer = (patientRecord) => {
		this.setState({ 
			showDrawer: true,
			patientInfo: patientRecord
		});
	}

	onClosePhleboPatientResultDrawer = () => {
    this.setState({
			showDrawer: false,
			loading: true
		}, async () => {
			// @ts-ignore
			await this.searchForm.populateTable();
			
			this.setState({ loading: false });
		});
  }

  render() {
		const { extractedPatients, forExtractionPatients, pageSize, loading, showDrawer, patientInfo } = this.state;
		const forExtrationPatientLength = (forExtractionPatients === undefined || forExtractionPatients.length === 0 ? 0 : forExtractionPatients.length );
		const extractedPatientLength = (extractedPatients === undefined || extractedPatients.length === 0 ? 0 : extractedPatients.length );

    return ( 
			<div>
				<div>
					<PageTitle pageTitle={moduleTitle} />
					<SearchPatientHeaderForm 
						// @ts-ignore
						ref={(instance) => this.searchForm = instance}
						clearPatients={this.clearPatients}
						populateExtractedPatients={this.populateExtractedPatients}
						populateForExtractionPatients={this.populateForExtractionPatients}
					/>
					<br />
					<AntTabs defaultActiveKey="1">
						<TabPane
							tab={(
								<span>
									{tabNames.forExtraction}
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
						</TabPane>
						<TabPane
							tab={(
								<span>
									{tabNames.extracted}
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
						</TabPane>
					</AntTabs>
					{
						showDrawer &&
						(
							<AntDrawer
								title={drawerTitle} 
								onClose={this.onClosePhleboPatientResultDrawer}
								width="95%"
								visible
							>
								<PhleboPatientResult patientInfo={patientInfo} />
							</AntDrawer>
						)
					}
				</div>
			</div>
    );
  }
}

export default Phlebo;