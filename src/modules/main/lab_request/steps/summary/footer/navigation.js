import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Typography, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import { LR_REQUEST_TYPE } from 'modules/main/lab_request/steps/constants';
import { requestLinks, requestTypes } from 'modules/main/settings/lab_exam_request/settings';
import ConfirmationModal from '../confirmation/modal';

const { Text } = Typography;

class Navigation extends React.Component {
	state = {
		isVisible: false,
		isLoading: false
	};

	onClickPrint = () => {
		const { saveForCreate, saveForEdit } = this.props;
		let isSuccess = false;

		this.setState({ isLoading: true }, async () => {
			if(sessionStorage.getItem(LR_REQUEST_TYPE) === 'edit')
				isSuccess = await saveForEdit();
			else
				isSuccess = await saveForCreate();

			if(isSuccess) 
				this.showModal();

			this.setState({ isLoading: false });
		});
	
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
		const { isVisible, isLoading } = this.state;

		const Prompt = !isVisible ? null : (
			<ConfirmationModal visible={isVisible} closeModal={this.closeModal} />
		);

		const dynamicLink = (sessionStorage.getItem(LR_REQUEST_TYPE) === requestTypes.create) 
			? requestLinks.create.step3
			: requestLinks.edit.step3;

		return (
			<div>
				<Row justify="end">
					<Col>
						<Link to={dynamicLink}>
							<Text>
								<u>BACK</u>
							</Text>
						</Link>
						<Tooltip title="Print and Save">
							<Button
								loading={isLoading}
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
	saveForCreate: PropTypes.func.isRequired,
	saveForEdit:  PropTypes.func.isRequired,
}

export default Navigation;
