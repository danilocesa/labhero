import React from 'react';
import { Drawer } from 'antd';

import EditResult from 'modules/main/lab_result/editing_result';
import LabResult from 'modules/main/lab_result/searching_result';
import PrintResult from 'modules/main/lab_result/print_result';
import { LOGGEDIN_USER_DATA, ACCESS_MATRIX } from 'global_config/constant-global';

// import { fetchLabResultExamItems } from 'services/lab_result/result';

class EditLabResult extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isDisplayDrawer: false,
			isDisplayPrintPreview: false,
			patientInfo: {},
			examDetails: {},
			selectedSampleID: null,
			selectedResultStatus: null,
			userAccess: { 
				print: false,  
				update: false,
			}
		};

		this.labResultRef = React.createRef();
	}
	
	componentDidMount(){
		const userSession = JSON.parse(sessionStorage.getItem(LOGGEDIN_USER_DATA));
		const accessMatrix = JSON.parse(sessionStorage.getItem(ACCESS_MATRIX));
		const userAccess = {
			print: accessMatrix.result.print.includes(userSession.loginType),
			update: accessMatrix.result.update.includes(userSession.loginType),
		};

		this.setState({ userAccess });
	}

	onClosePrintPreview = () => {
		this.setState({
			selectedSampleID: null,
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
			selectedResultStatus,
			userAccess
		} = this.state;

		return (
			<div>
				<LabResult 
					ref={this.labResultRef}
					pageTitle="LABORATORY RESULT"
					onClickTableRow={this.onClickTableRow} 
					onClickPrint={this.onClickPrint}
					userAccess={userAccess}
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
								userAccess={userAccess}
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