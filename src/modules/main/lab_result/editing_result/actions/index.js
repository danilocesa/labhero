// LIBRARY
import React from 'react';
import PropTypes from 'prop-types';
import { saveLabResult } from 'services/lab_result/result';
import { Button } from 'antd';
import { LOGGEDIN_USER_DATA } from 'global_config/constant-global';
// import NotifModal from 'modules/main/lab_result/editing_result/modal';
import Message from 'shared_components/message';

// CSS
import './actions.css';

class Actions extends React.Component {
	constructor(props) {
		super(props);

		this.timer = null;
		this.countdownTime = 2500;
		this.state = { 
			// isDisplayModal: false,
			isApproving: false,
			isSaving: false
		};
	}

	componentWillUnmount() {
		// clearTimeout(this.timer);
	}
	

  onClickSave = async () => {
		const { getLabResultFormValues, onSaveSuccess } = this.props;
		const labResultFormValues = await getLabResultFormValues();
		const userSession = JSON.parse(sessionStorage.getItem(LOGGEDIN_USER_DATA));

		if(!labResultFormValues.form.hasError && !labResultFormValues.remarks.hasError) {
			this.setState({ isSaving: true }, async () => {
				const savedResults = await saveLabResult({
					results: labResultFormValues.form.results,
					remarks: labResultFormValues.remarks.value,
					userID: userSession.userID,
					action: 'Save'
				});

				this.setState({ isSaving: false }, () => {
					if(savedResults) {
						onSaveSuccess();
						
						Message.success({ message: `Result have successfully saved.` });
					}
				});
			});
		}
	};
	
	onClickApprove = async () => {
		const { getLabResultFormValues, onSaveSuccess, resultStatus } = this.props;
		const labResultFormValues = await getLabResultFormValues();
		const userSession = JSON.parse(sessionStorage.getItem(LOGGEDIN_USER_DATA));
		const action = (resultStatus === 'Approve') ? 'Unapprove' : 'Approve';

		if(!labResultFormValues.form.hasError && !labResultFormValues.remarks.hasError) {
			this.setState({ isApproving: true }, async () => {
				const savedResults = await saveLabResult({
					results: labResultFormValues.form.results,
					remarks: labResultFormValues.remarks.value,
					userID: userSession.userID,
					action
				});

				this.setState({ isApproving: false }, () => {
					if(savedResults) {
						onSaveSuccess();
						
						Message.success({ message: `Result have successfully ${action.toLowerCase()}.` });
					}
				});
			});
		}
	}


  render() {
		const { isSaving, isApproving } = this.state;
		const { onPrint, resultStatus, isResultsTouched } = this.props;

		return (
	    <div className="lab-res-edit-action-container">
				<Button 
					loading={isApproving}
					shape="round" 
					type="primary" 
					onClick={this.onClickApprove}
					className="action-buttons"
					disabled={isSaving}
				>
					{ resultStatus === 'Approve' ? 'DISAPPROVE' : 'APPROVE' }
				</Button>
				<Button 
					shape="round" 
					type="primary"  
					onClick={onPrint}
					className="action-buttons"
					disabled={(resultStatus !== 'Approve' && resultStatus !== 'Save')}
				>
					PRINT
				</Button>
				<Button 
					loading={isSaving}
					shape="round" 
					type="primary" 
					onClick={this.onClickSave}
					disabled={resultStatus === 'Approve' || isApproving || !isResultsTouched}
					className="action-buttons"
				>
					SAVE
				</Button>
		    
				{/* <NotifModal isDisplay={isDisplayModal} /> */}
	    </div>
    );
  }
}

Actions.propTypes = {
	getLabResultFormValues: PropTypes.func.isRequired,
	onSaveSuccess: PropTypes.func.isRequired,
	onPrint: PropTypes.func.isRequired,
	resultStatus: PropTypes.string.isRequired,
	isResultsTouched: PropTypes.bool.isRequired,
};

export default Actions;
