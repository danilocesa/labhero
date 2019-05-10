import React from 'react';
import { Row, Col, Table, Button, } from 'antd';

import './specimen.css';

class SpecimenList extends React.Component {
  state = {
    Status: 'PENDING'
  }

  onPress = () => {
    this.setState({
      Status: ''
    })
  }

 // React lifecycle
 componentDidMount() 
 {
   this.setState({
     showLoading: false
   });
 }
 
  expandedRowRender = () => {
    const columns = [
      {
        dataIndex: 'Specimen',
        key: 'Specimen',
      },
    ];

    const data = [];
    const testspecimen = ['CBC', 'Hemoglobin', 'Hematocrit'];
    for (let i = 1; i < 4; i+=1) {
      data.push({
        Specimen: testspecimen[Math.floor(Math.random() * testspecimen.length)],
      });
    }

  return (
	<div className="child-no-header-table">
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        size="small"
      />
      </div>
    );
  };

  render() {  
    const columns = [
    { 
      title: 'SPECIMEN', 
      dataIndex: 'Specimen', 
      key: 'Specimen',
    },
    { 
      title: 'STATUS', 
      dataIndex: 'StatusPending', 
      key: 'StatusPending',
      render: button =>  <Button onClick={this.onSampleIDClick} className="sampleLabTestID">{button}</Button>,
    },
    ];
    const data = [];
    const testspecimen = ['Blood', 'Serum'];
    for (let i = 1; i < 15; ++i) {
        data.push({
        Specimen: testspecimen[Math.floor(Math.random() * testspecimen.length)],
        StatusPending: 'PENDING',
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