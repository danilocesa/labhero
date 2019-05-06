import React from 'react';
import { Button, Layout, Modal, Row, Col } from 'antd';
import { CheckIcon } from '../../../../images';
// import 'antd/dist/antd.css';

import './actions.css'

const ButtonGroup = Button.Group;

const ModalContent = (
  <div>
    <img src={CheckIcon} alt="check icon" height='70px' width='auto' style={{marginBottom:'10px'}} />
    <p>You have successfully saved a result!</p>
    <p>A notification will be sent once the request has been verified.</p>
  </div>
);

class Actions extends React.Component {
  state = { visible: false }

  showModal = () => {
  this.setState({
    visible: true,
  });
  }

  handleCancel = (e) => {
  console.log(e);
  this.setState({
    visible: false,
  });
  }

  countDown = () => {
    let secondsToGo = 3;
    const modal = Modal.success({
      title: '',
      content: ModalContent,
      className: 'save-patientinfo-modal'
    });
    const timer = setInterval(() => {
      secondsToGo -= 1;
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      modal.destroy();
    }, secondsToGo * 1000);
  }

  render() {
    return(
      <div style={{ textAlign:'right', marginTop: '30px' }} className ="action-container">
        <Button href="#" className="back-button">Back</Button>
        <Button href="#" className="save-button" onClick={this.countDown}>SAVE</Button>
      </div>
    );
  }
}

export default Actions;