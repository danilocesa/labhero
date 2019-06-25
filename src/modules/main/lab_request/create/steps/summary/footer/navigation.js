import React from 'react';
import { Link } from 'react-router-dom';
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
		this.setState({
			displayModal: false,
		});
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

export default Navigation;
