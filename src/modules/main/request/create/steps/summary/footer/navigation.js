import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Typography, Layout, Modal } from 'antd';
import { CheckIcon } from '../../../../../../../images';

import ConfirmationModal from '../../confirmation/modal';

const { Text } = Typography;
const ButtonGroup = Button.Group;


class Navigation extends React.Component {
  state = {
    displayModal: false
  };
  
  showModal = () => {
    this.setState({
      displayModal: true
    });
  }

  closeModal = () => {
    this.setState({
      displayModal: false
    });
  }
  
  render() {
    return (
      <div>
        <Row type="flex" justify="end">
          <Col>
            <Link to="/request/create/step/3">
              <Text><u>BACK</u></Text>
            </Link>
            <Button className="nav-btn-round"
                    type="primary"
                    onClick={this.showModal}
                    style={{ marginLeft: 20 }}>
              SAVE
            </Button>
          </Col>
        </Row>
        <ConfirmationModal visible={this.state.displayModal} 
                           closeModal={this.closeModal}/>
      </div>
    );
  }
}

export default Navigation;