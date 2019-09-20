import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';
import { Modal, Row, Col } from 'antd';
// @ts-ignore
import { CheckIcon } from 'images';

import {
	CLR_SEL_EXAMS,
	CLR_PERSONAL_INFO,
	CLR_OTHER_INFO,
	CLR_STEP_PROGRESS
} from '../../constants';

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

		sessionStorage.removeItem(CLR_SEL_EXAMS);
		sessionStorage.removeItem(CLR_PERSONAL_INFO);
		sessionStorage.removeItem(CLR_OTHER_INFO);
		sessionStorage.setItem(CLR_STEP_PROGRESS, String(1));

		clearTimeout(this.timer);

		history.push('/request/create/step/1');
	}

	render() {
		const { visible } = this.props;

		return (
			<div>
				<Modal className="save-modal-container" centered visible={visible} footer={null}>
					<Row type="flex" justify="center">
						<Col>
							<img
								src={CheckIcon}
								alt="logo"
								style={{ height: 65, width: 50, paddingBottom: '1em' }}
							/>
						</Col>
					</Row>
					<p className="successful-msg">You have successfully saved a result!</p>
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
