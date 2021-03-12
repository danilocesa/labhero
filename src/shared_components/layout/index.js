import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { Router } from 'react-router-dom';  
import { createBrowserHistory } from 'history'; 
import { UserAccessContext } from 'context/userAccess';
import { ACCESS_MATRIX, LOGGEDIN_USER_DATA } from 'global_config/constant-global';
import Header from './header';
import Content from './content';
import Sider from './sider';

import './layout.css';

const history = createBrowserHistory({ basename: process.env.PUBLIC_URL });

function MainLayout() {
  const [userAccess, setUserAccess] = useState({
		request: {
			view: false,
			create: false,
			update: false,
			print: false,
		},
		result: {
			view: false,
			create: false,
			update: false,
			print: false,
		},
		settings: {
			view: false,
			create: false,
			update: false,
			print: false,
		},
	});

  function defineUserAccess({ accessMatrix, userData }) {
    const { settings, request } = accessMatrix;

    setUserAccess({ 
      request: {
        view: request.view.some(id => id === userData.loginType),
        create: request.create.some(id => id === userData.loginType),
        update: request.update.some(id => id === userData.loginType),
        print: false,
      },
      result: {
        view: false,
        create: false,
        update: false,
        print: false,
      },
      settings: {
        view: settings.view.some(id => id === userData.loginType),
        create: settings.create.some(id => id === userData.loginType),
        update: settings.update.some(id => id === userData.loginType),
        print: settings.print.some(id => id === userData.loginType),
      }
    });
  }

  useEffect(() => {
    const stringAccMatrix = sessionStorage.getItem(ACCESS_MATRIX);
    const stringUserData = sessionStorage.getItem(LOGGEDIN_USER_DATA);

    if(stringAccMatrix && stringUserData) {
      const accessMatrix = JSON.parse(stringAccMatrix);
      const userData = JSON.parse(stringUserData);

      defineUserAccess({ accessMatrix, userData });
    }

	}, []);
 
  return (
    <Router history={history}>
			<UserAccessContext.Provider value={{ userAccess, defineUserAccess }}>
        <Layout style={{ minHeight: '100vh' }}>
          <Header />
          <Layout>
            <Sider collapsed />
            <Content />
          </Layout>
        </Layout>
      </UserAccessContext.Provider>
    </Router>
  );
}

export default MainLayout;
