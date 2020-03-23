// LIBRARY
import React from 'react';
import PropTypes from 'prop-types';
import { Steps, Icon, Row, Col } from 'antd';
import TrackerModal from './tracker_modal';
import TrackerSettings from './settings';

// CSS
import './tracker.css';

const { Step } = Steps;
const { requestTypes } = TrackerSettings;
const { links } = TrackerSettings;


// eslint-disable-next-line react/prefer-stateless-function
class Tracker extends React.Component {
	state = {
		current: 0,
		modalVisibility: false
	};

	onClickTracker = clickedStep => {	
		const { active } = this.props;

		if(active === 0)
			return;

		if(active !== 0 && clickedStep === 0) { 
			this.setState({ modalVisibility: true });
		}
		else {
			const targetUrl = `${this.getLink()}/${clickedStep}`;
			
			window.location.assign(targetUrl);
		}
	}

	onOk = () => {
		const targetUrl = `${this.getLink()}/1`;

		window.location.assign(targetUrl);
	}

	onCancel = () => {
		this.setState({ modalVisibility: false });
	}

	// Private Function
	getLink = () => {
		return (sessionStorage.getItem('REQUEST_TYPE') === requestTypes.create ? links.createRequest : links.editRequest )
	};

	render() {
		const items = TrackerSettings.stepItems;
		const StepItems = items.map(item => (
			<Step
				key={item.title}
				title={item.description}
				icon={<Icon type={item.icon} />}
			/>
		));
		const { active } = this.props;
		const { current, modalVisibility } = this.state;
	
		return (
			<div>
				<Row>
					<Col sm={{ span: 24 }} md={{ span: 18, offset: 3 }}>
						<Steps
							size="small"
							labelPlacement="vertical"
							current={active || current}
							style={{ marginTop: 20 }}
							// onChange={this.onClickTracker}
						>
							{StepItems}
						</Steps>
					</Col>
				</Row>
				<TrackerModal 
					onCancel={this.onCancel} 
					onOK={this.onOk} 
					visibility={modalVisibility} 
					current={active || current} 
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

export default Tracker;
