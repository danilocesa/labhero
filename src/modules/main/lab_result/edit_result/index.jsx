import React from 'react';
import { Drawer } from 'antd';

import PatientInfo from 'modules/main/patientinfo';
import LabResult from '../index';


class EditLabResult extends React.Component {
	state = {
		isDisplayDrawer: false
	};
	
	onClosePatientInfoDrawer = () => {
    this.setState({ isDisplayDrawer: false });
	}
	
	onClickTableRow = () => {
		this.setState({ isDisplayDrawer: true });
	}

	render() {
		const { isDisplayDrawer } = this.state;
		
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
					<PatientInfo /> 
				</Drawer>
			</div>
		);
	}
}

export default EditLabResult;