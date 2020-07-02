import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';
import { Modal, Row, Col } from 'antd';
// @ts-ignore
import { CheckIcon } from 'images';

import {
	LR_SEL_EXAMS,
	LR_PERSONAL_INFO,
	LR_OTHER_INFO,
	LR_STEP_PROGRESS,
	LR_REQUEST_TYPE
} from 'modules/main/lab_request/steps/constants';

import { requestLinks, requestTypes } from 'modules/main/settings/lab_exam_request/settings';

class ConfirmationModal extends React.Component {
	constructor(args) {
		super(args);

		this.timer = null;
		this.countdownTime = 3000;
	}

	componentDidMount() {
		this.timer = setTimeout(() => {
			this.props.closeModal();
		}, this.countdownTime);
	}

	componentWillUnmount() {
		const { history } = this.props;

		sessionStorage.removeItem(LR_SEL_EXAMS);
		sessionStorage.removeItem(LR_PERSONAL_INFO);
		sessionStorage.removeItem(LR_OTHER_INFO);
		sessionStorage.setItem(LR_STEP_PROGRESS, String(1));

		clearTimeout(this.timer);

		if(sessionStorage.getItem(LR_REQUEST_TYPE) === requestTypes.create){
			history.push(requestLinks.create.step1);
		}else{
			history.push(requestLinks.edit.step1);
		}
	}

	render() {
		const { visible } = this.props;

		return (
			<div>
				<Modal className="save-modal-container" centered visible={visible} footer={null}>
					<Row justify="center">
						<Col>
							<img
								src={CheckIcon}
								alt="logo"
								style={{ height: 65, width: 50, paddingBottom: '1em' }}
							/>
						</Col>
					</Row>
					<p className="successful-msg">You have successfully saved a request!</p>
					<p style={{ textAlign: 'center' }}>
						A notification will be sent once the request has been verified.
					</p>
				</Modal>
			</div>
		);
	}
}

ConfirmationModal.propTypes = {
	closeModal: PropTypes.func.isRequired,
	visible: PropTypes.bool.isRequired,
	history: ReactRouterPropTypes.history.isRequired
};

export default withRouter(ConfirmationModal);
