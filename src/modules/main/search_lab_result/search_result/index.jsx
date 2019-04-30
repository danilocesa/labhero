import React from 'react';
import { Row, Col, Table, Select,   } from 'antd';

// import '../../../../global-styles.css';

const { Option } = Select;

function SearchLabTestResultList() {
    const expandedRowRender = () => {
      const columns = [
        { title: 'REQUEST DATE', dataIndex: 'RequestDate', key: 'RequestDate' },
        { title: 'SAMPLE ID', dataIndex: 'SampleId', key: 'SampleId' },
        { title: 'STATUS', dataIndex: 'Status', key: 'Status'},
        { title: 'HISLINK', dataIndex: 'HisLink', key: 'HisLink' },
      ];
  
      const data = [];
      const teststatus = ['On-going', 'Verified', 'Cancelled'];
      for (let i = 1; i < 4; ++i) {
        data.push({
          RequestDate: '04/11/2019',
          SampleId: '100' + i,
          Status: teststatus[Math.floor(Math.random()*teststatus.length)],
          HisLink: '190411200' + i,
        });
      }
      return (
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
        />
      );
    };

const columns = [
    { title: 'PATIENT ID', dataIndex: 'PatientID', key: 'PatientID' },
    { title: 'LAST NAME', dataIndex: 'LastName', key: 'LastName' },
    { title: 'FIRST NAME', dataIndex: 'FirstName', key: 'FirstName' },
    { title: 'DATE OF BIRTH', dataIndex: 'DateOfBirth', key: 'DateOfBirth' },
    { title: 'GENDER', dataIndex: 'Gender', key: 'Gender' },
    { title: 'CITY ADDRESS', dataIndex: 'CityAddress', key: 'CityAddress' },
    ];
    
const data = [];
const testfirstname = ['Dante', 'Matthew', 'Maria'];
const testgender = ['M', 'F'];
const testcityaddress = ['Pasig', 'Pasay', 'Manila'];
for (let i = 1; i < 4; ++i) {
    data.push({
    PatientID: '000' + i,
    LastName: 'Doe',
    FirstName: testfirstname[Math.floor(Math.random()*testfirstname.length)],
    DateOfBirth: '01/01/1990',
    Gender: testgender[Math.floor(Math.random()*testgender.length)],
    CityAddress: testcityaddress[Math.floor(Math.random()*testcityaddress.length)],
    });
}

return (
    <div>
        <Row style={{ 'padding-bottom': '1em' }} > 
            <Col span={19}></Col>
            <Col span={5}>
                <Row>
                    <Col span={13} className="gutter-row" style={{ 'line-height' : '2.5em' }} >
                        <span className="gutter-box"> Display per page </span>
                    </Col>
                    <Col span={9} className="gutter-row">
                        <Select defaultValue="10" size="large" style={{ width: '100%' }} className="gutter-box">
                            <Option value="10">10</Option>
                            <Option value="20">20</Option>
                            <Option value="50">50</Option>
                            <Option value="100">100</Option>
                        </Select>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Table
                className="components-table-demo-nested"
                columns={columns}
                expandedRowRender={expandedRowRender}
                dataSource={data}
                />
            </Col>
        </Row>
    </div>
  );
}
    

export default SearchLabTestResultList;