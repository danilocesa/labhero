import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Typography } from 'antd';

const { Text } = Typography;

class Navigation extends React.Component {
  render() {
    return (
      <Row>
        <Col sm={{ span: 12 }} md={{ span: 4, offset: 20 }} >
          <Link to="/request/create/step/2">
            <Text><u>BACK</u></Text>
          </Link>
          <Button className="nav-btn-round"
                  type="primary"
                  style={{ marginLeft: 20 }}>
            <Link to="/request/create/step/4">NEXT STEP</Link>
          </Button>
        </Col>
      </Row>
    );
  }
}

export default Navigation;