// LIBRARY
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Modal } from 'antd';

import { CheckIcon } from 'images';


class NotifModal extends React.Component {
  render() {
		const { isDisplay } = this.props;

		return (
      <Modal
        visible={isDisplay}
        maskClosable
        footer={<></>}
      >
        <Row type="flex" justify="center">
          <Col>
            <img
              src={CheckIcon}
              alt="logo"
              style={{ height: 65, width: 50, paddingBottom: '1em' }}
            />
          </Col>
          <Col>
            <p>You have successfully saved a result!</p>
          </Col>
          <Col>
            <p>A notification will be sent once the request has been verified.</p>
          </Col>
        </Row>
      </Modal>
    );
  }
}

NotifModal.propTypes = {
  isDisplay: PropTypes.bool.isRequired
};

export default NotifModal;
