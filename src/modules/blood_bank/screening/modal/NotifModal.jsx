// LIBRARY
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Modal, Input  } from 'antd';
import "./styles.css";

// @ts-ignore
import { CheckIcon } from 'images';
const { TextArea } = Input;


class NotifModal extends React.Component {

  onChange = (value) => {
    const { onOk, isDisplay, onChange } = this.props;
    onChange(value.target.value);
  }

  render() {
		const { isDisplay, hideModal, onOk, title } = this.props;

		return (
    <Row>
      <Modal
        className='ant-modal-body'
        title={title}
        centered={true}
        style={{padding: 5}}
        visible={isDisplay}
        onOk={onOk}
        onCancel={hideModal}
        // maskClosable
        width={500}
      >
        <Row justify="center">
          
        </Row>
        <Row justify="center">
          <Col style={{fontWeight: 'bold'}}>
            REMARKS
            <TextArea rows={4} style={{width: 800}} onChange={this.onChange} />
          </Col>
        </Row>
      </Modal>
    </Row>
    );
  }
}

NotifModal.propTypes = {
  isDisplay: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired
};

export default NotifModal;
