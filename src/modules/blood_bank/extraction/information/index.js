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




class ExtractionInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
     };
    this.formRef = React.createRef();
  }

  componentDidMount() {
    const {data } = this.props.location.state
  }

  expandedRow = () => {
    return (
      
      <div>
      <Tabs defaultActiveKey="1">
          <TabPane tab="FOR SCREENING" key="1">
            <ForScreening  />
          </TabPane>
          <TabPane tab="FOR EXTRACTION" key="2">
             <ForExtraction 
             data={this.props.location.state}
             />
          </TabPane>
      </Tabs>
      </div>
    );
  };

 
  
  NextStep = () => {
    window.location.assign('/bloodbank/extraction/screening');
  };

	render() {
		const {data } = this.props.location.state
    return(
      <div>
        <Row>
          <Col span={5}>
            <RightSide 
            data={data}
            />
          </Col>
          <Col span={18} style={{marginLeft:20}}>

            <div>
              <Title level={2}>{this.props.location.state.last_name},{this.props.location.state.first_name}</Title>
              <Text strong> DONOR'S ID: {this.props.location.state.donor_id} </Text>
            </div>

            <Table
                expandedRowRender={this.expandedRow}
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