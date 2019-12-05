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
	},
	{
		title: 'Step 2',
		description: 'Fill up',
		icon: 'form',
	},
	{
		title: 'Step 3',
		description: 'Select Lab Test',
		icon: 'check-square',
	},
	{
		title: 'Step 4',
		description: 'Summary',
		icon: 'idcard',
	}
];

// eslint-disable-next-line react/prefer-stateless-function
class Tracker extends React.Component {
	state = { current: 0 }

	onClickTracker = current => {
		console.log('onChange:', current);
		const nextSteps = current + 1;
		if(this.props.requestType === 1 && nextSteps > current){
			return false;
		}
		this.setState({ current });
    
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
<<<<<<< HEAD:src/modules/main/lab_request/create/tracker/index.js
						onChange={this.onChange}
=======
						onChange={this.onClickTracker}
>>>>>>> 04ce0b65521826bc7ebe41586bfb69f570bab9fd:src/modules/main/lab_request/tracker/index.js
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
