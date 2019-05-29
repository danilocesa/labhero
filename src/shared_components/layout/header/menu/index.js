// @ts-nocheck
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Dropdown, Menu, Icon, Typography, Avatar } from 'antd';


// CUSTOM MODULES
import checkAuth from 'shared_components/auth';
// import {userData} from 'shared_components/constant-global';
// CSS
import './menu.css';

const { Text } = Typography;

const menu = (
	<Menu>
    <Menu.Item>
	<a
rel="noopener noreferrer"
href="#"
	onClick={() => {
          checkAuth.signout();
          }}
      >
        Logout
 </a>
    </Menu.Item>
  </Menu>
);

class UserMenu extends React.Component {
  render() {
    const userData = sessionStorage.userData ? JSON.parse(sessionStorage.userData) : null;
    if(userData){
      return (
        <div className="user-menu">
          <div className="user-menu-text">
            <Text strong>{`${userData.givenName} ${userData.lastName}`}</Text>
            <Text>{`${userData.loginTypeName}`}</Text>
          </div>
          <div className="user-menu-avatar">
            <Avatar>{`${userData.givenName.charAt(0)}${userData.lastName.charAt(0)}`}</Avatar>
          </div>
          <div className="user-menu-icon">
            <Dropdown overlay={menu} trigger={['click']}>
              <a className="ant-dropdown-link" href="">
                <Icon type="down" />
              </a>
            </Dropdown>
          </div>
        </div>
      );
    } 
    else{
      return(<div></div>);
    }
    
    
  }
}

export default UserMenu;
