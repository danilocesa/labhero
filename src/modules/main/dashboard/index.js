import React from 'react';
import { Row, Col } from 'antd';

import DashboardHeader from './header';
import Metrics from './metric';
import LineChart from './chart';

import {
  MetricRefreshLogo,
  MetricCheckLogo,
  MetricAddLogo,
  MetricHistoryLogo,
} from "../../../images";

import './dashboard.css';

const metricsData = [
  {
    image: MetricRefreshLogo,
    value: 12,
    label: 'Ongoing Test',
  },
  {
    image: MetricAddLogo,
    value: 270,
    label: 'New Requests',
  },
  {
    image: MetricHistoryLogo,
    value: 10,
    label: 'Pending Requests',
  },
  {
    image: MetricCheckLogo,
    value: 1028, 
    label: 'Veritifed Status',
  },
]; 

// const userNameLoggedIn = sessionStorage.ge;
const userNameLoggedIn = JSON.parse(sessionStorage.getItem('LOGGEDIN_USER_DATA'));
console.log(userNameLoggedIn);

class DashboardPage extends React.Component {
  render() {
    const MetricList = metricsData.map((item, index) => (
      <Metrics key={index} image={item.image} value={item.value} label={item.label} />
    ));

    return (
      <div>
        <Row>
          <DashboardHeader user={userNameLoggedIn ? userNameLoggedIn.givenName : null} />
        </Row>
        <Row type="flex" justify="start" style={{ marginTop: 20 }}>
          <Col className="left-pane">{MetricList}</Col>
          <Col className="right-pane">
            <LineChart />
          </Col>
        </Row>`
      </div>
    );
  }
}

export default DashboardPage;
