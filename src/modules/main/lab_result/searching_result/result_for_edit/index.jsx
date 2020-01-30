import React from 'react';
import { Drawer } from 'antd';

import EditResult from 'modules/main/lab_result/editing_result';
import LabResult from 'modules/main/lab_result/searching_result';

class EditLabResult extends React.Component {
	state = {
			isDisplayDrawer: false,
			patientInfo: {},
			examDetails: {}
	};
	
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

	render() {
		const { isDisplayDrawer, patientInfo, examDetails } = this.state;

		return (
			<div>
				<LabResult 
					pageTitle="EDIT LAB RESULT"
					onClickTableRow={this.onClickTableRow} 
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
			</div>
		);
	}
}



export default EditLabResult;