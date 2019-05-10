// LIBRARY
import React from 'react';
import { Button, Modal, Layout, Row, Col } from 'antd';

// IMAGES
import { CheckIcon } from '../../../../images';

// CSS
import './actions.css';

// CONSTANTS
const ButtonGroup = Button.Group;

class Actions extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
	    <div style={{ textAlign: 'right', marginTop: '30px' }} className="action-container">
		    {/* <Button href="#" className="back-button">
          Back
		    </Button> */}
		    <Button href="#" className="save-button" onClick={this.showModal}>
            SAVE
		    </Button>
		    <div>
			  <Modal
				  className="save-modal-container"
				  visible={this.state.visible}
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

export default Actions;
