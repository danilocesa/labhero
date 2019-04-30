import React from 'react';
import { Layout } from 'antd';
import { Route, withRouter } from 'react-router-dom';

<<<<<<< HEAD:src/shared_components/layout/content/index.js
import DashboardPage from '../../../modules/main/dashboard';
import CreateRequestPage from '../../../modules/main/request/create';
=======
import Dashboard from '../../../modules/main/dashboard';
import SearchLabTestResult from '../../../modules/main/search_lab_result';
import PatientInfo from '../../../modules/main/patientinfo';

>>>>>>> 7291d3b3b1f501a7766f7fa8af8e75b294d7107e:src/shared_components/layout/content/index.js

const { Content: Antcontent } = Layout;

const wrapperStyle = {
  minHeight: 280,
  background: 'white',
  width: '100%',
  padding: 24
};

const Content = (props) => (
  <Antcontent style={wrapperStyle}>
<<<<<<< HEAD:src/shared_components/layout/content/index.js
    <Route path="/dashboard" component={DashboardPage} />
    <Route path="/request/create" component={CreateRequestPage} />
=======
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/searchlabresult" component={SearchLabTestResult} />
>>>>>>> 7291d3b3b1f501a7766f7fa8af8e75b294d7107e:src/shared_components/layout/content/index.js
  </Antcontent>
);

export default withRouter(Content);
