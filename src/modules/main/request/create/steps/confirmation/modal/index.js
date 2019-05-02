import React from 'react';
import { Modal, Layout, Button, Row, Col } from 'antd';
import { CheckIcon } from '../../../../../../../images';

const ButtonGroup = Button.Group;

class ConfirmationModal extends React.Component {
  render() {
    const Footer = (
      [
        <Layout key="1">
          <ButtonGroup>
            <Button href="/"
                    className="left-btn" 
                    style= {{ width: '50%' }} 
                    onClick={this.props.closeModal}>
              Go to Homepage
            </Button>
            <Button href="/"
                    className="right-btn" 
                    style= {{ width: '50%' }} 
                    onClick={this.props.closeModal}>
              Search Again
            </Button>
          </ButtonGroup>
        </Layout>
      ]
    );

    return (
      <div>
        <Modal className="save-modal-container"
              visible={this.props.visible}
              footer={Footer}
        >
          <Row type="flex" justify="center" >
            <Col> <img src={CheckIcon} 
                       alt="logo" 
                       style={{ height: 65, width: 50, paddingBottom: '1em' }}/>
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

export default ConfirmationModal;