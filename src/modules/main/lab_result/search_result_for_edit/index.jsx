import React from 'react';
import { Drawer } from 'antd';

import EditResult from 'modules/main/lab_result/edit_result';
import LabResult from 'modules/main/lab_result/search_result';
import PrintResult from 'modules/main/lab_result/print_result';

class EditLabResult extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isDisplayDrawer: false,
			isDisplayPrintPreview: false,
			patientInfo: {},
			examDetails: {},
			selectedSampleID: null,
			selectedRequestID: null,
			selectedResultStatus: null,
		};

		this.labResultRef = React.createRef();
	}


	onClosePrintPreview = () => {
		this.setState({
			selectedSampleID: null,
			selectedRequestID: null,
			isDisplayPrintPreview: false
		});
	}

	onClosePatientInfoDrawer = () => {
		this.setState({ isDisplayDrawer: false });
		
		this.labResultRef.current.refreshTable();
	}
	
	onClickTableRow = ({ patientInfo, examDetails }) => {
		this.setState({ 
			patientInfo,
			examDetails,
			isDisplayDrawer: true
		});
	}

	onClickPrint = async (sampleID, requestID) => {

		this.setState({
			isDisplayPrintPreview: true,
			selectedSampleID: sampleID,
			selectedRequestID: requestID
		});
	}

	render() {
		const { 
			isDisplayDrawer, 
			patientInfo, 
			examDetails, 
			isDisplayPrintPreview,
			selectedSampleID,
			selectedRequestID,
			selectedResultStatus,
		} = this.state;

		return (
			<div>
				<LabResult 
					ref={this.labResultRef}
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
					requestID={selectedRequestID}
					onClose={this.onClosePrintPreview}
					visible={isDisplayPrintPreview}
					resultStatus={selectedResultStatus}
				/>
			</div>
		);
	}
}



export default EditLabResult;