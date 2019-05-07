import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Typography } from 'antd';

const { Text } = Typography;

class Navigation extends React.Component {
  state = { disabled: true };

  componentWillReceiveProps() {
    this.setState((state, props) => ({
      disabled: props.fields.firstname && props.fields.lastname ? false : true,
    }));
  }

  render() {
    return (
      <Row style={{ marginTop: 10 }}>
        <Col sm={{ span: 12 }} md={{ span: 4, offset: 20 }}>
          <Link to="/request/create/step/1">
            <Text>
              <u>BACK</u>
            </Text>
          </Link>
          <Button
            className="nav-btn-round"
            type="primary"
            style={{ marginLeft: 20 }}
            disabled={this.state.disabled}
          >
            <Link to="/request/create/step/3">NEXT STEP</Link>
          </Button>
        </Col>
      </Row>
    );
  }
}

export default Navigation;
