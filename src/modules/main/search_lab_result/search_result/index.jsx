// LIBRARY
import React from 'react';
import { Row as AntRow, Col as AntCol, Table, Select, Drawer as AntDrawer, Typography, Empty as AntEmpty, Card as AntCard} from 'antd';

// CUSTOM MODULES
import axiosCall from 'services/axiosCall';
import PatientInfo from '../../patientinfo';

// CSS
import './searchresult.css';

// CONSTANTS
const { Option } = Select;
const { Text } = Typography;

class WrapperSearchLabTestResultList extends React.Component {
  state = {
		showPatientInfo: false,
		showLoading: true,
		isLoading: false
	};

  // React lifecycle
 
  componentDidMount() 
  {
    this.setState({
      showLoading: false
    });
  } 

  // Custom function
  onSampleIDClick = () => {
    this.setState({
      showPatientInfo: true,
    });
  }

  onClosePatientInfoDrawer = () => {
    this.setState({
      showPatientInfo: false,
    });
  }

  expandedRowRender = () => {
    const data = [];
    for (let i = 1; i < 20; i+=1) {
      data.push({
        key: i*1000,
        RequestDate: '04/11/2019',
        SampleId: `100${i}`,
        Status: 'test',
       // HisLink: `190411200i${i}`,
      });
		}
		console.log(data);
		const expandedtablecolumns = [
      {
        title: 'sectionID',
        dataIndex: 'sectionID',
        key: 'RequestDate',
        align: 'center',
        width:'25%',
      },
      {
        title: 'sectionName',
        dataIndex: 'sectionName',
        key: 'SampleId',
        width:'25%',
      },
      { title: 'sectionCode', 
        dataIndex: 'sectionCode', 
        key: 'Status',
        width:'25%',
      },
    ];
    
    return (
	    <Table
		    columns={expandedtablecolumns}
		    dataSource={data}
		    pagination={false}
		    size="small"
		    scroll={{ y: 200 }}
	    />
		);
  };

  render() {  
    const columns = [
    { 
      title: 'PATIENT ID', 
      dataIndex: 'PatientID', 
      key: 'PatientID' 
    },
    { 
      title: 'HOSPITAL ID', 
      dataIndex: 'HospitalID', 
      key: 'HospitalID'
    },
    { title: 'LAST NAME', 
      dataIndex: 'LastName', 
      key: 'LastName',
      defaultSortOrder: 'ascend'
      },
    { title: 'FIRST NAME', 
      dataIndex: 'FirstName', 
      key: 'FirstName'
      },
    { title: 'DATE OF BIRTH', 
      dataIndex: 'DateOfBirth', 
      key: 'DateOfBirth'
    },
    { title: 'GENDER', 
      dataIndex: 'Gender', 
      key: 'Gender'
    },
    { title: 'ADDRESS', 
      dataIndex: 'Address', 
      key: 'Address'
    },
    ];
    const data = [];
    const testfirstname = ['Dante', 'Matthew', 'Maria'];
    const testgender = ['M', 'F'];
    const testcityaddress = ['Pasig', 'Pasay', 'Manila'];
		const testlastname = ['Doe','Taylor','Green'];
		const { isLoading } = this.state;
		
    for (let i = 1; i < 1500; i += 1) {
        data.push({
        key: i*2000,
        PatientID: `000${i}`,
        HospitalID: `${i*4}00${i}`,
        LastName: testlastname[Math.floor(Math.random() * testlastname.length)],
        FirstName: testfirstname[Math.floor(Math.random() * testfirstname.length)],
        DateOfBirth: '01/01/1990',
        Gender: testgender[Math.floor(Math.random() * testgender.length)],
        Address: testcityaddress[Math.floor(Math.random() * testcityaddress.length)],
      });
    }
    const emptyTableData = <AntCard><AntEmpty /></AntCard>
    return (
	    <div>
		    <AntRow style={{ paddingBottom: '0.5em' }} type="flex">
			    <AntCol md={12} className="gutter-row">
				    <Text strong> Search Lab Result </Text>
				    <br />
				    <Text> Showing <b>0</b> items out of <b>0</b> results </Text>
			    </AntCol>
			    <AntCol md={10} className="gutter-row" style={{ lineHeight : '2.5em'}}>
				    <Text className="gutter-box" style={{ float:'right', marginRight:'1em' }}>
              Display per page 
				    </Text>
			    </AntCol>
			    <AntCol className="gutter-row">
				    <Select defaultValue="10" style={{ width: '100%' }} className="gutter-box">
					    <Option value="10">10</Option>
					    <Option value="20">20</Option>
					    <Option value="50">50</Option>
					    <Option value="100">100</Option>
				    </Select>
			    </AntCol>
		    </AntRow>
		    <AntRow type="flex">
			    <AntCol lg={24} xs={24}>
						<Table
							className="searchLabTestResultTable"
							columns={columns}
							expandedRowRender={this.expandedRowRender}
							dataSource={data || emptyTableData}
							size="small"
							scroll={{ y: 300 }}
							loading={isLoading}
							onExpand={() => { console.log('onexpand'); }}
						/>
			    </AntCol>
		    </AntRow>
					<AntDrawer
						title="Patient information"
						onClose={this.onClosePatientInfoDrawer}
						width="80%"
						visible={this.state.showPatientInfo}
					>
					<PatientInfo /> 
					</AntDrawer>
	    </div>
    );
  }
}
    
export default WrapperSearchLabTestResultList;
