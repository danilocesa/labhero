import React from 'react';
import { Layout, Button, Row, Col } from 'antd';
import { PatientImgPlaceholder } from 'images';
import UserMenu from './menu';

import './header.css';

const { Header: AntHeader } = Layout;

const Header = () => (
  <AntHeader className="main-header">
    <div>
      <div style={{ display: 'inline-block', width: 250 }}>
        <Row>
          <Col span={6} style={{ textAlign: 'center' }}>
            <img src={PatientImgPlaceholder} alt="logo" style={{ height: 40, width: 40, borderRadius:'50%' }} />
          </Col>
          <Col className="logo-pane">
            <h1>HOSPITAL/LAB NAME</h1>
            <p>HOSPITAL/LAB NAME</p>
          </Col>
        </Row>
      </div>
      <div style={{ float: 'right' }}>
        {false && (
          <Button type="primary" shape="round" className="login-btn">
            LOGIN
          </Button>
        )}
        <UserMenu />
      </div>
    </div>
  </AntHeader>
);

export default Header;
