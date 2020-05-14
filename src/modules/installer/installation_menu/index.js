import React from 'react';
import { Row, Col } from 'antd';
import ConfigSection from './config_section';
import ModulesSection from './modules_section';

class InstallationMenu extends React.Component {
  render() {
    return (
      <div>
        <Row type="flex" justify="center">
          <Col span={16}>
            <ConfigSection />
            <ModulesSection />
          </Col>
        </Row>
      </div>
    );
  }
}

export default InstallationMenu;
