import React from 'react';
import { Layout } from 'antd';
import NavBar from './NavBar';
import { Icon } from 'antd';

const { Header} = Layout;

/* eslint-disable react/prefer-stateless-function */
class HeaderLayout extends React.Component {
  render() {
    return (
      <div >
        <NavBar>
          <Header>
            <Icon type="edit" />
          </Header>
        </NavBar>
      </div>
    );
  }
}

export default HeaderLayout;
