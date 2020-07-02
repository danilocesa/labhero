import React from 'react';
import { Row, Col, Typography, Table,Tabs, Button  } from 'antd';

import ForScreening from './for_screening'
import ForExtraction from './for_extraction'
import RightSide from './info'

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  }
];

const columns = [
  {
    title: 'DATE CREATED',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'BAG ID',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'STATUS',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'SCREENING FLAG',
    dataIndex: 'address',
    key: 'address',
  },
];

const expandedRow = row => {
  console.log(row);
  return (
    <div>
    <Tabs defaultActiveKey="1">
        <TabPane tab="FOR SCREENING" key="1">
          <ForScreening />
        </TabPane>
        <TabPane tab="FOR EXTRACTION" key="2">
           <ForExtraction />
        </TabPane>
    </Tabs>
    </div>
  );
};


class ExtractionInformation extends React.Component {

  NextStep = () => {
    window.location.assign('/bloodbank/extraction/screening');
  };

	render() {
		return(
      <div>
        <Row>
          <Col span={5}>
            <RightSide />
          </Col>
          <Col span={18} style={{marginLeft:20}}>

            <div>
              <Title level={2}>Name Here</Title>
              <Text strong> Sub Title </Text>
            </div>

            <Table
                expandedRowRender={expandedRow}
                style={{ textTransform: "uppercase" }}
                dataSource={dataSource}
                columns={columns}
                pagination={false} 
            /> 
            

          </Col>
        </Row>
        
      </div>
		)
	}	
}

export default ExtractionInformation;	