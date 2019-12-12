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
		console.log('ship');
	}

	render() {
		const { isDisplayDrawer } = this.state;
		
		return (
			<div>
				<LabResult onClickTableRow={this.onClickTableRow} />
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