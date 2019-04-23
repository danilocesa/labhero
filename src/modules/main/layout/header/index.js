import React from 'react';
import { Layout, Button, Row, Col } from 'antd';
import UserMenu from './menu';
import { CompanyLogo } from '../../../../images';



import './header.css';

const { Header: AntHeader } = Layout;

const Header = () => (
  <AntHeader>
    <div>
      <div style={{ display: 'inline-block', width: 250}}>
        <Row>
          <Col span={6} style={{ textAlign: 'center' }}>
            <img src={CompanyLogo} alt="logo" style={{ height: 35, width: 40 }} />
          </Col>
          <Col className="logo-pane">
            <h1>LABHERO</h1>
            <p>MEDICAL CENTER</p>
          </Col>
        </Row>
      </div>
      <div style={{ float: 'right' }}>
        { false && 
          <Button 
            type="primary" 
            shape="round" 
            className="login-btn">
            LOGIN
          </Button>
        }
        <UserMenu />
      </div>
    </div>
  </AntHeader>
);

export default Header;
