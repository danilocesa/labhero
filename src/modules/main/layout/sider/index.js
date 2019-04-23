import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import './sider.css';

const { Sider: AntSider } = Layout;

class Sider extends React.Component {
  
  render() {
    return (
      <AntSider
        trigger={null}
        collapsible
        collapsed={this.props.collapsed}
      >
        <div className="logo" />
        <Menu className="side-menu" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Link to="/dashboard">
              <Icon type="home" className="sidenav-icon" />
            </Link>
            <span>HOME</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/request/add">
              <Icon type="plus" className="sidenav-icon" />
              <span>REQUEST</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="search" className="sidenav-icon" />
            <span>SEARCH</span>
          </Menu.Item>
        </Menu>
      </AntSider>
    );
  }
}

export default Sider;