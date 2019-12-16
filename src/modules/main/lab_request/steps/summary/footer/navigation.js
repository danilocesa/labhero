import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Typography, Tooltip } from 'antd';
import PropTypes from 'prop-types';

import ConfirmationModal from '../confirmation/modal';

const { Text } = Typography;

class Navigation extends React.Component {
	state = {
		isVisible: false,
	};

	onClickPrint = async () => {
		const { saveExams } = this.props;
		const isSuccess = await saveExams();

		if(isSuccess) this.showModal();
	}

	showModal = () => {
		this.setState({
			isVisible: true,
		});
	};

	closeModal = () => {
		this.setState({
			isVisible: false,
		});
	};

	render() {
		const { isVisible } = this.state;

		const Prompt = !isVisible ? null : (
			<ConfirmationModal visible={isVisible} closeModal={this.closeModal} />
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
								onClick={this.onClickPrint}
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
	saveExams: PropTypes.func.isRequired
}

export default Navigation;
