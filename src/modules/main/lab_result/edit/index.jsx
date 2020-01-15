import React from 'react';
import { Drawer } from 'antd';

import PatientInfo from 'modules/main/patientinfo';
import LabResult from '../index';


class EditLabResult extends React.Component {
	state = {
			isDisplayDrawer: false,
			selectedSampleSpecimenId: ''
	};
	
	onClosePatientInfoDrawer = () => {
    this.setState({ isDisplayDrawer: false });
	}
	
	onClickTableRow = ({ sampleSpecimenID }) => {
		this.setState({ 
			selectedSampleSpecimenId: sampleSpecimenID,
			isDisplayDrawer: true
		});
	}

	render() {
		const { isDisplayDrawer, selectedSampleSpecimenId } = this.state;

		return (
			<div>
				<LabResult 
					pageTitle="EDIT LAB RESULT"
					onClickTableRow={this.onClickTableRow} 
				/>
				<Drawer
					title="Patient Information"
					onClose={this.onClosePatientInfoDrawer}
					width="80%"
					visible={isDisplayDrawer}
				>
					<PatientInfo sampleSpecimenId={selectedSampleSpecimenId} /> 
				</Drawer>
			</div>
		);
	}
}



export default EditLabResult;