// LIBRARY
import React from 'react';
import PropTypes from 'prop-types';
import { Steps, Icon, Row, Col } from 'antd';
import TrackerModal from './tracker_modal';

// CSS
import './tracker.css';

const { Step } = Steps;



// eslint-disable-next-line react/prefer-stateless-function
class Tracker extends React.Component {
	state={
		current: 0,
		modalVisibility: false
	};
	
	dynamicLink = () => {
		return (sessionStorage.getItem('REQUEST_TYPE') === 'create' ? "/request/create/step" : "/request/edit/step" )
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

		if(this.props.requestType === 'create' && nextSteps < clickedStep){
			clickedVal = false;
		}else{
			this.setState({current: clickedStep});
			clickedVal = true;
		}
		return clickedVal;
	}

	handleRedirect = (isClicked, clickedStep) =>{
		// console.log('TCL -> param', isClicked,clickedStep);
		const nextSteps =  clickedStep;
		const targetUrl = `${this.dynamicLink()}/${nextSteps}`;
		console.log(targetUrl);
		if(isClicked){
			window.location.assign(targetUrl);
		}
	}

	render() {
		const items = [
			{
				title: 'Step 1',
				description: 'Search Patient',
				icon: 'search'
			},
			{
				title: 'Step 2',
				description: 'Fill up',
				icon: 'form'
			},
			{
				title: 'Step 3',
				description: 'Select Lab Test',
				icon: 'check-square'
			},
			{
				title: 'Step 4',
				description: 'Summary',
				icon: 'idcard'
			}
		];
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
				<TrackerModal onCancel={this.closeModal} onOK={this.handleRedirect} visibility={modalVisibility} current={active || current} />
			</div>
		);
	}
}

Tracker.propTypes = {
	active: PropTypes.number.isRequired,
	requestType: PropTypes.string.isRequired,
};

export default Tracker;
