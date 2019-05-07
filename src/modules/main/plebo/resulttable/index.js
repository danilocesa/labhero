import React from 'react';
import { Row, Col, Table, Select   } from 'antd';
import { Link } from "react-router-dom";

const { Option } = Select;

function PleboResult() {

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
    for (let i = 1; i < 10; ++i) {
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
          <Row type="flex">
              <Col lg={24} xs={24}>
                  <Table
                  className="components-table-demo-nested"
                  columns={columns}
                  dataSource={data}
                  size="small"
                  />
              </Col>
          </Row>
        </div>
    );
  }
export default PleboResult;