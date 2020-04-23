import React from 'react';
import { Drawer } from 'antd';

import EditResult from 'modules/main/lab_result/editing_result';
import LabResult from 'modules/main/lab_result/searching_result';
import PrintResult from 'modules/main/lab_result/print_result';

class EditLabResult extends React.Component {
	state = {
			isDisplayDrawer: false,
			isDisplayPrintPreview: false,
			patientInfo: {},
			examDetails: {},
			selectedSampleID: null
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

	onClickPrint = (sampleID) => {
		this.setState({
			isDisplayPrintPreview: true,
			selectedSampleID: sampleID
		});
	}

	render() {
		const { 
			isDisplayDrawer, 
			patientInfo, 
			examDetails, 
			isDisplayPrintPreview,
			selectedSampleID
		} = this.state;

		return (
			<div>
				<LabResult 
					pageTitle="LABORATORY RESULT"
					onClickTableRow={this.onClickTableRow} 
					onClickPrint={this.onClickPrint}
				/>
				<Drawer
					title="Patient Information"
					onClose={this.onClosePatientInfoDrawer}
					width="90%"
					visible={isDisplayDrawer}
				>
					<EditResult 
						patientInfo={patientInfo} 
						examDetails={examDetails}
					/> 
				</Drawer>
				<PrintResult 
					sampleID={selectedSampleID}
					onClose={this.onClosePrintPreview}
					visible={isDisplayPrintPreview}
				/>
			</div>
		);
	}
}



export default EditLabResult;