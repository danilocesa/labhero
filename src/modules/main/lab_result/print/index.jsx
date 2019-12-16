import React from 'react';
import LabResult from '../index';

class PrintLabResult extends React.Component {
	onClickTableRow = () => {
		
	}

	render() {
		return (
			<div>
				<LabResult 
					pageTitle="PRINT LAB RESULT"
					onClickTableRow={this.onClickTableRow} 
				/>
			</div>
		);
	}
}

export default PrintLabResult;