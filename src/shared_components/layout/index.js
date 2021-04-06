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
    const dashbord = accessMatrix.find(item => item.moduleID === 1);
    const request = accessMatrix.find(item => item.moduleID === 2);
    const plhebo = accessMatrix.find(item => item.moduleID === 3);
    const result = accessMatrix.find(item => item.moduleID === 4);
    const patientDemographics = accessMatrix.find(item => item.moduleID === 5);
    const settings = accessMatrix.find(item => item.moduleID === 6);

    console.log('request', request);

    setUserAccess({ 
      request: {
        view: request.view === 'TRUE',
        create: request.create === 'TRUE',
        update: request.update === 'TRUE',
        print: request.print === 'TRUE',
      },
      result: {
        view: result.view === 'TRUE',
        create: result.create === 'TRUE',
        update: result.update === 'TRUE',
        print: result.print === 'TRUE',
      },
      settings: {
        view: settings.view === 'TRUE',
        create: settings.create === 'TRUE',
        update: settings.update === 'TRUE',
        print: settings.print === 'TRUE',
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
