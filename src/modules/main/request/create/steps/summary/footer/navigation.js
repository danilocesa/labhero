import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Typography, Layout, Modal } from 'antd';
import { CheckIcon } from '../../../../../../../images';

const { Text } = Typography;
const ButtonGroup = Button.Group;


class Navigation extends React.Component {
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
    return (
      <Row type="flex" justify="end">
        <Col>
          <Link to="/request/create/step/3">
            <Text><u>BACK</u></Text>
          </Link>
          <Button className="nav-btn-round"
                  type="primary"
                  style={{ marginLeft: 20 }}
                  onClick={this.showModal}>
            SAVE
          </Button>
          <div className="save-modal-container">
          <Modal
          visible={this.state.visible}
          footer={[
            <Layout>
              <ButtonGroup>
                <Button href="/" style={{ width: '50%' }} onClick={this.handleOk}>Go to Homepage</Button>
                <Button href="/" style={{ width: '50%' }} onClick={this.handleCancel}>Search Again</Button>
              </ButtonGroup>
            </Layout>]}>
            <Row type="flex" justify="center" >
              <Col> <img src={CheckIcon} alt="logo" style={{ height: 65, width: 50, paddingBottom: '1em' }} /></Col>
            </Row>
            <p className="successful-msg">You have successfully saved a result!</p>
            <p style={{ textAlign: 'center' }}>A notification will be sent once the request has been verified.</p>
          </Modal>
        </div>
        </Col>
      </Row>
    );
  }
}

export default Navigation;