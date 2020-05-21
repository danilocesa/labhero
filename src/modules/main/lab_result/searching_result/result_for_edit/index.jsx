import React from 'react';
import { Drawer } from 'antd';

import EditResult from 'modules/main/lab_result/editing_result';
import LabResult from 'modules/main/lab_result/searching_result';
import PrintResult from 'modules/main/lab_result/print_result';
// import { fetchLabResultExamItems } from 'services/lab_result/result';

class EditLabResult extends React.Component {
	state = {
			isDisplayDrawer: false,
			isDisplayPrintPreview: false,
			patientInfo: {},
			examDetails: {},
			selectedSampleID: null,
			selectedResultStatus: null,
	};
	
	onClosePrintPreview = () => {
		this.setState({
			selectedSampleID: null,
			isDisplayPrintPreview: false
		});
	}

	onClosePatientInfoDrawer = () => {
    this.setState({ isDisplayDrawer: false });
	}
	
	onClickTableRow = ({ patientInfo, examDetails }) => {
		this.setState({ 
			patientInfo,
			examDetails,
			isDisplayDrawer: true
		});
	}

	onClickPrint = async (sampleID) => {
		// const results = await fetchLabResultExamItems(sampleID);

		this.setState({
			isDisplayPrintPreview: true,
			selectedSampleID: sampleID,
			// selectedResultStatus: results.status || null
		});
	}

	render() {
		const { 
			isDisplayDrawer, 
			patientInfo, 
			examDetails, 
			isDisplayPrintPreview,
			selectedSampleID,
			selectedResultStatus
		} = this.state;

		return (
			<div>
				<LabResult 
					pageTitle="LABORATORY RESULT"
					onClickTableRow={this.onClickTableRow} 
					onClickPrint={this.onClickPrint}
				/>
				<Drawer
					title="PATIENT RESULT"
					onClose={this.onClosePatientInfoDrawer}
					width="95%"
					visible={isDisplayDrawer}
				>
					{
						isDisplayDrawer &&
						(
							<EditResult 
								patientInfo={patientInfo} 
								examDetails={examDetails}
							/> 
						)
					}
				</Drawer>
				<PrintResult 
					sampleID={selectedSampleID}
					onClose={this.onClosePrintPreview}
					visible={isDisplayPrintPreview}
					resultStatus={selectedResultStatus}
				/>
			</div>
		);
	}
}



export default EditLabResult;