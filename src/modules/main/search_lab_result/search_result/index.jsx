import React from 'react';
import { Row, Col, Table, Select   } from 'antd';
import { Link } from "react-router-dom";

import './searchresult.css';

const { Option } = Select;

function SearchLabTestResultList() {
    const expandedRowRender = () => {
      const columns = [
        { 
          title: 'REQUEST DATE', 
          dataIndex: 'RequestDate', 
          key: 'RequestDate',
          align: 'center'
        },
        { title: 'SAMPLE ID', 
          dataIndex: 'SampleId', 
          key: 'SampleId',
          render: text =>  <Link to="/about/">{text}</Link>,
        },
        { title: 'STATUS', 
          dataIndex: 'Status', 
          key: 'Status'
        },
        { title: 'HISLINK', 
          dataIndex: 'HisLink', 
          key: 'HisLink'
        },
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
          size="small"
        />
      );
    };

const columns = [
    { 
      title: 'PATIENT ID', 
      dataIndex: 'PatientID', 
      key: 'PatientID',
      sorter: (a, b) => a.PatientID - b.PatientID, 
    },
    { title: 'LAST NAME', 
      dataIndex: 'LastName', 
      key: 'LastName',
      sorter: (a, b) => a.LastName.length - b.LastName.length, 
     },
    { title: 'FIRST NAME', 
      dataIndex: 'FirstName', 
      key: 'FirstName',
      sorter: (a, b) => a.FirstName.length - b.FirstName.length,
     },
    { title: 'DATE OF BIRTH', 
      dataIndex: 'DateOfBirth', 
      key: 'DateOfBirth',
      sorter: (a, b) => a.DateOfBirth.length - b.DateOfBirth.length,
    },
    { title: 'GENDER', 
      dataIndex: 'Gender', 
      key: 'Gender',
      sorter: (a, b) => a.Gender.length - b.Gender.length,
    },
    { title: 'ADDRESS', 
      dataIndex: 'Address', 
      key: 'Address',
      sorter: (a, b) => a.Address.length - b.Address.length,
    },
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
    Address: testcityaddress[Math.floor(Math.random()*testcityaddress.length)],
    });
}

return (
    <div>
        <Row style={{ paddingBottom: '1em' }} type="flex" justify="end">
            <Col lg={4} md={6} sm={6} xs={12} className="gutter-row" style={{ lineHeight : '2.5em'}} >
                <span className="gutter-box" style={{ float:'right', marginRight:'1em' }}> Display per page </span>
            </Col>
            <Col lg={2} md={3} sm={6} xs={6} className="gutter-row">
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
                <Table
                className="components-table-demo-nested"
                columns={columns}
                expandedRowRender={expandedRowRender}
                dataSource={data}
                size="small"
                />
            </Col>
        </Row>
    </div>
  );
}
    

export default SearchLabTestResultList;