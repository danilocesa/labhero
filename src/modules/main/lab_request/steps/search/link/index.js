// LIBRARY
import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { LR_STEP_PROGRESS } from 'modules/main/lab_request/steps/constants'; 

// CSS
import './link.css';

class ButtonLink extends React.Component {
	onClick = () => {
		const { history } = this.props;

		sessionStorage.setItem(LR_STEP_PROGRESS, String(2));
		
		history.push('/request/create/step/2');
	}

	render() {
		// const { dataLength } = this.props;

		// if(dataLength > 0) return null;

		return (
			<div style={{ textAlign: 'center' }}>
				<button 
					type="button" 
					className="ButtonLink"
					onClick={this.onClick}
				>
					<PlusOutlined />
					<span style={{ marginLeft: 5 }}>CREATE REQUEST</span>
				</button>
			</div>
		);
	}
}

ButtonLink.propTypes = { 
	// dataLength: PropTypes.number.isRequired,
	history: ReactRouterPropTypes.history.isRequired
}

export default withRouter(ButtonLink);