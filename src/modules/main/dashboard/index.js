import React from 'react';
import { Row, Col } from 'antd';
import Moment from 'moment';
import Icon from '@ant-design/icons';
import { ClockCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { ReactComponent as CheckIcon } from 'icons/check-icon.svg';
import fetchKPIs from 'services/dashboard/dashboard';
import DashboardHeader from './header';
import Metrics from './metric';
import LineChart from './chart/linechart';
import PieChart from './chart/piechart';

import './dashboard.css';

const metricsData = [
  {
    image: <ClockCircleOutlined className="dashboard-metric-icon" />,
    value: 12,
    label: 'PENDING',
  },
  {
    image: <ExclamationCircleOutlined className="dashboard-metric-icon" style={{ color: '#FAAD14' }} />,
    value: 270,
    label: 'MORE THAN 2 HOURS',
  },
  {
    image: <Icon component={CheckIcon} className="dashboard-metric-icon" />,
    value: 10,
    label: 'WITHIN 2 HOURS',
  },
 
]; 

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      kpis: [],
    }
  }

  async componentDidMount() {
    const user = JSON.parse(sessionStorage.getItem('LOGGEDIN_USER_DATA'));
    const today = Moment(new Date()).format("YYYYMMDD");
    const responseKPIs = await fetchKPIs(today);
    const kpiPending = responseKPIs.find(item => item.category === 'PendingRequest');
    const kpiMorethan = responseKPIs.find(item => item.category === 'WithinTwoHours');
    let kpis = [];

    console.log('kpiPending', kpiPending);

    kpis.push({ 
      ...kpiPending, 
      label: 'PENDING',
      image: <ClockCircleOutlined className="dashboard-metric-icon" /> 
    });

    kpis.push({ 
      ...kpiMorethan, 
      label: 'MORE THAN 2 HOURS',
      image: <ExclamationCircleOutlined className="dashboard-metric-icon" style={{ color: '#FAAD14' }} /> 
    });

    this.setState({ user, kpis });
  }
  
  render() {
    const { user, kpis } = this.state;

    const MetricList = kpis.map((item, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Metrics 
        key={index} 
        image={item.image} 
        value={item.value} 
        label={item.label} 
        data={item.data}
      />
    ));


    return (
      <div>
        <Row>
          <DashboardHeader user={user ? user.givenName : null} />
        </Row>
        <Row style={{ marginTop: 20 }}>
          <Col span={8}>{MetricList}</Col>
          <Col span={16}>
            <Row>
              <Col span={24}>
                <PieChart />
              </Col>
              {/* <Col span={8}>
                <PieChart />
              </Col>
              <Col span={8}>
                <PieChart />
              </Col> */}
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default DashboardPage;
