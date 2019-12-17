// LIBRARY
import React from 'react';
import PropTypes from 'prop-types';
import { Steps, Icon, Row, Col } from 'antd';

// CSS
import './tracker.css';

const { Step } = Steps;



// eslint-disable-next-line react/prefer-stateless-function
class Tracker extends React.Component {
	state={
		current: 0,
	};
	
	dynamicLink = () => {
		return (sessionStorage.getItem('REQUEST_TYPE') === 'create' ? "/request/create/step" : "/request/edit/step" )
	};

	onClickTracker = clickedStep => {
		if(this.props.active === 0){ // Prevent click if in step is currently in search patient
			return false;
		}

		if(clickedStep === 0){ // Show modal confirmation if step is not in search patient

		}

		const nextSteps = clickedStep + 1;
		const targetUrl = `${this.dynamicLink()}${nextSteps}`;
		let clickedVal = false;

		if(this.props.requestType === 'create' && nextSteps < clickedStep){
			clickedVal = false;
		}else{
			this.setState({current: clickedStep});
			window.location.assign(targetUrl);
			clickedVal = true;
		}
		return clickedVal;
	}

	render() {
		const items = [
			{
				title: 'Step 1',
				description: 'Search Patient',
				icon: 'search',
				link: `${this.dynamicLink()}/1`,
			},
			{
				title: 'Step 2',
				description: 'Fill up',
				icon: 'form',
				link: `${this.dynamicLink()}/2`,
			},
			{
				title: 'Step 3',
				description: 'Select Lab Test',
				icon: 'check-square',
				link: `${this.dynamicLink()}/3`,
			},
			{
				title: 'Step 4',
				description: 'Summary',
				icon: 'idcard',
				link: `${this.dynamicLink()}/4`,
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
		const { current } = this.state;

		return (
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
		);
	}
}

Tracker.propTypes = {
	active: PropTypes.number.isRequired,
	requestType: PropTypes.number.isRequired,
};

export default Tracker;
