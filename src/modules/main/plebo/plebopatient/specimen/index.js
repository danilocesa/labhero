import React from 'react';
import { Row, Col, Table, Typography, Input } from 'antd';

import './specimen.css';

const { Text } = Typography;

const button_pending = () => <Input type="radio" id="pending" name="Pending">PENDING</Input>;

class SpecimenList extends React.Component {

 // React lifecycle
  componentDidMount() 
  {
    this.setState({
      showLoading: false
    });
  }

  onPress = () => {
    this.setState({
      
    })
  }

  expandedRowRender = () => {
    const columns = [
      {
        dataIndex: 'Specimen',
        key: 'Specimen',
      },
      { 
        dataIndex: 'StatusPending', 
        key: 'StatusPending',
        render: text =>  <Text onClick={this.onSampleIDClick}>{text}</Text>,
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
      },
    ];
    const data = [];
    const testspecimen = ['Blood', 'Serum'];

      for (let i = 1; i < 15; ++i) {
        data.push({
        Specimen: testspecimen[Math.floor(Math.random() * testspecimen.length)],
        StatusPending: "PENDING"
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