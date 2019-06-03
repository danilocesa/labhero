import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Row, Col, Button, Typography, Tooltip } from 'antd';

import ConfirmationModal from '../../confirmation/modal';

const { Text } = Typography;

class Navigation extends React.Component {
	state = {
		displayModal: false,
	};

	showModal = () => {
		this.setState({
			displayModal: true,
		});
	};

	closeModal = () => {
		const { history } = this.props;

		this.setState({
			displayModal: false,
		});

		history.push('/request/create/step/1');
	};

	render() {
		const { displayModal } = this.state;

		const Prompt = !displayModal ? null : (
			<ConfirmationModal visible={displayModal} closeModal={this.closeModal} />
		);

		return (
			<div>
				<Row type="flex" justify="end">
					<Col>
						<Link to="/request/create/step/3">
							<Text>
								<u>BACK</u>
							</Text>
						</Link>
						<Tooltip title="Print and Save">
							<Button
								className="nav-btn-round"
								type="primary"
								onClick={this.showModal}
								style={{ marginLeft: 20 }}
							>
								PRINT
							</Button>
						</Tooltip>
					</Col>
				</Row>
				{Prompt}
			</div>
		);
	}
}

Navigation.propTypes = {
	history: ReactRouterPropTypes.history.isRequired
};

export default withRouter(Navigation);
