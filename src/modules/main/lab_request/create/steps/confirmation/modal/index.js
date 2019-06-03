import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Row, Col } from 'antd';
import { CheckIcon } from '../../../../../../../images';

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
		clearTimeout(this.timer);
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
	visible: PropTypes.bool.isRequired
};

export default ConfirmationModal;
