import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { Router } from 'react-router-dom';  
import cryptr from 'cryptr';
import { createBrowserHistory } from 'history'; 
import { UserAccessContext } from 'context/userAccess';
import { ACCESS_MATRIX } from 'global_config/constant-global';
import { getUserAccess } from 'utils/user';
import Header from './header';
import Content from './content';
import Sider from './sider';

import './layout.css';

const history = createBrowserHistory({ basename: process.env.PUBLIC_URL });

const initialAccessState = {
  view: false,
  create: false,
  update: false,
  print: false,
};

function MainLayout() {
  const [userAccess, setUserAccess] = useState({
    dashboard: initialAccessState,
		request: initialAccessState,
    plhebo: initialAccessState,
		result: initialAccessState,
    patientDemographics: initialAccessState,
		settings: initialAccessState,
	});
  

  function defineUserAccess({ accessMatrix }) {
    const dashboard = accessMatrix.find(item => item.moduleID === 1);
    const request = accessMatrix.find(item => item.moduleID === 2);
    const plhebo = accessMatrix.find(item => item.moduleID === 3);
    const result = accessMatrix.find(item => item.moduleID === 4);
    const patientDemographics = accessMatrix.find(item => item.moduleID === 5);
    const settings = accessMatrix.find(item => item.moduleID === 6);

    setUserAccess({ 
      dashboard: getUserAccess(dashboard),
      request: getUserAccess(request),
      plhebo: getUserAccess(plhebo),
      result: getUserAccess(result),
      patientDemographics: getUserAccess(patientDemographics),
      settings: getUserAccess(settings),
    });
  }

  useEffect(() => {
    const stringAccMatrix = sessionStorage.getItem(ACCESS_MATRIX);

    if(stringAccMatrix) {
      const crypt = new cryptr(process.env.REACT_APP_CRYPTR_KEY);
      const decryptedMatrix = crypt.decrypt(stringAccMatrix);
      const accessMatrix = JSON.parse(decryptedMatrix);

      defineUserAccess({ accessMatrix });
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
