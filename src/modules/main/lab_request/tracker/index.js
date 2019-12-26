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
const {links} = TrackerSettings;


// eslint-disable-next-line react/prefer-stateless-function
class Tracker extends React.Component {
	state={
		current: 0,
		modalVisibility: false
	};
	
	dynamicLink = () => {
		return (sessionStorage.getItem('REQUEST_TYPE') === requestTypes.create ? links.createRequest : links.editRequest )
	};

	closeModal = () =>{
		this.setState({modalVisibility:false});
	};

	openModal = () =>{
		this.setState({modalVisibility:true});
	};

	onClickTracker = clickedStep => {
		
		const nextSteps =  clickedStep + 1;
		let clickedVal = false;

		if(this.props.active === 0){ // Prevent click if in step is currently in search patient
			return false;
		}

		if(clickedStep === 0){ // Show modal confirmation if step is not in search patient
			this.openModal();
		}

		if(this.props.requestType === requestTypes.create && nextSteps < clickedStep){
			clickedVal = false;
		}else{
			this.setState({current: clickedStep});
			clickedVal = true;
		}
		return clickedVal;
	}

	handleRedirect = (isClicked, clickedStep) =>{
		const nextSteps =  clickedStep;
		const targetUrl = `${this.dynamicLink()}/${nextSteps}`;
		if(isClicked){
			window.location.assign(targetUrl);
		}
	}

	handleCancelModal = (isCancelled) =>{
		if(isCancelled){
			this.closeModal();
		}
	}

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
							onChange={this.onClickTracker}
						>
							{StepItems}
						</Steps>
					</Col>
				</Row>
				<TrackerModal 
					onCancel={this.handleCancelModal} 
					onOK={this.handleRedirect} 
					visibility={modalVisibility} 
					current={active || current} 
				/>
			</div>
		);
	}
}

Tracker.propTypes = {
	active: PropTypes.number.isRequired,
	requestType: PropTypes.string.isRequired,
};

export default Tracker;
