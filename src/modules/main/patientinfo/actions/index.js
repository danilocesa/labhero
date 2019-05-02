import React from 'react';
import { Button, Layout, Modal } from 'antd';
import 'antd/dist/antd.css';

import './buttons.css'

const ButtonGroup = Button.Group;

class Actions extends React.Component {
      state = { visible: false }

      showModal = () => {
      this.setState({
            visible: true,
      });
      }

      handleOk = (e) => {
      console.log(e);
      this.setState({
            visible: false,
      });
      }

      handleCancel = (e) => {
      console.log(e);
      this.setState({
            visible: false,
      });
      }

      render() {
            return(
                  <div style = {{ textAlign:'right', marginTop: '30px' }} className = "action-container">
                        <Button href = "#" className = "back-button">Back</Button>
                        <Button href = "#" className = "save-button" onClick={this.showModal} >SAVE</Button>
                        <div className = "save-modal-container">
                              <Modal
                              visible={this.state.visible}
                              footer={[
                                    <Layout>
                                          <ButtonGroup>
                                                <Button style= {{ width: '50%' }} onClick={this.handleOk} >Go to Homepage</Button>
                                                <Button style= {{ width: '50%' }} onClick={this.handleCancel} >Search Again</Button>
                                          </ButtonGroup>
                                    </Layout>
                              ]}
                              >
                                    <p className = "successful-msg">You have successfully saved a result!</p>
                                    <p style = {{ textAlign: 'center' }}>A notification will be sent once the request has been verified.</p>
                              </Modal>
                        </div>
                  </div>
            );
      }
}

export default Actions;