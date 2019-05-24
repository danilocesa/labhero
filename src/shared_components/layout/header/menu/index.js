/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Dropdown, Menu, Icon, Typography, Avatar } from 'antd';


// CUSTOM MODULES
import checkAuth from 'shared_components/auth';
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
    return (
	<div className="user-menu">
	<div className="user-menu-text">
	<Text strong>NICOLE ESPOSO</Text>
	<Text>Receptionist</Text>
        </div>
	<div className="user-menu-avatar">
	<Avatar>NE</Avatar>
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
}

export default UserMenu;
