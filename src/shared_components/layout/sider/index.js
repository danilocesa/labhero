import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

import { ReactComponent as HomeIcon } from '../../../icons/home.svg';
import { ReactComponent as AddIcon } from '../../../icons/add.svg';
import { ReactComponent as SearchIcon } from '../../../icons/search.svg';
import { ReactComponent as PleboIcon } from '../../../icons/syringe.svg';

import './sider.css';

const { Sider: AntSider } = Layout;

class Sider extends React.Component {
  render() {
    return (
      <AntSider
        // breakpoint="lg"
        // collapsedWidth="0"
        trigger={null}
        collapsible
        collapsed={this.props.collapsed}
      >
        <div className="logo" />
        <Menu className="side-menu" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Link to="/dashboard">
              <Icon component={HomeIcon} />
              <span>DASHBOARD</span>
            </Link>
            <span>HOME</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/request/create/step/1">
              <Icon component={AddIcon} />
              <span>REQUEST</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/searchlabresult">
              <Icon component={SearchIcon} />
              <span>SEARCH</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/pleboresult">
              <Icon component={PleboIcon} />
              <span>PLEBO</span>
            </Link>
          </Menu.Item>
        </Menu>
      </AntSider>
    );
  }
}

export default Sider;
