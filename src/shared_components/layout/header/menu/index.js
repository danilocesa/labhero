// @ts-nocheck
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Menu, Typography, Avatar, Button } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import { DownOutlined } from '@ant-design/icons';

// CUSTOM MODULES
import auth from 'services/login/auth';
// import {userData} from 'shared_components/constant-global';
// CSS
import './menu.css';  

const { Text } = Typography;

const menu = (
	<Menu>
    <Menu.Item>
			<a
				rel="noopener noreferrer"
        onClick={() => {auth.signout();}}
        role="button"
        onKeyDown={() => {auth.signout();}}
        tabIndex={0}
			>
        Logout
			</a>
    </Menu.Item>
  </Menu>
);

class UserMenu extends React.Component {
  render() {
    const LOGGEDIN_USER_DATA = sessionStorage.LOGGEDIN_USER_DATA ? JSON.parse(sessionStorage.LOGGEDIN_USER_DATA) : null;

    if(LOGGEDIN_USER_DATA){
      return (
      <Dropdown overlay={menu} trigger={['click']}>
        <Button type="link" className="ant-dropdown-link">
          <div className="user-menu">
            <div className="user-menu-text">
              <Text strong>{`${LOGGEDIN_USER_DATA.givenName} ${LOGGEDIN_USER_DATA.lastName}`}</Text>
              <Text>{`${LOGGEDIN_USER_DATA.loginTypeName}`}</Text>
            </div>
            <div className="user-menu-avatar">
              <Avatar>{`${LOGGEDIN_USER_DATA.givenName.charAt(0)}${LOGGEDIN_USER_DATA.lastName.charAt(0)}`}</Avatar>
            </div>
            <div className="user-menu-icon">
              <DownOutlined />
            </div>
          </div>
        </Button>
      </Dropdown>
      );
		} 
    return (
      <Link to="/login">
        <Button className="ant-btn ant-btn-round login-btn">Login</Button>
      </Link>
    )
  }
}

export default UserMenu;
