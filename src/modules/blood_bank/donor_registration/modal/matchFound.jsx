// LIBRARY
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Modal } from 'antd';

// @ts-ignore
import { CheckIcon } from 'images';


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
            <img
              src={CheckIcon}
              alt="logo"
              style={{ height: 65, width: 50, paddingBottom: '1em' }}
            />
          </Col>
        </Row>
        <Row justify="center">
          <Col>
            <h2>Match Found!</h2>
          </Col>
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
