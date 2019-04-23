import React from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './header';
import Content from './content';
import Sider from './sider';

import './layout.css';

class MainLayout extends React.Component {
  state = {
    collapsed: true,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Header />
          <Layout>
            <Sider collapsed={this.state.collapsed}/>
            <Content />
          </Layout>
        </Layout>
      </Router>
    );
  }
  
}

export default MainLayout;
