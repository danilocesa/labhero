import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Typography } from 'antd';

const { Text } = Typography;

class Navigation extends React.Component {
  render() {
    return (
      <Row type="flex" justify="end">
        <Col>
          <Link to="/request/create/step/3">
            <Text><u>BACK</u></Text>
          </Link>
          <Button className="nav-btn-round"
                  type="primary"
                  style={{ marginLeft: 20 }}>
            SAVE
          </Button>
        </Col>
      </Row>
    );
  }
}

export default Navigation;