// LIBRARY
import React from 'react';
import PropTypes from 'prop-types';
import { Steps, Icon, Row, Col } from 'antd';

// CSS
import './tracker.css';

const { Step } = Steps;

const items = [
	{
		title: 'Step 1',
		description: 'Search Patient',
		icon: 'search',
		link: '/request/create/step/1',
	},
	{
		title: 'Step 2',
		description: 'Fill up',
		icon: 'form',
		link: '/request/create/step/2',
	},
	{
		title: 'Step 3',
		description: 'Select Lab Test',
		icon: 'check-square',
		link: '/request/create/step/3',
	},
	{
		title: 'Step 4',
		description: 'Summary',
		icon: 'idcard',
		link: '/request/create/step/4',
	}
];

// eslint-disable-next-line react/prefer-stateless-function
class Tracker extends React.Component {
	
	onClickTracker = current => {
		const nextSteps = current + 1;
		const targetUrl = `/request/create/step/${nextSteps}`;
		if(this.props.requestType === 1 && nextSteps > current){
			return false;
		}
		window.location.assign(targetUrl);
	}

	render() {
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
	requestType: PropTypes.number.isRequired
};

export default Tracker;
