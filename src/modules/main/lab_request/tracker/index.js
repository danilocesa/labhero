// LIBRARY
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Steps, Row, Col, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { LR_REQUEST_TYPE, LR_STEP_PROGRESS } from 'modules/main/lab_request/steps/constants';
import TrackerModal from './tracker_modal';
import TrackerSettings from './settings';

// CSS
import './tracker.css';

const { confirm } = Modal;
const { Step } = Steps;
const { requestTypes } = TrackerSettings;
const { links } = TrackerSettings;


// eslint-disable-next-line react/prefer-stateless-function
class Tracker extends React.Component {
	state = {
		modalVisibility: false
	};

	onClickTracker = (clickedStep) => {	
		const { active, history } = this.props;

		if(active !== 0 && clickedStep === 0) { 
			this.showPromiseConfirm();
			// this.setState({ modalVisibility: true });

			return;
		}

		sessionStorage.setItem(LR_STEP_PROGRESS, clickedStep + 1);

		history.push(`${this.getLink()}/${clickedStep + 1}`);
	}

	onOk = () => {
		const {  history } = this.props;
		const targetUrl = `${this.getLink()}/1`;

		history.push(targetUrl);
	}

	onCancel = () => {
		this.setState({ modalVisibility: false });
	}

	// Private Function
	getLink = () => {
		return (sessionStorage.getItem(LR_REQUEST_TYPE) === requestTypes.create ? links.createRequest : links.editRequest )
	};

	showPromiseConfirm = () => {
		confirm({
			title: 'Do you want to go back to searching of patient?',
			icon: <ExclamationCircleOutlined />,
			okText: 'Go Back',
			onOk: this.onOk,
			onCancel() {},
		});
	}

	render() {
		const	isInEditMode = sessionStorage.getItem(LR_REQUEST_TYPE) === requestTypes.edit;
		const items = TrackerSettings.stepItems;
		const StepItems = items.map(item => (
			<Step
				key={item.title}
				title={item.description}
				icon={item.icon}
			/>
		));
		const { active } = this.props;
		const { modalVisibility } = this.state;

		return (
			<div>
				<Row>
					<Col sm={{ span: 24 }} md={{ span: 18, offset: 3 }}>
						<Steps
							size="small"
							labelPlacement="vertical"
							current={active}
							style={{ marginTop: 20 }}
							onChange={isInEditMode && active !== 0 ? this.onClickTracker : null}
						>
							{StepItems}
						</Steps>
					</Col>
				</Row>
				<TrackerModal 
					onCancel={this.onCancel} 
					onOK={this.onOk} 
					visibility={modalVisibility} 
					current={active} 
				/>
			</div>
		);
	}
}

Tracker.propTypes = {
	active: PropTypes.number.isRequired,
	requestType: PropTypes.string,
};

Tracker.defaultProps = {
	requestType: null
};

export default withRouter(Tracker);
