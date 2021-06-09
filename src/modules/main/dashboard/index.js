import React from 'react';
import { Row, Typography, Empty, Badge } from 'antd';
import Moment from 'moment';
import Icon from '@ant-design/icons';
import { ClockCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { ReactComponent as CheckIcon } from 'icons/check-icon.svg';
import fetchKPIs from 'services/dashboard/dashboard';
import fetchSections from 'services/shared/section';

import DashboardHeader from './header';
import Metrics from './metric';
import PieChart from './chart/piechart';

import './dashboard.css';

const { Text } = Typography;

// const metricsData = [
//   {
//     image: <ClockCircleOutlined className="dashboard-metric-icon" />,
//     value: 12,
//     label: 'PENDING',
//   },
//   {
//     image: <ExclamationCircleOutlined className="dashboard-metric-icon" style={{ color: '#FAAD14' }} />,
//     value: 270,
//     label: 'MORE THAN 2 HOURS',
//   },
//   {
//     image: <Icon component={CheckIcon} className="dashboard-metric-icon" />,
//     value: 10,
//     label: 'WITHIN 2 HOURS',
//   },
 
// ]; 

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      kpis: [],
      sections: []
    }
  }

  async componentDidMount() {
    const user = JSON.parse(sessionStorage.getItem('LOGGEDIN_USER_DATA'));
    const today = Moment(new Date()).format("YYYYMMDD");
    // const today = "20200703";
    const responseKPIs = await fetchKPIs(today);
    const sections = await fetchSections();

    const kpiPending = responseKPIs.find(item => item.category === 'PendingRequest');
    const kpiWithin = responseKPIs.find(item => item.category === 'WithinTwoHours');
    const kpiMorethan = responseKPIs.find(item => item.category === 'MoreThanTwoHours');
    let kpis = [];

    kpis.push({ 
      ...kpiPending, 
      label: 'PENDING',
      image: <ClockCircleOutlined className="dashboard-metric-icon" style={{ color: '#A4B4CF' }} /> 
    });

    kpis.push({ 
      ...kpiMorethan, 
      label: 'MORE THAN 2 HOURS',
      image: <ExclamationCircleOutlined className="dashboard-metric-icon" style={{ color: '#ff7979' }} /> 
    });

    kpis.push({ 
      ...kpiWithin, 
      label: 'WITHIN 2 HOURS',
      // #009645 - Green
      image: <Icon component={CheckIcon} className="dashboard-metric-icon" />
    });

      
    
    const mappedSections = sections.map(section => {
      const pending = kpiPending ? kpiPending.data.find(i => i.sectionCode === section.sectionCode) : null; 
      const within = kpiWithin ? kpiWithin.data.find(i => i.sectionCode === section.sectionCode) : null; 
      const morethan = kpiMorethan ? kpiMorethan.data.find(i => i.sectionCode === section.sectionCode) : null; 

      return {
        sectionName: section.sectionName,
        pending: pending ? pending.records : 0,
        morethan: morethan ? morethan.records : 0,
        within: within ? within.records : 0
      };
    });
    console.log("🚀 ~ file: index.js ~ line 92 ~ DashboardPage ~ componentDidMount ~ mappedSections", mappedSections)

    this.setState({ user, kpis, sections: mappedSections });
  }
  
  render() {
    const { user, kpis, sections } = this.state;
    
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


    const PieCharts = sections.map((item, index) => {
      const hasNoData = (
        Number(item.pending) === 0 &&
        Number(item.morethan) === 0 &&
        Number(item.within) === 0
      );
      
      const data = hasNoData ? [] : [
        { item: 'Pending', count: Number(item.pending) },
        { item: 'Morethan 2 Hours', count: Number(item.morethan)  },
        { item: 'Within 2 Hours', count: Number(item.within) }
      ];

      const Placeholder = () => (
        <div className="piechart-no-data">
          <Empty 
            description={(
              <>
                <Text strong>{item.sectionName}</Text>
                <br />
                <Text>No Data</Text>
              </>
            )} 
          />
        </div>
      );

      return (
        <div key={index}>
          { !hasNoData && <Text strong>{item.sectionName}</Text> }
          <PieChart data={data} placeHolder={<Placeholder />} />
        </div>
      );
    });

    return (
      <div className="dashboard-main-wrapper">
        <Row>
          <DashboardHeader user={user ? user.givenName : null} />
        </Row>
        <div className="main-pane">
          <div>{MetricList}</div>
          <div>
            <div className="legend-con">
              <div>
                <Text strong>LEGEND:</Text>
              </div>
              <div>
                <Badge color="#CBDEFF" text="Pending" /> 
              </div>
              <div>
                <Badge color="#6395F9" text="Within 2 Hours" /> 
              </div>
              <div>
                <Badge color="#ff7979" text="Morethan 2 Hours" /> 
              </div>
            </div>
            <div className="chart-con">
              {PieCharts}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardPage;
