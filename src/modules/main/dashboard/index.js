import React from 'react';
import { Row, Col } from 'antd';

import DashboardHeader from './header';
import Metrics from './metric';
import LineChart from './chart';
import BarChart from './barchart';

import {
  MetricRefreshLogo,
  MetricCheckLogo,
  MetricAddLogo,
  MetricHistoryLogo,
} from "images";

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

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userNameLoggedIn: ''
    }
  }

  componentDidMount = () => {
    const userName = JSON.parse(sessionStorage.getItem('LOGGEDIN_USER_DATA'));
    this.setState({ userNameLoggedIn: userName });
  }
  
  onClickBtn = evt => {
    const buttonId = evt.target.id;
    this.setState({
      [buttonId]: {
        loading: true
      }
    });
    setTimeout(() => {
      this.setState({
        [buttonId]: {
          buttonText: "EXTRACTED",
          isDisabled: true,
          loading: false
        }
      });
    }, 2000);
    console.log(buttonId);
  };
  
  render() {
    const MetricList = metricsData.map((item, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Metrics key={index} image={item.image} value={item.value} label={item.label} />
    ));

    const userNameInfo = this.state.userNameLoggedIn
    return (
      <div>
        <Row>
          <DashboardHeader user={userNameInfo ? userNameInfo.givenName : null} />
        </Row>
        <Row type="flex" justify="start" style={{ marginTop: 20 }}>
          <Col className="left-pane">{MetricList}</Col>
          <Col className="right-pane">
            <LineChart />
          </Col>
        </Row>
        {/* <Row>
          <BarChart data={[5,100,20,3]} size={[700,500]} />
        </Row> */}
      </div>
    );
  }
}

export default DashboardPage;
