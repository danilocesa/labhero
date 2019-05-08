import React from 'react';
import { Row, Col, Table, Drawer, Typography   } from 'antd';

import PleboPatientResult from '../plebopatient';

import './plebotable.css'

const { Text } = Typography;

class PleboTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPleboPatientResult: false,
      showLoading: true,
    };
    this._onSampleIDClick = this._onSampleIDClick.bind(this);
  }
  _onSampleIDClick() {
    this.setState({
      showPleboPatientResult: true,
    });
  }
  _onClosePleboPatientResultDrawer = () => {
    this.setState({
      showPleboPatientResult:false,
    });
  }

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
          // eslint-disable-next-line no-underscore-dangle
          render: text =>  <Text onClick={this._onSampleIDClick} className="samplePatientID">{text}</Text>
        },
        { title: 'LAST NAME', 
          dataIndex: 'LastName', 
          key: 'LastName',
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
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i < 30; ++i) {
        data.push({
        PatientID: `000${  i}`,
        LastName: testlastname[Math.floor(Math.random() * testlastname.length)],
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
              scroll={{ y: 200 }}
            />
          </Col>
        </Row>
        {
        // eslint-disable-next-line react/destructuring-assignment
        this.state.showPleboPatientResult ?
          <Drawer
          title="Patient information" 
          onClose={this._onClosePleboPatientResultDrawer}
          width="80%"
          visible={this.state.showPleboPatientResult}
        >
          <PleboPatientResult /> 
        </Drawer>
        :
        null
      }
      </div>
    );
  }
}
export default PleboTable;