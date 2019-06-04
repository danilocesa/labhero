import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';
import { Icon } from 'antd';

import './link.css';

import { CLR_STEP_PROGRESS } from 'modules/main/lab_request/create/steps/constants'; 

class ButtonLink extends React.Component {
	onClick = () => {
		const { history } = this.props;
		sessionStorage.setItem(CLR_STEP_PROGRESS, String(2));

		history.push('/request/create/step/2');
	}

	render() {
		const { dataLength } = this.props;

		if(dataLength > 0) return null;

		return (
			<div style={{ textAlign: 'center', marginTop: 15 }}>
				<button 
					type="button" 
					className="ButtonLink"
					onClick={this.onClick}
				>
					<Icon type="plus" />
					<span style={{ marginLeft: 5 }}>CREATE REQUEST</span>
				</button>
			</div>
		);
	}
}

ButtonLink.propTypes = { 
	dataLength: PropTypes.number.isRequired,
	history: ReactRouterPropTypes.history.isRequired
}

export default withRouter(ButtonLink);