// LIBRARY
import React from 'react';
import PropTypes from 'prop-types';
import { saveLabResult } from 'services/lab_result/result';
import { Button, Modal, Row, Col } from 'antd';

// IMAGES
import { CheckIcon } from 'images';

// CSS
import './actions.css';

class Actions extends React.Component {
	constructor(props) {
		super(props);

		this.timer = null;
		this.countdownTime = 2500;
		this.state = { 
			isDisplayModal: false,
			isLoading: false,
		};
	}

	componentWillUnmount() {
		clearTimeout(this.timer);
	}
	

  onClickSave = () => {
		const { getLabResultFormValues } = this.props;

		const labResultFormValues = getLabResultFormValues();

		if(!labResultFormValues.hasError) {
			this.setState({ isLoading: true }, async () => {
				await saveLabResult(labResultFormValues.examItems);

				this.setState({ isLoading: false, isDisplayModal: true });

				this.timer = setTimeout(() => {
					this.setState({ isDisplayModal: false });
				}, this.countdownTime);
			});
		}
  };

  render() {
		const { isDisplayModal, isLoading } = this.state;

    return (
	    <div style={{ textAlign: 'right', marginTop: '30px' }} className="action-container">
				<Button 
					loading={isLoading}
					className="action-button" 
					onClick={this.onClickSave}
					
				>
					APPROVE
				</Button>
				<Button 
					loading={isLoading}
					className="action-button" 
					onClick={this.onClickSave}
					
				>
					PRINT
				</Button>
				<Button 
					loading={isLoading}
					className="action-button" 
					onClick={this.onClickSave}
					
				>
					SAVE
				</Button>
		    
				<Modal
					// className="save-modal-container"
					visible={isDisplayModal}
					maskClosable
					footer={<></>}
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
					<p className="successful-msg">
						You have successfully saved a result!
					</p>
					<p style={{ textAlign: 'center' }}>
						A notification will be sent once the request has been verified.
					</p>
				</Modal>
	    </div>
    );
  }
}

Actions.propTypes = {
	getLabResultFormValues: PropTypes.func.isRequired
};

export default Actions;
