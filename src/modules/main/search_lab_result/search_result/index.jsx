//LIBRARY
import React from 'react';
import { Row, Col, Table, Select, Drawer, Typography, Empty, Card, Skeleton } from 'antd';

//CUSTOM MODULES
import PatientInfo from '../../patientinfo';

//CSS
import './searchresult.css';

//CONSTANTS
const { Option } = Select;
const { Text } = Typography;

class WrapperSearchLabTestResultList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPatientInfo: false,
      showLoading: true,
    };
    this._onSampleIDClick = this._onSampleIDClick.bind(this);
  }
  _onSampleIDClick() {
    this.setState({
      showPatientInfo: true,
    });
  }
  _onClosePatientInfoDrawer = () => {
    this.setState({
      showPatientInfo: false,
    });
  }
  expandedRowRender = (e) => {
    const columns = [
      {
        title: 'REQUEST DATE',
        dataIndex: 'RequestDate',
        key: 'RequestDate',
        align: 'center',
      },
      {
        title: 'SAMPLE ID',
        dataIndex: 'SampleId',
        key: 'SampleId',
        render: text =>  <Text onClick={this._onSampleIDClick} className="sampleLabTestID">{text}</Text>,
      },
      { title: 'STATUS', 
        dataIndex: 'Status', 
        key: 'Status'
      },
      { title: 'HISLINK', 
        dataIndex: 'HisLink', 
        key: 'HisLink'
      },
      { title: 'STATUS', dataIndex: 'Status', key: 'Status' },
      { title: 'HISLINK', dataIndex: 'HisLink', key: 'HisLink' },
    ];
    const data = [];
    const teststatus = ['On-going', 'Verified', 'Cancelled'];
    for (let i = 1; i < 20; ++i) {
      data.push({
        RequestDate: '04/11/2019',
        SampleId: '100' + i,
        Status: teststatus[Math.floor(Math.random() * teststatus.length)],
        HisLink: '190411200' + i,
      });
    }
    return (
      <Table
        columns={columns}
        dataSource={data}
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
      title: 'PATIENT ID', 
      dataIndex: 'PatientID', 
      key: 'PatientID',
      sorter: (a, b) => a.PatientID - b.PatientID, 
    },
    { 
      title: 'HOSPITAL ID', 
      dataIndex: 'HospitalID', 
      key: 'HospitalID',
      sorter: (a, b) => a.HospitalID - b.HospitalID, 
    },
    { title: 'LAST NAME', 
      dataIndex: 'LastName', 
      key: 'LastName',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => { return a.LastName.localeCompare(b.LastName)}, 
      },
    { title: 'FIRST NAME', 
      dataIndex: 'FirstName', 
      key: 'FirstName',
      sorter: (a, b) => { return a.FirstName.localeCompare(b.FirstName)},
      },
    { title: 'DATE OF BIRTH', 
      dataIndex: 'DateOfBirth', 
      key: 'DateOfBirth',
      sorter: (a, b) => a.DateOfBirth.length - b.DateOfBirth.length,
    },
    { title: 'GENDER', 
      dataIndex: 'Gender', 
      key: 'Gender',
      sorter: (a, b) => { return a.Gender.localeCompare(b.Gender)},
    },
    { title: 'ADDRESS', 
      dataIndex: 'Address', 
      key: 'Address',
      sorter: (a, b) => { return a.Address.localeCompare(b.Address)},
    },
    ];
    const data = [];
    const testfirstname = ['Dante', 'Matthew', 'Maria'];
    const testgender = ['M', 'F'];
    const testcityaddress = ['Pasig', 'Pasay', 'Manila'];
    const testlastname = ['Doe','Taylor','Green'];
    for (let i = 1; i < 1500; ++i) {
        data.push({
        PatientID: '000' + i,
        HospitalID: i * 4 + '00' + i,
        LastName: testlastname[Math.floor(Math.random() * testlastname.length)],
        FirstName: testfirstname[Math.floor(Math.random() * testfirstname.length)],
        DateOfBirth: '01/01/1990',
        Gender: testgender[Math.floor(Math.random() * testgender.length)],
        Address: testcityaddress[Math.floor(Math.random() * testcityaddress.length)],
      });
    }
    return (
      <div>
        <Row style={{ paddingBottom: '0.5em' }} type="flex">
          <Col md={12} className="gutter-row">
            <Text strong>
              Search result
            </Text>
            <br />
            <Text>
              Showing <b>0</b> items out of <b>0</b> results
            </Text>
          </Col>
          <Col md={10}className="gutter-row" style={{ lineHeight : '2.5em'}} >
            <Text className="gutter-box" style={{ float:'right', marginRight:'1em' }}>
              Display per page 
            </Text>
          </Col>
          <Col className="gutter-row">
            <Select defaultValue="10" style={{ width: '100%' }} className="gutter-box">
              <Option value="10">10</Option>
              <Option value="20">20</Option>
              <Option value="50">50</Option>
              <Option value="100">100</Option>
            </Select>
          </Col>
        </Row>
        <Row type="flex">
          <Col lg={24} xs={24}>
            { this.state.showLoading ? 
              <Skeleton /> 
              : 
              data.length > 0  ?
                <Table
                  className="searchLabTestResultTable"
                  columns={columns}
                  expandedRowRender={this.expandedRowRender}
                  dataSource={data}
                  size="small"
                  scroll={{ y: 300 }}
                />
              :
                <Card>
                  <Empty />
                </Card>
            }
          </Col>
        </Row>
        {this.state.showPatientInfo ?
          <Drawer
            title="Patient information"
            onClose={this._onClosePatientInfoDrawer}
            width="80%"
            visible={this.state.showPatientInfo}
          >
            <PatientInfo /> 
          </Drawer>
          :
          null
        }
      </div>
    );
  }
}
    
export default WrapperSearchLabTestResultList;
