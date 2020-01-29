// LIBRARY
import React from 'react';
import PropTypes from 'prop-types';
import { saveLabResult } from 'services/lab_result/result';
import { Button, Modal, Layout, Row, Col } from 'antd';

// IMAGES
import { CheckIcon } from 'images';

// CSS
import './actions.css';

// CONSTANTS
const ButtonGroup = Button.Group;

class Actions extends React.Component {
  state = { 
		isSuccess: false,
		isLoading: false
	};

  onClickSave = () => {
		const { getLabResultFormValues } = this.props;

		const labResultFormValues = getLabResultFormValues();

		if(!labResultFormValues.hasError) {
			this.setState({ isLoading: true }, async () => {
				const update = await saveLabResult(labResultFormValues.examItems);

				console.log(update);

				this.setState({
					isSuccess: true,
				});
			});
		}
  };

  handleOk = e => {
    this.setState({
      isSuccess: false,
    });
  };

  handleCancel = e => {
    this.setState({
      isSuccess: false,
    });
  };

  render() {
		const { isSuccess, isLoading } = this.state;

    return (
	    <div style={{ textAlign: 'right', marginTop: '30px' }} className="action-container">
				<Button 
					loading={isLoading}
					className="save-button" 
					onClick={this.onClickSave}
				>
					SAVE
				</Button>
		    <div>
					<Modal
						className="save-modal-container"
						visible={isSuccess}
						footer={[
							<Layout>
							<ButtonGroup>
								<Button
									href="/"
									className="left-btn"
									style={{ width: '50%' }}
									onClick={this.handleOk}
								>
									Go to Homepage
								</Button>
								<Button
									href="/"
									className="right-btn"
									style={{ width: '50%' }}
									onClick={this.handleCancel}
								>
									Search Again
								</Button>
							</ButtonGroup>
							</Layout>,
						]}
					>
						<Row type="flex" justify="center">
							<Col>
								{' '}
								<img
									src={CheckIcon}
									alt="logo"
									style={{ height: 65, width: 50, paddingBottom: '1em' }}
								/>
							</Col>
						</Row>
						<p className="successful-msg">You have successfully saved a result!</p>
						<p style={{ textAlign: 'center' }}>
							A notification will be sent once the request has been verified.
						</p>
					</Modal>
		    </div>
	    </div>
    );
  }
}

Actions.propTypes = {
	getLabResultFormValues: PropTypes.func.isRequired
};

export default Actions;
