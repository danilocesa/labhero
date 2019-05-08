import React from 'react';
import { Row, Col, Table, Typography, Empty, Card, Skeleton } from 'antd';

const { Text } = Typography;

class SpecimenList extends React.Component {

  expandedRowRender = (e) => {
    const columns = [
      {
        dataIndex: 'Specimen',
        key: 'Specimen',
        align: 'center',
      },
      {
        dataIndex: 'Status',
        key: 'Status',
        render: text =>  <Text onClick={this._onSampleIDClick} >{text}</Text>,
      },
    ];
    return (
      <Table
        columns={columns}
        pagination={false}
        size="small"
        scroll={{ y: 200 }}
      />
    );
  };

  //React lifecycle
  componentDidMount() 
  {
    this.setState({
      showLoading: false
    });
  }

  render() {  
    const columns = [
    { 
      title: 'SPECIMEN', 
      dataIndex: 'Specimen', 
      key: 'Specimen',
    },
    { 
      title: 'STATUS', 
      dataIndex: 'Status', 
      key: 'Status',
    },
    ];
    const data = [];
    const testspecimen = ['Blood', 'Serum'];
    for (let i = 1; i < 5; ++i) {
        data.push({
        Specimen: testspecimen[Math.floor(Math.random() * testspecimen.length)],
      });
    }
    return (
      <div>
        <Row>
          <Col lg={24} xs={24}>
                <Table
                  columns={columns}
                  expandedRowRender={this.expandedRowRender}
                  dataSource={data}
                  size="small"
                  scroll={{ y: 300 }}
                />
          </Col>
        </Row>
      </div>
    );
  }
}
export default SpecimenList;