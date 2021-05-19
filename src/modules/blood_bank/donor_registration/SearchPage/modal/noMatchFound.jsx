// LIBRARY
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Modal, Button } from 'antd';

// @ts-ignore


class NotifModal extends React.Component {

  render() {
		const { isDisplay, hideModal } = this.props;

		return (
    <Row onClick={hideModal}>
      <Modal
        visible={isDisplay}
        maskClosable
        footer={<></>}
      >
       <Row justify="center">
            <Col>
              <h1> NO MATCH FOUND! </h1>
            </Col>
            <Row>
              <Col style={{marginRight: 5}}>
                <Button>REGISTER</Button>
              </Col>
              <Col style={{marginLeft: 5}}>
                <Button>SCAN AGAIN</Button>
              </Col>
            </Row>
          </Row>
      </Modal>
    </Row>
    );
  }
}

NotifModal.propTypes = {
  isDisplay: PropTypes.bool.isRequired
};

export default NotifModal;
