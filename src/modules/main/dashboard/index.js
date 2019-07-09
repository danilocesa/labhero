import React from 'react';
import { Row, Col, Button } from 'antd';

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

// const userNameLoggedIn = JSON.parse(sessionStorage.getItem('LOGGEDIN_USER_DATA'));
// console.log(userNameLoggedIn);

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userNameLoggedIn: '',
      // loading: false,
    }
  }

  componentDidMount = () => {
    const userName = JSON.parse(sessionStorage.getItem('LOGGEDIN_USER_DATA'));
    this.setState({ userNameLoggedIn: userName });
  }

  // onClickBtn = () => {
  //   this.setState({ loading: true});
  //   const extractBtn = true;
  //   this.setState({ loading: false});

  //   if(extractBtn) {
  //     document.getElementById("btnTesting").innerHTML = "EXTRACTED";
  //     document.getElementById("btnTesting").setAttribute("disabled","true");
  //   }
  // }
  
  render() {
    const MetricList = metricsData.map((item, index) => (
      <Metrics key={index} image={item.image} value={item.value} label={item.label} />
    ));

    const userNameInfo = this.state.userNameLoggedIn
    return (
      <div>
        <Row>
          {/* <Button id="btnTesting" onClick={this.onClickBtn}>EXTRACT</Button> */}
          <DashboardHeader user={userNameInfo ? userNameInfo.givenName : null} />
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
